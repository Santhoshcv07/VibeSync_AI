import unittest
from unittest.mock import AsyncMock, MagicMock
from groq import GroqError

from app.integrations.ai.groq_completion import request_structured_vibe_completion
from app.integrations.ai.prompts.vibe import ChatMessage
from app.integrations.ai.exceptions import AICompletionError, AIEmptyResponseError

class TestAICompletionBoundary(unittest.IsolatedAsyncioTestCase):
    async def test_completion_success(self):
        # Task 14 - Completion Success Tests
        mock_client = AsyncMock()
        mock_response = MagicMock()
        mock_choice = MagicMock()
        mock_message = MagicMock()
        
        mock_message.content = '{"music": {"title": "Test"}}'
        mock_choice.message = mock_message
        mock_response.choices = [mock_choice]
        
        mock_client.chat.completions.create.return_value = mock_response
        
        messages = [
            ChatMessage(role="system", content="System instruction"),
            ChatMessage(role="user", content="User instruction")
        ]
        
        result = await request_structured_vibe_completion(
            client=mock_client,
            messages=messages,
            model="test-model",
            timeout_seconds=5.0,
            max_output_tokens=100
        )
        
        # Verify result is string
        self.assertEqual(result, '{"music": {"title": "Test"}}')
        
        # Verify exact call
        mock_client.chat.completions.create.assert_called_once()
        call_kwargs = mock_client.chat.completions.create.call_args.kwargs
        
        self.assertEqual(call_kwargs["model"], "test-model")
        self.assertEqual(call_kwargs["messages"], [
            {"role": "system", "content": "System instruction"},
            {"role": "user", "content": "User instruction"}
        ])
        self.assertEqual(call_kwargs["response_format"], {"type": "json_object"})
        self.assertEqual(call_kwargs["timeout"], 5.0)
        self.assertEqual(call_kwargs["max_tokens"], 100)

    async def test_empty_response_handling(self):
        # Task 15 - Empty-Response Tests
        mock_client = AsyncMock()
        
        messages = [ChatMessage(role="user", content="test")]
        
        # 1. None response
        mock_client.chat.completions.create.return_value = None
        with self.assertRaises(AIEmptyResponseError):
            await request_structured_vibe_completion(client=mock_client, messages=messages, model="test-model")
            
        # 2. Empty choices
        mock_response = MagicMock()
        mock_response.choices = []
        mock_client.chat.completions.create.return_value = mock_response
        with self.assertRaises(AIEmptyResponseError):
            await request_structured_vibe_completion(client=mock_client, messages=messages, model="test-model")
            
        # 3. No message in choice
        mock_response.choices = [MagicMock(message=None)]
        mock_client.chat.completions.create.return_value = mock_response
        with self.assertRaises(AIEmptyResponseError):
            await request_structured_vibe_completion(client=mock_client, messages=messages, model="test-model")
            
        # 4. Null content
        mock_choice = MagicMock()
        mock_choice.message.content = None
        mock_response.choices = [mock_choice]
        mock_client.chat.completions.create.return_value = mock_response
        with self.assertRaises(AIEmptyResponseError):
            await request_structured_vibe_completion(client=mock_client, messages=messages, model="test-model")
            
        # 5. Whitespace content
        mock_choice.message.content = "   \n  "
        mock_response.choices = [mock_choice]
        mock_client.chat.completions.create.return_value = mock_response
        with self.assertRaises(AIEmptyResponseError):
            await request_structured_vibe_completion(client=mock_client, messages=messages, model="test-model")

    async def test_provider_exception_handling(self):
        # Task 16 - Provider-Exception Tests
        mock_client = AsyncMock()
        mock_client.chat.completions.create.side_effect = GroqError("Simulated Groq failure")
        
        messages = [ChatMessage(role="user", content="test")]
        
        with self.assertRaises(AICompletionError) as ctx:
            await request_structured_vibe_completion(client=mock_client, messages=messages, model="test-model")
            
        # Verify safe error message (does NOT contain "Simulated Groq failure")
        self.assertNotIn("Simulated Groq failure", str(ctx.exception))
        self.assertEqual(str(ctx.exception), "The AI provider request failed.")
        
        # Verify exactly one call (no retry)
        mock_client.chat.completions.create.assert_called_once()
