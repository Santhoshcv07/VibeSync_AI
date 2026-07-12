import unittest
import asyncio
import os
from unittest.mock import patch
from app.main import app
from app.core.config import Settings
from tests.helpers import asgi_request

class TestCORS(unittest.IsolatedAsyncioTestCase):
    async def test_cors_configured_origin(self):
        # We know app is configured with some settings. 
        # By default in tests (no env vars), CORS_ORIGINS is empty, meaning CORS is disabled.
        # However, to test CORS middleware, we must ensure the app was initialized with it.
        # But app initialization happens at import time in main.py.
        # To truly test CORS behavior, we should create a fresh app instance with test origins.
        
        from fastapi import FastAPI
        from fastapi.middleware.cors import CORSMiddleware
        from app.api.router import api_router
        from app.core.exceptions import setup_exception_handlers
        
        test_app = FastAPI()
        test_app.add_middleware(
            CORSMiddleware,
            allow_origins=["http://localhost:3000"],
            allow_credentials=False,
            allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
            allow_headers=["Content-Type", "Accept"],
        )
        test_app.include_router(api_router)
        setup_exception_handlers(test_app)
        
        # Test preflight with configured origin
        resp = await asgi_request(
            test_app, 
            "OPTIONS", 
            "/health", 
            headers={
                "Origin": "http://localhost:3000",
                "Access-Control-Request-Method": "GET"
            }
        )
        
        self.assertEqual(resp["status"], 200)
        self.assertEqual(resp["headers"].get("access-control-allow-origin"), "http://localhost:3000")
        
    async def test_cors_disallowed_origin(self):
        from fastapi import FastAPI
        from fastapi.middleware.cors import CORSMiddleware
        from app.api.router import api_router
        
        test_app = FastAPI()
        test_app.add_middleware(
            CORSMiddleware,
            allow_origins=["http://localhost:3000"],
            allow_credentials=False,
            allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
            allow_headers=["Content-Type", "Accept"],
        )
        test_app.include_router(api_router)
        
        # Test preflight with disallowed origin
        resp = await asgi_request(
            test_app, 
            "OPTIONS", 
            "/health", 
            headers={
                "Origin": "https://untrusted.example",
                "Access-Control-Request-Method": "GET"
            }
        )
        
        self.assertEqual(resp["status"], 400)
        self.assertNotIn("access-control-allow-origin", resp["headers"])
        
    async def test_cors_edge_cases(self):
        from fastapi import FastAPI
        from fastapi.middleware.cors import CORSMiddleware
        
        test_app = FastAPI()
        test_app.add_middleware(
            CORSMiddleware,
            allow_origins=["http://localhost:3000"],
            allow_credentials=False,
            allow_methods=["GET", "OPTIONS"],
            allow_headers=["*"],
        )
        
        edge_origins = [
            "http://localhost:3000/path",
            "http://localhost:3000?query=1",
            "https://localhost:3000",
            "http://localhost:3001"
        ]
        
        for bad_origin in edge_origins:
            resp = await asgi_request(
                test_app, 
                "OPTIONS", 
                "/", 
                headers={
                    "Origin": bad_origin,
                    "Access-Control-Request-Method": "GET"
                }
            )
            self.assertEqual(resp["status"], 400)
            self.assertNotIn("access-control-allow-origin", resp["headers"])

if __name__ == "__main__":
    unittest.main()
