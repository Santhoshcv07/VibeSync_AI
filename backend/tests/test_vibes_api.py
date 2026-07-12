import unittest
from fastapi.testclient import TestClient
from app.main import app

class TestVibesAPI(unittest.TestCase):
    def setUp(self):
        self.client = TestClient(app)

    def test_generate_vibe_not_implemented(self):
        response = self.client.post("/api/v1/vibes/generate", json={"mood": "chill"})
        self.assertEqual(response.status_code, 501)
        data = response.json()
        self.assertIn("error", data)
        self.assertEqual(data["error"]["code"], "NOT_IMPLEMENTED")
        self.assertEqual(data["error"]["message"], "Vibe generation is not available yet.")
        
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
