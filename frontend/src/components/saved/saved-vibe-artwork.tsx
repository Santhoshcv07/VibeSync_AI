import { SavedVibeArtworkVariant } from "./saved-vibes.data";
import { cn } from "@/lib/cn";

export interface SavedVibeArtworkProps {
  variant: SavedVibeArtworkVariant;
  title: string;
  className?: string;
}

export function SavedVibeArtwork({ variant, title, className }: SavedVibeArtworkProps) {
  // Use abstract CSS patterns avoiding explicit images or copyrighted material
  
  const renderArtwork = () => {
    switch (variant) {
      case "midnight-reset":
        return (
          <div className="absolute inset-0 bg-slate-900 overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-2/3 bg-blue-950/40" />
            <div className="absolute left-8 top-1/4 w-32 h-48 bg-gradient-to-b from-yellow-500/10 to-transparent border-t border-l border-yellow-500/20 blur-sm" />
            <div className="absolute right-12 bottom-12 w-24 h-1 bg-blue-400/20 rounded motion-safe:animate-pulse" />
          </div>
        );
      case "sunlit-drive":
        return (
          <div className="absolute inset-0 bg-gradient-to-tr from-orange-400 via-amber-200 to-yellow-100 overflow-hidden">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-yellow-300 rounded-full blur-3xl opacity-60 mix-blend-screen" />
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.1))]" />
            <div className="absolute inset-x-0 bottom-1/4 h-px bg-white/40" />
            <div className="absolute inset-x-0 bottom-1/5 h-px bg-white/20" />
          </div>
        );
      case "deep-work":
        return (
          <div className="absolute inset-0 bg-emerald-950 overflow-hidden">
            <div className="absolute inset-0 opacity-20"
                 style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl motion-safe:animate-[pulse_6s_ease-in-out_infinite]" />
            <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-black/80 to-transparent" />
          </div>
        );
      case "violet-date":
        return (
          <div className="absolute inset-0 bg-violet-950 overflow-hidden">
            <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-black/80 to-transparent" />
            <div className="absolute top-1/3 left-1/4 w-1/2 h-1/2 bg-rose-800/30 blur-3xl rounded-full mix-blend-screen" />
            <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20" />
          </div>
        );
      case "soft-landing":
        return (
          <div className="absolute inset-0 bg-[#d8d3cd] dark:bg-[#2c2a27] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 dark:to-black/30" />
            <div className="absolute left-1/2 -bottom-1/4 w-[150%] h-1/2 bg-white/20 dark:bg-white/5 rounded-[100%] blur-xl -translate-x-1/2" />
            <div className="absolute right-8 top-8 w-16 h-16 bg-white/40 dark:bg-white/10 rounded-full blur-md" />
          </div>
        );
      case "electric-hour":
        return (
          <div className="absolute inset-0 bg-zinc-950 overflow-hidden">
            <div className="absolute -left-1/4 top-0 w-[150%] h-px bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,1)] transform rotate-12" />
            <div className="absolute -left-1/4 top-1/4 w-[150%] h-px bg-fuchsia-500 shadow-[0_0_15px_rgba(217,70,239,1)] transform -rotate-6" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-transparent to-transparent opacity-80 mix-blend-screen" />
            <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-black/80 to-transparent" />
          </div>
        );
      default:
        return (
          <div className="absolute inset-0 bg-neutral-900" />
        );
    }
  };

  return (
    <div 
      className={cn("relative w-full h-full min-h-[120px] overflow-hidden", className)}
      aria-hidden="true"
      title={title}
    >
      {renderArtwork()}
      <div className="absolute inset-0 ring-1 ring-inset ring-black/10 dark:ring-white/10" />
    </div>
  );
}
