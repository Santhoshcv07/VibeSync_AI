import logging
from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException
from fastapi.responses import JSONResponse
import traceback
from app.schemas.core import APIErrorResponse, APIError, ErrorDetail
from app.integrations.ai.exceptions import AIExecutionError

logger = logging.getLogger(__name__)

class VibeGenerationNotImplementedError(Exception):
    pass

class AIClientConfigurationError(Exception):
    pass

def setup_exception_handlers(app: FastAPI):
    @app.exception_handler(VibeGenerationNotImplementedError)
    async def vibe_not_implemented_handler(request: Request, exc: VibeGenerationNotImplementedError):
        error = APIError(
            code="NOT_IMPLEMENTED",
            message="Vibe generation is not available yet."
        )
        return JSONResponse(
            status_code=501,
            content=APIErrorResponse(error=error).model_dump(exclude_none=True)
        )

    @app.exception_handler(AIClientConfigurationError)
    async def ai_config_error_handler(request: Request, exc: AIClientConfigurationError):
        error = APIError(
            code="AI_UNAVAILABLE",
            message="AI generation is currently disabled or unavailable."
        )
        return JSONResponse(
            status_code=503,
            content=APIErrorResponse(error=error).model_dump(exclude_none=True)
        )

    @app.exception_handler(AIExecutionError)
    async def ai_execution_error_handler(request: Request, exc: AIExecutionError):
        logger.error(f"AI Execution Error: {exc.__class__.__name__}")
        error = APIError(
            code="AI_GENERATION_FAILED",
            message="The AI provider failed to process the request."
        )
        return JSONResponse(
            status_code=502,
            content=APIErrorResponse(error=error).model_dump(exclude_none=True)
        )

    @app.exception_handler(RequestValidationError)
    async def validation_exception_handler(request: Request, exc: RequestValidationError):
        details = []
        for err in exc.errors():
            loc = err.get("loc", [])
            # Usually loc[0] is 'body', 'query', 'path', 'header', so we skip it to make field cleaner
            if len(loc) > 1 and loc[0] in ("body", "query", "path", "header"):
                loc = loc[1:]
            field_path = ".".join(str(l) for l in loc)
            details.append(ErrorDetail(field=field_path, message=err.get("msg", "")))
        
        error = APIError(
            code="VALIDATION_ERROR",
            message="The request could not be processed.",
            details=details
        )
        return JSONResponse(
            status_code=422,
            content=APIErrorResponse(error=error).model_dump(exclude_none=True)
        )

    @app.exception_handler(StarletteHTTPException)
    async def http_exception_handler(request: Request, exc: StarletteHTTPException):
        if exc.status_code == 404:
            error = APIError(
                code="NOT_FOUND",
                message="The requested resource was not found."
            )
            return JSONResponse(
                status_code=404,
                content=APIErrorResponse(error=error).model_dump(exclude_none=True)
            )
        
        # Generic fallback for other HTTP exceptions
        error = APIError(
            code="HTTP_ERROR",
            message=str(exc.detail)
        )
        return JSONResponse(
            status_code=exc.status_code,
            content=APIErrorResponse(error=error).model_dump(exclude_none=True)
        )

    @app.exception_handler(Exception)
    async def unexpected_exception_handler(request: Request, exc: Exception):
        # Do not hide local debugging information. Print to console so developers can see the trace.
        traceback.print_exc()
        
        error = APIError(
            code="INTERNAL_SERVER_ERROR",
            message="An unexpected error occurred."
        )
        return JSONResponse(
            status_code=500,
            content=APIErrorResponse(error=error).model_dump(exclude_none=True)
        )
