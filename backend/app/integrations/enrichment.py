import httpx
import logging
from typing import Optional
from urllib.parse import quote
from app.core.config import settings
from app.schemas.vibe import (
    MusicRecommendation,
    MovieRecommendation,
    YouTubeRecommendation,
    PinterestRecommendation,
    BookRecommendation,
    VibeArtworkVariant,
    VibeMediaSection,
    GenerateVibeRequest
)
import uuid

logger = logging.getLogger(__name__)

async def enrich_music(item: MusicRecommendation) -> MusicRecommendation:
    try:
        async with httpx.AsyncClient() as client:
            # Search iTunes API
            query = f"{item.title} {item.creator}"
            search_res = await client.get(
                "https://itunes.apple.com/search",
                params={
                    "term": query,
                    "media": "music",
                    "entity": "song",
                    "limit": 5
                },
                timeout=5.0
            )
            search_res.raise_for_status()
            results = search_res.json().get("results", [])
            
            if results:
                track = results[0]
                # Get artworkUrl100 and upgrade to 600x600
                artwork_url = track.get("artworkUrl100")
                if artwork_url:
                    item.imageUrl = artwork_url.replace("100x100", "600x600")
                
                # Set destinationUrl to Spotify search URL
                spotify_query = quote(f"{item.title} {item.creator}")
                item.destinationUrl = f"https://open.spotify.com/search/{spotify_query}"
    except Exception as e:
        logger.warning(f"iTunes enrichment failed for {item.title}: {e}")
        
    return item

async def enrich_youtube_section(section: VibeMediaSection, request: GenerateVibeRequest) -> None:
    if not settings.YOUTUBE_API_KEY or settings.YOUTUBE_API_KEY.startswith("YOUR_"):
        return
        
    try:
        async with httpx.AsyncClient() as client:
            # Build search query based on user request
            query_parts = []
            if request.mood:
                query_parts.append(request.mood.value)
            if request.context:
                query_parts.append(request.context)
            query_parts.append("vibe")
            
            query = " ".join(query_parts)
            
            res = await client.get(
                "https://www.googleapis.com/youtube/v3/search",
                params={
                    "part": "snippet",
                    "q": query,
                    "type": "video",
                    "maxResults": 12,
                    "key": settings.YOUTUBE_API_KEY
                },
                timeout=5.0
            )
            res.raise_for_status()
            items = res.json().get("items", [])
            
            if items:
                base_item = section.items[0] if section.items else None
                new_items = []
                for i, video in enumerate(items):
                    video_id = video.get("id", {}).get("videoId")
                    if not video_id:
                        continue
                        
                    snippet = video.get("snippet", {})
                    thumbnails = snippet.get("thumbnails", {})
                    high_res = thumbnails.get("high", {}).get("url") or thumbnails.get("default", {}).get("url")
                    
                    new_item = YouTubeRecommendation(
                        id=base_item.id if (i == 0 and base_item) else str(uuid.uuid4()),
                        title=snippet.get("title", ""),
                        creator=snippet.get("channelTitle", ""),
                        description=snippet.get("description", ""),
                        format="Video",
                        providerLabel="YouTube",
                        actionLabel="Watch on YouTube",
                        artworkVariant=VibeArtworkVariant.soft_motion,
                        tags=base_item.tags if base_item else [],
                        destinationUrl=f"https://www.youtube.com/watch?v={video_id}",
                        imageUrl=high_res
                    )
                    new_items.append(new_item)
                
                if new_items:
                    section.items = new_items
    except Exception as e:
        logger.warning(f"YouTube enrichment failed: {e}")

