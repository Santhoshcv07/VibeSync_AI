import { Star, Target, Layers, Play, Clock, Power } from "lucide-react";
import { ChevronDown } from "lucide-react";

export function SettingsExperienceCard() {
  return (
    <div className="flex flex-col rounded-[20px] border border-white/[0.06] bg-[#0D1220] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.12] hover:shadow-[0_15px_50px_rgba(0,0,0,0.5)]">
      
      {/* Header */}
      <div className="flex items-center gap-5 pb-6 border-b border-white/[0.06]">
        <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[16px] bg-purple-500/10 border border-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.15)]">
          <Star className="h-6 w-6 text-purple-400" />
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="text-[22px] font-bold text-white leading-none mb-1.5">Experience</h3>
          <p className="text-[14px] text-white/60 leading-none">Control how VibeSync works for you.</p>
        </div>
      </div>

      <div className="flex flex-col">
        
        {/* Default Mood */}
        <div className="group flex items-center justify-between h-[72px] border-b border-white/[0.06] last:border-b-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.02] border border-white/[0.05] group-hover:bg-purple-500/10 group-hover:border-purple-500/30 transition-all duration-300">
              <Target className="h-4 w-4 text-white/40 group-hover:text-purple-400 transition-colors duration-300" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-[15px] font-semibold text-white leading-none mb-1.5">Default mood</span>
              <span className="text-[13px] text-white/50 leading-none">Select the mood you want to see when you open VibeSync.</span>
            </div>
          </div>
          <button className="flex items-center justify-between w-[130px] rounded-full bg-[#111628] border border-white/10 hover:border-purple-500/50 hover:bg-[#161a2b] px-4 py-2 text-[13px] font-semibold text-white transition-all shadow-sm">
            Chill
            <ChevronDown className="h-4 w-4 text-white/50" />
          </button>
        </div>

        {/* Content Variety */}
        <div className="group flex items-center justify-between h-[72px] border-b border-white/[0.06] last:border-b-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.02] border border-white/[0.05] group-hover:bg-purple-500/10 group-hover:border-purple-500/30 transition-all duration-300">
              <Layers className="h-4 w-4 text-white/40 group-hover:text-purple-400 transition-colors duration-300" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-[15px] font-semibold text-white leading-none mb-1.5">Content variety</span>
              <span className="text-[13px] text-white/50 leading-none">Control the variety of results in your recommendations.</span>
            </div>
          </div>
          <div className="flex items-center rounded-[12px] bg-[#111628] border border-white/5 p-1 shadow-inner">
            <button className="px-4 py-1.5 text-[12px] font-semibold text-white/50 hover:text-white rounded-[10px] transition-colors">Low</button>
            <button className="px-4 py-1.5 text-[12px] font-semibold text-white bg-purple-600 rounded-[10px] shadow-[0_0_15px_rgba(147,51,234,0.3)] transition-colors">Balanced</button>
            <button className="px-4 py-1.5 text-[12px] font-semibold text-white/50 hover:text-white rounded-[10px] transition-colors">High</button>
          </div>
        </div>

        {/* Auto-play */}
        <div className="group flex items-center justify-between h-[72px] border-b border-white/[0.06] last:border-b-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.02] border border-white/[0.05] group-hover:bg-purple-500/10 group-hover:border-purple-500/30 transition-all duration-300">
              <Play className="h-4 w-4 text-white/40 group-hover:text-purple-400 transition-colors duration-300" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-[15px] font-semibold text-white leading-none mb-1.5">Auto-play previews</span>
              <span className="text-[13px] text-white/50 leading-none">Automatically play previews when browsing content.</span>
            </div>
          </div>
          <button className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full bg-purple-600 shadow-[0_0_10px_rgba(147,51,234,0.4)] transition-colors focus:outline-none">
            <span className="translate-x-[22px] inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform" />
          </button>
        </div>

        {/* Save History */}
        <div className="group flex items-center justify-between h-[72px] border-b border-white/[0.06] last:border-b-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.02] border border-white/[0.05] group-hover:bg-purple-500/10 group-hover:border-purple-500/30 transition-all duration-300">
              <Clock className="h-4 w-4 text-white/40 group-hover:text-purple-400 transition-colors duration-300" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-[15px] font-semibold text-white leading-none mb-1.5">Save history</span>
              <span className="text-[13px] text-white/50 leading-none">Save your vibe history to get better recommendations.</span>
            </div>
          </div>
          <button className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full bg-purple-600 shadow-[0_0_10px_rgba(147,51,234,0.4)] transition-colors focus:outline-none">
            <span className="translate-x-[22px] inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform" />
          </button>
        </div>

        {/* Generate on Launch */}
        <div className="group flex items-center justify-between h-[72px] border-b border-white/[0.06] last:border-b-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.02] border border-white/[0.05] group-hover:bg-purple-500/10 group-hover:border-purple-500/30 transition-all duration-300">
              <Power className="h-4 w-4 text-white/40 group-hover:text-purple-400 transition-colors duration-300" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-[15px] font-semibold text-white leading-none mb-1.5">Generate on launch</span>
              <span className="text-[13px] text-white/50 leading-none">Show the Generate Vibe screen when you launch the app.</span>
            </div>
          </div>
          <button className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full bg-[#1e2338] transition-colors focus:outline-none border border-white/5">
            <span className="translate-x-[2px] inline-block h-5 w-5 transform rounded-full bg-white/40 transition-transform" />
          </button>
        </div>

      </div>
    </div>
  );
}
