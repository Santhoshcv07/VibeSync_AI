import unittest
import asyncio
from app.main import app
from tests.helpers import asgi_request

# To test validation/exception handlers dynamically, we must trigger them.
# Since we don't have endpoints to naturally trigger validation yet, we can
# invoke the exception handlers manually.
from fastapi.exceptions import RequestValidationError
from app.core.exceptions import setup_exception_handlers
from starlette.requests import Request

class TestErrors(unittest.IsolatedAsyncioTestCase):
    async def test_not_found_behavior(self):
        # A 404 to an unknown route
        response = await asgi_request(app, "GET", "/__vibesync_missing_route__")
        
        self.assertEqual(response["status"], 404)
        json_data = response.get("json", {})
        
        self.assertIn("error", json_data)
        self.assertEqual(json_data["error"]["code"], "NOT_FOUND")
        self.assertEqual(json_data["error"]["message"], "The requested resource was not found.")
        self.assertEqual(json_data["error"]["details"], [])
        self.assertIsNone(json_data["error"].get("request_id"))
        
    async def test_validation_error_normalization(self):
        # Retrieve the registered handler
        handler = app.exception_handlers.get(RequestValidationError)
        self.assertIsNotNone(handler)
        
        # Synthetic RequestValidationError
        errors = [{
            "loc": ("body", "user", "age"),
            "msg": "Input should be greater than 0",
            "type": "greater_than"
        }]
        exc = RequestValidationError(errors=errors)
        scope = {"type": "http", "method": "POST", "path": "/fake"}
        req = Request(scope)
        
        # Call handler
        response = await handler(req, exc)
        self.assertEqual(response.status_code, 422)
        
        import json
        body = json.loads(response.body.decode("utf-8"))
        self.assertEqual(body["error"]["code"], "VALIDATION_ERROR")
        self.assertEqual(body["error"]["details"][0]["field"], "user.age")
        self.assertEqual(body["error"]["details"][0]["message"], "Input should be greater than 0")

    async def test_unexpected_error_fallback(self):
        handler = app.exception_handlers.get(Exception)
        self.assertIsNotNone(handler)
        
        exc = ValueError("A deep internal crash with secrets")
        scope = {"type": "http", "method": "GET", "path": "/fake"}
        req = Request(scope)
        
        # We temporarily mock traceback to avoid cluttering test output, 
        # but the handler logic remains exactly the same.
        import traceback
        with unittest.mock.patch('traceback.print_exc'):
            response = await handler(req, exc)
            
        self.assertEqual(response.status_code, 500)
        import json
        body = json.loads(response.body.decode("utf-8"))
        self.assertEqual(body["error"]["code"], "INTERNAL_SERVER_ERROR")
        # Ensure secret message is not leaked to client
        self.assertNotIn("secrets", body["error"]["message"])

if __name__ == "__main__":
    unittest.main()
