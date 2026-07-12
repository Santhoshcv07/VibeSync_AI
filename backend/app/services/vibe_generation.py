from app.schemas.vibe import GenerateVibeRequest, GeneratedVibeData
from app.core.exceptions import VibeGenerationNotImplementedError

class VibeGenerationService:
    async def generate(self, request: GenerateVibeRequest) -> GeneratedVibeData:
        raise VibeGenerationNotImplementedError()
