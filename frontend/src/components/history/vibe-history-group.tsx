import { VibeHistoryEntryData } from "./vibe-history.data";
import { VibeHistoryEntry } from "./vibe-history-entry";
import { useId } from "react";

export interface VibeHistoryGroupProps {
  label: string;
  entries: VibeHistoryEntryData[];
  expandedEntryIds: string[];
  onExpandedChange: (entryId: string, expanded: boolean) => void;
  onRemove: (entryId: string) => void;
}

export function VibeHistoryGroup({
  label,
  entries,
  expandedEntryIds,
  onExpandedChange,
  onRemove,
}: VibeHistoryGroupProps) {
  const groupId = useId();

  if (entries.length === 0) return null;

  return (
    <section aria-labelledby={groupId} className="relative mb-12 last:mb-0">
      <h2 id={groupId} className="text-xl font-bold tracking-tight mb-6 flex items-center gap-3">
        {/* Timeline connection above the heading */}
        <div 
          className="absolute left-[27px] -top-6 bottom-0 w-0.5 bg-border -z-10" 
          aria-hidden="true" 
        />
        <span className="relative z-10 bg-background pr-4">{label}</span>
      </h2>
      
      <div className="space-y-6">
        {entries.map((entry) => (
          <VibeHistoryEntry
            key={entry.id}
            entry={entry}
            isExpanded={expandedEntryIds.includes(entry.id)}
            onExpandedChange={onExpandedChange}
            onRemove={onRemove}
          />
        ))}
      </div>
    </section>
  );
}
