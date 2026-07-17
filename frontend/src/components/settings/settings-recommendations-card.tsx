import { Sparkles, Activity, PlusCircle, MinusCircle, RefreshCw } from "lucide-react";
import { ChevronDown } from "lucide-react";

export function SettingsRecommendationsCard() {
  return (
    <div className="flex flex-col rounded-[20px] border border-white/[0.06] bg-[#0D1220] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.12] hover:shadow-[0_15px_50px_rgba(0,0,0,0.5)]">
      
      {/* Header */}
      <div className="flex items-center gap-5 pb-6 border-b border-white/[0.06]">
        <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[16px] bg-purple-500/10 border border-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.15)]">
          <Sparkles className="h-6 w-6 text-purple-400" />
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="text-[22px] font-bold text-white leading-none mb-1.5">Recommendations</h3>
          <p className="text-[14px] text-white/60 leading-none">Fine-tune the recommendations you receive.</p>
        </div>
      </div>

      <div className="flex flex-col">
        
        {/* Match Sensitivity */}
        <div className="group flex items-center justify-between h-[72px] border-b border-white/[0.06] last:border-b-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.02] border border-white/[0.05] group-hover:bg-purple-500/10 group-hover:border-purple-500/30 transition-all duration-300">
              <Activity className="h-4 w-4 text-white/40 group-hover:text-purple-400 transition-colors duration-300" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-[15px] font-semibold text-white leading-none mb-1.5">Match sensitivity</span>
              <span className="text-[13px] text-white/50 leading-none">Control how closely recommendations match your vibe.</span>
            </div>
          </div>
          <div className="flex items-center rounded-[12px] bg-[#111628] border border-white/5 p-1 shadow-inner">
            <button className="px-3 py-1.5 text-[12px] font-semibold text-white/50 hover:text-white rounded-[10px] transition-colors">Relaxed</button>
            <button className="px-3 py-1.5 text-[12px] font-semibold text-white bg-purple-600 rounded-[10px] shadow-[0_0_15px_rgba(147,51,234,0.3)] transition-colors">Balanced</button>
            <button className="px-3 py-1.5 text-[12px] font-semibold text-white/50 hover:text-white rounded-[10px] transition-colors">Strict</button>
          </div>
        </div>

        {/* Include More */}
        <div className="group flex items-center justify-between h-[72px] border-b border-white/[0.06] last:border-b-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.02] border border-white/[0.05] group-hover:bg-purple-500/10 group-hover:border-purple-500/30 transition-all duration-300">
              <PlusCircle className="h-4 w-4 text-white/40 group-hover:text-purple-400 transition-colors duration-300" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-[15px] font-semibold text-white leading-none mb-1.5">Include more of</span>
              <span className="text-[13px] text-white/50 leading-none">Choose what you want to see more in your results.</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[13px] text-white/50">5 selected</span>
            <button className="rounded-[10px] bg-[#1a1f36] border border-white/10 px-4 py-2 text-[12px] font-bold text-white hover:bg-[#252a41] hover:border-white/20 transition-all shadow-sm">
              Customize
            </button>
          </div>
        </div>

        {/* Exclude From */}
        <div className="group flex items-center justify-between h-[72px] border-b border-white/[0.06] last:border-b-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.02] border border-white/[0.05] group-hover:bg-purple-500/10 group-hover:border-purple-500/30 transition-all duration-300">
              <MinusCircle className="h-4 w-4 text-white/40 group-hover:text-purple-400 transition-colors duration-300" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-[15px] font-semibold text-white leading-none mb-1.5">Exclude from</span>
              <span className="text-[13px] text-white/50 leading-none">Choose what you want to see less in your results.</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[13px] text-white/50">2 selected</span>
            <button className="rounded-[10px] bg-[#1a1f36] border border-white/10 px-4 py-2 text-[12px] font-bold text-white hover:bg-[#252a41] hover:border-white/20 transition-all shadow-sm">
              Customize
            </button>
          </div>
        </div>

        {/* Refresh */}
        <div className="group flex items-center justify-between h-[72px] border-b border-white/[0.06] last:border-b-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.02] border border-white/[0.05] group-hover:bg-purple-500/10 group-hover:border-purple-500/30 transition-all duration-300">
              <RefreshCw className="h-4 w-4 text-white/40 group-hover:text-purple-400 transition-colors duration-300" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-[15px] font-semibold text-white leading-none mb-1.5">Refresh recommendations</span>
              <span className="text-[13px] text-white/50 leading-none">How often should we refresh your recommendations?</span>
            </div>
          </div>
          <button className="flex items-center justify-between w-[140px] rounded-full bg-[#111628] border border-white/10 hover:border-purple-500/50 hover:bg-[#161a2b] px-4 py-2 text-[13px] font-semibold text-white transition-all shadow-sm">
            Every 24 hours
            <ChevronDown className="h-4 w-4 text-white/50" />
          </button>
        </div>

      </div>
    </div>
  );
}
