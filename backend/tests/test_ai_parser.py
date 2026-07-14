import unittest
from unittest.mock import AsyncMock, MagicMock

from app.integrations.ai.parser import parse_structured_vibe_output
from app.integrations.ai.exceptions import AIResponseParseError, AIResponseValidationError
from app.integrations.ai.contracts import StructuredVibeAIOutput
from app.integrations.ai.groq_completion import request_structured_vibe_completion
from app.integrations.ai.prompts.vibe import build_vibe_messages
from app.schemas.vibe import GenerateVibeRequest

class TestAIParserBoundary(unittest.TestCase):
    def setUp(self):
        self.valid_json = """
        {
            "music": [
                {
                    "title": "Song 1",
                    "creator": "Artist 1",
                    "description": "Desc",
                    "format": "Track",
                    "tags": ["pop"]
                },
                {
                    "title": "Song 2",
                    "creator": "Artist 2",
                    "description": "Desc",
                    "format": "Track",
                    "tags": ["pop"]
                },
                {
                    "title": "Song 3",
                    "creator": "Artist 3",
                    "description": "Desc",
                    "format": "Track",
                    "tags": ["pop"]
                }
            ],
            "movie": {
                "title": "Movie 1",
                "creator": "Director 1",
                "description": "Desc",
                "format": "Film",
                "tags": ["drama"]
            },
            "youtube": {
                "title": "Vid 1",
                "creator": "Channel 1",
                "description": "Desc",
                "format": "Video",
                "tags": ["vlog"]
            },
            "pinterest": [
                {"title": "Board 1", "creator": "Creator 1", "description": "Desc", "format": "Board", "tags": ["art"]},
                {"title": "Board 2", "creator": "Creator 2", "description": "Desc", "format": "Board", "tags": ["art"]},
                {"title": "Board 3", "creator": "Creator 3", "description": "Desc", "format": "Board", "tags": ["art"]},
                {"title": "Board 4", "creator": "Creator 4", "description": "Desc", "format": "Board", "tags": ["art"]},
                {"title": "Board 5", "creator": "Creator 5", "description": "Desc", "format": "Board", "tags": ["art"]},
                {"title": "Board 6", "creator": "Creator 6", "description": "Desc", "format": "Board", "tags": ["art"]}
            ],
            "book": {
                "title": "Book 1",
                "creator": "Author 1",
                "description": "Desc",
                "format": "Novel",
                "tags": ["fiction"]
            }
        }
        """

    def test_parser_success(self):
        # Task 17 - Parser Success Tests
        result = parse_structured_vibe_output(self.valid_json)
        self.assertIsInstance(result, StructuredVibeAIOutput)
        self.assertEqual(len(result.music), 3)
        self.assertEqual(result.music[0].title, "Song 1")
        self.assertEqual(result.movie.title, "Movie 1")
        self.assertEqual(result.youtube.title, "Vid 1")
        self.assertEqual(len(result.pinterest), 6)
        self.assertEqual(result.pinterest[0].title, "Board 1")
        self.assertEqual(result.book.title, "Book 1")

    def test_parser_invalid_json(self):
        # Task 18 - Parser Invalid-JSON Tests
        invalid_inputs = [
            "not json",
            '{"music":',
            'Here is your JSON: {"music": {}}',
            '```json\n{"music": {}}\n```'
        ]
        
        for content in invalid_inputs:
            with self.assertRaises(AIResponseParseError) as ctx:
                parse_structured_vibe_output(content)
            # Ensure raw content is NOT leaked
            self.assertNotIn("music", str(ctx.exception))
            self.assertNotIn("json", str(ctx.exception).lower().replace("json response", ""))

    def test_parser_contract_validation(self):
        # Task 19 - Parser Contract-Validation Tests
        invalid_contracts = [
            "{}", # Missing categories
            '{"music": {}}', # Missing other categories and fields
            # Valid root but missing nested required field
            self.valid_json.replace('"title": "Song 1",', ''),
            # Valid root but whitespace required string
            self.valid_json.replace('"Song 1"', '"   "')
        ]
        
        for content in invalid_contracts:
            with self.assertRaises(AIResponseValidationError) as ctx:
                parse_structured_vibe_output(content)
            # Ensure safe structure info without dumping raw json
            self.assertNotIn("{", str(ctx.exception))
            self.assertNotIn("Song 1", str(ctx.exception))

class TestAIEndToEndMocked(unittest.IsolatedAsyncioTestCase):
    async def test_end_to_end_isolated(self):
        # Task 20 - End-to-End Isolated Mocked Boundary Test
        
        # 1. Existing validated request
        request = GenerateVibeRequest(mood="chill", duration=30)
        
        # 2. Existing prompt builder -> messages
        messages = build_vibe_messages(request)
        
        # 3. Mocked completion function
        mock_client = AsyncMock()
        mock_response = MagicMock()
        mock_choice = MagicMock()
        mock_choice.message.content = """
        {
            "music": [
                {"title": "T1", "creator": "C", "description": "D", "format": "F", "tags": ["T"]},
                {"title": "T2", "creator": "C", "description": "D", "format": "F", "tags": ["T"]},
                {"title": "T3", "creator": "C", "description": "D", "format": "F", "tags": ["T"]}
            ],
            "movie": {"title": "T", "creator": "C", "description": "D", "format": "F", "tags": ["T"]},
            "youtube": {"title": "T", "creator": "C", "description": "D", "format": "F", "tags": ["T"]},
            "pinterest": [
                {"title": "P1", "creator": "C", "description": "D", "format": "F", "tags": ["T"]},
                {"title": "P2", "creator": "C", "description": "D", "format": "F", "tags": ["T"]},
                {"title": "P3", "creator": "C", "description": "D", "format": "F", "tags": ["T"]},
                {"title": "P4", "creator": "C", "description": "D", "format": "F", "tags": ["T"]},
                {"title": "P5", "creator": "C", "description": "D", "format": "F", "tags": ["T"]},
                {"title": "P6", "creator": "C", "description": "D", "format": "F", "tags": ["T"]}
            ],
            "book": {"title": "T", "creator": "C", "description": "D", "format": "F", "tags": ["T"]}
        }
        """
        mock_response.choices = [mock_choice]
        mock_client.chat.completions.create.return_value = mock_response
        
        raw_content = await request_structured_vibe_completion(
            client=mock_client,
            messages=messages,
            model="test-model"
        )
        
        # 4. Strict parser
        result = parse_structured_vibe_output(raw_content)
        
        # Verify exactly one mocked call
        mock_client.chat.completions.create.assert_called_once()
        self.assertEqual(mock_client.chat.completions.create.call_args.kwargs["model"], "test-model")
        
        # Verify valid internal output
        self.assertIsInstance(result, StructuredVibeAIOutput)
        self.assertEqual(result.music[0].title, "T1")
        self.assertEqual(len(result.pinterest), 6)
