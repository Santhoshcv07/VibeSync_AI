import unittest
import asyncio
from app.main import app
from app.core.config import settings
from tests.helpers import asgi_request

class TestHealth(unittest.IsolatedAsyncioTestCase):
    async def test_health_endpoint_contract(self):
        response = await asgi_request(app, "GET", "/health")
        
        self.assertEqual(response["status"], 200)
        self.assertEqual(response["headers"].get("content-type"), "application/json")
        
        json_data = response.get("json", {})
        self.assertIn("status", json_data)
        self.assertIn("service", json_data)
        self.assertIn("version", json_data)
        
        self.assertEqual(json_data["status"], "ok")
        self.assertEqual(json_data["service"], "vibesync-api")
        self.assertEqual(json_data["version"], settings.VERSION)
        
        # Verify no extra fields exist
        self.assertEqual(len(json_data.keys()), 3)

    async def test_health_stability(self):
        # Multiple requests return exactly the same
        r1 = await asgi_request(app, "GET", "/health")
        r2 = await asgi_request(app, "GET", "/health")
        
        self.assertEqual(r1["json"], r2["json"])

if __name__ == "__main__":
    unittest.main()
