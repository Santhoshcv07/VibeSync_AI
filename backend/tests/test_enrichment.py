import unittest
from unittest.mock import AsyncMock, patch, MagicMock
import uuid

from app.integrations.enrichment import enrich_music
from app.schemas.vibe import MusicRecommendation, VibeArtworkVariant


class TestITunesEnrichment(unittest.IsolatedAsyncioTestCase):
    def setUp(self):
        self.music_item = MusicRecommendation(
            id=str(uuid.uuid4()),
            title="Blinding Lights",
            creator="The Weeknd",
            description="A synth-pop song",
            format="Song",
            providerLabel="Spotify",
            actionLabel="Listen on Spotify",
            artworkVariant=VibeArtworkVariant.aurora,
            tags=["pop", "synth"],
            duration="3:20"
        )

    @patch("app.integrations.enrichment.httpx.AsyncClient")
    async def test_itunes_enrichment_success(self, mock_client_class):
        mock_client = AsyncMock()
        mock_client_class.return_value.__aenter__.return_value = mock_client
        
        # Mock iTunes API response
        mock_response = MagicMock()
        mock_response.raise_for_status = MagicMock()
        mock_response.json.return_value = {
            "results": [
                {
                    "artworkUrl100": "https://example.com/100x100bb.jpg",
                    "trackName": "Blinding Lights",
                    "artistName": "The Weeknd"
                }
            ]
        }
        mock_client.get.return_value = mock_response
        
        result = await enrich_music(self.music_item)
        
        # Verify imageUrl is set with upgraded resolution
        self.assertEqual(result.imageUrl, "https://example.com/600x600bb.jpg")
        
        # Verify destinationUrl is Spotify search URL
        self.assertIn("open.spotify.com/search", result.destinationUrl)
        self.assertIn("Blinding%20Lights", result.destinationUrl)
        self.assertIn("The%20Weeknd", result.destinationUrl)
        
        # Verify API was called with correct params
        mock_client.get.assert_called_once()
        call_args = mock_client.get.call_args
        self.assertEqual(call_args[0][0], "https://itunes.apple.com/search")
        self.assertEqual(call_args[1]["params"]["media"], "music")
        self.assertEqual(call_args[1]["params"]["entity"], "song")
        self.assertEqual(call_args[1]["params"]["limit"], 5)
        self.assertIn("Blinding Lights", call_args[1]["params"]["term"])

    @patch("app.integrations.enrichment.httpx.AsyncClient")
    async def test_itunes_enrichment_no_results(self, mock_client_class):
        mock_client = AsyncMock()
        mock_client_class.return_value.__aenter__.return_value = mock_client
        
        # Mock empty response
        mock_response = MagicMock()
        mock_response.raise_for_status = MagicMock()
        mock_response.json.return_value = {"results": []}
        mock_client.get.return_value = mock_response
        
        result = await enrich_music(self.music_item)
        
        # Verify item is returned unchanged
        self.assertIsNone(result.imageUrl)
        self.assertIsNone(result.destinationUrl)

    @patch("app.integrations.enrichment.httpx.AsyncClient")
    async def test_itunes_enrichment_api_failure(self, mock_client_class):
        mock_client = AsyncMock()
        mock_client_class.return_value.__aenter__.return_value = mock_client
        
        # Mock API failure
        mock_client.get.side_effect = Exception("Network error")
        
        result = await enrich_music(self.music_item)
        
        # Verify item is returned unchanged on error
        self.assertIsNone(result.imageUrl)
        self.assertIsNone(result.destinationUrl)

    @patch("app.integrations.enrichment.httpx.AsyncClient")
    async def test_itunes_enrichment_missing_artwork(self, mock_client_class):
        mock_client = AsyncMock()
        mock_client_class.return_value.__aenter__.return_value = mock_client
        
        # Mock response without artworkUrl100
        mock_response = MagicMock()
        mock_response.raise_for_status = MagicMock()
        mock_response.json.return_value = {
            "results": [
                {
                    "trackName": "Blinding Lights",
                    "artistName": "The Weeknd"
                }
            ]
        }
        mock_client.get.return_value = mock_response
        
        result = await enrich_music(self.music_item)
        
        # Verify imageUrl is not set but destinationUrl is
        self.assertIsNone(result.imageUrl)
        self.assertIn("open.spotify.com/search", result.destinationUrl)

    @patch("app.integrations.enrichment.httpx.AsyncClient")
    async def test_itunes_enrichment_url_encoding(self, mock_client_class):
        mock_client = AsyncMock()
        mock_client_class.return_value.__aenter__.return_value = mock_client
        
        # Test with special characters
        special_item = MusicRecommendation(
            id=str(uuid.uuid4()),
            title="C'est La Vie",
            creator="B*Witched",
            description="A pop song",
            format="Song",
            providerLabel="Spotify",
            actionLabel="Listen on Spotify",
            artworkVariant=VibeArtworkVariant.aurora,
            tags=["pop"],
            duration="3:00"
        )
        
        mock_response = MagicMock()
        mock_response.raise_for_status = MagicMock()
        mock_response.json.return_value = {
            "results": [
                {
                    "artworkUrl100": "https://example.com/100x100bb.jpg"
                }
            ]
        }
        mock_client.get.return_value = mock_response
        
        result = await enrich_music(special_item)
        
        # Verify special characters are URL-encoded in destinationUrl
        self.assertIn("C%27est%20La%20Vie", result.destinationUrl)
        self.assertIn("B%2AWitched", result.destinationUrl)


if __name__ == "__main__":
    unittest.main()
