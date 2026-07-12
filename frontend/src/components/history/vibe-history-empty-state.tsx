"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export type VibeHistoryEmptyReason = "no-results" | "history-cleared";

export interface VibeHistoryEmptyStateProps {
  reason: VibeHistoryEmptyReason;
  onResetFilters?: () => void;
  onRestoreHistory?: () => void;
}

export function VibeHistoryEmptyState({
  reason,
  onResetFilters,
  onRestoreHistory,
}: VibeHistoryEmptyStateProps) {
  const router = useRouter();

  if (reason === "no-results") {
    return (
      <Card className="flex flex-col items-center justify-center p-8 sm:p-12 text-center border-dashed border-2 shadow-none bg-card/40 mt-8">
        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-6">
          <svg className="w-8 h-8 text-secondary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-2">No history entries match this view</h3>
        <p className="text-muted-foreground mb-6 max-w-md">
          Try another title, mood, timeline, or sort option to return to the fictional history preview.
        </p>
        <Button onClick={onResetFilters} variant="secondary">
          Reset Search and Filters
        </Button>
      </Card>
    );
  }

  // history-cleared
  return (
    <Card className="flex flex-col items-center justify-center p-8 sm:p-12 text-center border-dashed border-2 shadow-none bg-card/40 mt-8">
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className="text-xl font-semibold mb-2">Your local history preview is empty</h3>
      <p className="text-muted-foreground mb-8 max-w-md">
        All fictional history entries were removed from this page. Refresh the page or restore the prototype timeline below.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <Button onClick={() => router.push("/generate")}>
          Generate a New Vibe
        </Button>
        <Button onClick={onRestoreHistory} variant="outline">
          Restore Prototype History
        </Button>
      </div>
    </Card>
  );
}
