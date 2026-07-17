import { MapPin, Calendar, Crown, Camera } from "lucide-react";

export function SettingsProfileBanner() {
  return (
    <div className="flex flex-col md:flex-row items-center gap-6 rounded-[20px] border border-white/[0.06] bg-[#0D1220] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
      
      {/* Avatar */}
      <div className="relative h-[80px] w-[80px] shrink-0 rounded-full border-2 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.3)] bg-[#111526]">
        <div className="flex h-full w-full items-center justify-center rounded-full">
          <span className="text-[28px] font-bold text-white">AM</span>
        </div>
        <button className="absolute bottom-0 right-0 flex h-[20px] w-[20px] items-center justify-center rounded-full border-2 border-[#0A0D18] bg-[#2a3045] text-white hover:bg-[#343b54] shadow-sm translate-x-1 translate-y-1">
          <Camera className="h-3 w-3" />
        </button>
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1">
        <h2 className="text-[24px] font-bold text-white leading-tight">Alex Morgan</h2>
        <p className="text-[14px] text-white/60">@alexvibes</p>
        
        <div className="mt-3 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1.5 text-[13px] text-white/60">
            <MapPin className="h-4 w-4" />
            San Francisco, CA
          </div>
          <div className="flex items-center gap-1.5 text-[13px] text-white/60">
            <Calendar className="h-4 w-4" />
            Joined May 2025
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[12px] font-medium text-amber-400">
            <Crown className="h-3.5 w-3.5" />
            Premium Member
          </div>
        </div>
      </div>

      {/* Action */}
      <div className="shrink-0">
        <button className="rounded-[10px] bg-[#2e1065] border border-purple-500/30 px-5 py-2.5 text-[14px] font-bold text-white transition-colors hover:bg-[#3b0764]">
          Edit Profile
        </button>
      </div>

    </div>
  );
}
