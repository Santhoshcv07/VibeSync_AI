import { Palette, Moon, Sun, Monitor, Image, Layout } from "lucide-react";

export function SettingsAppearanceCard() {
  return (
    <div className="flex flex-col rounded-[20px] border border-white/[0.06] bg-[#0D1220] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.12] hover:shadow-[0_15px_50px_rgba(0,0,0,0.5)]">
      
      {/* Header */}
      <div className="flex items-center gap-5 pb-6 border-b border-white/[0.06]">
        <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[16px] bg-purple-500/10 border border-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.15)]">
          <Palette className="h-6 w-6 text-purple-400" />
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="text-[22px] font-bold text-white leading-none mb-1.5">Appearance</h3>
          <p className="text-[14px] text-white/60 leading-none">Customize how VibeSync looks.</p>
        </div>
      </div>

      <div className="flex flex-col">
        
        {/* Theme */}
        <div className="group flex items-center justify-between h-[72px] border-b border-white/[0.06] last:border-b-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.02] border border-white/[0.05] group-hover:bg-purple-500/10 group-hover:border-purple-500/30 transition-all duration-300">
              <Moon className="h-4 w-4 text-white/40 group-hover:text-purple-400 transition-colors duration-300" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-[15px] font-semibold text-white leading-none mb-1.5">Theme</span>
              <span className="text-[13px] text-white/50 leading-none">Choose your preferred theme.</span>
            </div>
          </div>
          <div className="flex items-center rounded-[12px] bg-[#111628] border border-white/5 p-1 shadow-inner">
            <button className="flex items-center gap-2 px-4 py-1.5 text-[12px] font-semibold text-white bg-purple-600 rounded-[10px] shadow-[0_0_15px_rgba(147,51,234,0.3)] transition-colors">
              <Moon className="h-3.5 w-3.5" />
              Dark
            </button>
            <button className="flex items-center gap-2 px-4 py-1.5 text-[12px] font-semibold text-white/50 hover:text-white rounded-[10px] transition-colors">
              <Sun className="h-3.5 w-3.5" />
              Dim
            </button>
            <button className="flex items-center gap-2 px-4 py-1.5 text-[12px] font-semibold text-white/50 hover:text-white rounded-[10px] transition-colors">
              <Monitor className="h-3.5 w-3.5" />
              System
            </button>
          </div>
        </div>

        {/* Accent Color */}
        <div className="group flex items-center justify-between h-[72px] border-b border-white/[0.06] last:border-b-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.02] border border-white/[0.05] group-hover:bg-purple-500/10 group-hover:border-purple-500/30 transition-all duration-300">
              <Palette className="h-4 w-4 text-white/40 group-hover:text-purple-400 transition-colors duration-300" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-[15px] font-semibold text-white leading-none mb-1.5">Accent color</span>
              <span className="text-[13px] text-white/50 leading-none">Pick your favorite accent color.</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-5 w-5 items-center justify-center rounded-full p-0.5 cursor-pointer ring-2 ring-purple-500 ring-offset-2 ring-offset-[#0D1220] shadow-[0_0_15px_rgba(168,85,247,0.5)] bg-purple-500" />
            <div className="h-5 w-5 rounded-full bg-pink-500 cursor-pointer hover:scale-110 transition-transform shadow-sm" />
            <div className="h-5 w-5 rounded-full bg-blue-500 cursor-pointer hover:scale-110 transition-transform shadow-sm" />
            <div className="h-5 w-5 rounded-full bg-cyan-500 cursor-pointer hover:scale-110 transition-transform shadow-sm" />
            <div className="h-5 w-5 rounded-full bg-emerald-500 cursor-pointer hover:scale-110 transition-transform shadow-sm" />
            <div className="h-5 w-5 rounded-full bg-orange-500 cursor-pointer hover:scale-110 transition-transform shadow-sm" />
            <div className="h-5 w-5 rounded-full bg-rose-500 cursor-pointer hover:scale-110 transition-transform shadow-sm" />
          </div>
        </div>

        {/* Background Style */}
        <div className="group flex items-center justify-between h-[72px] border-b border-white/[0.06] last:border-b-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.02] border border-white/[0.05] group-hover:bg-purple-500/10 group-hover:border-purple-500/30 transition-all duration-300">
              <Image className="h-4 w-4 text-white/40 group-hover:text-purple-400 transition-colors duration-300" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-[15px] font-semibold text-white leading-none mb-1.5">Background style</span>
              <span className="text-[13px] text-white/50 leading-none">Choose the app background style.</span>
            </div>
          </div>
          <div className="flex items-center rounded-[12px] bg-[#111628] border border-white/5 p-1 shadow-inner">
            <button className="flex items-center gap-2 px-4 py-1.5 text-[12px] font-semibold text-white bg-purple-600 rounded-[10px] shadow-[0_0_15px_rgba(147,51,234,0.3)] transition-colors">
              <Moon className="h-3.5 w-3.5" />
              Default
            </button>
            <button className="flex items-center gap-2 px-4 py-1.5 text-[12px] font-semibold text-white/50 hover:text-white rounded-[10px] transition-colors">
              <div className="h-3.5 w-3.5 rounded-full border-[1.5px] border-white/50" />
              Gradient
            </button>
            <button className="flex items-center gap-2 px-4 py-1.5 text-[12px] font-semibold text-white/50 hover:text-white rounded-[10px] transition-colors">
              <div className="h-3.5 w-3.5 rounded-full border-[1.5px] border-white/50" />
              Space
            </button>
          </div>
        </div>

        {/* Interface Density */}
        <div className="group flex items-center justify-between h-[72px] border-b border-white/[0.06] last:border-b-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.02] border border-white/[0.05] group-hover:bg-purple-500/10 group-hover:border-purple-500/30 transition-all duration-300">
              <Layout className="h-4 w-4 text-white/40 group-hover:text-purple-400 transition-colors duration-300" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-[15px] font-semibold text-white leading-none mb-1.5">Interface density</span>
              <span className="text-[13px] text-white/50 leading-none">Adjust the spacing and size of elements.</span>
            </div>
          </div>
          <div className="flex items-center rounded-[12px] bg-[#111628] border border-white/5 p-1 shadow-inner">
            <button className="flex items-center gap-2 px-4 py-1.5 text-[12px] font-semibold text-white bg-purple-600 rounded-[10px] shadow-[0_0_15px_rgba(147,51,234,0.3)] transition-colors">
              <div className="h-3 w-3 rounded-sm border-[1.5px] border-white" />
              Comfortable
            </button>
            <button className="flex items-center gap-2 px-4 py-1.5 text-[12px] font-semibold text-white/50 hover:text-white rounded-[10px] transition-colors">
              <div className="h-3 w-3 rounded-sm border-[1.5px] border-white/50" />
              Compact
            </button>
            <button className="flex items-center gap-2 px-4 py-1.5 text-[12px] font-semibold text-white/50 hover:text-white rounded-[10px] transition-colors">
              <div className="h-3 w-3 rounded-sm border-[1.5px] border-white/50" />
              Cozy
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
