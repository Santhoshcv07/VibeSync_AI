import { VibeHistoryArtworkVariant } from "./vibe-history.data";
import { cn } from "@/lib/cn";

export interface VibeHistoryArtworkProps {
  variant: VibeHistoryArtworkVariant;
  title: string;
  className?: string;
}

export function VibeHistoryArtwork({ variant, title, className }: VibeHistoryArtworkProps) {
  // Use abstract CSS patterns avoiding explicit images or copyrighted material
  
  const renderArtwork = () => {
    switch (variant) {
      case "midnight-reset":
        return (
          <div className="absolute inset-0 bg-slate-900 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950 to-transparent opacity-80" />
            <div className="absolute left-1/4 top-1/4 w-32 h-32 bg-indigo-500/10 rounded-full blur-xl motion-safe:animate-pulse" />
            <div className="absolute right-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        );
      case "morning-bloom":
        return (
          <div className="absolute inset-0 bg-orange-100 dark:bg-orange-950 overflow-hidden">
            <div className="absolute -top-1/4 -right-1/4 w-full h-full bg-yellow-300 dark:bg-yellow-600 rounded-full blur-3xl opacity-40 mix-blend-multiply dark:mix-blend-screen" />
            <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-orange-200 dark:from-orange-900/80 to-transparent" />
          </div>
        );
      case "focus-current":
        return (
          <div className="absolute inset-0 bg-emerald-950 overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)]" style={{ backgroundSize: '16px 16px' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-emerald-500/20 rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-emerald-500/30 rounded-full motion-safe:animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-emerald-500/20 rounded-full blur-md" />
          </div>
        );
      case "golden-motion":
        return (
          <div className="absolute inset-0 bg-amber-900 overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-yellow-400 via-orange-600 to-transparent mix-blend-screen opacity-80" />
            <div className="absolute top-1/4 -left-1/4 w-[150%] h-4 bg-white/20 transform rotate-12 blur-sm" />
            <div className="absolute bottom-1/4 -left-1/4 w-[150%] h-2 bg-white/10 transform rotate-12 blur-sm" />
          </div>
        );
      case "violet-evening":
        return (
          <div className="absolute inset-0 bg-violet-950 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-fuchsia-900/40 to-black/80" />
            <div className="absolute -bottom-1/4 left-1/4 w-full h-full bg-rose-500/20 rounded-full blur-3xl mix-blend-screen motion-safe:animate-[pulse_8s_ease-in-out_infinite]" />
          </div>
        );
      case "quiet-horizon":
        return (
          <div className="absolute inset-0 bg-slate-800 overflow-hidden">
            <div className="absolute top-0 w-full h-2/3 bg-gradient-to-b from-blue-900/60 to-transparent" />
            <div className="absolute bottom-0 w-full h-1/3 bg-slate-900 border-t border-white/10" />
            <div className="absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/5 rounded-full blur-xl" />
          </div>
        );
      case "electric-night":
        return (
          <div className="absolute inset-0 bg-zinc-950 overflow-hidden">
            <div className="absolute top-1/3 -left-1/4 w-[150%] h-px bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,1)] transform -rotate-6" />
            <div className="absolute bottom-1/3 -left-1/4 w-[150%] h-px bg-fuchsia-500 shadow-[0_0_10px_rgba(217,70,239,1)] transform rotate-3" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-transparent mix-blend-screen" />
          </div>
        );
      case "rain-window":
        return (
          <div className="absolute inset-0 bg-slate-900 overflow-hidden">
            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'repeating-linear-gradient(15deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 11px)' }} />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-800/50 to-black/80" />
            <div className="absolute top-1/4 left-1/3 w-2 h-8 bg-white/20 rounded-full blur-[1px] transform rotate-15" />
            <div className="absolute top-1/2 right-1/4 w-1 h-6 bg-white/10 rounded-full blur-[1px] transform rotate-15" />
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
      className={cn("relative w-full h-full min-h-[100px] overflow-hidden", className)}
      aria-hidden="true"
      title={title}
    >
      {renderArtwork()}
      <div className="absolute inset-0 ring-1 ring-inset ring-black/10 dark:ring-white/10" />
    </div>
  );
}
