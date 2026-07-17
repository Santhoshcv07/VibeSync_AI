"use client";

import { VibeExperienceData } from "@/components/vibe/vibe-experience.data";
import { Button } from "@/components/ui/button";
import { MusicSection } from "./sections/music-section";
import { YouTubeSection } from "./sections/youtube-section";
import { VisualSection } from "./sections/visual-section";
import { MovieSection } from "./sections/movie-section";
import { BookSection } from "./sections/book-section";
import { AiSummarySection } from "./sections/ai-summary-section";
import { DashboardState } from "@/app/(app)/dashboard/page";

interface DashboardResultsProps {
  vibe: VibeExperienceData | null;
  context?: Record<string, unknown> | null;
  dashboardState: DashboardState;
  onOpenVisualGallery?: () => void;
}

export function DashboardResults({
  vibe,
  dashboardState,
  onOpenVisualGallery,
}: DashboardResultsProps) {
  const isInitial = dashboardState === "initial";
  const isLoading = dashboardState === "loading";
  const isError = dashboardState === "error";

  const musicSection = vibe?.sections.find(s => s.category === "music") || null;
  const youtubeSection = vibe?.sections.find(s => s.category === "youtube") || null;
  const visualSection = vibe?.sections.find(s => s.category === "visual-inspiration") || null;
  const moviesSection = vibe?.sections.find(s => s.category === "movies-shows") || null;
  const booksSection = vibe?.sections.find(s => s.category === "books") || null;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My VibeSync',
          text: 'Check out this vibe I created!',
          url: window.location.href,
        });
      } catch (err) {
        console.error("Share failed", err);
      }
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full mt-2 relative">
      {/* Result Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 pb-2 border-b border-[#291245]">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            Your Vibe Workspace <span aria-hidden="true">✨</span>
          </h2>
          <p className="text-sm text-white/60">
            {isInitial ? "Generate a Vibe to discover entertainment for this moment." :
             isLoading ? "Curating your personalized entertainment universe..." :
             "Here's your personalized entertainment universe."}
          </p>
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">

          <Button variant="outline" className="flex-1 md:flex-none border-[#37195c] bg-[#110822] text-white hover:bg-[#1c0f35]" onClick={handleShare} disabled={isInitial || isLoading || isError}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-white/50"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
            Share Vibe
          </Button>
        </div>
      </div>

      {isError && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <p className="text-sm font-medium">We couldn&apos;t generate a new vibe right now. Showing your last successful recommendations.</p>
          </div>
        </div>
      )}

      {/* Grid Layout */}
      <div className="flex flex-col gap-6">
        {/* Row 1: Music (50%) + YouTube (50%) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-auto">
          <MusicSection section={musicSection} isInitial={isInitial} isLoading={isLoading} mood={vibe?.mood} />
          <YouTubeSection section={youtubeSection} isInitial={isInitial} isLoading={isLoading} />
        </div>
        
       {/* Row 2: Visual + Movies + Books */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-1 h-fit">
  <VisualSection
  section={visualSection}
  isInitial={isInitial}
  isLoading={isLoading}
  onSeeAll={onOpenVisualGallery}
/>
</div>

<div className="lg:col-span-1 h-fit">
  <MovieSection
    section={moviesSection}
    isInitial={isInitial}
    isLoading={isLoading}
  />
</div>

<div className="lg:col-span-1 h-fit">
  <BookSection
    section={booksSection}
    isInitial={isInitial}
    isLoading={isLoading}
  />
</div>
        </div>
      </div>

      {/* AI Summary Bottom Panel */}
      <AiSummarySection vibe={vibe} isInitial={isInitial} isLoading={isLoading} />
    </div>
  );
}
