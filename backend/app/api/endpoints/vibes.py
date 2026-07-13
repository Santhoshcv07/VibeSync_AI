from fastapi import APIRouter, Depends
from app.schemas.vibe import GenerateVibeRequest, GeneratedVibeData
from app.schemas.core import APIErrorResponse, SuccessResponse
from app.services.vibe_generation import VibeGenerationService

router = APIRouter()

def get_vibe_generation_service() -> VibeGenerationService:
    return VibeGenerationService()

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
