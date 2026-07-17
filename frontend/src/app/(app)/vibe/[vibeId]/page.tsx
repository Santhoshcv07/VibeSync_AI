import { AppPageContainer } from "@/components/app/app-page-container";
import { 
  demoVibeExperience, 
  VibeGenericState,
  VibeExperienceClient,
  VibeExperienceData,
  VibeMediaSectionData
} from "@/components/vibe";
import { fetchVibeByIdAction } from "@/app/actions/vibes";

function transformVibeData(backendData: any): VibeExperienceData {
  const sections: VibeMediaSectionData[] = [];
  
  if (backendData.media?.music?.length) {
    sections.push({
      id: "music-section",
      category: "music",
      eyebrow: "01 · LISTEN",
      title: "Soundtrack the moment",
      description: "Music selected to match your requested mood and energy.",
      items: backendData.media.music.map((m: any) => ({
        ...m,
        actionLabel: "Open Music",
        providerLabel: "Spotify / Apple Music",
        artworkVariant: "aurora",
        format: "Song",
        tags: ["Music", "Track"]
      }))
    });
  }

  if (backendData.media?.movies?.length) {
    sections.push({
      id: "movies-shows-section",
      category: "movies-shows",
      eyebrow: "02 · WATCH",
      title: "Cinematic Atmosphere",
      description: "Movies that resonate with your current vibe.",
      items: backendData.media.movies.map((m: any) => ({
        ...m,
        actionLabel: "Open Movie",
        providerLabel: "Watch",
        artworkVariant: "quiet-frames",
        format: "Movie",
        tags: ["Movie", m.year?.toString() || ""]
      }))
    });
  }

  if (backendData.media?.youtube?.length) {
    sections.push({
      id: "youtube-section",
      category: "youtube",
      eyebrow: "03 · DISCOVER",
      title: "Engaging Content",
      description: "Videos related to your vibe.",
      items: backendData.media.youtube.map((m: any) => ({
        ...m,
        actionLabel: "Watch Video",
        providerLabel: "YouTube",
        artworkVariant: "blue-hour",
        format: "Video",
        tags: ["Video"]
      }))
    });
  }

  if (backendData.media?.visuals?.length) {
    sections.push({
      id: "visual-inspiration-section",
      category: "visual-inspiration",
      eyebrow: "04 · EXPLORE",
      title: "Visual Moodboard",
      description: "Aesthetics to inspire your space.",
      items: backendData.media.visuals.map((m: any) => ({
        ...m,
        actionLabel: "View Image",
        providerLabel: "Pinterest",
        artworkVariant: "midnight-window",
        format: "Image",
        tags: ["Visual"]
      }))
    });
  }

  if (backendData.media?.books?.length) {
    sections.push({
      id: "books-section",
      category: "books",
      eyebrow: "05 · READ",
      title: "Reflective Reading",
      description: "Books chosen for this energy level.",
      items: backendData.media.books.map((m: any) => ({
        ...m,
        actionLabel: "Read More",
        providerLabel: "Google Books",
        artworkVariant: "paper-moon",
        format: "Book",
        tags: ["Book", "Read"]
      }))
    });
  }

  return {
    id: backendData.id,
    title: backendData.title,
    mood: backendData.mood,
    duration: backendData.duration,
    description: backendData.description,
    intention: backendData.intention,
    journeySummary: backendData.narrative,
    sections: sections
  };
}

export default async function VibeDetailPage({
  params,
}: {
  params: Promise<{ vibeId: string }>;
}) {
  const { vibeId } = await params;

  if (vibeId === "demo-vibe") {
    return (
      <AppPageContainer>
        <VibeExperienceClient experience={demoVibeExperience} />
      </AppPageContainer>
    );
  }

  const backendVibe = await fetchVibeByIdAction(vibeId);

  if (!backendVibe) {
    return (
      <AppPageContainer>
        <VibeGenericState vibeId={vibeId} />
      </AppPageContainer>
    );
  }

  const experienceData = transformVibeData(backendVibe);

  return (
    <AppPageContainer>
      <VibeExperienceClient experience={experienceData} />
    </AppPageContainer>
  );
}
