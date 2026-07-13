import unittest
from fastapi.testclient import TestClient
from app.main import app

class TestVibesAPI(unittest.TestCase):
    def setUp(self):
        self.client = TestClient(app)

    from unittest.mock import patch

    @patch("app.api.endpoints.vibes.VibeGenerationService.generate")
    def test_successful_vibe_generation(self, mock_generate):
        mock_generate.return_value = {"id": "123", "title": "Chill Vibe", "mood": "chill", "duration": "", "description": "", "intention": "", "journeySummary": "", "sections": []}
        response = self.client.post("/api/v1/vibes/generate", json={"mood": "chill"})
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["data"]["id"], "123")
        mock_generate.assert_called_once()

    @patch("app.api.endpoints.vibes.VibeGenerationService.generate")
    def test_ai_disabled_returns_503(self, mock_generate):
        from app.core.exceptions import AIClientConfigurationError
        mock_generate.side_effect = AIClientConfigurationError("Disabled")
        response = self.client.post("/api/v1/vibes/generate", json={"mood": "chill"})
        self.assertEqual(response.status_code, 503)
        data = response.json()
        self.assertEqual(data["error"]["code"], "AI_UNAVAILABLE")

    @patch("app.api.endpoints.vibes.VibeGenerationService.generate")
    def test_ai_provider_failure_returns_502(self, mock_generate):
        from app.integrations.ai.exceptions import AICompletionError
        mock_generate.side_effect = AICompletionError("Fail")
        response = self.client.post("/api/v1/vibes/generate", json={"mood": "chill"})
        self.assertEqual(response.status_code, 502)
        data = response.json()
        self.assertEqual(data["error"]["code"], "AI_GENERATION_FAILED")
    def test_validation_missing_mood(self):
        response = self.client.post("/api/v1/vibes/generate", json={})
        self.assertEqual(response.status_code, 422)
        data = response.json()
        self.assertEqual(data["error"]["code"], "VALIDATION_ERROR")
        
    def test_validation_unsupported_mood(self):
        response = self.client.post("/api/v1/vibes/generate", json={"mood": "angry"})
        self.assertEqual(response.status_code, 422)
        data = response.json()
        self.assertEqual(data["error"]["code"], "VALIDATION_ERROR")

    def test_invalid_context_type(self):
        response = self.client.post("/api/v1/vibes/generate", json={"mood": "chill", "context": 123})
        self.assertEqual(response.status_code, 422)

    def test_over_limit_context(self):
        long_context = "a" * 501
        response = self.client.post("/api/v1/vibes/generate", json={"mood": "chill", "context": long_context})
        self.assertEqual(response.status_code, 422)

    def test_malformed_json(self):
        response = self.client.post(
            "/api/v1/vibes/generate", 
            data="not a json", 
            headers={"Content-Type": "application/json"}
        )
        self.assertEqual(response.status_code, 422)

    def test_method_not_allowed(self):
        response = self.client.get("/api/v1/vibes/generate")
        self.assertEqual(response.status_code, 405)
        response = self.client.put("/api/v1/vibes/generate", json={"mood": "chill"})
        self.assertEqual(response.status_code, 405)
        response = self.client.patch("/api/v1/vibes/generate", json={"mood": "chill"})
        self.assertEqual(response.status_code, 405)
        response = self.client.delete("/api/v1/vibes/generate")
        self.assertEqual(response.status_code, 405)

    def test_api_version_boundary(self):
        response = self.client.post("/api/v2/vibes/generate", json={"mood": "chill"})
        self.assertEqual(response.status_code, 404)
        response = self.client.post("/api/vibes/generate", json={"mood": "chill"})
        self.assertEqual(response.status_code, 404)
        response = self.client.post("/vibes/generate", json={"mood": "chill"})
        self.assertEqual(response.status_code, 404)

    def test_health_outside_v1(self):
        response = self.client.get("/health")
        self.assertEqual(response.status_code, 200)
        response = self.client.get("/api/v1/health")
        self.assertEqual(response.status_code, 404)
