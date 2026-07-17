from typing import List, Optional

from pydantic import BaseModel, Field, field_validator


class BaseAIRecommendation(BaseModel):
    title: str = Field(
        ...,
        min_length=1,
        description="Title of the recommendation",
    )

    creator: str = Field(
        ...,
        min_length=1,
        description="Creator, artist, author, or channel",
    )

    description: str = Field(
        ...,
        min_length=1,
        description="Why this fits the vibe",
    )

    format: str = Field(
        ...,
        min_length=1,
        description=(
            "Format such as Album, Playlist, Movie, "
            "Series, Video, Board, or Novel"
        ),
    )

    tags: List[str] = Field(
        ...,
        min_length=1,
        description="Related genre or mood tags",
    )

    duration: Optional[str] = Field(
        None,
        description=(
            "Optional duration if applicable, "
            "for example '1h 30m' or '45m'"
        ),
    )

    @field_validator(
        "title",
        "creator",
        "description",
        "format",
        mode="before",
    )
    @classmethod
    def strip_and_check_empty(cls, value: str) -> str:
        if isinstance(value, str):
            stripped_value = value.strip()

            if not stripped_value:
                raise ValueError(
                    "String must not be empty or whitespace only"
                )

            return stripped_value

        return value


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
    music: List[MusicAIRecommendation] = Field(
        ...,
        min_length=4,
        max_length=4,
        description="Exactly 4 different music recommendations",
    )

    movie: MovieAIRecommendation

    youtube: YouTubeAIRecommendation

    pinterest: List[PinterestAIRecommendation] = Field(
        ...,
        min_length=6,
        max_length=6,
        description=(
            "Exactly 6 Pinterest visual inspiration "
            "recommendations"
        ),
    )

    books: List[BookAIRecommendation] = Field(
        ...,
        min_length=3,
        max_length=3,
        description="Exactly 3 different book recommendations",
    )