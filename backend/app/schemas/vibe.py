from enum import Enum
from typing import List, Optional, Union
from pydantic import BaseModel, Field, field_validator

class VibeMood(str, Enum):
    chill = "chill"
    happy = "happy"
    energetic = "energetic"
    focus = "focus"
    romantic = "romantic"
    low = "low"

class GenerateVibeRequest(BaseModel):
    mood: VibeMood = Field(..., description="The requested mood")
    context: Optional[str] = Field(None, max_length=500, description="Optional user context")

    @field_validator('context')
    @classmethod
    def clean_context(cls, v: Optional[str]) -> Optional[str]:
        if v is None:
            return v
        stripped = v.strip()
        return stripped if stripped else None

class VibeMediaCategory(str, Enum):
    music = "music"
    movies_shows = "movies-shows"
    youtube = "youtube"
    visual_inspiration = "visual-inspiration"
    books = "books"

class VibeArtworkVariant(str, Enum):
    aurora = "aurora"
    midnight_window = "midnight-window"
    soft_motion = "soft-motion"
    quiet_frames = "quiet-frames"
    paper_moon = "paper-moon"
    violet_room = "violet-room"
    blue_hour = "blue-hour"
    floating_pages = "floating-pages"
    slow_signal = "slow-signal"
    afterglow = "afterglow"

class BaseRecommendation(BaseModel):
    id: str
    title: str
    creator: str
    description: str
    format: str
    providerLabel: str
    actionLabel: str
    artworkVariant: VibeArtworkVariant
    tags: List[str]
    duration: Optional[str] = None

class MusicRecommendation(BaseRecommendation):
    category: VibeMediaCategory = Field(default=VibeMediaCategory.music)

class MovieRecommendation(BaseRecommendation):
    category: VibeMediaCategory = Field(default=VibeMediaCategory.movies_shows)

class YouTubeRecommendation(BaseRecommendation):
    category: VibeMediaCategory = Field(default=VibeMediaCategory.youtube)

class PinterestRecommendation(BaseRecommendation):
    category: VibeMediaCategory = Field(default=VibeMediaCategory.visual_inspiration)

class BookRecommendation(BaseRecommendation):
    category: VibeMediaCategory = Field(default=VibeMediaCategory.books)

RecommendationItem = Union[
    MusicRecommendation,
    MovieRecommendation,
    YouTubeRecommendation,
    PinterestRecommendation,
    BookRecommendation
]

class VibeMediaSection(BaseModel):
    id: str
    category: VibeMediaCategory
    eyebrow: str
    title: str
    description: str
    items: List[RecommendationItem]

class GeneratedVibeData(BaseModel):
    id: str
    title: str
    mood: str
    duration: str
    description: str
    intention: str
    journeySummary: str
    sections: List[VibeMediaSection]
