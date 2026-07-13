from typing import Sequence, Optional
from groq import AsyncGroq, GroqError

from app.integrations.ai.prompts.vibe import ChatMessage
from app.integrations.ai.exceptions import AICompletionError, AIEmptyResponseError

async def request_structured_vibe_completion(
    *,
    client: AsyncGroq,
    messages: Sequence[ChatMessage],
    model: str,
    timeout_seconds: Optional[float] = None,
    max_output_tokens: Optional[int] = None,
) -> str:
    """
    Executes a structured completion request against Groq.
    
    This function accepts an existing client, provider-neutral messages,
    and configurations. It performs exactly one SDK call and safely returns
    the non-empty raw provider message content.
    """
    # Task 7 - Convert Messages Minimally
    # Convert provider-neutral messages to SDK-compatible format
    groq_messages = [
        {"role": msg.role, "content": msg.content}
        for msg in messages
    ]

    # Task 8 - Request Structured JSON Mode Only if Verified
    # Groq SDK supports response_format={"type": "json_object"}
    response_format = {"type": "json_object"}

    # Prepare arguments
    kwargs = {
        "model": model,
        "messages": groq_messages,
        "response_format": response_format,
    }
    
    if timeout_seconds is not None:
        kwargs["timeout"] = timeout_seconds
        
    if max_output_tokens is not None:
        kwargs["max_tokens"] = max_output_tokens

    # Task 10 - Translate Provider Exceptions Safely
    try:
        response = await client.chat.completions.create(**kwargs)
    except GroqError as e:
        raise AICompletionError("The AI provider request failed.") from e
    except Exception as e:
        # Catch unexpected boundary errors, but wrap safely
        raise AICompletionError("An unexpected error occurred during the AI provider request.") from e

    # Task 9 - Extract Provider Message Content Safely
    if not response:
        raise AIEmptyResponseError("The provider returned an empty response object.")
        
    if not response.choices or len(response.choices) == 0:
        raise AIEmptyResponseError("The provider returned no choices.")
        
    choice = response.choices[0]
    if not choice.message:
        raise AIEmptyResponseError("The provider choice contained no message.")
        
    content = choice.message.content
    if content is None:
        raise AIEmptyResponseError("The provider message content was null.")
        
    if not isinstance(content, str):
        raise AIEmptyResponseError("The provider message content was not a string.")
        
    content = content.strip()
    if not content:
        raise AIEmptyResponseError("The provider message content was empty or whitespace only.")

    return content
