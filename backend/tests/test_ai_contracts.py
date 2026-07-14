import unittest
from pydantic import ValidationError
from app.integrations.ai.contracts import StructuredVibeAIOutput, MusicAIRecommendation, MovieAIRecommendation, YouTubeAIRecommendation, PinterestAIRecommendation, BookAIRecommendation
from app.schemas.vibe import (
    GeneratedVibeData, 
    VibeMediaSection, 
    MusicRecommendation, 
    MovieRecommendation,
    YouTubeRecommendation,
    PinterestRecommendation,
    BookRecommendation,
    VibeArtworkVariant,
    VibeMediaCategory
)

class TestAIContracts(unittest.TestCase):
    def setUp(self):
        self.valid_data = {
            "music": [
                {
                    "title": "Ambient Sounds",
                    "creator": "Nature",
                    "description": "Relaxing",
                    "format": "Playlist",
                    "tags": ["ambient"],
                    "duration": "1h"
                },
                {
                    "title": "Chill Beats",
                    "creator": "Artist",
                    "description": "Lo-fi",
                    "format": "Album",
                    "tags": ["lofi"],
                    "duration": "45m"
                },
                {
                    "title": "Peaceful Piano",
                    "creator": "Composer",
                    "description": "Calm",
                    "format": "Track",
                    "tags": ["piano"],
                    "duration": "3m"
                }
            ],
            "movie": {
                "title": "Quiet Place",
                "creator": "Director",
                "description": "Silent",
                "format": "Movie",
                "tags": ["thriller"]
            },
            "youtube": {
                "title": "Study with me",
                "creator": "Student",
                "description": "Focus",
                "format": "Video",
                "tags": ["study", "lofi"]
            },
            "pinterest": [
                {
                    "title": f"Cozy Room {i}",
                    "creator": "Designer",
                    "description": "Inspo",
                    "format": "Board",
                    "tags": ["cozy", "interior"]
                }
                for i in range(1, 7)
            ],
            "book": {
                "title": "Deep Work",
                "creator": "Cal Newport",
                "description": "Focus",
                "format": "Non-fiction",
                "tags": ["productivity"]
            }
        }

    def test_valid_structured_output(self):
        output = StructuredVibeAIOutput(**self.valid_data)
        self.assertEqual(len(output.music), 3)
        self.assertEqual(output.music[0].title, "Ambient Sounds")
        self.assertEqual(output.music[1].title, "Chill Beats")
        self.assertEqual(output.music[2].title, "Peaceful Piano")
        self.assertEqual(len(output.pinterest), 6)
        self.assertEqual(output.pinterest[0].title, "Cozy Room 1")
        self.assertEqual(output.book.creator, "Cal Newport")

    def test_missing_category_rejected(self):
        invalid_data = self.valid_data.copy()
        del invalid_data["music"]
        with self.assertRaises(ValidationError):
            StructuredVibeAIOutput(**invalid_data)

    def test_empty_string_rejected(self):
        invalid_data = self.valid_data.copy()
        invalid_data["music"][0]["title"] = "   "
        with self.assertRaises(ValidationError):
            StructuredVibeAIOutput(**invalid_data)

    def test_music_requires_exactly_3_items(self):
        # Test with less than 3 items
        invalid_data = self.valid_data.copy()
        invalid_data["music"] = invalid_data["music"][:2]
        with self.assertRaises(ValidationError):
            StructuredVibeAIOutput(**invalid_data)
        
        # Test with more than 3 items
        invalid_data = self.valid_data.copy()
        invalid_data["music"].append({
            "title": "Extra Song",
            "creator": "Extra Artist",
            "description": "Extra",
            "format": "Track",
            "tags": ["extra"]
        })
        with self.assertRaises(ValidationError):
            StructuredVibeAIOutput(**invalid_data)

    def test_pinterest_requires_exactly_6_items(self):
        invalid_data = self.valid_data.copy()
        invalid_data["pinterest"] = invalid_data["pinterest"][:5]
        with self.assertRaises(ValidationError):
            StructuredVibeAIOutput(**invalid_data)

        invalid_data = self.valid_data.copy()
        invalid_data["pinterest"] = [
            *invalid_data["pinterest"],
            {
                "title": "Extra Visual",
                "creator": "Designer",
                "description": "Extra",
                "format": "Board",
                "tags": ["extra"]
            }
        ]
        with self.assertRaises(ValidationError):
            StructuredVibeAIOutput(**invalid_data)

    def test_public_compatibility(self):
        # Prove that internal AI output can populate the public GeneratedVibeData contract
        ai_output = StructuredVibeAIOutput(**self.valid_data)
        
        # Test mapping for 3 music items
        music_recs = [
            MusicRecommendation(
                id=f"test-music-id-{i}",
                title=music.title,
                creator=music.creator,
                description=music.description,
                format=music.format,
                providerLabel="Spotify",
                actionLabel="Listen",
                artworkVariant=VibeArtworkVariant.aurora,
                tags=music.tags,
                duration=music.duration
            )
            for i, music in enumerate(ai_output.music)
        ]
        
        movie_rec = MovieRecommendation(
            id="test-movie-id",
            title=ai_output.movie.title,
            creator=ai_output.movie.creator,
            description=ai_output.movie.description,
            format=ai_output.movie.format,
            providerLabel="TMDB",
            actionLabel="View",
            artworkVariant=VibeArtworkVariant.midnight_window,
            tags=ai_output.movie.tags
        )
        
        youtube_rec = YouTubeRecommendation(
            id="test-yt-id",
            title=ai_output.youtube.title,
            creator=ai_output.youtube.creator,
            description=ai_output.youtube.description,
            format=ai_output.youtube.format,
            providerLabel="YouTube",
            actionLabel="Watch",
            artworkVariant=VibeArtworkVariant.soft_motion,
            tags=ai_output.youtube.tags
        )
        
        pinterest_recs = [
            PinterestRecommendation(
                id=f"test-pin-id-{i}",
                title=item.title,
                creator=item.creator,
                description=item.description,
                format=item.format,
                providerLabel="Pinterest",
                actionLabel="Explore",
                artworkVariant=VibeArtworkVariant.paper_moon,
                tags=item.tags
            )
            for i, item in enumerate(ai_output.pinterest)
        ]
        
        book_rec = BookRecommendation(
            id="test-book-id",
            title=ai_output.book.title,
            creator=ai_output.book.creator,
            description=ai_output.book.description,
            format=ai_output.book.format,
            providerLabel="Google Books",
            actionLabel="Read",
            artworkVariant=VibeArtworkVariant.floating_pages,
            tags=ai_output.book.tags
        )
        
        vibe_data = GeneratedVibeData(
            id="test-vibe-id",
            title="A Good Vibe",
            mood="chill",
            duration="15-min",
            description="Generated vibe",
            intention="Relax",
            journeySummary="A relaxing journey",
            sections=[
                VibeMediaSection(
                    id="sec-music",
                    category=VibeMediaCategory.music,
                    eyebrow="Listen",
                    title="Sounds",
                    description="Audio",
                    items=music_recs
                ),
                VibeMediaSection(
                    id="sec-movie",
                    category=VibeMediaCategory.movies_shows,
                    eyebrow="Watch",
                    title="Cinema",
                    description="Video",
                    items=[movie_rec]
                ),
                VibeMediaSection(
                    id="sec-yt",
                    category=VibeMediaCategory.youtube,
                    eyebrow="Stream",
                    title="Clips",
                    description="Online Video",
                    items=[youtube_rec]
                ),
                VibeMediaSection(
                    id="sec-pin",
                    category=VibeMediaCategory.visual_inspiration,
                    eyebrow="Look",
                    title="Images",
                    description="Inspo",
                    items=pinterest_recs
                ),
                VibeMediaSection(
                    id="sec-book",
                    category=VibeMediaCategory.books,
                    eyebrow="Read",
                    title="Pages",
                    description="Text",
                    items=[book_rec]
                )
            ]
        )
        
        # Verify no required fields were lost in translation
        self.assertEqual(len(vibe_data.sections[0].items), 3)
        self.assertEqual(vibe_data.sections[0].items[0].title, "Ambient Sounds")
        self.assertEqual(vibe_data.sections[0].items[1].title, "Chill Beats")
        self.assertEqual(vibe_data.sections[0].items[2].title, "Peaceful Piano")
        self.assertEqual(vibe_data.sections[1].items[0].title, "Quiet Place")
        self.assertEqual(vibe_data.sections[2].items[0].title, "Study with me")
        self.assertEqual(len(vibe_data.sections[3].items), 6)
        self.assertEqual(vibe_data.sections[3].items[0].title, "Cozy Room 1")
        self.assertEqual(vibe_data.sections[4].items[0].title, "Deep Work")
