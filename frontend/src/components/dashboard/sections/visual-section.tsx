"use client";

import { VibeMediaSectionData } from "@/components/vibe/vibe-experience.data";
import { Button } from "@/components/ui/button";

interface VisualSectionProps {
  section: VibeMediaSectionData | null;
  isInitial?: boolean;
  isLoading?: boolean;
}

export function VisualSection({ section, isInitial, isLoading }: VisualSectionProps) {
  const showSkeletons = isInitial || isLoading || !section;
  // Take up to 6 items to create a 3x2 grid if possible
  const displayItems = showSkeletons ? Array(6).fill(null) : section!.items.slice(0, 6);

  return (
    <div className="flex flex-col h-full bg-[#110822] border border-[#291245] rounded-xl p-4 shadow-lg overflow-hidden">
      <div className="flex items-center justify-between mb-4 shrink-0">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <span className="text-[#e60023] w-4 h-4 rounded-full bg-white flex items-center justify-center font-bold text-[10px]">p</span>
          See Your Vibe <span className="text-white/40 font-normal text-xs">(Pinterest)</span>
        </h3>
        <button className="text-xs text-white/50 hover:text-white transition-colors" disabled={showSkeletons}>
          See All
        </button>
      </div>
      
      <div className="grid grid-cols-3 gap-2 flex-1">
        {displayItems.map((item, index) => {
          if (showSkeletons) {
            return (
              <div key={`skeleton-${index}`} className={`aspect-[4/5] rounded-md bg-[#1c0f35] border border-[#291245] ${isLoading ? 'animate-pulse' : ''}`} />
            );
          }

          return (
            <a
              key={item.id}
              href={item.destinationUrl || "#"}
              target={item.destinationUrl ? "_blank" : undefined}
              rel={item.destinationUrl ? "noopener noreferrer" : undefined}
              className="group relative aspect-[4/5] rounded-md overflow-hidden bg-[#1c0f35] block"
            >
              {item.imageUrl ? (
                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-indigo-900 to-purple-900 opacity-50 flex items-center justify-center">
                  <span className="text-white/30 text-xl">🖼️</span>
                </div>
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2">
                <p className="text-[9px] font-medium text-white line-clamp-2 leading-tight">{item.title}</p>
              </div>
            </a>
          );
        })}
      </div>
      
      <div className="mt-4 flex justify-center w-full">
        <a 
          href={showSkeletons ? "#" : (section?.items[0]?.destinationUrl || "#")}
          target={!showSkeletons && section?.items[0]?.destinationUrl ? "_blank" : undefined}
          rel={!showSkeletons && section?.items[0]?.destinationUrl ? "noopener noreferrer" : undefined}
          className={`flex items-center justify-center gap-2 w-full max-w-[200px] h-8 rounded-full transition-colors ${showSkeletons ? 'bg-[#1c0f35] text-white/30 cursor-default' : 'bg-white/5 hover:bg-white/10 text-white text-xs font-medium'}`}
        >
          <span className={`rounded-full w-3 h-3 flex items-center justify-center text-[8px] font-bold ${showSkeletons ? 'bg-white/20 text-[#110822]' : 'bg-white text-[#e60023]'}`}>p</span>
          Explore More on Pinterest
        </a>
      </div>
    </div>
  );
}
