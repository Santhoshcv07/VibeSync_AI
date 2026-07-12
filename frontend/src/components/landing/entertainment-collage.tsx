import { Card } from "@/components/ui/card";

export function EntertainmentCollage() {
  return (
    <div className="relative w-full aspect-square max-w-lg mx-auto" aria-hidden="true">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[var(--primary)] to-[var(--secondary)] rounded-full blur-3xl opacity-20 dark:opacity-30 mix-blend-screen" />
      
      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-[url('/design-system/grid.svg')] opacity-10 bg-center [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />

      {/* Layer 1: Music (Bottom Left) */}
      <Card className="absolute bottom-10 left-0 md:-left-8 w-48 shadow-2xl rotate-[-6deg] bg-[var(--surface-elevated)] border-none z-10 transition-transform duration-500 hover:rotate-0 hover:z-50">
        <div className="p-3">
          <div className="w-full aspect-square rounded-[var(--radius-md)] bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-inner mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
          </div>
          <p className="text-[10px] font-bold tracking-wider text-foreground uppercase truncate">Midnight Drive</p>
          <p className="text-[10px] text-foreground-muted truncate">Music mix</p>
        </div>
      </Card>

      {/* Layer 2: Movies (Top Right) */}
      <Card className="absolute top-12 right-0 md:-right-4 w-56 shadow-2xl rotate-[8deg] bg-[var(--surface-elevated)] border-none z-20 transition-transform duration-500 hover:rotate-0 hover:z-50">
        <div className="p-3 flex gap-3 items-center">
          <div className="w-16 h-20 shrink-0 rounded-[var(--radius-md)] bg-gradient-to-t from-zinc-800 to-zinc-600 flex items-center justify-center shadow-inner overflow-hidden relative">
             <div className="absolute inset-0 flex flex-col justify-between py-1 px-1">
               <div className="flex justify-between w-full"><div className="w-1 h-1 bg-white/20 rounded-full" /><div className="w-1 h-1 bg-white/20 rounded-full" /></div>
               <div className="flex justify-between w-full"><div className="w-1 h-1 bg-white/20 rounded-full" /><div className="w-1 h-1 bg-white/20 rounded-full" /></div>
             </div>
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white" className="opacity-80"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold tracking-wider text-foreground uppercase truncate leading-tight mb-0.5">City After Dark</p>
            <p className="text-[10px] text-foreground-muted truncate">Watch next</p>
          </div>
        </div>
      </Card>

      {/* Layer 3: Visual Inspiration (Center Background) */}
      <Card className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 shadow-2xl bg-[var(--surface-elevated)] border-none z-0 opacity-70">
        <div className="p-3">
          <div className="w-full h-40 rounded-[var(--radius-lg)] bg-gradient-to-tr from-cyan-900 to-emerald-900 flex flex-wrap gap-1 overflow-hidden p-2">
             <div className="w-full h-1/2 bg-white/10 rounded-sm" />
             <div className="flex-1 h-1/3 bg-white/10 rounded-sm" />
             <div className="flex-1 h-1/3 bg-white/10 rounded-sm" />
          </div>
          <div className="mt-3 text-center">
             <p className="text-[10px] font-bold tracking-wider text-foreground uppercase truncate">Neon Rooms</p>
             <p className="text-[10px] text-foreground-muted truncate">Visual inspiration</p>
          </div>
        </div>
      </Card>

      {/* Layer 4: Books (Bottom Right) */}
      <Card className="absolute bottom-4 right-8 w-44 shadow-2xl rotate-[-4deg] bg-[var(--surface-elevated)] border-none z-30 transition-transform duration-500 hover:rotate-0 hover:z-50">
        <div className="p-3">
          <div className="w-full aspect-[2/3] rounded-[var(--radius-md)] bg-gradient-to-b from-amber-700 to-amber-950 flex items-center justify-center shadow-inner mb-3 relative overflow-hidden">
             <div className="absolute right-0 top-0 bottom-0 w-2 bg-black/20" />
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-70"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
          </div>
          <p className="text-[10px] font-bold tracking-wider text-foreground uppercase truncate">The Quiet Hour</p>
          <p className="text-[10px] text-foreground-muted truncate">Tonight&apos;s read</p>
        </div>
      </Card>

      {/* Central Play Button Motif overlaying */}
      <div className="absolute top-[45%] left-[45%] w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center z-40 transform hover:scale-105 transition-transform duration-500">
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="var(--primary)" className="ml-1"><polygon points="5 3 19 12 5 21 5 3"/></svg>
      </div>

    </div>
  );
}