async def enrich_movie(
    item: MovieRecommendation
) -> MovieRecommendation:

    if (
        not settings.TMDB_API_KEY
        or settings.TMDB_API_KEY.startswith("YOUR_")
    ):
        return item

    try:
        async with httpx.AsyncClient() as client:

            # Try the original title first.
            search_queries = [item.title]

            # Add a simple fallback for accented movie titles.
            normalized_title = (
                item.title
                .replace("é", "e")
                .replace("É", "E")
                .replace("è", "e")
                .replace("á", "a")
                .replace("à", "a")
                .replace("ö", "o")
                .replace("ü", "u")
            )

            if normalized_title != item.title:
                search_queries.append(normalized_title)

            media = None

            for query in search_queries:
                response = await client.get(
                    "https://api.themoviedb.org/3/search/multi",
                    params={
                        "api_key": settings.TMDB_API_KEY,
                        "query": query,
                        "include_adult": "false",
                        "language": "en-US",
                        "page": 1,
                    },
                    timeout=10.0,
                )

                response.raise_for_status()

                results = response.json().get("results", [])

                # Use only movie or TV results.
                valid_results = [
                    result
                    for result in results
                    if result.get("media_type")
                    in ["movie", "tv"]
                ]

                # Prefer a result that contains a poster.
                media = next(
                    (
                        result
                        for result in valid_results
                        if result.get("poster_path")
                    ),
                    None,
                )

                if media:
                    break

            if media:
                poster_path = media.get("poster_path")

                if poster_path:
                    item.imageUrl = (
                        "https://image.tmdb.org/t/p/w500"
                        f"{poster_path}"
                    )

                media_type = media.get(
                    "media_type",
                    "movie",
                )

                media_id = media.get("id")

                if media_id:
                    item.destinationUrl = (
                        "https://www.themoviedb.org/"
                        f"{media_type}/{media_id}"
                    )

    except Exception as error:
        logger.warning(
            "TMDB enrichment failed for "
            f"{item.title}: {error}"
        )

    return item
async def enrich_visual(item: PinterestRecommendation) -> PinterestRecommendation:
    # We fallback to Unsplash since Pinterest API requires complex auth
    if not settings.VISUAL_PROVIDER_API_KEY or settings.VISUAL_PROVIDER_API_KEY.startswith("YOUR_"):
        return item
        
    try:
        async with httpx.AsyncClient() as client:
            query = f"{item.title} aesthetic"
            res = await client.get(
                "https://api.unsplash.com/search/photos",
                params={
                    "query": query,
                    "per_page": 1,
                    "orientation": "landscape"
                },
                headers={
                    "Authorization": f"Client-ID {settings.VISUAL_PROVIDER_API_KEY}"
                },
                timeout=5.0
            )
            res.raise_for_status()
            results = res.json().get("results", [])
            
            if results:
                photo = results[0]
                item.imageUrl = photo.get("urls", {}).get("regular")
                item.destinationUrl = photo.get("links", {}).get("html")
    except Exception as e:
        logger.warning(f"Unsplash enrichment failed for {item.title}: {e}")
        
    return item

async def enrich_book(item: BookRecommendation) -> BookRecommendation:
    # Google Books API can work without an API key for basic searches, but we'll use it if provided
    try:
        async with httpx.AsyncClient() as client:
            query = f"intitle:{item.title} inauthor:{item.creator}"
            params = {"q": query, "maxResults": 1}
            if settings.GOOGLE_BOOKS_API_KEY and not settings.GOOGLE_BOOKS_API_KEY.startswith("YOUR_"):
                params["key"] = settings.GOOGLE_BOOKS_API_KEY
                
            res = await client.get(
                "https://www.googleapis.com/books/v1/volumes",
                params=params,
                timeout=5.0
            )
            res.raise_for_status()
            items = res.json().get("items", [])
            
            if items:
                volume = items[0].get("volumeInfo", {})
                
                image_links = volume.get("imageLinks", {})
                thumbnail = image_links.get("thumbnail") or image_links.get("smallThumbnail")
                if thumbnail:
                    # Google books returns http sometimes, replace with https
                    item.imageUrl = thumbnail.replace("http://", "https://")
                    
                item.destinationUrl = volume.get("infoLink")
    except Exception as e:
        logger.warning(f"Google Books enrichment failed for {item.title}: {e}")
        
    return item
