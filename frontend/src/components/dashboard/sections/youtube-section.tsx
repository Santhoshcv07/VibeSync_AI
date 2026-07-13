"use client";

import { useState } from "react";
import { VibeMediaSectionData } from "@/components/vibe/vibe-experience.data";

interface YouTubeSectionProps {
  section: VibeMediaSectionData | null;
  isInitial?: boolean;
  isLoading?: boolean;
}

export function YouTubeSection({ section, isInitial, isLoading }: YouTubeSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const showSkeletons = isInitial || isLoading || !section;
  const allItems = showSkeletons ? Array(3).fill(null) : section!.items;
  // Display only first 3 in main view
  const items = allItems.slice(0, 3);

  return (
    <div className="flex flex-col h-full bg-[#110822] border border-[#291245] rounded-xl p-4 shadow-lg overflow-hidden">
      <div className="flex items-center justify-between mb-4 shrink-0">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <span className="text-[#ff0000]">▶️</span> Watch Your Vibe <span className="text-white/40 font-normal text-xs">(YouTube)</span>
        </h3>
        <button 
          className="text-xs text-white/50 hover:text-white transition-colors" 
          disabled={showSkeletons}
          onClick={() => setIsExpanded(true)}
        >
          See All
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pb-2">
        {items.map((item, index) => {
          if (showSkeletons) {
            return (
              <div key={`skeleton-${index}`} className="flex flex-col gap-2 w-full">
                <div className={`aspect-video rounded-md bg-[#1c0f35] border border-[#291245] ${isLoading ? 'animate-pulse' : ''}`} />
                <div className="flex flex-col gap-1.5 mt-1">
                  <div className={`h-4 bg-[#1c0f35] rounded w-3/4 ${isLoading ? 'animate-pulse' : ''}`} />
                  <div className={`h-3 bg-[#1c0f35] rounded w-1/2 ${isLoading ? 'animate-pulse' : ''}`} />
                </div>
                <div className={`mt-auto pt-1 h-8 w-28 bg-[#ff0000]/10 rounded-md ${isLoading ? 'animate-pulse' : ''}`} />
              </div>
            );
          }

          if (!showSkeletons && item) {
            console.log("YouTube recommendation:", item);
            console.log("YouTube destination URL:", item.destinationUrl);
          }

          return (
            <div key={item.id} className="group flex flex-col gap-2 w-full h-full">
              <a 
                href={item.destinationUrl || undefined} 
                target={item.destinationUrl ? "_blank" : undefined}
                rel={item.destinationUrl ? "noopener noreferrer" : undefined}
                onClick={(e) => {
                  if (!item.destinationUrl) {
                    e.preventDefault();
                    console.warn(`Missing YouTube destinationUrl for: ${item.title}`);
                  }
                }}
                className={`relative aspect-video rounded-md overflow-hidden bg-[#1c0f35] border border-[#291245] block transition-colors ${item.destinationUrl ? 'group-hover:border-[#e81cff]/50' : 'cursor-not-allowed opacity-80'}`}
              >
                {item.thumbnailUrl || item.imageUrl ? (
                  <img src={item.thumbnailUrl || item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-indigo-900 to-purple-900 opacity-50 flex items-center justify-center">
                    <span className="text-white/30 text-2xl">▶️</span>
                  </div>
                )}
                
                {item.duration && (
                  <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 bg-black/80 rounded-sm text-[9px] font-bold text-white">
                    {item.duration}
                  </div>
                )}
                
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-[#ff0000] flex items-center justify-center shadow-lg shadow-black/50 pl-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  </div>
                </div>
              </a>
              
              <div className="flex flex-col">
                <a 
                  href={item.destinationUrl || undefined} 
                  target={item.destinationUrl ? "_blank" : undefined}
                  rel={item.destinationUrl ? "noopener noreferrer" : undefined}
                  onClick={(e) => {
                    if (!item.destinationUrl) e.preventDefault();
                  }}
                  className={`text-sm font-semibold line-clamp-2 leading-tight ${item.destinationUrl ? 'text-white/90 hover:underline' : 'text-white/70 cursor-not-allowed'}`}
                  title={item.title}
                >
                  {item.title}
                </a>
                <p className="text-xs text-white/60 truncate mt-1">{item.creator}</p>
                
                {!!item.metadata && (!!item.metadata.views || !!item.metadata.date) && (
                  <p className="text-[10px] text-white/40 truncate">
                    {!!item.metadata.views && `${String(item.metadata.views)} views`}
                    {!!item.metadata.views && !!item.metadata.date && ' • '}
                    {!!item.metadata.date && String(item.metadata.date)}
                  </p>
                )}
              </div>
              
              <div className="flex items-center justify-between mt-auto pt-1">
                {item.matchScore && (
                  <span className="text-[10px] font-bold text-[#1db954]">{item.matchScore}% Match</span>
                )}
              </div>
              
              <a 
                href={item.destinationUrl || undefined} 
                target={item.destinationUrl ? "_blank" : undefined}
                rel={item.destinationUrl ? "noopener noreferrer" : undefined}
                onClick={(e) => {
                  if (!item.destinationUrl) e.preventDefault();
                }}
                className={`mt-1 flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-md text-xs font-medium w-full transition-colors ${item.destinationUrl ? 'bg-[#ff0000]/10 text-[#ff4444] hover:bg-[#ff0000]/20' : 'bg-white/5 text-white/30 cursor-not-allowed'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                Watch on YouTube
              </a>
            </div>
          );
        })}
      </div>

      {isExpanded && !showSkeletons && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#110822] border border-[#291245] rounded-xl shadow-2xl w-full max-w-6xl max-h-full flex flex-col overflow-hidden">
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-[#291245] shrink-0">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-[#ff0000]">▶️</span> Watch Your Vibe (YouTube)
              </h2>
              <button 
                onClick={() => setIsExpanded(false)}
                className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            
            <div className="p-4 md:p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-[#291245] scrollbar-track-transparent">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {allItems.map((item) => (
                  <div key={`expanded-${item.id}`} className="group flex flex-col gap-2 w-full h-full">
                    <a 
                      href={item.destinationUrl || undefined} 
                      target={item.destinationUrl ? "_blank" : undefined}
                      rel={item.destinationUrl ? "noopener noreferrer" : undefined}
                      onClick={(e) => {
                        if (!item.destinationUrl) {
                          e.preventDefault();
                          console.warn(`Missing YouTube destinationUrl for: ${item.title}`);
                        }
                      }}
                      className={`relative aspect-video rounded-md overflow-hidden bg-[#1c0f35] border border-[#291245] block transition-colors ${item.destinationUrl ? 'group-hover:border-[#e81cff]/50' : 'cursor-not-allowed opacity-80'}`}
                    >
                      {item.thumbnailUrl || item.imageUrl ? (
                        <img src={item.thumbnailUrl || item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-indigo-900 to-purple-900 opacity-50 flex items-center justify-center">
                          <span className="text-white/30 text-2xl">▶️</span>
                        </div>
                      )}
                      
                      {item.duration && (
                        <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 bg-black/80 rounded-sm text-[9px] font-bold text-white">
                          {item.duration}
                        </div>
                      )}
                      
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-[#ff0000] flex items-center justify-center shadow-lg shadow-black/50 pl-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                        </div>
                      </div>
                    </a>
                    
                    <div className="flex flex-col">
                      <a 
                        href={item.destinationUrl || undefined} 
                        target={item.destinationUrl ? "_blank" : undefined}
                        rel={item.destinationUrl ? "noopener noreferrer" : undefined}
                        onClick={(e) => {
                          if (!item.destinationUrl) e.preventDefault();
                        }}
                        className={`text-sm font-semibold line-clamp-2 leading-tight ${item.destinationUrl ? 'text-white/90 hover:underline' : 'text-white/70 cursor-not-allowed'}`}
                        title={item.title}
                      >
                        {item.title}
                      </a>
                      <p className="text-xs text-white/60 truncate mt-1">{item.creator}</p>
                      
                      {!!item.metadata && (!!item.metadata.views || !!item.metadata.date) && (
                        <p className="text-[10px] text-white/40 truncate">
                          {!!item.metadata.views && `${String(item.metadata.views)} views`}
                          {!!item.metadata.views && !!item.metadata.date && ' • '}
                          {!!item.metadata.date && String(item.metadata.date)}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between mt-auto pt-1">
                      {item.matchScore && (
                        <span className="text-[10px] font-bold text-[#1db954]">{item.matchScore}% Match</span>
                      )}
                    </div>
                    
                    <a 
                      href={item.destinationUrl || undefined} 
                      target={item.destinationUrl ? "_blank" : undefined}
                      rel={item.destinationUrl ? "noopener noreferrer" : undefined}
                      onClick={(e) => {
                        if (!item.destinationUrl) e.preventDefault();
                      }}
                      className={`mt-1 flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-md text-xs font-medium w-full transition-colors ${item.destinationUrl ? 'bg-[#ff0000]/10 text-[#ff4444] hover:bg-[#ff0000]/20' : 'bg-white/5 text-white/30 cursor-not-allowed'}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                      Watch on YouTube
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
