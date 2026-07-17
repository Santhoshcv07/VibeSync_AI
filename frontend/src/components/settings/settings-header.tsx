import { Settings, RotateCcw } from "lucide-react";

export function SettingsHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-6">
      
      <div className="flex items-center gap-4">
        <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[12px] border border-white/10 bg-[#161a2b] shadow-inner">
          <Settings className="h-6 w-6 text-white/90" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-[28px] font-bold text-white leading-tight">Settings</h1>
          <p className="text-[14px] text-white/50">Customize your VibeSync experience and manage your preferences.</p>
        </div>
      </div>

      <div className="shrink-0">
        <button className="flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-4 py-2 text-[14px] font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white">
          <RotateCcw className="h-4 w-4" />
          Restore Defaults
        </button>
      </div>
      
    </div>
  );
}
