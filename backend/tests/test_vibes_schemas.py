import unittest
from pydantic import ValidationError
from app.schemas.vibe import GenerateVibeRequest, VibeMood, MusicRecommendation, GeneratedVibeData

class TestVibeSchemas(unittest.TestCase):
    def test_generate_request_valid(self):
        req = GenerateVibeRequest(mood=VibeMood.chill)
        self.assertEqual(req.mood, "chill")
        self.assertIsNone(req.context)
        
    def test_generate_request_trim_context(self):
        req = GenerateVibeRequest(mood=VibeMood.happy, context="  Hello world  ")
        self.assertEqual(req.context, "Hello world")
        
    def test_generate_request_empty_context(self):
        req = GenerateVibeRequest(mood=VibeMood.focus, context="   ")
        self.assertIsNone(req.context)

    def test_recommendation_serialization(self):
        rec = MusicRecommendation(
            id="rec-1",
            title="Song",
            creator="Artist",
            description="A song",
            format="track",
            providerLabel="Spotify",
            actionLabel="Listen",
            artworkVariant="aurora",
            tags=["ambient"]
        )
        data = rec.model_dump()
        self.assertEqual(data["category"], "music")
        
    def test_generated_vibe_data_serialization(self):
        vibe = GeneratedVibeData(
            id="vibe-1",
            title="Title",
            mood="chill",
            duration="15-min",
            description="desc",
            intention="intent",
            journeySummary="summary",
            sections=[]
        )
        data = vibe.model_dump()
        self.assertEqual(data["title"], "Title")
