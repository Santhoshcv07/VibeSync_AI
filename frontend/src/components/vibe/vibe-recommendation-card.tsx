"use client";

import { VibeRecommendation } from "./vibe-experience.data";
import { VibeArtwork } from "./vibe-artwork";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface VibeRecommendationCardProps {
  recommendation: VibeRecommendation;
  onUnavailableAction: (recommendation: VibeRecommendation) => void;
}

export function VibeRecommendationCard({ recommendation, onUnavailableAction }: VibeRecommendationCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-shadow hover:shadow-md border-[var(--border)] bg-[var(--surface-floating)] group">
      <div className="relative w-full aspect-video sm:aspect-[4/3] shrink-0">
        <VibeArtwork 
          variant={recommendation.artworkVariant} 
          category={recommendation.category} 
          title={`Artwork for ${recommendation.title}`} 
        />
        
        {recommendation.duration && (
          <div className="absolute bottom-3 right-3">
            <Badge variant="neutral" className="bg-black/60 text-white border-white/10 backdrop-blur-md">
              {recommendation.duration}
            </Badge>
          </div>
        )}
      </div>
      
      <CardContent className="flex flex-col flex-1 p-5 gap-4">
        <div className="flex flex-col gap-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[0.65rem] font-bold uppercase tracking-widest text-foreground-muted">
              {recommendation.format}
            </span>
          </div>
          <h3 className="text-heading-6 font-display font-semibold text-foreground line-clamp-2">
            {recommendation.title}
          </h3>
          <span className="text-body-sm text-foreground-muted">
            By {recommendation.creator}
          </span>
        </div>
        
        <p className="text-body-sm text-foreground-subtle line-clamp-3">
          {recommendation.description}
        </p>
        
        <div className="flex flex-wrap items-center gap-1.5 mt-auto pt-2">
          {recommendation.tags.map((tag) => (
            <Badge key={tag} variant="neutral" size="sm" className="bg-[var(--surface-subtle)]">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-[var(--border)]">
          <div className="flex items-center justify-between gap-3 w-full">
            <span className="text-caption text-foreground-muted truncate">
              {recommendation.providerLabel}
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              className="shrink-0"
              onClick={() => onUnavailableAction(recommendation)}
              aria-label={`${recommendation.actionLabel} for ${recommendation.title}`}
            >
              {recommendation.actionLabel}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
