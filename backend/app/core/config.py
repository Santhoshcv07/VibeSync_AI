from pathlib import Path
from typing import Literal, Any, Optional

from pydantic import Field, field_validator, SecretStr, model_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


# Always points to the backend folder,
# regardless of where Uvicorn is started.
BASE_DIR = Path(__file__).resolve().parent.parent.parent


class Settings(BaseSettings):
    PROJECT_NAME: str = "VibeSync AI API"
    VERSION: str = "0.1.0"
    DESCRIPTION: str = (
        "Backend API for the VibeSync AI entertainment discovery platform."
    )

    APP_ENV: Literal["development", "test", "production"] = "development"

    # AI configuration
    AI_ENABLED: bool = False
    AI_PROVIDER: Literal["groq"] = "groq"
    GROQ_API_KEY: SecretStr | None = None
    GROQ_MODEL: str = "llama3-8b-8192"

    # Provider keys
    SPOTIFY_CLIENT_ID: Optional[str] = None
    SPOTIFY_CLIENT_SECRET: Optional[str] = None
    YOUTUBE_API_KEY: Optional[str] = None
    TMDB_API_KEY: Optional[str] = None
    VISUAL_PROVIDER: Optional[str] = "unsplash"
    VISUAL_PROVIDER_API_KEY: Optional[str] = None
    GOOGLE_BOOKS_API_KEY: Optional[str] = None

    # Database
    DATABASE_URL: str = "sqlite+aiosqlite:///./vibesync.db"

    # Auth
    AUTH_SECRET_KEY: str = "vibesync_dummy_dev_key"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    CORS_ORIGINS: Any = Field(
        default=["http://localhost:3000"]
    )

    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def assemble_cors_origins(cls, v: Any) -> list[str]:
        if isinstance(v, str):
            if v.startswith("[") and v.endswith("]"):
                import json

                try:
                    return json.loads(v)
                except json.JSONDecodeError:
                    pass

            return [
                i.strip()
                for i in v.split(",")
                if i.strip()
            ]

        return v

    @field_validator("CORS_ORIGINS")
    @classmethod
    def validate_origins(
        cls,
        v: list[str],
    ) -> list[str]:
        valid_origins = []

        for origin in v:
            if origin == "*":
                raise ValueError(
                    "Wildcard CORS origin is not allowed."
                )

            if origin.endswith("/"):
                raise ValueError(
                    f"Trailing slash not allowed in origin: {origin}"
                )

            if not origin.startswith(
                ("http://", "https://")
            ):
                raise ValueError(
                    f"Origin must start with http or https: {origin}"
                )

            from urllib.parse import urlparse

            parsed = urlparse(origin)

            if parsed.path not in ("", "/"):
                raise ValueError(
                    f"Origin cannot contain a path: {origin}"
                )

            if parsed.query:
                raise ValueError(
                    f"Origin cannot contain a query: {origin}"
                )

            if parsed.fragment:
                raise ValueError(
                    f"Origin cannot contain a fragment: {origin}"
                )

            if parsed.username or parsed.password:
                raise ValueError(
                    f"Origin cannot contain credentials: {origin}"
                )

            valid_origins.append(origin)

        # Remove duplicates while preserving order
        return list(dict.fromkeys(valid_origins))

    @field_validator("GROQ_API_KEY", mode="before")
    @classmethod
    def clean_api_key(cls, v: Any) -> Any:
        if isinstance(v, str):
            v = v.strip()

            if not v:
                return None

        return v

    @model_validator(mode="after")
    def validate_ai_config(self) -> "Settings":
        if self.AI_ENABLED:
            if not self.GROQ_API_KEY:
                raise ValueError(
                    "GROQ_API_KEY must be provided "
                    "when AI_ENABLED is true."
                )

            if (
                not self.GROQ_MODEL
                or not self.GROQ_MODEL.strip()
            ):
                raise ValueError(
                    "GROQ_MODEL must be provided "
                    "when AI_ENABLED is true."
                )

        return self

    model_config = SettingsConfigDict(
        env_file=str(BASE_DIR / ".env"),
        env_ignore_empty=True,
        extra="ignore",
    )


settings = Settings()