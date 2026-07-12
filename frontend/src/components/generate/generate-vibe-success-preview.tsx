"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export interface GenerateVibeSuccessPreviewProps {
  moodLabel: string;
  durationLabel: string;
  intention?: string;
  onReset: () => void;
}

export function GenerateVibeSuccessPreview({ moodLabel, durationLabel, intention, onReset }: GenerateVibeSuccessPreviewProps) {
  return (
    <div className="flex flex-col items-center max-w-2xl mx-auto py-8 md:py-12 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col items-center text-center gap-4 px-4">
        <Badge variant="info" size="md" className="tracking-widest uppercase font-bold text-[0.65rem]">
          LOCAL PROTOTYPE
        </Badge>
        <h2 className="text-display-sm md:text-display-md font-display font-semibold text-foreground">
          Your Vibe is ready for preview
        </h2>
        <p className="text-body-lg text-foreground-muted">
          Your selections passed local validation. No AI model or entertainment provider was contacted, and no recommendation data was created.
        </p>
      </div>

      <Card className="w-full border-[var(--primary)]/30 bg-[var(--surface-floating)] overflow-hidden shadow-xl shadow-[var(--primary)]/5">
        <div className="h-2 w-full bg-[var(--primary)]" aria-hidden="true" />
        
        <CardContent className="p-6 md:p-8 flex flex-col gap-6">
          <span className="text-label text-foreground-muted uppercase tracking-wider font-bold">Selection summary</span>
          
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="primary" size="md">{moodLabel}</Badge>
              <Badge variant="neutral" size="md">{durationLabel}</Badge>
            </div>
            
            {intention && (
              <div className="bg-[var(--surface-subtle)] p-4 rounded-[var(--radius-md)] border border-[var(--border)] border-l-4 border-l-[var(--primary)]">
                <p className="text-body text-foreground italic break-words">&quot;{intention}&quot;</p>
              </div>
            )}
          </div>
          
          <div className="h-px bg-[var(--border)] my-2 w-full" aria-hidden="true" />
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
            <Button asChild size="lg" variant="primary" className="w-full sm:w-auto font-semibold">
<Link href="/vibe/demo-vibe">
                Open Demo Vibe
              </Link>
</Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto" onClick={onReset}>
              Create Another Vibe
            </Button>
          </div>
          
          <p className="text-caption text-foreground-subtle text-center sm:text-left mt-2">
            Opens a static prototype route. It does not contain generated recommendations yet.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
