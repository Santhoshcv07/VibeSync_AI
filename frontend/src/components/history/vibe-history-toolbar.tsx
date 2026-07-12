import { VibeHistoryDateRange, VibeHistoryMood, VibeHistorySort } from "./vibe-history.data";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export interface VibeHistoryToolbarProps {
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  selectedMood: VibeHistoryMood | "all";
  onSelectedMoodChange: (value: VibeHistoryMood | "all") => void;
  dateRange: VibeHistoryDateRange;
  onDateRangeChange: (value: VibeHistoryDateRange) => void;
  sort: VibeHistorySort;
  onSortChange: (value: VibeHistorySort) => void;
  onClearHistory: () => void;
  availableCount: number;
}

export function VibeHistoryToolbar({
  searchQuery,
  onSearchQueryChange,
  selectedMood,
  onSelectedMoodChange,
  dateRange,
  onDateRangeChange,
  sort,
  onSortChange,
  onClearHistory,
  availableCount,
}: VibeHistoryToolbarProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row gap-4 items-end">
        <div className="flex-1 w-full relative">
          <label htmlFor="history-search" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1.5">
            Search Vibe History
          </label>
          <div className="relative">
            <svg 
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" 
              fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <Input
              id="history-search"
              type="text"
              placeholder="Search by Vibe title"
              value={searchQuery}
              onChange={(e) => onSearchQueryChange(e.target.value)}
              className="pl-9 w-full bg-background/50 focus:bg-background transition-colors"
            />
          </div>
        </div>

        <div className="w-full sm:w-auto">
          <label htmlFor="history-mood" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1.5">
            Filter by mood
          </label>
          <Select
            id="history-mood"
            value={selectedMood}
            onChange={(e) => onSelectedMoodChange(e.target.value as VibeHistoryMood | "all")}
            className="w-full sm:w-40 bg-background/50 focus:bg-background transition-colors"
          >
            <option value="all">All moods</option>
            <option value="chill">Chill</option>
            <option value="happy">Happy</option>
            <option value="energetic">Energetic</option>
            <option value="focus">Focus</option>
            <option value="romantic">Romantic</option>
            <option value="low">Low</option>
          </Select>
        </div>

        <div className="w-full sm:w-auto">
          <label htmlFor="history-timeline" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1.5">
            Filter by timeline
          </label>
          <Select
            id="history-timeline"
            value={dateRange}
            onChange={(e) => onDateRangeChange(e.target.value as VibeHistoryDateRange)}
            className="w-full sm:w-40 bg-background/50 focus:bg-background transition-colors"
          >
            <option value="all">All timeline</option>
            <option value="today">Today</option>
            <option value="this-week">This week</option>
            <option value="last-week">Last week</option>
          </Select>
        </div>

        <div className="w-full sm:w-auto">
          <label htmlFor="history-sort" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1.5">
            Sort history
          </label>
          <Select
            id="history-sort"
            value={sort}
            onChange={(e) => onSortChange(e.target.value as VibeHistorySort)}
            className="w-full sm:w-40 bg-background/50 focus:bg-background transition-colors"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </Select>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-border/50 pt-4">
        <Button
          variant="danger"
          size="sm"
          onClick={onClearHistory}
          disabled={availableCount === 0}
        >
          Clear Local History
        </Button>
      </div>
    </div>
  );
}
