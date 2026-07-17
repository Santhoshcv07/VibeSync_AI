"use client";

import { useState, useMemo } from "react";
import { 
  vibeHistoryEntries,
  VibeHistoryMood,
  VibeHistoryDateRange,
  VibeHistorySort,
  VibeHistoryGroup,
  VibeHistoryEntryData,
  VibeHistoryGroupData
} from "./vibe-history.data";
import { VibeHistorySummary } from "./vibe-history-summary";
import { VibeHistoryToolbar } from "./vibe-history-toolbar";
import { VibeHistoryGroup as VibeHistoryGroupComponent } from "./vibe-history-group";
import { VibeHistoryEmptyState } from "./vibe-history-empty-state";
import { VibeHistoryFeedback } from "./vibe-history-feedback";

const GROUP_ORDER_NEWEST: VibeHistoryGroup[] = ["today", "yesterday", "earlier-this-week", "last-week"];
const GROUP_ORDER_OLDEST: VibeHistoryGroup[] = ["last-week", "earlier-this-week", "yesterday", "today"];
const GROUP_LABELS: Record<VibeHistoryGroup, string> = {
  "today": "Today",
  "yesterday": "Yesterday",
  "earlier-this-week": "Earlier this week",
  "last-week": "Last week"
};

export function VibeHistoryTimeline() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMood, setSelectedMood] = useState<VibeHistoryMood | "all">("all");
  const [dateRange, setDateRange] = useState<VibeHistoryDateRange>("all");
  const [sort, setSort] = useState<VibeHistorySort>("newest");
  
  const [visibleEntryIds, setVisibleEntryIds] = useState<string[]>(
    vibeHistoryEntries.map((entry) => entry.id)
  );
  const [expandedEntryIds, setExpandedEntryIds] = useState<string[]>([]);
  const [lastRemovedEntryId, setLastRemovedEntryId] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  // Determine available entries based on removed state
  const availableEntries = useMemo(() => {
    return vibeHistoryEntries.filter((entry) => visibleEntryIds.includes(entry.id));
  }, [visibleEntryIds]);

  // Derived summaries
  const availableCount = availableEntries.length;
  const representedMoodCount = new Set(availableEntries.map((entry) => entry.mood)).size;
  const representedGroupCount = new Set(availableEntries.map((entry) => entry.group)).size;

  // Search and Filter
  const filteredEntries = useMemo(() => {
    return availableEntries.filter((entry) => {
      // Title search
      if (searchQuery.trim() && !entry.title.toLowerCase().includes(searchQuery.trim().toLowerCase())) {
        return false;
      }
      
      // Mood filter
      if (selectedMood !== "all" && entry.mood !== selectedMood) {
        return false;
      }

      // Date range filter
      if (dateRange !== "all") {
        if (dateRange === "today" && entry.group !== "today") return false;
        if (dateRange === "this-week" && !["today", "yesterday", "earlier-this-week"].includes(entry.group)) return false;
        if (dateRange === "last-week" && entry.group !== "last-week") return false;
      }

      return true;
    });
  }, [availableEntries, searchQuery, selectedMood, dateRange]);

  // Sort
  const sortedEntries = useMemo(() => {
    const sorted = [...filteredEntries];
    sorted.sort((a, b) => {
      const dateA = new Date(a.generatedAtIso).getTime();
      const dateB = new Date(b.generatedAtIso).getTime();
      return sort === "newest" ? dateB - dateA : dateA - dateB;
    });
    return sorted;
  }, [filteredEntries, sort]);

  // Group
  const groupedEntries = useMemo(() => {
    const groups: Partial<Record<VibeHistoryGroup, VibeHistoryEntryData[]>> = {};
    
    // Group them
    sortedEntries.forEach((entry) => {
      if (!groups[entry.group]) {
        groups[entry.group] = [];
      }
      groups[entry.group]!.push(entry);
    });

    // Format array using specified deterministic order
    const order = sort === "newest" ? GROUP_ORDER_NEWEST : GROUP_ORDER_OLDEST;
    
    const result: VibeHistoryGroupData[] = [];
    order.forEach(groupKey => {
      if (groups[groupKey] && groups[groupKey]!.length > 0) {
        result.push({
          group: groupKey,
          label: GROUP_LABELS[groupKey],
          entries: groups[groupKey]!
        });
      }
    });
    
    return result;
  }, [sortedEntries, sort]);

  // Actions
  const handleExpandedChange = (entryId: string, expanded: boolean) => {
    setExpandedEntryIds(prev => 
      expanded ? [...prev, entryId] : prev.filter(id => id !== entryId)
    );
  };

  const handleRemove = (entryId: string) => {
    const entryToRemove = availableEntries.find(e => e.id === entryId);
    if (!entryToRemove) return;

    setVisibleEntryIds(prev => prev.filter(id => id !== entryId));
    setExpandedEntryIds(prev => prev.filter(id => id !== entryId));
    setLastRemovedEntryId(entryId);
    setFeedbackMessage(`${entryToRemove.title} was removed from this history preview. Nothing was deleted or stored.`);
  };

  const handleRestore = () => {
    if (!lastRemovedEntryId) return;
    
    const entryToRestore = vibeHistoryEntries.find(e => e.id === lastRemovedEntryId);
    if (!entryToRestore) return;

    setVisibleEntryIds(prev => {
      // Reconstruct visible entries maintaining original data order
      const originalOrderMap = new Map(vibeHistoryEntries.map((e, i) => [e.id, i]));
      const newVisibleIds = [...prev, lastRemovedEntryId];
      newVisibleIds.sort((a, b) => (originalOrderMap.get(a) ?? 0) - (originalOrderMap.get(b) ?? 0));
      return newVisibleIds;
    });
    
    setLastRemovedEntryId(null);
    setFeedbackMessage(`${entryToRestore.title} was restored to this history preview. Nothing was stored.`);
  };

  const handleClearHistory = () => {
    setVisibleEntryIds([]);
    setExpandedEntryIds([]);
    setLastRemovedEntryId(null);
    setFeedbackMessage("");
  };

  const handleRestoreHistory = () => {
    setVisibleEntryIds(vibeHistoryEntries.map(e => e.id));
    setExpandedEntryIds([]);
    setLastRemovedEntryId(null);
    setFeedbackMessage("The fictional prototype history was restored locally. Nothing was stored.");
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedMood("all");
    setDateRange("all");
    setSort("newest");
  };

  const renderContent = () => {
    if (availableCount === 0) {
      return (
        <VibeHistoryEmptyState 
          reason="history-cleared" 
          onRestoreHistory={handleRestoreHistory} 
        />
      );
    }

    if (filteredEntries.length === 0) {
      return (
        <VibeHistoryEmptyState 
          reason="no-results" 
          onResetFilters={handleResetFilters} 
        />
      );
    }

    return (
      <div className="space-y-12">
        <p className="text-sm font-medium text-muted-foreground -mb-6" aria-live="polite">
          Showing {filteredEntries.length} of {availableCount} {availableCount === 1 ? 'history entry' : 'history entries'}
        </p>
        
        <div className="relative border-l-2 border-border/30 ml-4 sm:ml-5 pl-2 sm:pl-0">
          {groupedEntries.map((groupData) => (
            <VibeHistoryGroupComponent
              key={groupData.group}
              label={groupData.label}
              entries={groupData.entries}
              expandedEntryIds={expandedEntryIds}
              onExpandedChange={handleExpandedChange}
              onRemove={handleRemove}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-12 pb-24">
      <VibeHistorySummary 
        availableCount={availableCount}
        representedMoodCount={representedMoodCount}
        representedGroupCount={representedGroupCount}
      />
      
      <div className="space-y-8">
        <VibeHistoryToolbar 
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          selectedMood={selectedMood}
          onSelectedMoodChange={setSelectedMood}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          sort={sort}
          onSortChange={setSort}
          onClearHistory={handleClearHistory}
          availableCount={availableCount}
        />
        
        {renderContent()}
      </div>

      <VibeHistoryFeedback 
        message={feedbackMessage} 
        onRestore={lastRemovedEntryId ? handleRestore : undefined} 
      />
    </div>
  );
}
