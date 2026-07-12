import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SavedVibeMood, SavedVibeSort, SavedVibeView } from "./saved-vibes.data";

export interface SavedVibesToolbarProps {
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  selectedMood: SavedVibeMood | "all";
  onSelectedMoodChange: (value: SavedVibeMood | "all") => void;
  sort: SavedVibeSort;
  onSortChange: (value: SavedVibeSort) => void;
  view: SavedVibeView;
  onViewChange: (value: SavedVibeView) => void;
  onClearLibrary: () => void;
  visibleCount: number;
}

export function SavedVibesToolbar({
  searchQuery,
  onSearchQueryChange,
  selectedMood,
  onSelectedMoodChange,
  sort,
  onSortChange,
  view,
  onViewChange,
  onClearLibrary,
  visibleCount,
}: SavedVibesToolbarProps) {
  return (
    <div className="flex flex-col gap-4 p-4 bg-card/40 rounded-xl border border-border/50 shadow-sm">
      <div className="flex flex-col sm:flex-row gap-4 items-end">
        {/* Search */}
        <div className="flex-1 w-full space-y-1.5">
          <label htmlFor="search-vibes" className="text-sm font-medium">Search Saved Vibes</label>
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <Input
              id="search-vibes"
              type="text"
              placeholder="Search by Vibe title"
              value={searchQuery}
              onChange={(e) => onSearchQueryChange(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div className="space-y-1.5 w-full sm:w-40">
            <label htmlFor="mood-filter" className="text-sm font-medium">Filter by mood</label>
            <select
              id="mood-filter"
              value={selectedMood}
              onChange={(e) => onSelectedMoodChange(e.target.value as SavedVibeMood | "all")}
              className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
            >
              <option value="all">All moods</option>
              <option value="chill">Chill</option>
              <option value="happy">Happy</option>
              <option value="energetic">Energetic</option>
              <option value="focus">Focus</option>
              <option value="romantic">Romantic</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div className="space-y-1.5 w-full sm:w-48">
            <label htmlFor="sort-vibes" className="text-sm font-medium">Sort Saved Vibes</label>
            <select
              id="sort-vibes"
              value={sort}
              onChange={(e) => onSortChange(e.target.value as SavedVibeSort)}
              className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
            >
              <option value="recent">Recently added</option>
              <option value="title-ascending">Title A–Z</option>
              <option value="mood">Mood</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-border/50">
        <div className="space-y-1.5">
          <label className="text-sm font-medium block sr-only" id="view-label">Choose collection view</label>
          <div className="flex items-center gap-2" role="group" aria-labelledby="view-label">
            <Button
              variant={view === "grid" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => onViewChange("grid")}
              aria-pressed={view === "grid"}
              aria-label="Grid view"
              className="px-3"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              Grid
            </Button>
            <Button
              variant={view === "list" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => onViewChange("list")}
              aria-pressed={view === "list"}
              aria-label="List view"
              className="px-3"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              List
            </Button>
          </div>
        </div>

        <Button
          variant="danger"
          size="sm"
          onClick={onClearLibrary}
          disabled={visibleCount === 0}
        >
          Clear Local Preview
        </Button>
      </div>
    </div>
  );
}
