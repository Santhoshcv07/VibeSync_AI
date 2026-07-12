import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type VibeMood, type VibeDuration, moodOptions, durationOptions } from "./generate-vibe.types";

export interface VibeSelectionSummaryProps {
  mood: VibeMood | null;
  duration: VibeDuration | null;
  intention: string;
}

export function VibeSelectionSummary({ mood, duration, intention }: VibeSelectionSummaryProps) {
  const isComplete = mood && duration;
  
  const moodLabel = moodOptions.find(m => m.value === mood)?.label;
  const durationLabel = durationOptions.find(d => d.value === duration)?.label;

  const getDurationPreview = () => {
    switch (duration) {
      case "15-min": return "Music · short video · visual inspiration";
      case "30-min": return "Music · video · visual inspiration · short reading";
      case "1-hour": return "Music · episode or long-form video · visual inspiration · reading";
      case "all-night": return "Music · movie or episodes · YouTube · visual inspiration · books";
      default: return "";
    }
  };

  return (
    <Card className="w-full border-[var(--border)] overflow-hidden bg-[var(--surface-elevated)] transition-all">
      <CardHeader className="bg-[var(--surface-floating)] border-b border-[var(--border)] flex flex-row items-center justify-between pb-4 gap-2">
        <CardTitle className="text-heading-4 font-display text-foreground">
          Your Vibe preview
        </CardTitle>
        <Badge variant="neutral" size="sm" className="font-normal shrink-0">Local selection preview</Badge>
      </CardHeader>
      
      <CardContent className="p-5 flex flex-col gap-6">
        {!isComplete && (
          <p className="text-body text-foreground-muted">
            Choose a mood and time to shape the preview.
          </p>
        )}

        {isComplete && (
          <>
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="primary" size="md">{moodLabel}</Badge>
                <Badge variant="neutral" size="md">{durationLabel}</Badge>
              </div>
              
              {intention && (
                <div className="bg-[var(--surface-subtle)] p-3 rounded-[var(--radius-md)] border border-[var(--border)] border-l-4 border-l-[var(--primary)]">
                  <p className="text-body-sm text-foreground italic break-words">&quot;{intention}&quot;</p>
                </div>
              )}
            </div>

            <div className="h-px bg-[var(--border)] my-1 w-full" aria-hidden="true" />

            <div className="flex flex-col gap-3">
              <span className="text-label text-foreground-muted uppercase tracking-wider font-bold">Planned Content Mix</span>
              
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge variant="neutral" className="bg-[var(--surface-subtle)]">Music</Badge>
                {duration !== "15-min" && duration !== "30-min" && <Badge variant="neutral" className="bg-[var(--surface-subtle)]">Movies & Shows</Badge>}
                <Badge variant="neutral" className="bg-[var(--surface-subtle)]">YouTube</Badge>
                <Badge variant="neutral" className="bg-[var(--surface-subtle)]">Visual Inspiration</Badge>
                <Badge variant="neutral" className="bg-[var(--surface-subtle)]">Books</Badge>
              </div>

              <p className="text-body-sm font-medium text-foreground">
                {getDurationPreview()}
              </p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
