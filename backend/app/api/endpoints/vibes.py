from fastapi import APIRouter, Depends, Query
from typing import List, Optional
from pydantic import BaseModel, Field
import httpx
from urllib.parse import quote
from app.schemas.vibe import GenerateVibeRequest, GeneratedVibeData
from app.schemas.core import APIErrorResponse, SuccessResponse
from app.services.vibe_generation import VibeGenerationService

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
