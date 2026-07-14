"use client";

import { VibeMediaSectionData } from "@/components/vibe/vibe-experience.data";

interface BookSectionProps {
  section: VibeMediaSectionData | null;
  isInitial?: boolean;
  isLoading?: boolean;
}

export function BookSection({ section, isInitial, isLoading }: BookSectionProps) {
  const showSkeletons = isInitial || isLoading || !section;
  const displayItems = showSkeletons ? Array(2).fill(null) : section!.items.slice(0, 2);

  return (
    <div className="flex flex-col bg-[#110822] border border-[#291245] rounded-xl p-4 shadow-lg overflow-hidden">
      <div className="flex items-center justify-between mb-4 shrink-0">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <span className="text-[#38bdf8]">📚</span> Read Your Vibe <span className="text-white/40 font-normal text-xs">(Books)</span>
        </h3>
        <button className="text-xs text-white/50 hover:text-white transition-colors" disabled={showSkeletons}>
          See All
        </button>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {displayItems.map((item, index) => {
          if (showSkeletons) {
            return (
              <div key={`skeleton-${index}`} className="flex flex-col h-full">
                <div className={`aspect-2/3 w-full rounded-md bg-[#1c0f35] border border-[#291245] mb-3 ${isLoading ? 'animate-pulse' : ''}`} />
                <div className="flex flex-col flex-1">
                  <div className={`h-4 bg-[#1c0f35] rounded w-full mb-1 ${isLoading ? 'animate-pulse' : ''}`} />
                  <div className={`h-3 bg-[#1c0f35] rounded w-2/3 mb-3 ${isLoading ? 'animate-pulse' : ''}`} />
                  <div className={`mt-auto h-7 bg-[#1c0f35] rounded w-full ${isLoading ? 'animate-pulse' : ''}`} />
                </div>
              </div>
            );
          }

          return (
          <div key={item.id} className="flex flex-col">
              <a 
                href={item.destinationUrl || "#"}
                target={item.destinationUrl ? "_blank" : undefined}
                rel={item.destinationUrl ? "noopener noreferrer" : undefined}
                className="relative w-full max-w-[140px] h-[185px] mx-auto rounded-md overflow-hidden bg-[#1c0f35] border border-[#291245] block mb-2 group shadow-md"
              >
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                ) : (
                  <div className="w-full h-full bg-linear-to-br from-[#fef3c7] to-[#d97706] opacity-90 flex flex-col items-center justify-center p-4 text-center">
                    <h4 className="text-[#451a03] font-bold text-xs uppercase leading-tight mb-2 font-serif">{item.title}</h4>
                    <p className="text-[#78350f] text-[9px] uppercase tracking-wider">{item.creator}</p>
                  </div>
                )}
                
                {item.matchScore && (
                  <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-black/80 backdrop-blur-md rounded-sm text-[9px] font-bold text-[#1db954]">
                    {item.matchScore}% Match
                  </div>
                )}
              </a>
              
              <div className="flex flex-col flex-1">
                <a 
                  href={item.destinationUrl || "#"} 
                  target={item.destinationUrl ? "_blank" : undefined}
                  rel={item.destinationUrl ? "noopener noreferrer" : undefined}
                  className="text-xs font-bold text-white/90 line-clamp-2 leading-tight hover:underline mb-1"
                  title={item.title}
                >
                  {item.title}
                </a>
                <p className="text-[10px] text-white/50 truncate mb-2">{item.creator}</p>
                
                <div className="mt-auto">
                  <a 
                    href={item.destinationUrl || "#"} 
                    target={item.destinationUrl ? "_blank" : undefined}
                    rel={item.destinationUrl ? "noopener noreferrer" : undefined}
                    className="flex items-center justify-center w-full py-1.5 rounded bg-white/5 hover:bg-white/10 text-white text-[10px] font-medium transition-colors"
                  >
                    View Book
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
