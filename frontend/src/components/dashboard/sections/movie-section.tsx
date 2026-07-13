"use client";

import { VibeMediaSectionData } from "@/components/vibe/vibe-experience.data";

interface MovieSectionProps {
  section: VibeMediaSectionData | null;
  isInitial?: boolean;
  isLoading?: boolean;
}

export function MovieSection({ section, isInitial, isLoading }: MovieSectionProps) {
  const showSkeletons = isInitial || isLoading || !section;
  // Featured item is the first one
  const featured = showSkeletons ? null : section!.items[0];

  return (
    <div className="flex flex-col h-full bg-[#110822] border border-[#291245] rounded-xl p-4 shadow-lg overflow-hidden relative">
      {/* Background blur from poster if available */}
      {!showSkeletons && featured?.imageUrl && (
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center blur-2xl pointer-events-none"
          style={{ backgroundImage: `url(${featured.imageUrl})` }}
        />
      )}
      
      <div className="relative z-10 flex items-center justify-between mb-4 shrink-0">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <span className="text-[#e50914] font-bold">N</span> Featured for Your Vibe <span className="text-white/40 font-normal text-xs">(Netflix)</span>
        </h3>
        <button className="text-xs text-white/50 hover:text-white transition-colors" disabled={showSkeletons}>
          See All
        </button>
      </div>
      
      <div className="relative z-10 flex gap-4 h-full">
        <div className={`w-[45%] shrink-0 rounded-md overflow-hidden bg-[#1c0f35] border border-[#291245] shadow-lg shadow-black/40 ${isLoading ? 'animate-pulse' : ''}`}>
          {!showSkeletons && featured?.imageUrl ? (
            <img src={featured.imageUrl} alt={featured.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full min-h-[160px] bg-gradient-to-br from-indigo-900 to-purple-900 opacity-50 flex items-center justify-center">
              {!showSkeletons && <span className="text-white/30 text-2xl">🎬</span>}
            </div>
          )}
        </div>
        
        <div className="flex flex-col flex-1 justify-center py-1">
          {showSkeletons ? (
            <>
              <div className={`h-5 bg-[#1c0f35] rounded w-full mb-3 ${isLoading ? 'animate-pulse' : ''}`} />
              <div className={`h-3 bg-[#1c0f35] rounded w-2/3 mb-4 ${isLoading ? 'animate-pulse' : ''}`} />
              <div className={`h-3 bg-[#1c0f35] rounded w-full mb-1 ${isLoading ? 'animate-pulse' : ''}`} />
              <div className={`h-3 bg-[#1c0f35] rounded w-full mb-1 ${isLoading ? 'animate-pulse' : ''}`} />
              <div className={`h-3 bg-[#1c0f35] rounded w-4/5 ${isLoading ? 'animate-pulse' : ''}`} />
            </>
          ) : (
            <>
              <h4 className="text-lg font-bold text-white leading-tight mb-1">{featured!.title}</h4>
              
              <div className="flex items-center gap-2 text-[10px] text-white/60 mb-2">
                {featured!.year && <span>{featured!.year}</span>}
                {featured!.duration && <span>{featured!.duration}</span>}
                {!!featured!.metadata?.rating && <span className="px-1 border border-white/20 rounded-sm">{String(featured!.metadata.rating)}</span>}
                {!!featured!.metadata?.imdb && (
                  <span className="flex items-center gap-1 text-[#fbbf24]">
                    ★ {String(featured!.metadata.imdb)}
                  </span>
                )}
              </div>
              
              <div className="flex flex-wrap gap-1 mb-2">
                {featured!.tags.slice(0, 3).map(tag => (
                  <span key={tag as string} className="px-1.5 py-0.5 bg-white/5 rounded text-[9px] text-white/70">
                    {tag as string}
                  </span>
                ))}
              </div>
              
              {featured!.matchScore && (
                <span className="text-xs font-bold text-[#1db954] mb-2">{featured!.matchScore}% Match</span>
              )}
              
              <p className="text-[11px] text-white/60 line-clamp-4 leading-[1.4]">
                {featured!.description}
              </p>
            </>
          )}
        </div>
      </div>
      
      <div className="relative z-10 mt-4 flex items-center gap-2">
        <a 
          href={showSkeletons ? "#" : (featured!.destinationUrl || "#")}
          target={!showSkeletons && featured!.destinationUrl ? "_blank" : undefined}
          rel={!showSkeletons && featured!.destinationUrl ? "noopener noreferrer" : undefined}
          className={`flex-1 flex items-center justify-center gap-2 h-9 rounded text-xs font-medium transition-colors ${showSkeletons ? 'bg-[#1c0f35] text-white/30 cursor-default' : 'bg-[#e50914] hover:bg-[#b81d24] text-white'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          Search on Netflix
        </a>
        
        <button className={`flex items-center justify-center w-9 h-9 rounded border transition-colors ${showSkeletons ? 'bg-transparent border-[#291245] text-[#291245] cursor-default' : 'bg-white/5 border-white/10 hover:bg-white/10 text-white'}`} title="Save" disabled>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
        </button>
        
        <button className={`flex items-center justify-center gap-1.5 px-3 h-9 rounded border text-[11px] transition-colors ${showSkeletons ? 'bg-transparent border-[#291245] text-[#291245] cursor-default' : 'bg-white/5 border-white/10 hover:bg-white/10 text-white'}`} title="More Info" disabled={showSkeletons}>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
          More Info
        </button>
      </div>
    </div>
  );
}
