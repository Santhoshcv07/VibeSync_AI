import {
  AppNavigation,
  primaryNavigation,
  secondaryNavigation,
} from "./app-navigation";

import { SidebarDecor } from "@/components/navigation/sidebar/sidebar-decor";

export function AppSidebar() {
  return (
    <aside className="hidden lg:flex min-h-full w-[240px] shrink-0 flex-col self-stretch bg-gradient-to-b from-[#05060B] via-[#090B16] to-[#0C0717] shadow-[inset_-10px_0_30px_rgba(168,85,247,0.03)] border-r border-violet-500/10 z-10 relative">
      
      {/* Glow across sidebar */}
      <div className="absolute inset-0 pointer-events-none bg-violet-900/5 mix-blend-screen" />

      {/* VibeSync logo */}
      <div className="mt-6 flex shrink-0 flex-col px-6 relative z-10">
        <div className="flex items-center gap-2.5">
          {/* Custom Colorful Waveform Icon */}
          <div className="flex items-center gap-[3px] h-8">
            <div className="w-1.5 h-3.5 bg-cyan-400 rounded-full" />
            <div className="w-1.5 h-5 bg-blue-400 rounded-full" />
            <div className="w-1.5 h-7 bg-purple-500 rounded-full" />
            <div className="w-1.5 h-5 bg-orange-400 rounded-full" />
            <div className="w-1.5 h-3.5 bg-rose-500 rounded-full" />
          </div>
          <span className="font-bold text-xl tracking-tight flex items-center gap-1.5">
            <span className="text-white">VibeSync</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-500">AI</span>
          </span>
        </div>

        <p className="mt-1 text-[10px] tracking-widest text-white/50 uppercase font-bold">
          Your mood. Your universe.
        </p>
      </div>

      {/* Main navigation */}
      <div className="px-4 py-8 relative z-10">
        <AppNavigation
          items={primaryNavigation}
          aria-label="Primary application navigation"
        />
      </div>

      {/* Decorative Area */}
      <div className="flex-1 relative overflow-hidden pointer-events-none">
        <SidebarDecor />
      </div>
      
      {/* Profile and Settings */}
      <div className="mt-auto shrink-0 px-4 py-6 relative z-10">
        <AppNavigation
          items={secondaryNavigation}
          aria-label="Secondary application navigation"
        />
      </div>
    </aside>
  );
}