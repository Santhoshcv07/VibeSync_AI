import { Card } from "@/components/ui/card";

export interface VibeHistorySummaryProps {
  availableCount: number;
  representedMoodCount: number;
  representedGroupCount: number;
}

export function VibeHistorySummary({
  availableCount,
  representedMoodCount,
  representedGroupCount,
}: VibeHistorySummaryProps) {
  return (
    <Card className="p-6 md:p-8 bg-card border-border/50">
      <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-12">
        <div className="flex-1 min-w-[200px]">
          <h2 className="text-xl font-bold tracking-tight mb-2">Your recent Vibe journey</h2>
          <p className="text-sm text-muted-foreground">
            A fictional local preview of how generated entertainment experiences may appear over time.
          </p>
        </div>
        
        <div className="flex flex-wrap md:flex-nowrap gap-6 md:gap-12 flex-[2] justify-start md:justify-end">
          <div className="space-y-1">
            <p className="text-3xl font-black text-primary leading-none">{availableCount}</p>
            <p className="text-sm font-medium text-muted-foreground">Vibes in this timeline</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-black text-primary leading-none">{representedMoodCount}</p>
            <p className="text-sm font-medium text-muted-foreground">Mood styles represented</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-black text-foreground leading-none">{representedGroupCount}</p>
            <p className="text-sm font-medium text-muted-foreground">Timeline groups</p>
          </div>
        </div>
      </div>
      
      <div className="mt-8 pt-4 border-t border-border/50 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">Local only &middot; Nothing is tracked or stored</span>
      </div>
    </Card>
  );
}
