import os
import unittest
from unittest.mock import patch
from pydantic import ValidationError
from app.core.config import Settings

class TestAIConfiguration(unittest.TestCase):
    def test_default_config(self):
        # By default, AI should be disabled, no API key needed
        settings = Settings()
        self.assertFalse(settings.AI_ENABLED)
        self.assertEqual(settings.AI_PROVIDER, "groq")
        self.assertIsNone(settings.GROQ_API_KEY)

    @patch.dict(os.environ, {"AI_ENABLED": "false", "GROQ_API_KEY": ""}, clear=True)
    def test_ai_disabled_missing_key(self):
        settings = Settings()
        self.assertFalse(settings.AI_ENABLED)
        self.assertIsNone(settings.GROQ_API_KEY)

    @patch.dict(os.environ, {"AI_ENABLED": "true"}, clear=True)
    def test_ai_enabled_missing_key_fails(self):
        with self.assertRaises(ValidationError) as context:
            Settings()
        
        err_msg = str(context.exception)
        self.assertIn("GROQ_API_KEY must be provided when AI_ENABLED is true", err_msg)
        # Ensure we don't expose any real keys in the error (there are none here, but this verifies the error msg structure)

    @patch.dict(os.environ, {"AI_ENABLED": "true", "GROQ_API_KEY": "   "}, clear=True)
    def test_ai_enabled_whitespace_key_fails(self):
        with self.assertRaises(ValidationError) as context:
            Settings()
        
        err_msg = str(context.exception)
        self.assertIn("GROQ_API_KEY must be provided when AI_ENABLED is true", err_msg)

    @patch.dict(os.environ, {"AI_ENABLED": "true", "GROQ_API_KEY": "test-groq-api-key", "GROQ_MODEL": "llama3-8b-8192"}, clear=True)
    def test_placeholder_config(self):
        settings = Settings()
        self.assertTrue(settings.AI_ENABLED)
        self.assertEqual(settings.AI_PROVIDER, "groq")
        self.assertIsNotNone(settings.GROQ_API_KEY)
        self.assertEqual(settings.GROQ_API_KEY.get_secret_value(), "test-groq-api-key")
        self.assertEqual(settings.GROQ_MODEL, "llama3-8b-8192")

    @patch.dict(os.environ, {"AI_ENABLED": "true", "GROQ_API_KEY": "test-groq-api-key", "AI_PROVIDER": "unsupported"}, clear=True)
    def test_unsupported_provider_rejected(self):
        with self.assertRaises(ValidationError):
            Settings()

    @patch.dict(os.environ, {"AI_ENABLED": "true", "GROQ_API_KEY": "test-groq-api-key", "GROQ_MODEL": "   "}, clear=True)
    def test_empty_model_rejected(self):
        with self.assertRaises(ValidationError) as context:
            Settings()
        
        err_msg = str(context.exception)
        self.assertIn("GROQ_MODEL must be provided when AI_ENABLED is true", err_msg)

    @patch.dict(os.environ, {"AI_ENABLED": "true", "GROQ_API_KEY": "test-groq-api-key"}, clear=True)
    def test_secret_redaction(self):
        settings = Settings()
        # The secret string representation should not contain the actual value
        rep = str(settings.GROQ_API_KEY)
        self.assertNotIn("test-groq-api-key", rep)
        self.assertEqual(rep, "**********")

