import uuid
from app.schemas.vibe import (
    GenerateVibeRequest, 
    GeneratedVibeData, 
    VibeMediaSection, 
    VibeMediaCategory,
    MusicRecommendation,
    MovieRecommendation,
    YouTubeRecommendation,
    PinterestRecommendation,
    BookRecommendation,
    VibeArtworkVariant
)
from app.core.exceptions import VibeGenerationNotImplementedError, AIClientConfigurationError
from app.core.config import settings
from app.integrations.ai.contracts import StructuredVibeAIOutput
from app.integrations.ai.prompts.vibe import build_vibe_messages
from app.integrations.ai.groq_client import create_groq_client
from app.integrations.ai.groq_completion import request_structured_vibe_completion
from app.integrations.ai.parser import parse_structured_vibe_output
from app.integrations.enrichment import (
    enrich_music, enrich_movie, enrich_youtube_section, enrich_visual, enrich_book
)
import asyncio

def map_ai_output_to_vibe_data(request: GenerateVibeRequest, ai_output: StructuredVibeAIOutput) -> GeneratedVibeData:
    """Pure mapper to convert internal AI output to public GeneratedVibeData."""
    vibe_id = str(uuid.uuid4())
    
    # Music
    music_items = [
        MusicRecommendation(
            id=str(uuid.uuid4()),
            title=music.title,
            creator=music.creator,
            description=music.description,
            format=music.format,
            providerLabel="Spotify",
            actionLabel="Listen on Spotify",
            artworkVariant=VibeArtworkVariant.aurora,
            tags=music.tags,
            duration=music.duration
        )
        for music in ai_output.music
    ]
    music_section = VibeMediaSection(
        id=str(uuid.uuid4()),
        category=VibeMediaCategory.music,
        eyebrow="Set the tone",
        title="Music to match your mood",
        description="A handpicked soundscape for this exact moment.",
        items=music_items
    )

    # Movie
    movie_item = MovieRecommendation(
        id=str(uuid.uuid4()),
        title=ai_output.movie.title,
        creator=ai_output.movie.creator,
        description=ai_output.movie.description,
        format=ai_output.movie.format,
        providerLabel="JustWatch",
        actionLabel="Find where to watch",
        artworkVariant=VibeArtworkVariant.midnight_window,
        tags=ai_output.movie.tags,
        duration=ai_output.movie.duration
    )
    movie_section = VibeMediaSection(
        id=str(uuid.uuid4()),
        category=VibeMediaCategory.movies_shows,
        eyebrow="Watch something",
        title="Screen time",
        description="Visual storytelling that resonates with your current state.",
        items=[movie_item]
    )

    # YouTube
    youtube_item = YouTubeRecommendation(
        id=str(uuid.uuid4()),
        title=ai_output.youtube.title,
        creator=ai_output.youtube.creator,
        description=ai_output.youtube.description,
        format=ai_output.youtube.format,
        providerLabel="YouTube",
        actionLabel="Watch on YouTube",
        artworkVariant=VibeArtworkVariant.soft_motion,
        tags=ai_output.youtube.tags,
        duration=ai_output.youtube.duration
    )
    youtube_section = VibeMediaSection(
        id=str(uuid.uuid4()),
        category=VibeMediaCategory.youtube,
        eyebrow="Learn or chill",
        title="Video content",
        description="Shorter format content to keep the vibe going.",
        items=[youtube_item]
    )
    # Pinterest
    pinterest_items = [
        PinterestRecommendation(
            id=str(uuid.uuid4()),
            title=item.title,
            creator=item.creator,
            description=item.description,
            format=item.format,
            providerLabel="Pinterest",
            actionLabel="View Moodboard",
            artworkVariant=VibeArtworkVariant.violet_room,
            tags=item.tags,
            duration=item.duration
        )
        for item in ai_output.pinterest
    ]

    pinterest_section = VibeMediaSection(
        id=str(uuid.uuid4()),
        category=VibeMediaCategory.visual_inspiration,
        eyebrow="Aesthetics",
        title="Visual Inspiration",
        description="Images and colors to complete the atmosphere.",
        items=pinterest_items
    )

        # Books
    book_items = [
            BookRecommendation(
                id=str(uuid.uuid4()),
                title=book.title,
                creator=book.creator,
                description=book.description,
                format=book.format,
                providerLabel="Google Books",
                actionLabel="View Book",
                artworkVariant=VibeArtworkVariant.floating_pages,
                tags=book.tags,
                duration=book.duration,
            )
            for book in ai_output.books
        ]

    book_section = VibeMediaSection(
            id=str(uuid.uuid4()),
            category=VibeMediaCategory.books,
            eyebrow="Deep focus",
            title="Reading material",
            description="Three books selected for your current vibe.",
            items=book_items,
        )
    return GeneratedVibeData(
        id=vibe_id,
        title=f"Your {request.mood.value.capitalize()} Vibe",
        mood=request.mood.value,
        duration="Curated for you",
        description=f"A personalized {request.mood.value} experience based on your current context.",
        intention="To elevate your current state and provide meaningful entertainment.",
        journeySummary="We selected music to set the tone, visual inspiration to match the aesthetic, and longer-form entertainment for deep immersion.",
        sections=[
            music_section,
            movie_section,
            youtube_section,
            pinterest_section,
            book_section
        ]
    )


class VibeGenerationService:
    async def generate(self, request: GenerateVibeRequest) -> GeneratedVibeData:
        if not settings.GROQ_API_KEY:
            raise AIClientConfigurationError("GROQ_API_KEY environment variable is missing.")
            
        messages = build_vibe_messages(request)
        
        # Use a copy of settings with AI_ENABLED set to True so we don't mutate global state
        client_settings = settings.model_copy(update={"AI_ENABLED": True})
        
        # Lazy initialization
        client = create_groq_client(client_settings)
        
        raw_content = await request_structured_vibe_completion(
            client=client,
            messages=messages,
            model=settings.GROQ_MODEL
        )
        
        parsed_output = parse_structured_vibe_output(raw_content)
        
        vibe_data = map_ai_output_to_vibe_data(request, parsed_output)
        
        enrich_tasks = []
        for section in vibe_data.sections:
            if section.category == VibeMediaCategory.youtube:
                enrich_tasks.append(enrich_youtube_section(section, request))
            else:
                for item in section.items:
                    if item.category == VibeMediaCategory.music:
                        enrich_tasks.append(enrich_music(item))
                    elif item.category == VibeMediaCategory.movies_shows:
                        enrich_tasks.append(enrich_movie(item))
                    elif item.category == VibeMediaCategory.visual_inspiration:
                        enrich_tasks.append(enrich_visual(item))
                    elif item.category == VibeMediaCategory.books:
                        enrich_tasks.append(enrich_book(item))
                    
        if enrich_tasks:
            await asyncio.gather(*enrich_tasks)
            
        return vibe_data
