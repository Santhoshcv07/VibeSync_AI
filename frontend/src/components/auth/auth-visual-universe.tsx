import { Card } from "@/components/ui/card";

export function AuthVisualUniverse() {
  return (
    <div className="relative w-full aspect-square max-w-md mx-auto" aria-hidden="true">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-600 to-cyan-500 rounded-full blur-[80px] opacity-20 mix-blend-screen animate-pulse-slow" />
      
      {/* Decorative Grid Mask */}
      <div className="absolute inset-0 bg-[url('/design-system/grid.svg')] opacity-10 bg-center [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />

      {/* Media Card 1: Music */}
      <Card className="absolute top-10 left-0 w-48 shadow-xl rotate-[-4deg] bg-[var(--surface-elevated)] border-white/5 z-20">
        <div className="p-3">
          <div className="w-full h-24 rounded-[var(--radius-md)] bg-gradient-to-br from-indigo-500 to-purple-800 flex items-center justify-center relative overflow-hidden mb-3">
             <div className="absolute inset-0 flex items-center justify-center opacity-30">
               <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h4l3-9 5 18 3-9h5"/></svg>
             </div>
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="none"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          </div>
          <p className="text-[10px] font-bold tracking-wider text-foreground uppercase truncate">Chill</p>
          <p className="text-[10px] text-foreground-muted truncate">Afterglow Mix</p>
        </div>
      </Card>

      {/* Media Card 2: Watch */}
      <Card className="absolute top-32 right-0 w-52 shadow-2xl rotate-[6deg] bg-[var(--surface-elevated)] border-white/5 z-30">
        <div className="p-3 flex gap-3 items-center">
          <div className="w-16 h-20 shrink-0 rounded-[var(--radius-md)] bg-gradient-to-t from-zinc-900 to-zinc-700 flex items-center justify-center shadow-inner relative overflow-hidden">
             <div className="absolute left-1 flex flex-col justify-between py-1 h-full"><div className="w-1 h-1 bg-white/20 rounded-full" /><div className="w-1 h-1 bg-white/20 rounded-full" /><div className="w-1 h-1 bg-white/20 rounded-full" /></div>
             <div className="absolute right-1 flex flex-col justify-between py-1 h-full"><div className="w-1 h-1 bg-white/20 rounded-full" /><div className="w-1 h-1 bg-white/20 rounded-full" /><div className="w-1 h-1 bg-white/20 rounded-full" /></div>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold tracking-wider text-foreground uppercase truncate leading-tight mb-0.5">Watch</p>
            <p className="text-[10px] text-foreground-muted truncate">Night Signals</p>
          </div>
        </div>
      </Card>

      {/* Media Card 3: Read */}
      <Card className="absolute bottom-12 left-12 w-44 shadow-lg rotate-[-2deg] bg-[var(--surface-elevated)] border-white/5 z-10">
        <div className="p-3">
          <div className="w-full aspect-[2/3] rounded-[var(--radius-md)] bg-gradient-to-b from-amber-800 to-amber-950 flex items-center justify-center relative overflow-hidden mb-3">
             <div className="absolute right-0 top-0 bottom-0 w-2 bg-black/20" />
             <div className="absolute top-4 left-4 right-6 bottom-4 border border-white/10 rounded-sm" />
          </div>
          <p className="text-[10px] font-bold tracking-wider text-foreground uppercase truncate">Read</p>
          <p className="text-[10px] text-foreground-muted truncate">The Quiet Hour</p>
        </div>
      </Card>

      {/* Decorative center accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/5 rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-white/5 rounded-full pointer-events-none opacity-50" />
    </div>
  );
}
