import { MapPin, Calendar, Crown, Edit2, Camera } from "lucide-react";
import Image from "next/image";

export function ProfileHero() {
  return (
    <div className="relative overflow-hidden rounded-[24px] border border-[#1e2338] bg-[#0A0D18] h-[280px]">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        
        {/* Richer purple radial glow */}
        <div className="absolute right-[15%] top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/40 blur-[120px] rounded-full mix-blend-screen" />

        {/* Background Image */}
        <div 
          className="absolute right-0 top-0 bottom-0 w-[75%] brightness-150 saturate-125 transition-all duration-700" 
          style={{ 
            backgroundImage: 'url("/profile-bg-moon.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 30%, black 100%)',
            maskImage: 'linear-gradient(to right, transparent 0%, black 30%, black 100%)'
          }}
        />
        
        {/* Smoother dark overlay from left to right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0D18] via-[#0A0D18]/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D18] via-transparent to-transparent" />
      </div>

      <div className="absolute top-6 right-6">
        <button className="flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-4 py-2 text-[13px] font-medium text-white backdrop-blur-md transition-colors hover:bg-black/60">
          <Edit2 className="h-3.5 w-3.5" />
          Edit Profile
        </button>
      </div>

      <div className="absolute bottom-8 left-8 flex flex-col justify-end">
        <div className="flex items-center gap-6">
          {/* Avatar */}
          <div className="relative h-[96px] w-[96px] shrink-0 rounded-full border-2 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.3)] bg-[#111526]">
            <div className="flex h-full w-full items-center justify-center rounded-full">
              <span className="text-[36px] font-bold text-white">AM</span>
            </div>
            <button className="absolute bottom-0 right-0 flex h-[22px] w-[22px] items-center justify-center rounded-full border-2 border-[#0A0D18] bg-[#2a3045] text-white hover:bg-[#343b54] shadow-sm translate-x-1 translate-y-1">
              <Camera className="h-3 w-3" />
            </button>
          </div>

          {/* User Info */}
          <div className="flex flex-col">
            <h1 className="text-[32px] font-bold text-white leading-tight">Alex Morgan</h1>
            <p className="text-[15px] text-white/60">@alexvibes</p>
            <p className="mt-2 max-w-md text-[14px] text-white/80 leading-relaxed">
              Curating calm nights, focused mornings, and unexpected entertainment discoveries.
            </p>
            
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[12px] text-white/70 backdrop-blur-sm">
                <MapPin className="h-3.5 w-3.5" />
                San Francisco, CA
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[12px] text-white/70 backdrop-blur-sm">
                <Calendar className="h-3.5 w-3.5" />
                Joined May 2025
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-[12px] font-medium text-amber-400 backdrop-blur-sm">
                <Crown className="h-3.5 w-3.5" />
                Premium Member
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
