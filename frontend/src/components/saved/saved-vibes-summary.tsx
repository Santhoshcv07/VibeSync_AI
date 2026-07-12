import { Card } from "@/components/ui/card";

export interface SavedVibesSummaryProps {
  visibleCount: number;
  representedMoodCount: number;
}

export function SavedVibesSummary({
  visibleCount,
  representedMoodCount,
}: SavedVibesSummaryProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">Your entertainment collection</h2>
        <p className="text-muted-foreground">A local preview of the Vibes you may want to revisit later.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 flex flex-col justify-center bg-card/50 shadow-sm border-border/50">
          <span className="text-3xl font-bold tracking-tighter text-primary">
            {visibleCount}
          </span>
          <span className="text-sm font-medium text-muted-foreground mt-1">
            Vibes in this preview
          </span>
        </Card>
        
        <Card className="p-6 flex flex-col justify-center bg-card/50 shadow-sm border-border/50">
          <span className="text-3xl font-bold tracking-tighter text-primary">
            {representedMoodCount}
          </span>
          <span className="text-sm font-medium text-muted-foreground mt-1">
            Mood styles represented
          </span>
        </Card>
        
        <Card className="p-6 flex flex-col justify-center bg-card/50 shadow-sm border-border/50 border-dashed">
          <span className="text-lg font-semibold tracking-tight text-foreground">
            Local only
          </span>
          <span className="text-sm font-medium text-muted-foreground mt-1">
            Nothing is stored
          </span>
        </Card>
      </div>
    </div>
  );
}
