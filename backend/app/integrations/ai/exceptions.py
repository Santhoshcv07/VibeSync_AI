class AIExecutionError(Exception):
    """Base class for internal AI execution errors."""
    pass

class AICompletionError(AIExecutionError):
    """Raised when the provider completion request fails."""
    pass

class AIEmptyResponseError(AIExecutionError):
    """Raised when the provider returns an empty response."""
    pass

class AIResponseParseError(AIExecutionError):
    """Raised when the provider response is not valid JSON."""
    pass

class AIResponseValidationError(AIExecutionError):
    """Raised when the provider response violates the internal contract."""
    pass
