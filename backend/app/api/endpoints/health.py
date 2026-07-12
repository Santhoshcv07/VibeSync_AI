from fastapi import APIRouter
from app.schemas.core import HealthResponse
from app.core.config import settings

router = APIRouter()

@router.get("/health", response_model=HealthResponse)
async def health_check() -> HealthResponse:
    return HealthResponse(
        status="ok",
        service="vibesync-api",
        version=settings.VERSION
    )
