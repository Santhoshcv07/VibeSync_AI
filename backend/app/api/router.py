from fastapi import APIRouter
from app.api.endpoints import health, vibes

api_router = APIRouter()

api_router.include_router(health.router, tags=["health"])

# Versioned API
v1_router = APIRouter(prefix="/api/v1")
v1_router.include_router(vibes.router, prefix="/vibes", tags=["vibes"])

api_router.include_router(v1_router)
