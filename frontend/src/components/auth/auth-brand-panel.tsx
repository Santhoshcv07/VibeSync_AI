import { VibeSyncBrand } from "@/components/marketing/vibesync-brand";
import { AuthVisualUniverse } from "./auth-visual-universe";



export function AuthBrandPanel() {
  return (
    <div className="hidden lg:flex lg:w-[45%] xl:w-[40%] relative flex-col justify-start px-8 lg:px-12 xl:px-16 pt-4 pb-8 h-full overflow-hidden">
      {/* Floating Stars Background */}
      <div className="absolute top-[8%] left-[5%] w-3 h-3 text-[#ffb86c] animate-pulse">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C12 6.62742 17.3726 12 24 12C17.3726 12 12 17.3726 12 24C12 17.3726 6.62742 12 0 12C6.62742 12 12 6.62742 12 0Z" />
        </svg>
      </div>
      <div className="absolute top-[18%] right-[25%] w-4 h-4 text-[#ffb86c] animate-pulse" style={{ animationDelay: '1s' }}>
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C12 6.62742 17.3726 12 24 12C17.3726 12 12 17.3726 12 24C12 17.3726 6.62742 12 0 12C6.62742 12 12 6.62742 12 0Z" />
        </svg>
      </div>
      <div className="absolute bottom-[30%] right-[10%] w-2 h-2 text-white/40 animate-pulse" style={{ animationDelay: '2s' }}>
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C12 6.62742 17.3726 12 24 12C17.3726 12 12 17.3726 12 24C12 17.3726 6.62742 12 0 12C6.62742 12 12 6.62742 12 0Z" />
        </svg>
      </div>
      
      <div className="relative z-10 w-full max-w-lg">
        <VibeSyncBrand />
        <div className="mt-4 ml-8 md:ml-12 relative">
          <h1 className="text-3xl md:text-4xl xl:text-5xl font-bold leading-[1.1] tracking-tight text-white mb-3">
            One vibe.<br />
            <span className="bg-gradient-to-br from-[#ff512f] via-[#c026d3] to-[#38bdf8] bg-clip-text text-transparent">
              Infinite<br />
              possibilities.
            </span>
          </h1>

          <div className="absolute right-[5%] top-[15%] md:right-[-5%] md:top-[25%] animate-pulse" style={{ animationDuration: '4s' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="url(#music-gradient)" style={{ filter: 'drop-shadow(0px 4px 10px rgba(192,38,211,0.5))' }}>
              <defs>
                <linearGradient id="music-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#c026d3" />
                  <stop offset="100%" stopColor="#38bdf8" />
                </linearGradient>
              </defs>
              <path d="M21.65,2.24a1,1,0,0,0-.8-.23l-13,2A1,1,0,0,0,7,5V15.35A3.45,3.45,0,0,0,5.5,15,3.5,3.5,0,1,0,9,18.5V10.86L20,9.17v4.18A3.45,3.45,0,0,0,18.5,13,3.5,3.5,0,1,0,22,16.5V3A1,1,0,0,0,21.65,2.24Z" />
            </svg>
          </div>

          <p className="text-xs md:text-sm text-white/60 leading-[1.6] max-w-xs mt-3">
            VibeSync AI curates music, movies, YouTube, Pinterest visuals, and books that match your mood, time, and energy.
          </p>
        </div>
      </div>
      
      {/* Visual Cards Cluster */}
      <div className="relative z-10 mt-4 lg:mt-8 w-full h-[280px] xl:h-[320px] flex justify-center">
        <div className="transform scale-[0.55] xl:scale-[0.6] origin-top">
          <AuthVisualUniverse />
        </div>
      </div>
      
      {/* Review Section */}
      <div className="relative z-10 ml-12 md:ml-16 mt-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2.5">
              <div className="w-7 h-7 rounded-full border-[1.5px] border-[#0f0a1c] overflow-hidden bg-gray-800">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" className="w-full h-full object-cover" />
              </div>
              <div className="w-7 h-7 rounded-full border-[1.5px] border-[#0f0a1c] overflow-hidden bg-gray-800">
                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" className="w-full h-full object-cover" />
              </div>
              <div className="w-7 h-7 rounded-full border-[1.5px] border-[#0f0a1c] overflow-hidden bg-gray-800">
                <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="User" className="w-full h-full object-cover" />
              </div>
              <div className="w-7 h-7 rounded-full border-[1.5px] border-[#0f0a1c] overflow-hidden bg-gray-800">
                <img src="https://randomuser.me/api/portraits/women/90.jpg" alt="User" className="w-full h-full object-cover" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1 mb-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-3.5 h-3.5 text-[#fbbf24]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-xs font-medium text-white/90">4.9/5 from 12,000+ users</p>
            </div>
          </div>
          <p className="text-[13px] text-white/70">
            Join thousands of people building their perfect vibe.
          </p>
        </div>
      </div>
    </div>
  );
}
