import { Card } from "@/components/ui/card";

export function AuthVisualUniverse() {
  return (
    <div className="relative w-full h-[500px] max-w-[600px] mx-auto animate-fade-in mt-4" aria-hidden="true">
      
      {/* Connecting Wires / Orbital Lines */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 600 500" style={{ filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.2))' }}>
          <defs>
            <linearGradient id="wire-blue-purple" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#8338ec" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="wire-pink-orange" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff0a54" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ff7e67" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="wire-orange-yellow" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff512f" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Left C-curve (Spotify top to Pinterest bottom-left) */}
          <path 
            d="M 150,0 C -150,50 -150,450 50,480" 
            fill="none" 
            stroke="url(#wire-blue-purple)" 
            strokeWidth="3" 
            strokeDasharray="6 6" 
          />
          
          {/* Right C-curve (Netflix top to Books bottom-right) */}
          <path 
            d="M 400,-20 C 700,-50 750,350 550,500" 
            fill="none" 
            stroke="url(#wire-pink-orange)" 
            strokeWidth="3" 
            strokeDasharray="6 6" 
          />
          
          {/* Inner line (Netflix bottom to Pinterest) */}
          <path 
            d="M 280,300 Q 250,350 200,380" 
            fill="none" 
            stroke="url(#wire-purple-orange)" 
            strokeWidth="3" 
            strokeDasharray="6 6" 
          />

          {/* Inner line (Netflix bottom to Books) */}
          <path 
            d="M 350,300 Q 400,350 450,400" 
            fill="none" 
            stroke="url(#wire-pink-orange)" 
            strokeWidth="3" 
            strokeDasharray="6 6" 
          />
        </svg>

        {/* Ambient Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px]">
          <div className="absolute inset-0 bg-[#8338ec]/15 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
        </div>
      </div>

      <div className="absolute inset-0 z-10">
        
        {/* Spotify Card */}
        <div className="absolute top-[-5%] left-[-15%] z-20 w-[240px] bg-[#0d061a]/95 backdrop-blur-md rounded-2xl border border-[#37195c] shadow-2xl overflow-hidden transform -rotate-6 hover:rotate-0 hover:-translate-y-1 transition-all duration-300">
          <div className="p-3 pb-1 flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#1DB954] flex items-center justify-center">
              <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.54.659.3 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.84.24 1.2zM18.96 10.14C14.76 7.62 8.52 7.44 4.92 8.52c-.6.18-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.2-1.2 11.04-1.02 15.72 1.74.54.36.72 1.02.36 1.56-.36.539-1.02.719-1.38.42z"/></svg>
            </div>
            <span className="text-[13px] font-semibold text-white/90">Spotify</span>
          </div>
          <div className="p-3">
            <div className="w-full aspect-square rounded-lg overflow-hidden mb-3">
              <img src="/assets/music-demo.png" alt="Space Song album cover" className="w-full h-full object-cover shadow-sm" />
            </div>
            <div className="flex flex-col">
              <h4 className="text-[14px] font-semibold text-white leading-tight mb-0.5">Space Song</h4>
              <p className="text-[12px] text-white/60 mb-2">Beach House</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                <svg className="w-2.5 h-2.5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </div>
              <div className="flex-1 h-1 bg-white/10 rounded-full relative overflow-hidden">
                <div className="absolute top-0 left-0 h-full w-[35%] bg-[#1DB954] rounded-full"></div>
              </div>
              <div className="w-5 h-5 rounded-full bg-[#1DB954] flex items-center justify-center">
                 <svg className="w-3 h-3 text-black" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm-1.999 14.413-4.713-4.705 1.414-1.414 3.299 3.293 7.293-7.293 1.414 1.414-8.707 8.705z"/></svg>
              </div>
            </div>
          </div>
        </div>

        {/* Netflix Card */}
        <div className="absolute top-[-10%] left-[50%] -translate-x-1/2 z-10 w-[220px] bg-[#0d061a]/95 backdrop-blur-md rounded-2xl border border-[#37195c] shadow-2xl overflow-hidden transform rotate-2 hover:rotate-0 hover:-translate-y-1 transition-all duration-300">
          <div className="p-3 pb-1 flex items-center gap-2">
            <div className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-[#E50914] text-[16px]">N</div>
            <span className="text-[13px] font-semibold text-white/90">Netflix</span>
          </div>
          <div className="p-3">
            <img src="/assets/movie-demo.png" alt="Interstellar poster" className="w-full aspect-[2/3] rounded-lg object-cover shadow-md mb-3" />
            <div className="flex flex-col">
              <h4 className="text-[14px] font-semibold text-white leading-[1.2] mb-1">Interstellar</h4>
              <p className="text-[11px] text-white/60">Sci-Fi • 2h 49m</p>
            </div>
          </div>
        </div>

        {/* YouTube Card */}
        <div className="absolute top-[5%] right-[-15%] z-0 w-[240px] bg-[#0d061a]/95 backdrop-blur-md rounded-2xl border border-[#37195c] shadow-2xl overflow-hidden transform rotate-6 hover:rotate-0 hover:-translate-y-1 transition-all duration-300">
          <div className="p-3 pb-2 flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#FF0000] flex items-center justify-center">
              <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </div>
            <span className="text-[13px] font-semibold text-white/90">YouTube</span>
          </div>
          <div className="px-3 pb-4">
            <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden mb-3 shadow-md">
              <img src="/assets/youtube-demo.png" alt="Tokyo Night Walk" className="w-full h-full object-cover" />
              <div className="absolute bottom-1.5 right-1.5 bg-black/80 px-1.5 py-0.5 rounded text-[10px] font-medium text-white backdrop-blur-sm">18:42</div>
            </div>
            <h4 className="text-[13px] font-semibold text-white leading-tight mb-1">Tokyo Night Walk</h4>
          </div>
        </div>

        {/* Pinterest Card */}
        <div className="absolute bottom-[-5%] left-[-5%] z-30 w-[280px] bg-[#0d061a]/95 backdrop-blur-md rounded-2xl border border-[#37195c] shadow-2xl overflow-hidden transform -rotate-3 hover:rotate-0 hover:-translate-y-1 transition-all duration-300">
           <div className="p-3 pb-2 flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#E60023] flex items-center justify-center">
              <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.168 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.366 18.622 0 12.017 0z"/></svg>
            </div>
            <span className="text-[13px] font-semibold text-white/90">Pinterest</span>
          </div>
          <div className="px-3 pb-3">
            <div className="relative w-full h-[110px] rounded-lg overflow-hidden shadow-sm">
              <img src="/assets/pinterest-demo.png" className="w-full h-full object-cover" alt="Pinterest board" />
              <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded text-[11px] font-medium text-white shadow-md">+23</div>
            </div>
          </div>
        </div>

        {/* Books Card */}
        <div className="absolute bottom-[0%] right-[-10%] z-40 w-[240px] bg-[#0d061a]/95 backdrop-blur-md rounded-2xl border border-[#37195c] shadow-2xl overflow-hidden transform rotate-3 hover:rotate-0 hover:-translate-y-1 transition-all duration-300">
          <div className="p-3 pb-1 flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#38bdf8]/10 flex items-center justify-center">
              <svg className="w-3 h-3 text-[#38bdf8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            </div>
            <span className="text-[13px] font-semibold text-white/90">Books</span>
          </div>
          <div className="p-3">
            <div className="flex gap-4">
              <img src="/assets/book-demo.png" alt="The Midnight Library cover" className="w-[70px] h-[105px] rounded-md object-cover shadow-md" />
              <div className="flex flex-col justify-center">
                <h4 className="text-[14px] font-semibold text-white leading-tight mb-1">The Midnight<br/>Library</h4>
                <p className="text-[12px] text-white/60 mb-2">Matt Haig</p>
                <div className="flex items-center gap-1">
                  <span className="text-[#fbbf24] text-[12px]">★★★★★</span>
                  <span className="text-white/80 text-[11px] ml-1">4.6</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
