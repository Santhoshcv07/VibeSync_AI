"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export type SavedVibesEmptyReason = "no-results" | "library-cleared";

export interface SavedVibesEmptyStateProps {
  reason: SavedVibesEmptyReason;
  onResetFilters?: () => void;
  onRestoreCollection?: () => void;
}

export function SavedVibesEmptyState({
  reason,
  onResetFilters,
  onRestoreCollection,
}: SavedVibesEmptyStateProps) {
  const router = useRouter();

  if (reason === "no-results") {
    return (
      <Card className="flex flex-col items-center justify-center p-8 sm:p-12 text-center border-dashed border-2 shadow-none bg-card/40">
        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-6">
          <svg className="w-8 h-8 text-secondary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-2">No Vibes match this view</h3>
        <p className="text-muted-foreground mb-6 max-w-md">
          Try another title, mood, or sort option to return to your collection.
        </p>
        <Button onClick={onResetFilters} variant="secondary">
          Reset Search and Filters
        </Button>
      </Card>
    );
  }

  // library-cleared
  return (
    <Card className="flex flex-col items-center justify-center p-8 sm:p-12 text-center border-dashed border-2 shadow-none bg-card/40">
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h3 className="text-xl font-semibold mb-2">Your local preview is empty</h3>
      <p className="text-muted-foreground mb-8 max-w-md">
        All prototype Vibes were removed from this page. Refresh the page to restore the original fictional collection.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <Button onClick={() => router.push("/generate")}>
          Generate a New Vibe
        </Button>
        <Button onClick={onRestoreCollection} variant="outline">
          Restore Prototype Collection
        </Button>
      </div>
    </Card>
  );
}
