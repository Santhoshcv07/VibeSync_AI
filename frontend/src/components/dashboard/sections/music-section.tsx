"use client";

import { VibeMediaSectionData } from "@/components/vibe/vibe-experience.data";

interface MusicSectionProps {
  section: VibeMediaSectionData | null;
  isInitial?: boolean;
  isLoading?: boolean;
}

export function MusicSection({ section, isInitial, isLoading }: MusicSectionProps) {
  const showSkeletons = isInitial || isLoading || !section;
  // Create an array of 3 items for skeleton
  const items = showSkeletons ? Array(3).fill(null) : section!.items;

  return (
    <div className="flex flex-col h-full bg-[#110822] border border-[#291245] rounded-xl p-4 shadow-lg overflow-hidden">
      <div className="flex items-center justify-between mb-4 shrink-0">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <span className="text-[#1db954]">🎵</span> Soundtrack for Your Vibe
        </h3>
        <button className="text-xs text-white/50 hover:text-white transition-colors" disabled={showSkeletons}>
          See All
        </button>
      </div>
      
      <div className="flex gap-4 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-thin scrollbar-thumb-[#291245] scrollbar-track-transparent">
        {items.map((item, index) => {
          if (showSkeletons) {
            return (
              <div key={`skeleton-${index}`} className="flex-shrink-0 w-[180px] flex flex-col gap-2">
                <div className={`aspect-square rounded-md bg-[#1c0f35] border border-[#291245] ${isLoading ? 'animate-pulse' : ''}`} />
                <div className="flex flex-col gap-1.5 mt-1">
                  <div className={`h-4 bg-[#1c0f35] rounded w-3/4 ${isLoading ? 'animate-pulse' : ''}`} />
                  <div className={`h-3 bg-[#1c0f35] rounded w-1/2 ${isLoading ? 'animate-pulse' : ''}`} />
                </div>
                <div className={`mt-auto h-7 w-24 bg-[#1db954]/10 rounded-md ${isLoading ? 'animate-pulse' : ''}`} />
              </div>
            );
          }

          return (
            <div key={item.id} className="flex-shrink-0 w-[180px] group flex flex-col gap-2">
              <a 
                href={item.destinationUrl || "#"} 
                target={item.destinationUrl ? "_blank" : undefined}
                rel={item.destinationUrl ? "noopener noreferrer" : undefined}
                className="relative aspect-square rounded-md overflow-hidden bg-[#1c0f35] border border-[#291245] block group-hover:border-[#e81cff]/50 transition-colors"
              >
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-indigo-900 to-purple-900 opacity-50 flex items-center justify-center">
                    <span className="text-white/30 text-2xl">🎵</span>
                  </div>
                )}
                
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-[#1db954] flex items-center justify-center shadow-lg shadow-black/50 pl-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  </div>
                </div>
              </a>
              
              <div className="flex flex-col">
                <a 
                  href={item.destinationUrl || "#"} 
                  target={item.destinationUrl ? "_blank" : undefined}
                  rel={item.destinationUrl ? "noopener noreferrer" : undefined}
                  className="text-sm font-semibold text-white/90 truncate hover:underline"
                >
                  {item.title}
                </a>
                <p className="text-xs text-white/60 truncate">{item.creator}</p>
              </div>
              
              <div className="flex items-center justify-between mt-auto">
                {item.matchScore && (
                  <span className="text-[10px] font-bold text-[#1db954]">{item.matchScore}% Match</span>
                )}
                {item.duration && (
                  <span className="text-[10px] text-white/40">{item.duration}</span>
                )}
              </div>
              
              <a 
                href={item.destinationUrl || "#"} 
                target={item.destinationUrl ? "_blank" : undefined}
                rel={item.destinationUrl ? "noopener noreferrer" : undefined}
                className="mt-1 flex items-center gap-1.5 px-2 py-1.5 rounded-md bg-[#1db954]/10 text-[#1db954] hover:bg-[#1db954]/20 transition-colors text-xs font-medium w-fit"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.587 14.424a.636.636 0 0 1-.873.208c-2.394-1.462-5.41-1.792-8.966-.983a.64.64 0 0 1-.786-.48.64.64 0 0 1 .479-.785c3.9-.89 7.234-.526 9.938 1.127a.636.636 0 0 1 .208.913zm1.168-3.07a.798.798 0 0 1-1.096.26c-2.73-1.674-6.938-2.174-10.158-1.192a.8.8 0 1 1-.466-1.531c3.7-1.127 8.358-.567 11.46 1.334a.8.8 0 0 1 .26 1.13zm.12-3.226C14.596 8.163 8.468 7.95 4.93 9.023a.998.998 0 1 1-.58-1.912c4.053-1.229 10.835-1.002 14.773 1.332a1 1 0 1 1-1.248 1.685z"/></svg>
                Open in Spotify
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
