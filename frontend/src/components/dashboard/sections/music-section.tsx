"use client";

import { useState, useEffect } from "react";
import { VibeMediaSectionData } from "@/components/vibe/vibe-experience.data";

interface MusicSectionProps {
  section: VibeMediaSectionData | null;
  isInitial?: boolean;
  isLoading?: boolean;
  mood?: string;
  context?: string;
}

interface MusicItem {
  id: string;
  title: string;
  creator: string;
  imageUrl?: string;
  destinationUrl: string;
  duration?: string;
}

export function MusicSection({ section, isInitial, isLoading, mood, context }: MusicSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [additionalMusic, setAdditionalMusic] = useState<MusicItem[]>([]);
  const [isLoadingAdditional, setIsLoadingAdditional] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  
  const showSkeletons = isInitial || isLoading || !section;
  const allItems = showSkeletons ? Array(3).fill(null) : section!.items;
  // Display only first 3 in main view
  const items = allItems.slice(0, 3);

  const handleSeeAll = async () => {
    setIsExpanded(true);
    setIsLoadingAdditional(true);
    setLoadError(null);
    
    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/vibes/music/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood: mood || 'chill', context })
      });
      
      const result = await response.json();
      if (result.data && Array.isArray(result.data)) {
        setAdditionalMusic(result.data);
      }
    } catch (error) {
      setLoadError('Failed to load additional music');
      console.error('Error fetching additional music:', error);
    } finally {
      setIsLoadingAdditional(false);
    }
  };

  // Combine original items with additional music for expanded view
  const expandedItems = isLoadingAdditional 
    ? allItems 
    : [...allItems, ...additionalMusic];

  return (
    <div className="flex flex-col h-full bg-[#110822] border border-[#291245] rounded-xl p-4 shadow-lg overflow-hidden">
      <div className="flex items-center justify-between mb-4 shrink-0">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <span className="text-[#1db954]">🎵</span> Soundtrack for Your Vibe
        </h3>
        <button 
          className="text-xs text-white/50 hover:text-white transition-colors" 
          disabled={showSkeletons}
          onClick={handleSeeAll}
        >
          See All
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pb-2">
        {items.map((item, index) => {
          if (showSkeletons) {
            return (
              <div key={`skeleton-${index}`} className="flex flex-col gap-2 w-full">
                <div className={`aspect-square rounded-md bg-[#1c0f35] border border-[#291245] ${isLoading ? 'animate-pulse' : ''}`} />
                <div className="flex flex-col gap-1.5 mt-1">
                  <div className={`h-4 bg-[#1c0f35] rounded w-3/4 ${isLoading ? 'animate-pulse' : ''}`} />
                  <div className={`h-3 bg-[#1c0f35] rounded w-1/2 ${isLoading ? 'animate-pulse' : ''}`} />
                </div>
                <div className={`mt-auto pt-1 h-8 w-28 bg-[#1db954]/10 rounded-md ${isLoading ? 'animate-pulse' : ''}`} />
              </div>
            );
          }

          return (
            <div key={item.id} className="group flex flex-col gap-2 w-full h-full">
              <a 
                href={item.destinationUrl || "#"} 
                target={item.destinationUrl ? "_blank" : undefined}
                rel={item.destinationUrl ? "noopener noreferrer" : undefined}
                onClick={(e) => {
                  if (!item.destinationUrl) {
                    e.preventDefault();
                  }
                }}
                className={`relative aspect-square rounded-md overflow-hidden bg-[#1c0f35] border border-[#291245] block transition-colors ${item.destinationUrl ? 'group-hover:border-[#e81cff]/50' : 'cursor-not-allowed opacity-80'}`}
              >
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-indigo-900 to-purple-900 opacity-50 flex items-center justify-center">
                    <span className="text-white/30 text-2xl">🎵</span>
                  </div>
                )}
                
                {item.duration && (
                  <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 bg-black/80 rounded-sm text-[9px] font-bold text-white">
                    {item.duration}
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
                  onClick={(e) => {
                    if (!item.destinationUrl) e.preventDefault();
                  }}
                  className={`text-sm font-semibold line-clamp-2 leading-tight ${item.destinationUrl ? 'text-white/90 hover:underline' : 'text-white/70 cursor-not-allowed'}`}
                  title={item.title}
                >
                  {item.title}
                </a>
                <p className="text-xs text-white/60 truncate mt-1">{item.creator}</p>
              </div>
              
              <div className="flex items-center justify-between mt-auto pt-1">
                {item.matchScore && (
                  <span className="text-[10px] font-bold text-[#1db954]">{item.matchScore}% Match</span>
                )}
              </div>
              
              <a 
                href={item.destinationUrl || "#"} 
                target={item.destinationUrl ? "_blank" : undefined}
                rel={item.destinationUrl ? "noopener noreferrer" : undefined}
                onClick={(e) => {
                  if (!item.destinationUrl) e.preventDefault();
                }}
                className={`mt-1 flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-md text-xs font-medium w-full transition-colors ${item.destinationUrl ? 'bg-[#1db954]/10 text-[#1db954] hover:bg-[#1db954]/20' : 'bg-white/5 text-white/30 cursor-not-allowed'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.587 14.424a.636.636 0 0 1-.873.208c-2.394-1.462-5.41-1.792-8.966-.983a.64.64 0 0 1-.786-.48.64.64 0 0 1 .479-.785c3.9-.89 7.234-.526 9.938 1.127a.636.636 0 0 1 .208.913zm1.168-3.07a.798.798 0 0 1-1.096.26c-2.73-1.674-6.938-2.174-10.158-1.192a.8.8 0 1 1-.466-1.531c3.7-1.127 8.358-.567 11.46 1.334a.8.8 0 0 1 .26 1.13zm.12-3.226C14.596 8.163 8.468 7.95 4.93 9.023a.998.998 0 1 1-.58-1.912c4.053-1.229 10.835-1.002 14.773 1.332a1 1 0 1 1-1.248 1.685z"/></svg>
                Open in Spotify
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
                <span className="text-[#1db954]">🎵</span> Soundtrack for Your Vibe
              </h2>
              <button 
                onClick={() => setIsExpanded(false)}
                className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            
            <div className="p-4 md:p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-[#291245] scrollbar-track-transparent">
              {isLoadingAdditional ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-[#1db954] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white/60 text-sm">Loading more music...</p>
                  </div>
                </div>
              ) : loadError ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <p className="text-white/60 text-sm mb-4">{loadError}</p>
                    <button 
                      onClick={handleSeeAll}
                      className="px-4 py-2 bg-[#1db954]/10 text-[#1db954] rounded-md hover:bg-[#1db954]/20 transition-colors text-sm"
                    >
                      Retry
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {expandedItems.map((item) => (
                  <div key={`expanded-${item.id}`} className="group flex flex-col gap-2 w-full h-full">
                    <a 
                      href={item.destinationUrl || "#"} 
                      target={item.destinationUrl ? "_blank" : undefined}
                      rel={item.destinationUrl ? "noopener noreferrer" : undefined}
                      onClick={(e) => {
                        if (!item.destinationUrl) {
                          e.preventDefault();
                        }
                      }}
                      className={`relative aspect-square rounded-md overflow-hidden bg-[#1c0f35] border border-[#291245] block transition-colors ${item.destinationUrl ? 'group-hover:border-[#e81cff]/50' : 'cursor-not-allowed opacity-80'}`}
                    >
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-indigo-900 to-purple-900 opacity-50 flex items-center justify-center">
                          <span className="text-white/30 text-2xl">🎵</span>
                        </div>
                      )}
                      
                      {item.duration && (
                        <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 bg-black/80 rounded-sm text-[9px] font-bold text-white">
                          {item.duration}
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
                        onClick={(e) => {
                          if (!item.destinationUrl) e.preventDefault();
                        }}
                        className={`text-sm font-semibold line-clamp-2 leading-tight ${item.destinationUrl ? 'text-white/90 hover:underline' : 'text-white/70 cursor-not-allowed'}`}
                        title={item.title}
                      >
                        {item.title}
                      </a>
                      <p className="text-xs text-white/60 truncate mt-1">{item.creator}</p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-auto pt-1">
                      {item.matchScore && (
                        <span className="text-[10px] font-bold text-[#1db954]">{item.matchScore}% Match</span>
                      )}
                    </div>
                    
                    <a 
                      href={item.destinationUrl || "#"} 
                      target={item.destinationUrl ? "_blank" : undefined}
                      rel={item.destinationUrl ? "noopener noreferrer" : undefined}
                      onClick={(e) => {
                        if (!item.destinationUrl) e.preventDefault();
                      }}
                      className={`mt-1 flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-md text-xs font-medium w-full transition-colors ${item.destinationUrl ? 'bg-[#1db954]/10 text-[#1db954] hover:bg-[#1db954]/20' : 'bg-white/5 text-white/30 cursor-not-allowed'}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.587 14.424a.636.636 0 0 1-.873.208c-2.394-1.462-5.41-1.792-8.966-.983a.64.64 0 0 1-.786-.48.64.64 0 0 1 .479-.785c3.9-.89 7.234-.526 9.938 1.127a.636.636 0 0 1 .208.913zm1.168-3.07a.798.798 0 0 1-1.096.26c-2.73-1.674-6.938-2.174-10.158-1.192a.8.8 0 1 1-.466-1.531c3.7-1.127 8.358-.567 11.46 1.334a.8.8 0 0 1 .26 1.13zm.12-3.226C14.596 8.163 8.468 7.95 4.93 9.023a.998.998 0 1 1-.58-1.912c4.053-1.229 10.835-1.002 14.773 1.332a1 1 0 1 1-1.248 1.685z"/></svg>
                      Open in Spotify
                    </a>
                  </div>
                ))}
              </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
