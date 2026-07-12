import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function DashboardHero() {
  return (
    <Card className="relative overflow-hidden w-full border-[var(--border)] bg-gradient-to-br from-[var(--surface-elevated)] to-[var(--surface)]">
      {/* Abstract Artwork Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[var(--primary)]/10 via-[var(--accent)]/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gradient-to-tr from-[var(--secondary)]/10 via-[var(--primary)]/5 to-transparent rounded-full blur-3xl translate-y-1/2" />
        
        {/* Layered decorative elements */}
        <div className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 flex items-center justify-center opacity-20 lg:opacity-100 transition-opacity">
          {/* Layer 1 */}
          <div className="absolute w-48 h-64 bg-gradient-to-br from-[var(--surface-floating)] to-[var(--surface)] rounded-[var(--radius-xl)] border border-[var(--border)] rotate-[-15deg] translate-x-12 translate-y-8 shadow-xl" />
          {/* Layer 2 */}
          <div className="absolute w-56 h-72 bg-gradient-to-br from-[var(--primary-subtle)] to-[var(--surface)] rounded-[var(--radius-xl)] border border-[var(--primary)]/20 rotate-[5deg] -translate-x-8 -translate-y-4 shadow-xl backdrop-blur-sm flex flex-col items-center justify-center gap-4">
             {/* Abstract waveform */}
             <div className="flex items-center gap-1.5 h-16">
               <div className="w-1.5 h-8 bg-[var(--primary)] rounded-full" />
               <div className="w-1.5 h-12 bg-[var(--primary)] rounded-full" />
               <div className="w-1.5 h-16 bg-[var(--primary)] rounded-full" />
               <div className="w-1.5 h-10 bg-[var(--primary)] rounded-full" />
               <div className="w-1.5 h-14 bg-[var(--primary)] rounded-full" />
               <div className="w-1.5 h-6 bg-[var(--primary)] rounded-full" />
             </div>
             {/* Play symbol */}
             <div className="w-12 h-12 rounded-full bg-[var(--primary)] flex items-center justify-center shadow-lg">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white ml-1"><polygon points="6 3 20 12 6 21 6 3"/></svg>
             </div>
          </div>
        </div>
      </div>

      <CardContent className="relative p-6 md:p-10 lg:p-12 z-10 flex flex-col items-start gap-6 max-w-2xl">
        <Badge variant="primary" size="md" className="tracking-widest uppercase font-bold text-[0.65rem]">
          BUILD YOUR MOMENT
        </Badge>
        
        <div className="flex flex-col gap-4">
          <h2 className="text-heading-2 md:text-heading-1 font-display font-semibold text-foreground leading-tight">
            How do you want your next moment to feel?
          </h2>
          <p className="text-body-lg text-foreground-muted">
            Choose a mood, tell us your available time, and VibeSync will shape a complete entertainment experience around it.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-2">
          <Button asChild size="lg" variant="primary">
<Link href="/generate">
              Generate My Vibe
            </Link>
</Button>
          <Button asChild size="lg" variant="outline">
<Link href="/how-it-works">
              Explore How It Works
            </Link>
</Button>
        </div>

        <p className="text-caption text-foreground-subtle mt-4">
          Music, video, visual inspiration, movies, shows, and books—connected by one mood.
        </p>
      </CardContent>
    </Card>
  );
}
