import Link from "next/link";
import { Button } from "@/components/ui/button";

const PlayIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const StarIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#fbbf24" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export function LandingHero() {
  return (
    <section className="relative w-full pt-16 pb-20 md:pt-24 md:pb-32 overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Side: Content */}
          <div className="flex flex-col items-start gap-6 max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#75267D]/60 bg-[#250d47]/20 backdrop-blur-sm text-sm font-medium text-[#e8d5ff]">
              <span className="text-[#ffbe0b]">✦</span> Your Mood. Your Time. Your Universe.
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-[76px] font-bold leading-[1.05] tracking-tight text-white mt-2">
              Tell us your vibe.<br />
              We&apos;ll build your<br />
              <span className="bg-gradient-to-r from-[#ff7e67] via-[#ff0a54] to-[#8338ec] bg-clip-text text-transparent">perfect moment.</span>
            </h1>
            
            <p className="text-lg text-white/80 leading-[1.6] max-w-xl mt-4">
              VibeSync AI curates the perfect mix of music, movies,<br />
              YouTube, Pinterest visuals, and books—just for you.<br />
              One vibe. Infinite possibilities.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 mt-2">
              <Link href="/login">
                <Button size="lg" className="bg-gradient-to-r from-[#7B3FE4] via-[#D946EF] to-[#FF5E7E] text-white border-0 hover:opacity-90 shadow-lg shadow-[#D946EF]/25 h-14 px-8 text-lg font-semibold rounded-2xl flex items-center gap-2 transition-transform hover:scale-[1.02]">
                  <svg className="w-5 h-5 text-[#ffbe0b]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L14.2 9.8L22 12L14.2 14.2L12 22L9.8 14.2L2 12L9.8 9.8L12 2Z" />
                  </svg>
                  Build My Vibe
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 4L18.6 6.4L21 7L18.6 7.6L18 10L17.4 7.6L15 7L17.4 6.4L18 4ZM9 9L10.5 13.5L15 15L10.5 16.5L9 21L7.5 16.5L3 15L7.5 13.5L9 9Z" />
                  </svg>
                </Button>
              </Link>
              <button type="button" className="group flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-surface/50 transition-colors">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-surface border border-[var(--border-strong)] group-hover:border-primary/50 transition-colors">
                  {PlayIcon}
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-semibold text-foreground">See how it works</span>
                  <span className="text-xs text-foreground-subtle">Play 1-min video</span>
                </div>
              </button>
            </div>
            
            <div className="flex items-center gap-4 mt-8">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {[
                    "https://randomuser.me/api/portraits/men/32.jpg",
                    "https://randomuser.me/api/portraits/men/44.jpg",
                    "https://randomuser.me/api/portraits/men/68.jpg",
                    "https://randomuser.me/api/portraits/women/68.jpg"
                  ].map((src, i) => (
                    <div key={i} className="w-[38px] h-[38px] rounded-full border-[1.5px] border-[#0a041a] bg-surface overflow-hidden shadow-sm">
                      <img src={src} alt={`User ${i}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div className="text-[#6d5b99] font-light text-lg mt-[-2px]">+</div>
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex gap-1 mb-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span key={i}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#fbbf24" stroke="#eab308" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    </span>
                  ))}
                </div>
                <span className="text-[13px] text-white/80 font-medium">4.9/5 from 12,000+ users</span>
              </div>
            </div>
          </div>
          
          {/* Right Side: Visuals */}
          <div className="relative w-full h-[500px] lg:h-[650px] mt-10 lg:mt-0 flex items-center justify-center">
            
            {/* Center Glowing Node */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-[120px] h-[120px] rounded-full bg-[#150734] border-[2px] border-[#a23df5] shadow-[0_0_60px_rgba(162,61,245,0.7)]">
              {/* Outer flare rays */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] pointer-events-none z-[-1]">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="absolute top-1/2 left-1/2 w-[1px] h-full bg-gradient-to-t from-transparent via-[#a23df5]/40 to-transparent origin-center" style={{ transform: `translate(-50%, -50%) rotate(${i * 30}deg)` }}></div>
                ))}
              </div>

              <div className="absolute inset-[-12px] rounded-full border-[1.5px] border-[#a23df5]/30 pointer-events-none"></div>
              <div className="absolute inset-[-28px] rounded-full border border-[#a23df5]/15 border-dashed pointer-events-none"></div>
              
              <div className="flex items-center justify-center gap-[7px]">
                <div className="w-[9px] h-7 bg-[#00e5ff] rounded-full"></div>
                <div className="w-[9px] h-12 bg-[#536dfe] rounded-full"></div>
                <div className="w-[9px] h-[72px] bg-[#d500f9] rounded-full"></div>
                <div className="w-[9px] h-12 bg-[#f50057] rounded-full"></div>
                <div className="w-[9px] h-7 bg-[#ff5252] rounded-full"></div>
              </div>
            </div>

            {/* Connecting Lines SVG */}
            <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              {/* Spotify line */}
              <path d="M 50% 50% Q 30% 45% 15% 18%" fill="none" stroke="rgba(162, 61, 245, 0.5)" strokeWidth="1.5" strokeDasharray="3 4" />
              <circle cx="15%" cy="18%" r="3.5" fill="#a23df5" className="animate-pulse" />
              
              {/* YouTube line */}
              <path d="M 50% 50% Q 60% 45% 75% 12%" fill="none" stroke="rgba(162, 61, 245, 0.5)" strokeWidth="1.5" strokeDasharray="3 4" />
              <circle cx="75%" cy="12%" r="3.5" fill="#a23df5" className="animate-pulse" />
              
              {/* Pinterest line */}
              <path d="M 50% 50% Q 75% 55% 90% 32%" fill="none" stroke="rgba(162, 61, 245, 0.5)" strokeWidth="1.5" strokeDasharray="3 4" />
              <circle cx="90%" cy="32%" r="3.5" fill="#a23df5" className="animate-pulse" />
              
              {/* Books line */}
              <path d="M 50% 50% Q 35% 65% 12% 82%" fill="none" stroke="rgba(162, 61, 245, 0.5)" strokeWidth="1.5" strokeDasharray="3 4" />
              <circle cx="12%" cy="82%" r="3.5" fill="#a23df5" className="animate-pulse" />
              
              {/* Netflix line */}
              <path d="M 50% 50% Q 70% 65% 88% 85%" fill="none" stroke="rgba(162, 61, 245, 0.5)" strokeWidth="1.5" strokeDasharray="3 4" />
              <circle cx="88%" cy="85%" r="3.5" fill="#a23df5" className="animate-pulse" />
            </svg>

            {/* Floating Cards */}
            {/* Spotify Card */}
            <div className="absolute top-[8%] left-[0%] lg:left-[5%] z-10 w-[290px] bg-[#0d061a]/95 backdrop-blur-md rounded-2xl border border-[#37195c] shadow-2xl overflow-hidden transform -rotate-1 hover:rotate-0 hover:-translate-y-1 transition-all duration-300">
              <div className="p-3 pb-0 flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#1DB954] flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
                </div>
                <span className="text-[13px] font-semibold text-white/90">Spotify</span>
              </div>
              <div className="p-4 pt-3 flex gap-4">
                <img src="/assets/music-demo.png" alt="Space Song album cover" className="w-[76px] h-[76px] rounded-lg object-cover shadow-sm" />
                <div className="flex flex-col justify-center flex-1">
                  <h4 className="text-[15px] font-semibold text-white leading-tight mb-1">Space Song</h4>
                  <p className="text-[13px] text-white/60 mb-2.5">Beach House</p>
                  <div className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium text-[#4ade80] bg-[#4ade80]/10 border border-[#4ade80]/30 self-start">95% Match</div>
                </div>
              </div>
              <div className="px-4 pb-4 flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 cursor-pointer hover:bg-white/20 transition-colors">
                  <svg className="w-3 h-3 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </div>
                <div className="flex-1 h-1 bg-white/10 rounded-full relative overflow-hidden">
                  <div className="absolute top-0 left-0 h-full w-[35%] bg-[#1DB954] rounded-full"></div>
                </div>
                <div className="flex gap-[2px] items-end h-3">
                  {[4, 8, 5, 10, 6, 8, 4, 12, 7, 5, 9, 4].map((h, i) => (
                    <div key={i} className="w-[2px] bg-white/20 rounded-full" style={{ height: `${h}px` }}></div>
                  ))}
                </div>
              </div>
            </div>

            {/* YouTube Card */}
            <div className="absolute top-[0%] right-[0%] lg:right-[15%] z-10 w-[310px] bg-[#0d061a]/95 backdrop-blur-md rounded-2xl border border-[#37195c] shadow-2xl overflow-hidden transform rotate-2 hover:rotate-0 hover:-translate-y-1 transition-all duration-300">
              <div className="p-3 pb-2 flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#FF0000] flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </div>
                <span className="text-[13px] font-semibold text-white/90">YouTube</span>
              </div>
              <div className="px-3 pb-4">
                <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden mb-3 shadow-md">
                  <img src="/assets/youtube-demo.png" alt="Tokyo Night Walk" className="w-full h-full object-cover" />
                  <div className="absolute bottom-1.5 right-1.5 bg-black/80 px-1.5 py-0.5 rounded text-[10px] font-medium text-white backdrop-blur-sm">12:45</div>
                </div>
                <div className="flex justify-between items-start gap-2 px-1">
                  <div className="flex flex-col">
                    <h4 className="text-[14px] font-semibold text-white leading-tight mb-1.5">Tokyo Night Walk</h4>
                    <p className="text-[11px] text-white/60">4.8M views • 2 months ago</p>
                  </div>
                  <div className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium text-[#4ade80] bg-[#4ade80]/10 border border-[#4ade80]/30 flex-shrink-0 mt-0.5">93% Match</div>
                </div>
              </div>
            </div>

            {/* Pinterest Card */}
            <div className="absolute top-[28%] right-[-5%] lg:right-[-2%] z-20 w-[240px] bg-[#0d061a]/95 backdrop-blur-md rounded-2xl border border-[#37195c] shadow-2xl overflow-hidden transform rotate-3 hover:rotate-0 hover:-translate-y-1 transition-all duration-300">
               <div className="p-3 pb-2 flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#E60023] flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.168 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.366 18.622 0 12.017 0z"/></svg>
                </div>
                <span className="text-[13px] font-semibold text-white/90">Pinterest</span>
              </div>
              <div className="px-3 pb-3 relative">
                <img src="/assets/pinterest-demo.png" alt="Aesthetic board" className="w-full aspect-[4/3] rounded-lg object-cover shadow-sm" />
                <div className="absolute bottom-5 right-5 flex gap-1.5">
                  <div className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium text-[#4ade80] bg-[#0b1c14]/90 border border-[#4ade80]/30 shadow-md">92% Match</div>
                </div>
              </div>
            </div>

            {/* Books Card */}
            <div className="absolute bottom-[8%] left-[2%] z-30 w-[290px] bg-[#0d061a]/95 backdrop-blur-md rounded-2xl border border-[#37195c] shadow-2xl overflow-hidden transform rotate-1 hover:rotate-0 hover:-translate-y-1 transition-all duration-300">
              <div className="p-3 pb-1 flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-transparent flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#38bdf8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                </div>
                <span className="text-[13px] font-semibold text-white/90">Books</span>
              </div>
              <div className="p-4 pt-2 flex gap-4">
                <img src="/assets/book-demo.png" alt="The Midnight Library cover" className="w-[88px] h-[126px] rounded-md object-cover shadow-md" />
                <div className="flex flex-col justify-between py-1 w-full">
                  <div>
                    <h4 className="text-[14px] font-semibold text-white leading-[1.2] mb-1.5">The Midnight<br/>Library</h4>
                    <p className="text-[12px] text-white/60 mb-2">Matt Haig</p>
                    <div className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium text-[#4ade80] bg-[#4ade80]/10 border border-[#4ade80]/30">92% Match</div>
                  </div>
                  <div className="flex items-center gap-1.5 mt-2">
                    <div className="flex gap-[2px]">
                      {[1, 2, 3, 4, 5].map(i => <span key={i} className="text-[#fbbf24] text-[11px]">★</span>)}
                    </div>
                    <span className="text-white/80 text-[11px] font-medium mt-0.5">4.6</span>
                  </div>
                  <button type="button" className="mt-3 w-full text-[11px] font-medium py-1.5 px-3 rounded-md bg-white/5 hover:bg-white/10 transition-colors border border-white/10 flex items-center justify-between">
                    View Book
                    <svg className="w-3 h-3 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Netflix Card */}
            <div className="absolute bottom-[2%] right-[5%] z-30 w-[280px] bg-[#0d061a]/95 backdrop-blur-md rounded-2xl border border-[#37195c] shadow-2xl overflow-hidden transform -rotate-2 hover:rotate-0 hover:-translate-y-1 transition-all duration-300">
               <div className="p-3 pb-1 flex items-center gap-2">
                <div className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-[#E50914] text-[16px]">N</div>
                <span className="text-[13px] font-semibold text-white/90">Netflix</span>
              </div>
              <div className="p-4 pt-2 flex gap-4">
                <img src="/assets/movie-demo.png" alt="Interstellar poster" className="w-[88px] h-[126px] rounded-md object-cover shadow-md" />
                <div className="flex flex-col justify-between py-1 w-full">
                  <div>
                    <h4 className="text-[14px] font-semibold text-white leading-tight mb-1.5">Interstellar</h4>
                    <p className="text-[11px] text-white/60 mb-0.5">2014 • 2h 49m • PG-13</p>
                    <p className="text-[11px] text-white/60 mb-2.5">Sci-Fi • Emotional</p>
                    <div className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium text-[#4ade80] bg-[#4ade80]/10 border border-[#4ade80]/30">94% Match</div>
                  </div>
                  <button type="button" className="mt-3 w-full text-[11px] font-medium py-1.5 rounded-md bg-white/5 hover:bg-white/10 transition-colors border border-white/10">Watch on Netflix</button>
                </div>
              </div>
            </div>

            {/* Score Badge */}
            <div className="absolute bottom-[-5%] left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 px-5 py-2.5 bg-[#0d061a]/95 backdrop-blur-md rounded-full border border-[#37195c] shadow-xl">
              <span className="text-[13px] font-medium text-white/70">AI Match Score</span>
              <div className="flex items-center gap-1.5 text-[#4ade80]">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                <span className="text-[15px] font-bold">96%</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
