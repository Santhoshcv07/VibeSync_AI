from fastapi import APIRouter, Depends, Query
from typing import List, Optional
from pydantic import BaseModel, Field
import httpx
from urllib.parse import quote
from app.schemas.vibe import GenerateVibeRequest, GeneratedVibeData, VibeHistoryItem
from app.schemas.core import APIErrorResponse, SuccessResponse
from app.services.vibe_generation import VibeGenerationService
from app.core.config import settings
from app.api.deps import SessionDep, CurrentUser
from app.models.vibe import Vibe
from app.models.recommendation import Recommendation
from sqlalchemy.future import select
from sqlalchemy import desc
from sqlalchemy.orm import joinedload
from fastapi import HTTPException
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
    current_user: CurrentUser,
    session: SessionDep,
    service: VibeGenerationService = Depends(get_vibe_generation_service)
):
    vibe_data = await service.generate(request)
    
    # Save vibe to DB
    db_vibe = Vibe(
        user_id=current_user.id,
        mood=request.mood,
        activity=request.activity,
        time_of_day=request.timeOfDay,
        energy_level=request.energyLevel,
        ai_summary=vibe_data.narrative
    )
    session.add(db_vibe)
    await session.commit()
    await session.refresh(db_vibe)
    
    # Save recommendations
    db_rec = Recommendation(
        vibe_id=db_vibe.id,
        music=[m.dict() for m in vibe_data.media.music] if vibe_data.media and vibe_data.media.music else [],
        movies=[m.dict() for m in vibe_data.media.movies] if vibe_data.media and vibe_data.media.movies else [],
        youtube=[m.dict() for m in vibe_data.media.youtube] if vibe_data.media and vibe_data.media.youtube else [],
        books=[m.dict() for m in vibe_data.media.books] if vibe_data.media and vibe_data.media.books else [],
        visuals=[m.dict() for m in vibe_data.media.visuals] if vibe_data.media and vibe_data.media.visuals else []
    )
    session.add(db_rec)
    await session.commit()
    
    # inject the DB ID into the response
    vibe_data.id = str(db_vibe.id)
    return SuccessResponse(data=vibe_data)

@router.get("/history", response_model=SuccessResponse[List[VibeHistoryItem]])
async def get_vibe_history(current_user: CurrentUser, session: SessionDep, limit: int = 10):
    result = await session.execute(
        select(Vibe).where(Vibe.user_id == current_user.id).order_by(desc(Vibe.created_at)).limit(limit)
    )
    vibes = result.scalars().all()
    
    history = []
    for v in vibes:
        history.append(VibeHistoryItem(
            id=str(v.id),
            mood=v.mood,
            activity=v.activity,
            timeOfDay=v.time_of_day,
            energyLevel=v.energy_level,
            aiSummary=v.ai_summary or "",
            createdAt=v.created_at
        ))
    return SuccessResponse(data=history)

@router.get("/{vibe_id}", response_model=SuccessResponse[GeneratedVibeData])
async def get_vibe(vibe_id: int, current_user: CurrentUser, session: SessionDep):
    result = await session.execute(
        select(Vibe).options(joinedload(Vibe.recommendation)).where(Vibe.id == vibe_id, Vibe.user_id == current_user.id)
    )
    vibe = result.scalars().first()
    
    if not vibe:
        raise HTTPException(status_code=404, detail="Vibe not found")
        
    rec = vibe.recommendation
    
    media_data = None
    if rec:
        from app.schemas.vibe import VibeMediaData
        media_data = VibeMediaData(
            music=rec.music or [],
            movies=rec.movies or [],
            youtube=rec.youtube or [],
            books=rec.books or [],
            visuals=rec.visuals or []
        )
    
    vibe_data = GeneratedVibeData(
        id=str(vibe.id),
        title=f"{vibe.mood.capitalize()} {vibe.activity.capitalize()}",
        mood=vibe.mood,
        duration=vibe.time_of_day,
        description=vibe.ai_summary or "",
        intention=f"A personalized vibe for {vibe.activity} during {vibe.time_of_day} with {vibe.energy_level} energy.",
        narrative=vibe.ai_summary or "",
        media=media_data,
        sections=[] # We don't reconstruct sections here for now, the frontend uses media_data
    )
    
    return SuccessResponse(data=vibe_data)

@router.delete("/{vibe_id}", response_model=SuccessResponse[dict])
async def delete_vibe(vibe_id: int, current_user: CurrentUser, session: SessionDep):
    result = await session.execute(
        select(Vibe).where(Vibe.id == vibe_id, Vibe.user_id == current_user.id)
    )
    vibe = result.scalars().first()
    
    if not vibe:
        raise HTTPException(status_code=404, detail="Vibe not found")
        
    await session.delete(vibe)
    await session.commit()
    
    return SuccessResponse(data={"deleted": True})


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
