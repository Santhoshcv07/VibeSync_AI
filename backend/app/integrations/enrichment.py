import httpx
import logging
from typing import Optional
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
    if not settings.SPOTIFY_CLIENT_ID or not settings.SPOTIFY_CLIENT_SECRET or settings.SPOTIFY_CLIENT_ID.startswith("YOUR_"):
        return item
    
    try:
        async with httpx.AsyncClient() as client:
            # 1. Get token
            token_res = await client.post(
                "https://accounts.spotify.com/api/token",
                data={"grant_type": "client_credentials"},
                auth=(settings.SPOTIFY_CLIENT_ID, settings.SPOTIFY_CLIENT_SECRET),
                timeout=5.0
            )
            token_res.raise_for_status()
            token = token_res.json().get("access_token")
            
            # 2. Search
            query = f"track:{item.title} artist:{item.creator}"
            search_res = await client.get(
                "https://api.spotify.com/v1/search",
                params={"q": query, "type": "track", "limit": 1},
                headers={"Authorization": f"Bearer {token}"},
                timeout=5.0
            )
            search_res.raise_for_status()
            tracks = search_res.json().get("tracks", {}).get("items", [])
            
            if tracks:
                track = tracks[0]
                item.destinationUrl = track.get("external_urls", {}).get("spotify")
                images = track.get("album", {}).get("images", [])
                if images:
                    item.imageUrl = images[0].get("url")
    except Exception as e:
        logger.warning(f"Spotify enrichment failed for {item.title}: {e}")
        
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

async def enrich_movie(item: MovieRecommendation) -> MovieRecommendation:
    if not settings.TMDB_API_KEY or settings.TMDB_API_KEY.startswith("YOUR_"):
        return item
        
    try:
        async with httpx.AsyncClient() as client:
            # We assume it's a movie by default. A more advanced version would check if it's a TV show.
            query = item.title
            res = await client.get(
                "https://api.themoviedb.org/3/search/multi",
                params={
                    "api_key": settings.TMDB_API_KEY,
                    "query": query,
                    "page": 1
                },
                timeout=5.0
            )
            res.raise_for_status()
            results = res.json().get("results", [])
            
            if results:
                # Find first movie or tv
                media = next((r for r in results if r.get("media_type") in ["movie", "tv"]), None) or results[0]
                
                poster_path = media.get("poster_path")
                if poster_path:
                    item.imageUrl = f"https://image.tmdb.org/t/p/w500{poster_path}"
                    
                media_type = media.get("media_type", "movie")
                media_id = media.get("id")
                if media_id:
                    item.destinationUrl = f"https://www.themoviedb.org/{media_type}/{media_id}"
    except Exception as e:
        logger.warning(f"TMDB enrichment failed for {item.title}: {e}")
        
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
