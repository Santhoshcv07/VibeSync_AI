import unittest
from app.schemas.core import SuccessResponse, APIErrorResponse, APIError, ErrorDetail
from pydantic import ValidationError

class TestContracts(unittest.TestCase):
    def test_success_contract_with_data(self):
        # Data is required, meta is optional
        resp = SuccessResponse[dict](data={"user_id": "123"})
        self.assertEqual(resp.data, {"user_id": "123"})
        self.assertIsNone(resp.meta)
        
    def test_success_contract_with_meta(self):
        resp = SuccessResponse[list](data=[1, 2], meta={"page": 1})
        self.assertEqual(resp.data, [1, 2])
        self.assertEqual(resp.meta, {"page": 1})

    def test_error_contract_valid(self):
        err = APIError(
            code="VALIDATION_ERROR",
            message="Invalid request",
            details=[ErrorDetail(field="username", message="Required")]
        )
        resp = APIErrorResponse(error=err)
        dump = resp.model_dump()
        self.assertEqual(dump["error"]["code"], "VALIDATION_ERROR")
        self.assertEqual(dump["error"]["message"], "Invalid request")
        self.assertEqual(len(dump["error"]["details"]), 1)
        self.assertEqual(dump["error"]["details"][0]["field"], "username")
        self.assertIsNone(dump["error"]["request_id"])

    def test_error_contract_empty_details(self):
        err = APIError(
            code="INTERNAL_SERVER_ERROR",
            message="Server crashed"
        )
        resp = APIErrorResponse(error=err)
        dump = resp.model_dump()
        self.assertEqual(dump["error"]["code"], "INTERNAL_SERVER_ERROR")
        self.assertEqual(dump["error"]["details"], [])
        
    def test_error_contract_requires_code_and_message(self):
        with self.assertRaises(ValidationError):
            APIError(message="Missing code")
        
        with self.assertRaises(ValidationError):
            APIError(code="MISSING_MESSAGE")
            
    def test_error_contract_no_raw_exception(self):
        with self.assertRaises(ValidationError):
            # APIError expects specific string types, not a raw Exception object
            APIError(code="ERROR", message=Exception("Secret traceback leak"))

if __name__ == "__main__":
    unittest.main()
