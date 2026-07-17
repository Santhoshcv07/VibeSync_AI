from fastapi import APIRouter, Depends, Query
from typing import List, Optional
from pydantic import BaseModel, Field
import httpx
from urllib.parse import quote
from app.schemas.vibe import GenerateVibeRequest, GeneratedVibeData
from app.schemas.core import APIErrorResponse, SuccessResponse
from app.services.vibe_generation import VibeGenerationService
from app.core.config import settings

router = APIRouter()

def get_vibe_generation_service() -> VibeGenerationService:
    return VibeGenerationService()

class MusicSearchRequest(BaseModel):
    mood: str = Field(..., description="Mood for music search")
    context: Optional[str] = Field(None, description="Additional context for search")

class MusicItem(BaseModel):
    id: str
    title: str
    creator: str
    imageUrl: Optional[str] = None
    destinationUrl: str
    duration: Optional[str] = None


class BookSearchRequest(BaseModel):
    mood: str = Field(..., description="Mood for book search")
    context: Optional[str] = Field(
        None,
        description="Additional context for book search"
    )


class BookItem(BaseModel):
    id: str
    title: str
    creator: str
    imageUrl: Optional[str] = None
    destinationUrl: str
    description: Optional[str] = None

@router.post(
    "/generate", 
    response_model=SuccessResponse[GeneratedVibeData], 
    responses={
        501: {"model": APIErrorResponse},
        502: {"model": APIErrorResponse},
        503: {"model": APIErrorResponse}
    }
)
async def generate_vibe(
    request: GenerateVibeRequest,
    service: VibeGenerationService = Depends(get_vibe_generation_service)
):
    vibe_data = await service.generate(request)
    return SuccessResponse(data=vibe_data)

@router.post(
    "/music/search",
    response_model=SuccessResponse[List[MusicItem]],
    responses={
        500: {"model": APIErrorResponse}
    }
)
async def search_music(request: MusicSearchRequest, limit: int = Query(12, ge=1, le=50)):
    """Search iTunes for additional music based on mood and context."""
    try:
        # Build search query based on mood and context
        query_parts = [request.mood]
        if request.context:
            query_parts.append(request.context)
        query = " ".join(query_parts)
        
        async with httpx.AsyncClient() as client:
            search_res = await client.get(
                "https://itunes.apple.com/search",
                params={
                    "term": query,
                    "media": "music",
                    "entity": "song",
                    "limit": limit
                },
                timeout=10.0
            )
            search_res.raise_for_status()
            results = search_res.json().get("results", [])
            
            # Process results and deduplicate by artist/title
            seen = set()
            music_items = []
            for track in results:
                title = track.get("trackName", "")
                artist = track.get("artistName", "")
                key = f"{title.lower()}_{artist.lower()}"
                
                if key not in seen:
                    seen.add(key)
                    
                    artwork_url = track.get("artworkUrl100")
                    if artwork_url:
                        artwork_url = artwork_url.replace("100x100", "600x600")
                    
                    spotify_query = quote(f"{title} {artist}")
                    destination_url = f"https://open.spotify.com/search/{spotify_query}"
                    
                    # Format duration from milliseconds to m:ss
                    duration_ms = track.get("trackTimeMillis")
                    duration_str = None
                    if duration_ms:
                        total_seconds = duration_ms // 1000
                        minutes = total_seconds // 60
                        seconds = total_seconds % 60
                        duration_str = f"{minutes}:{seconds:02d}"
                    
                    music_items.append(MusicItem(
                        id=str(track.get("trackId", "")),
                        title=title,
                        creator=artist,
                        imageUrl=artwork_url,
                        destinationUrl=destination_url,
                        duration=duration_str
                    ))
                    
                    if len(music_items) >= limit:
                        break
            
            return SuccessResponse(data=music_items)
    except Exception as e:
        # Return empty list on error instead of failing
        return SuccessResponse(data=[])
    
@router.post(
"/books/search",
response_model=SuccessResponse[List[BookItem]],
responses={
    500: {"model": APIErrorResponse}
}
)
async def search_books(
    request: BookSearchRequest,
    limit: int = Query(12, ge=1, le=40)
):
    """Search Google Books for additional books based on mood and context."""
    try:
        # Build a useful search query from the current vibe
        query_parts = [request.mood]

        if request.context:
            query_parts.append(request.context)

        query_parts.append("books")
        query = " ".join(query_parts)

        async with httpx.AsyncClient() as client:
            search_res = await client.get(
                "https://www.googleapis.com/books/v1/volumes",
                        params={
            "q": query,
            "maxResults": limit,
            "printType": "books",
            "orderBy": "relevance",
            "key": settings.GOOGLE_BOOKS_API_KEY
        },
                timeout=10.0
            )

            search_res.raise_for_status()
            results = search_res.json().get("items", [])

            seen = set()
            book_items = []

            for book in results:
                volume_info = book.get("volumeInfo", {})

                title = volume_info.get("title", "").strip()
                authors = volume_info.get("authors", [])
                creator = ", ".join(authors) if authors else "Unknown Author"

                if not title:
                    continue

                # Prevent duplicate books
                key = f"{title.lower()}_{creator.lower()}"

                if key in seen:
                    continue

                seen.add(key)

                image_links = volume_info.get("imageLinks", {})

                image_url = (
                    image_links.get("extraLarge")
                    or image_links.get("large")
                    or image_links.get("medium")
                    or image_links.get("small")
                    or image_links.get("thumbnail")
                    or image_links.get("smallThumbnail")
                )

                # Google sometimes returns HTTP image URLs
                if image_url:
                    image_url = image_url.replace("http://", "https://")

                destination_url = (
                    volume_info.get("previewLink")
                    or volume_info.get("infoLink")
                    or f"https://books.google.com/books?id={book.get('id', '')}"
                )

                description = volume_info.get("description")

                book_items.append(
                    BookItem(
                        id=str(book.get("id", "")),
                        title=title,
                        creator=creator,
                        imageUrl=image_url,
                        destinationUrl=destination_url,
                        description=description
                    )
                )

                if len(book_items) >= limit:
                    break

            return SuccessResponse(data=book_items)
    except Exception as e:
        print(f"Google Books search failed: {e}")
        return SuccessResponse(data=[])
