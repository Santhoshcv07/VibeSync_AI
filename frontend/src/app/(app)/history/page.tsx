import { AppPageContainer } from "@/components/app/app-page-container";
import { AppPageHeader } from "@/components/app/app-page-header";
import { VibeHistoryTimeline } from "@/components/history";
import { fetchVibeHistoryAction } from "@/app/actions/vibes";
import { VibeHistoryEntryData } from "@/components/history/vibe-history.data";

function determineGroup(dateIso: string): "today" | "yesterday" | "earlier-this-week" | "last-week" {
  const date = new Date(dateIso);
  const now = new Date();
  
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays <= 1) return "today";
  if (diffDays === 2) return "yesterday";
  if (diffDays <= 7) return "earlier-this-week";
  return "last-week";
}

function getGroupLabel(group: string): string {
  switch (group) {
    case "today": return "Today";
    case "yesterday": return "Yesterday";
    case "earlier-this-week": return "Earlier this week";
    case "last-week": return "Last week";
    default: return "Past";
  }
}

export default async function HistoryPage() {
  const rawHistory = await fetchVibeHistoryAction(50);
  
  const mappedHistory: VibeHistoryEntryData[] = rawHistory.map((vibe: any) => {
    const group = determineGroup(vibe.createdAt);
    const dateObj = new Date(vibe.createdAt);
    
    return {
      id: vibe.id,
      title: `${vibe.mood} ${vibe.activity}`,
      mood: vibe.mood.toLowerCase() as any,
      moodLabel: vibe.mood,
      duration: vibe.timeOfDay,
      generatedAtIso: vibe.createdAt,
      generatedTimeLabel: dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      group: group,
      groupLabel: getGroupLabel(group),
      description: vibe.aiSummary || "",
      intention: "A personalized vibe.",
      contentMix: ["Music", "Video", "Books"],
      artworkVariant: "midnight-reset",
      vibeHref: `/vibe/${vibe.id}`,
      generateAgainHref: "/generate"
    };
  });

  return (
    <AppPageContainer>
      <AppPageHeader
        eyebrow="YOUR TIMELINE"
        title="Vibe History"
        description="Revisit the entertainment experiences you explored before, then search, filter, reopen, or generate a similar Vibe."
      />
      <div className="py-6 sm:py-8 max-w-4xl">
        <VibeHistoryTimeline initialEntries={mappedHistory} />
      </div>
    </AppPageContainer>
  );
}
