import unittest
from unittest.mock import AsyncMock, patch, MagicMock

from app.services.vibe_generation import VibeGenerationService
from app.schemas.vibe import GenerateVibeRequest, VibeMood, GeneratedVibeData
from app.core.exceptions import VibeGenerationNotImplementedError, AIClientConfigurationError
from app.integrations.ai.exceptions import AICompletionError, AIEmptyResponseError, AIResponseParseError, AIResponseValidationError
from app.integrations.ai.contracts import StructuredVibeAIOutput

class TestVibeGenerationService(unittest.IsolatedAsyncioTestCase):
    def setUp(self):
        self.service = VibeGenerationService()
        self.request = GenerateVibeRequest(mood=VibeMood.chill, context="Test context")
        
        self.valid_raw_content = """
        {
            "music": [
                {"title": "T1", "creator": "C1", "description": "D1", "format": "F1", "tags": ["T1"]},
                {"title": "T2", "creator": "C2", "description": "D2", "format": "F2", "tags": ["T2"]},
                {"title": "T3", "creator": "C3", "description": "D3", "format": "F3", "tags": ["T3"]}
            ],
            "movie": {"title": "T", "creator": "C", "description": "D", "format": "F", "tags": ["T"]},
            "youtube": {"title": "T", "creator": "C", "description": "D", "format": "F", "tags": ["T"]},
            "pinterest": {"title": "T", "creator": "C", "description": "D", "format": "F", "tags": ["T"]},
            "book": {"title": "T", "creator": "C", "description": "D", "format": "F", "tags": ["T"]}
        }
        """

    @patch("app.services.vibe_generation.settings")
    async def test_ai_disabled_behavior(self, mock_settings):
        # AI-disabled behavior
        mock_settings.AI_ENABLED = False
        with self.assertRaises(AIClientConfigurationError):
            await self.service.generate(self.request)

    @patch("app.services.vibe_generation.settings")
    @patch("app.services.vibe_generation.build_vibe_messages")
    @patch("app.services.vibe_generation.create_groq_client")
    @patch("app.services.vibe_generation.request_structured_vibe_completion")
    @patch("app.services.vibe_generation.parse_structured_vibe_output")
    async def test_successful_end_to_end_service_generation(
        self, mock_parse, mock_completion, mock_get_client, mock_build, mock_settings
    ):
        mock_settings.AI_ENABLED = True
        mock_settings.GROQ_MODEL = "test-model"
        
        mock_messages = [MagicMock()]
        mock_build.return_value = mock_messages
        
        mock_client = AsyncMock()
        mock_get_client.return_value = mock_client
        
        mock_completion.return_value = "mocked_raw"
        
        # We need a real valid parse output to test mapper
        import json
        from app.integrations.ai.contracts import StructuredVibeAIOutput
        parsed_output = StructuredVibeAIOutput.model_validate(json.loads(self.valid_raw_content))
        mock_parse.return_value = parsed_output
        
        result = await self.service.generate(self.request)
        
        # Verify calls
        mock_build.assert_called_once_with(self.request)
        mock_get_client.assert_called_once()
        mock_completion.assert_called_once_with(
            client=mock_client,
            messages=mock_messages,
            model="test-model"
        )
        mock_parse.assert_called_once_with("mocked_raw")
        
        # Verify mapper output
        self.assertIsInstance(result, GeneratedVibeData)
        self.assertEqual(result.mood, "chill")
        self.assertEqual(len(result.sections), 5)
        self.assertEqual(len(result.sections[0].items), 3)
        self.assertEqual(result.sections[0].items[0].title, "T1")
        self.assertEqual(result.sections[0].items[1].title, "T2")
        self.assertEqual(result.sections[0].items[2].title, "T3")

    @patch("app.services.vibe_generation.settings")
    @patch("app.services.vibe_generation.create_groq_client")
    async def test_client_configuration_failure(self, mock_get_client, mock_settings):
        mock_settings.AI_ENABLED = True
        mock_get_client.side_effect = AIClientConfigurationError("Invalid key")
        
        with self.assertRaises(AIClientConfigurationError) as ctx:
            await self.service.generate(self.request)
            
        self.assertNotIn("API_KEY", str(ctx.exception))

    @patch("app.services.vibe_generation.settings")
    @patch("app.services.vibe_generation.create_groq_client")
    @patch("app.services.vibe_generation.request_structured_vibe_completion")
    async def test_completion_failure(self, mock_completion, mock_get_client, mock_settings):
        mock_settings.AI_ENABLED = True
        mock_completion.side_effect = AICompletionError("Completion failed")
        
        with self.assertRaises(AICompletionError) as ctx:
            await self.service.generate(self.request)

    @patch("app.services.vibe_generation.settings")
    @patch("app.services.vibe_generation.create_groq_client")
    @patch("app.services.vibe_generation.request_structured_vibe_completion")
    async def test_empty_provider_response(self, mock_completion, mock_get_client, mock_settings):
        mock_settings.AI_ENABLED = True
        mock_completion.side_effect = AIEmptyResponseError("Empty")
        
        with self.assertRaises(AIEmptyResponseError):
            await self.service.generate(self.request)

    @patch("app.services.vibe_generation.settings")
    @patch("app.services.vibe_generation.create_groq_client")
    @patch("app.services.vibe_generation.request_structured_vibe_completion")
    @patch("app.services.vibe_generation.parse_structured_vibe_output")
    async def test_invalid_json(self, mock_parse, mock_completion, mock_get_client, mock_settings):
        mock_settings.AI_ENABLED = True
        mock_completion.return_value = "raw"
        mock_parse.side_effect = AIResponseParseError("Bad JSON")
        
        with self.assertRaises(AIResponseParseError):
            await self.service.generate(self.request)

    @patch("app.services.vibe_generation.settings")
    @patch("app.services.vibe_generation.create_groq_client")
    @patch("app.services.vibe_generation.request_structured_vibe_completion")
    @patch("app.services.vibe_generation.parse_structured_vibe_output")
    async def test_contract_validation_failure(self, mock_parse, mock_completion, mock_get_client, mock_settings):
        mock_settings.AI_ENABLED = True
        mock_completion.return_value = "raw"
        mock_parse.side_effect = AIResponseValidationError("Missing field")
        
        with self.assertRaises(AIResponseValidationError):
            await self.service.generate(self.request)
