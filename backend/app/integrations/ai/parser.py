import json
from pydantic import ValidationError

from app.integrations.ai.contracts import StructuredVibeAIOutput
from app.integrations.ai.exceptions import AIResponseParseError, AIResponseValidationError

def parse_structured_vibe_output(raw_content: str) -> StructuredVibeAIOutput:
    """
    Parses a raw string from the AI provider into a StructuredVibeAIOutput contract.
    
    This parser is strict: it requires valid JSON and does not attempt to repair
    malformed output, strip markdown fences, or extract JSON from prose.
    """
    if not isinstance(raw_content, str):
        raise AIResponseParseError("Raw content must be a string.")
        
    raw_content = raw_content.strip()
    if not raw_content:
        raise AIResponseParseError("Raw content is empty or whitespace only.")
        
    # Task 12 - Handle JSON Decode Failure Safely
    try:
        parsed_json = json.loads(raw_content)
    except json.JSONDecodeError as e:
        # We can safely include line/column information, but NO raw content.
        raise AIResponseParseError(f"Failed to decode JSON response (line {e.lineno}, col {e.colno}).") from e
    except Exception as e:
        raise AIResponseParseError("An unexpected error occurred during JSON decoding.") from e
        
    # Task 13 - Handle Contract Validation Failure Safely
    try:
        validated_data = StructuredVibeAIOutput.model_validate(parsed_json)
    except ValidationError as e:
        # Pydantic's ValidationError contains structural info but we don't dump the raw JSON here.
        # We can extract safe error strings.
        errors = e.errors()
        error_details = []
        for err in errors:
            loc = ".".join(str(l) for l in err.get("loc", []))
            msg = err.get("msg", "")
            error_details.append(f"{loc}: {msg}")
            
        safe_message = "The provider response violated the internal AI output contract. Details: " + " | ".join(error_details)
        raise AIResponseValidationError(safe_message) from e
    except Exception as e:
        raise AIResponseValidationError("An unexpected error occurred during contract validation.") from e

    return validated_data
