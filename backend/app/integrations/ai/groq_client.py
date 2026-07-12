from groq import AsyncGroq
from app.core.config import Settings
from app.core.exceptions import AIClientConfigurationError

def create_groq_client(settings: Settings) -> AsyncGroq:
    """
    Creates and returns an isolated AsyncGroq client based on the provided settings.
    This function should only be called when AI generation is explicitly requested.
    """
    if not settings.AI_ENABLED:
        raise AIClientConfigurationError("AI features are currently disabled.")
        
    if settings.AI_PROVIDER != "groq":
        raise AIClientConfigurationError("AI provider must be 'groq' to use the Groq client.")
        
    if not settings.GROQ_API_KEY:
        raise AIClientConfigurationError("Groq API key is missing.")
        
    # Unwrapping the SecretStr ONLY here at the construction boundary
    api_key = settings.GROQ_API_KEY.get_secret_value()
    
    # Create the client with minimal configuration
    client = AsyncGroq(
        api_key=api_key,
    )
    
    return client
