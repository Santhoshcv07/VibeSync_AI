"use client";

import { useState, useMemo } from "react";
import { 
  savedVibes, 
  SavedVibeMood, 
  SavedVibeSort, 
  SavedVibeView 
} from "./saved-vibes.data";
import { SavedVibesSummary } from "./saved-vibes-summary";
import { SavedVibesToolbar } from "./saved-vibes-toolbar";
import { SavedVibeCard } from "./saved-vibe-card";
import { SavedVibesEmptyState } from "./saved-vibes-empty-state";
import { SavedVibesFeedback } from "./saved-vibes-feedback";
import { cn } from "@/lib/cn";

export function SavedVibesLibrary() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMood, setSelectedMood] = useState<SavedVibeMood | "all">("all");
  const [sort, setSort] = useState<SavedVibeSort>("recent");
  const [view, setView] = useState<SavedVibeView>("grid");
  const [visibleVibeIds, setVisibleVibeIds] = useState<string[]>(
    savedVibes.map((vibe) => vibe.id)
  );
  const [lastRemovedVibeId, setLastRemovedVibeId] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  // Derive available vibes based on local visible IDs state
  const availableVibes = useMemo(() => {
    return savedVibes.filter((vibe) => visibleVibeIds.includes(vibe.id));
  }, [visibleVibeIds]);

  // Derived filtered and sorted vibes
  const filteredAndSortedVibes = useMemo(() => {
    let result = [...availableVibes];

    // Search
    if (searchQuery.trim() !== "") {
      const lowerQuery = searchQuery.trim().toLowerCase();
      result = result.filter(vibe => vibe.title.toLowerCase().includes(lowerQuery));
    }

    // Mood filter
    if (selectedMood !== "all") {
      result = result.filter(vibe => vibe.mood === selectedMood);
    }

    // Sort
    result.sort((a, b) => {
      if (sort === "title-ascending") {
        return a.title.localeCompare(b.title);
      }
      if (sort === "mood") {
        // Sort by alphabetical moodLabel
        return a.moodLabel.localeCompare(b.moodLabel);
      }
      // "recent" preserves the original static dataset order which was filtered from availableVibes.
      // Since availableVibes preserves savedVibes order, we do nothing.
      return 0;
    });

    return result;
  }, [availableVibes, searchQuery, selectedMood, sort]);

  // Summary counts
  const visibleCount = availableVibes.length;
  const representedMoodCount = new Set(availableVibes.map((vibe) => vibe.mood)).size;

  // Handlers
  const handleRemove = (vibeId: string) => {
    const vibeToRemove = savedVibes.find(v => v.id === vibeId);
    if (!vibeToRemove) return;

    setVisibleVibeIds(prev => prev.filter(id => id !== vibeId));
    setLastRemovedVibeId(vibeId);
    setFeedbackMessage(`${vibeToRemove.title} was removed from this page preview. Nothing was deleted or stored.`);
  };

  const handleRestoreLastRemoved = () => {
    if (!lastRemovedVibeId) return;
    
    const vibeToRestore = savedVibes.find(v => v.id === lastRemovedVibeId);
    if (!vibeToRestore) return;

    setVisibleVibeIds(prev => [...prev, lastRemovedVibeId]);
    setLastRemovedVibeId(null);
    setFeedbackMessage(`${vibeToRestore.title} was restored to this page preview. Nothing was stored.`);
  };

  const handleClearLibrary = () => {
    setVisibleVibeIds([]);
    setLastRemovedVibeId(null);
    setFeedbackMessage("All Vibes were removed from this page preview. Nothing was deleted or stored.");
  };

  const handleRestoreCollection = () => {
    setVisibleVibeIds(savedVibes.map((vibe) => vibe.id));
    setFeedbackMessage("The fictional prototype collection was restored locally. Nothing was stored.");
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedMood("all");
    setSort("recent");
  };

  const isLibraryCleared = availableVibes.length === 0;
  const isNoResults = !isLibraryCleared && filteredAndSortedVibes.length === 0;

  return (
    <div className="space-y-8 pb-16">
      <SavedVibesSummary
        visibleCount={visibleCount}
        representedMoodCount={representedMoodCount}
      />

      <div className="space-y-6">
        <SavedVibesToolbar
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          selectedMood={selectedMood}
          onSelectedMoodChange={setSelectedMood}
          sort={sort}
          onSortChange={setSort}
          view={view}
          onViewChange={setView}
          onClearLibrary={handleClearLibrary}
          visibleCount={visibleCount}
        />

        {isLibraryCleared ? (
          <SavedVibesEmptyState 
            reason="library-cleared" 
            onRestoreCollection={handleRestoreCollection} 
          />
        ) : isNoResults ? (
          <SavedVibesEmptyState 
            reason="no-results" 
            onResetFilters={handleResetFilters} 
          />
        ) : (
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground" aria-live="polite">
              {visibleCount === filteredAndSortedVibes.length 
                ? `Showing ${visibleCount} of ${visibleCount} Vibes`
                : `Showing ${filteredAndSortedVibes.length} of ${visibleCount} available Vibes`
              }
            </div>
            
            <div className={cn(
              "gap-6",
              view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "flex flex-col"
            )}>
              {filteredAndSortedVibes.map((vibe) => (
                <SavedVibeCard
                  key={vibe.id}
                  vibe={vibe}
                  view={view}
                  onRemove={handleRemove}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <SavedVibesFeedback
        message={feedbackMessage}
        restoreLabel={lastRemovedVibeId ? "Restore" : undefined}
        onRestore={lastRemovedVibeId ? handleRestoreLastRemoved : undefined}
      />
    </div>
  );
}
