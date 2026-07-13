"use client";

import { VibeExperienceData } from "@/components/vibe/vibe-experience.data";

interface AiSummarySectionProps {
  vibe: VibeExperienceData | null;
  isInitial?: boolean;
  isLoading?: boolean;
}

export function AiSummarySection({ vibe, isInitial, isLoading }: AiSummarySectionProps) {
  const showSkeletons = isInitial || isLoading || !vibe;
  
  // Extract unique tags from all items for the summary pills
  const allTags = new Set<string>();
  if (!showSkeletons) {
    vibe!.sections.forEach(section => {
      section.items.forEach(item => {
        item.tags.forEach(tag => allTags.add(tag));
      });
    });
  }
  const tags = showSkeletons ? Array(4).fill(null) : Array.from(allTags).slice(0, 6);

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 w-full bg-[#110822] border border-[#291245] rounded-xl p-5 shadow-lg mt-2">
      <div className="flex flex-col gap-2 flex-1 max-w-4xl w-full">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <span className="text-[#e81cff]">✨</span> AI Vibe Summary
        </h3>
        {showSkeletons ? (
          <div className="flex flex-col gap-1.5 mt-1 w-full">
            <div className={`h-4 bg-[#1c0f35] rounded w-[90%] ${isLoading ? 'animate-pulse' : ''}`} />
            <div className={`h-4 bg-[#1c0f35] rounded w-[75%] ${isLoading ? 'animate-pulse' : ''}`} />
            <div className={`h-4 bg-[#1c0f35] rounded w-[40%] ${isLoading ? 'animate-pulse' : ''}`} />
          </div>
        ) : (
          <p className="text-xs md:text-sm text-white/70 leading-[1.6]">
            {vibe!.journeySummary}
          </p>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2 md:justify-end shrink-0 w-full md:w-auto mt-2 md:mt-0">
        {tags.map((tag, index) => {
          if (showSkeletons) {
            return (
              <span key={`skeleton-tag-${index}`} className={`h-6 w-16 bg-[#1c0f35] border border-[#291245] rounded-full ${isLoading ? 'animate-pulse' : ''}`} />
            );
          }
          return (
            <span key={tag as string} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[11px] text-white/60">
              {tag}
            </span>
          );
        })}
      </div>
    </div>
  );
}
