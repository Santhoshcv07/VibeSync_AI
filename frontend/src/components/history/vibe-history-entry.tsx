"use client";

import { VibeHistoryEntryData } from "./vibe-history.data";
import { VibeHistoryArtwork } from "./vibe-history-artwork";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/cn";

export interface VibeHistoryEntryProps {
  entry: VibeHistoryEntryData;
  isExpanded: boolean;
  onExpandedChange: (entryId: string, expanded: boolean) => void;
  onRemove: (entryId: string) => void;
}

export function VibeHistoryEntry({
  entry,
  isExpanded,
  onExpandedChange,
  onRemove,
}: VibeHistoryEntryProps) {
  const router = useRouter();
  const detailId = `history-details-${entry.id}`;

  return (
    <div className="relative pl-12 sm:pl-16">
      {/* Decorative timeline node */}
      <div 
        className="absolute left-[23px] top-6 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-background z-10" 
        aria-hidden="true" 
      />
      
      <Card className="overflow-hidden flex flex-col group transition-colors hover:border-border/80">
        <div className="flex flex-col sm:flex-row h-auto sm:h-40">
          {/* Artwork */}
          <div className="relative shrink-0 h-32 sm:h-full sm:w-48">
            <VibeHistoryArtwork variant={entry.artworkVariant} title={entry.title} />
          </div>

          {/* Core Content */}
          <div className="flex flex-col flex-grow p-4 sm:p-5 justify-between">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Badge variant="primary" className="text-xs uppercase tracking-wider font-semibold">
                    {entry.moodLabel}
                  </Badge>
                  <span className="text-xs text-muted-foreground font-medium flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {entry.duration}
                  </span>
                </div>
                <span className="text-xs font-medium text-muted-foreground">
                  {entry.generatedTimeLabel}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-lg leading-tight" title={entry.title}>
                  {entry.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-1 mt-1" title={entry.description}>
                  {entry.description}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between mt-4 sm:mt-0 pt-4 sm:pt-0 border-t border-border/50 sm:border-0">
              <div className="flex items-center gap-2">
                <Button 
                  size="sm"
                  variant="outline"
                  onClick={() => router.push(entry.vibeHref)}
                  aria-label={`Open ${entry.title} Vibe`}
                >
                  Open Vibe
                </Button>
                <Button 
                  size="sm"
                  onClick={() => router.push(entry.generateAgainHref)}
                  aria-label={`Generate a new Vibe inspired by ${entry.title}`}
                >
                  Generate Again
                </Button>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onExpandedChange(entry.id, !isExpanded)}
                aria-expanded={isExpanded}
                aria-controls={detailId}
                className="text-muted-foreground px-2"
              >
                {isExpanded ? "Hide details" : "View details"}
                <svg 
                  className={cn("w-4 h-4 ml-1 transition-transform", isExpanded ? "rotate-180" : "")} 
                  fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Button>
            </div>
          </div>
        </div>

        {/* Expanded Details */}
        {isExpanded && (
          <div id={detailId} className="bg-muted/30 border-t border-border/50 p-4 sm:p-5 flex flex-col gap-6 animate-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Built around</h4>
                <p className="text-sm font-medium">{entry.intention}</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Experience mix</h4>
                <div className="flex flex-wrap gap-1.5">
                  {entry.contentMix.map((mix, i) => (
                    <span key={i} className="text-xs px-2 py-0.5 bg-secondary text-secondary-foreground rounded-full">
                      {mix}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-border/50">
              <div className="space-y-1 max-w-lg">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Prototype activity</h4>
                <p className="text-xs text-muted-foreground">
                  This fictional entry is shown only to demonstrate the future history experience. No activity was tracked or stored.
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-danger hover:text-danger hover:bg-danger/10 shrink-0"
                onClick={() => onRemove(entry.id)}
                aria-label={`Remove ${entry.title} from local history preview`}
              >
                Remove
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
