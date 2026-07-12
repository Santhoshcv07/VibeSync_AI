"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/cn";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SavedVibe, SavedVibeView } from "./saved-vibes.data";
import { SavedVibeArtwork } from "./saved-vibe-artwork";

export interface SavedVibeCardProps {
  vibe: SavedVibe;
  view: SavedVibeView;
  onRemove: (vibeId: string) => void;
}

export function SavedVibeCard({ vibe, view, onRemove }: SavedVibeCardProps) {
  const isGrid = view === "grid";
  const router = useRouter();

  return (
    <Card 
      className={cn(
        "group overflow-hidden flex transition-all duration-300",
        isGrid ? "flex-col" : "flex-col md:flex-row h-auto md:h-48"
      )}
    >
      {/* Artwork Section */}
      <div 
        className={cn(
          "relative shrink-0",
          isGrid ? "h-40 w-full" : "h-40 w-full md:h-full md:w-64"
        )}
      >
        <SavedVibeArtwork variant={vibe.artworkVariant} title={vibe.title} />
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-grow p-5 justify-between">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="primary" className="text-xs uppercase tracking-wider font-semibold">
                  {vibe.moodLabel}
                </Badge>
                <span className="text-xs text-muted-foreground font-medium flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {vibe.duration}
                </span>
              </div>
              <h3 className="font-semibold text-lg leading-tight line-clamp-1" title={vibe.title}>
                {vibe.title}
              </h3>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2" title={vibe.description}>
            {vibe.description}
          </p>

          <div className="flex items-center gap-1.5 flex-wrap">
            {vibe.contentMix.map((mix, i) => (
              <span key={i} className="text-xs px-2 py-0.5 bg-secondary text-secondary-foreground rounded-full">
                {mix}
              </span>
            ))}
          </div>
        </div>

        {/* Actions Footer */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/50">
          <span className="text-xs text-muted-foreground font-medium hidden sm:inline-block">
            {vibe.savedLabel}
          </span>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onRemove(vibe.id)}
              aria-label={`Remove ${vibe.title} from local preview`}
            >
              Remove
            </Button>
            <Button 
              size="sm"
              onClick={() => router.push(vibe.href)}
              aria-label={`Open ${vibe.title} Vibe`}
            >
              Open Vibe
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
