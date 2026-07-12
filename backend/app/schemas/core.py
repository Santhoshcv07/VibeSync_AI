from typing import Any, Generic, TypeVar, Optional, List
from pydantic import BaseModel, Field

T = TypeVar("T")

class HealthResponse(BaseModel):
    status: str = Field(default="ok")
    service: str = Field(default="vibesync-api")
    version: str

class ErrorDetail(BaseModel):
    field: str
    message: str

class APIError(BaseModel):
    code: str
    message: str
    details: List[ErrorDetail] = Field(default_factory=list)
    request_id: Optional[str] = None

class APIErrorResponse(BaseModel):
    error: APIError

class SuccessResponse(BaseModel, Generic[T]):
    data: T
    meta: Optional[dict[str, Any]] = None
