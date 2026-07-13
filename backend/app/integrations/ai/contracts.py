from typing import List, Optional
from pydantic import BaseModel, Field, field_validator

class BaseAIRecommendation(BaseModel):
    title: str = Field(..., min_length=1, description="Title of the recommendation")
    creator: str = Field(..., min_length=1, description="Creator, artist, author, or channel")
    description: str = Field(..., min_length=1, description="Why this fits the vibe")
    format: str = Field(..., min_length=1, description="Format (e.g., Album, Playlist, Movie, Series, Video, Board, Novel)")
    tags: List[str] = Field(..., min_items=1, description="Related genre or mood tags")
    duration: Optional[str] = Field(None, description="Optional duration if applicable (e.g., '1h 30m', '45m')")

    @field_validator("title", "creator", "description", "format", mode="before")
    @classmethod
    def strip_and_check_empty(cls, v: str) -> str:
        if isinstance(v, str):
            stripped = v.strip()
            if not stripped:
                raise ValueError("String must not be empty or whitespace only")
            return stripped
        return v

class MusicAIRecommendation(BaseAIRecommendation):
    pass

class MovieAIRecommendation(BaseAIRecommendation):
    pass

class YouTubeAIRecommendation(BaseAIRecommendation):
    pass

class PinterestAIRecommendation(BaseAIRecommendation):
    pass

class BookAIRecommendation(BaseAIRecommendation):
    pass

class StructuredVibeAIOutput(BaseModel):
    music: List[MusicAIRecommendation] = Field(..., min_length=3, max_length=3, description="Exactly 3 music recommendations")
    movie: MovieAIRecommendation
    youtube: YouTubeAIRecommendation
    pinterest: PinterestAIRecommendation
    book: BookAIRecommendation
