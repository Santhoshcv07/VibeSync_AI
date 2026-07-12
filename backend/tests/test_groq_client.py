import unittest
from unittest.mock import patch
from app.core.config import Settings
from app.core.exceptions import AIClientConfigurationError
from app.integrations.ai.groq_client import create_groq_client
import pydantic

class TestGroqClientBoundary(unittest.TestCase):
    
    def test_import_does_not_create_client(self):
        import app.integrations.ai.groq_client as gc
        self.assertTrue(hasattr(gc, "create_groq_client"))
        self.assertFalse(hasattr(gc, "client"), "Global client should not exist")
        
    def test_ai_disabled_rejects_construction(self):
        settings = Settings(AI_ENABLED=False)
        with self.assertRaises(AIClientConfigurationError) as context:
            create_groq_client(settings)
        self.assertIn("AI features are currently disabled", str(context.exception))

    def test_missing_api_key_rejects_construction(self):
        # Bypass pydantic validation for testing the function boundary directly
        settings = Settings()
        settings.AI_ENABLED = True
        settings.AI_PROVIDER = "groq"
        settings.GROQ_API_KEY = None
        
        with self.assertRaises(AIClientConfigurationError) as context:
            create_groq_client(settings)
        self.assertIn("Groq API key is missing", str(context.exception))
        
    def test_wrong_provider_rejects_construction(self):
        settings = Settings()
        settings.AI_ENABLED = True
        settings.AI_PROVIDER = "other"
        settings.GROQ_API_KEY = "test-groq-api-key"
        
        with self.assertRaises(AIClientConfigurationError) as context:
            create_groq_client(settings)
        self.assertIn("AI provider must be 'groq'", str(context.exception))

    @patch("app.integrations.ai.groq_client.AsyncGroq")
    def test_valid_settings_create_mocked_client(self, mock_async_groq):
        settings = Settings(
            AI_ENABLED=True, 
            AI_PROVIDER="groq", 
            GROQ_API_KEY="test-groq-api-key", 
            GROQ_MODEL="llama3-8b-8192"
        )
        
        client = create_groq_client(settings)
        
        mock_async_groq.assert_called_once_with(api_key="test-groq-api-key")
        self.assertEqual(client, mock_async_groq.return_value)
        
    def test_secret_isolation_in_exceptions(self):
        settings = Settings()
        settings.AI_ENABLED = True
        settings.AI_PROVIDER = "other"
        settings.GROQ_API_KEY = "test-groq-api-key"
        
        with self.assertRaises(AIClientConfigurationError) as context:
            create_groq_client(settings)
        self.assertNotIn("test-groq-api-key", str(context.exception))

if __name__ == "__main__":
    unittest.main()
