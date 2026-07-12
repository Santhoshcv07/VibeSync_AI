import { VibeArtworkVariant, VibeMediaCategory } from "./vibe-experience.data";
import { cn } from "@/lib/cn";

export interface VibeArtworkProps {
  variant: VibeArtworkVariant;
  category: VibeMediaCategory;
  title: string;
  className?: string;
}

export function VibeArtwork({ variant, category, title, className }: VibeArtworkProps) {
  // Use abstract CSS patterns avoiding explicit images or copyrighted material
  
  const renderArtwork = () => {
    switch (variant) {
      case "aurora":
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-black overflow-hidden">
            <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent opacity-60 blur-3xl mix-blend-screen motion-safe:animate-pulse" style={{ animationDuration: '8s' }} />
          </div>
        );
      case "midnight-window":
        return (
          <div className="absolute inset-0 bg-slate-900 overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-2/3 bg-blue-950/40" />
            <div className="absolute left-8 top-1/4 w-32 h-48 bg-gradient-to-b from-yellow-500/10 to-transparent border-t border-l border-yellow-500/20 blur-sm" />
            <div className="absolute right-12 bottom-12 w-24 h-1 bg-blue-400/20 rounded" />
          </div>
        );
      case "soft-motion":
        return (
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 to-zinc-800 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center opacity-30">
              <div className="w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] motion-safe:animate-[pulse_4s_ease-in-out_infinite]" />
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        );
      case "quiet-frames":
        return (
          <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center gap-2 p-4">
            <div className="w-1/3 h-2/3 border border-neutral-700/50 rounded-sm bg-neutral-800/30" />
            <div className="w-1/3 h-full border border-neutral-600/50 rounded-sm bg-neutral-800/50" />
            <div className="w-1/3 h-2/3 border border-neutral-700/50 rounded-sm bg-neutral-800/30" />
          </div>
        );
      case "paper-moon":
        return (
          <div className="absolute inset-0 bg-[#e8e6e1] dark:bg-[#2a2926] overflow-hidden flex items-center justify-center">
            <div className="w-48 h-48 rounded-full bg-orange-100 dark:bg-orange-900/20 opacity-80 blur-xl absolute top-1/4 right-1/4" />
            <div className="absolute left-0 bottom-0 w-full h-1/3 border-t border-black/5 dark:border-white/5 bg-gradient-to-t from-black/5 dark:from-white/5 to-transparent" />
          </div>
        );
      case "violet-room":
        return (
          <div className="absolute inset-0 bg-violet-950 overflow-hidden">
            <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-black/80 to-transparent" />
            <div className="absolute top-1/3 left-1/4 w-1/2 h-1/2 bg-violet-800/30 blur-2xl rounded-full" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20" />
          </div>
        );
      case "blue-hour":
        return (
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900 via-indigo-950 to-slate-900 overflow-hidden">
            <div className="absolute bottom-0 w-full h-1/3 bg-black/40" />
            <div className="absolute top-0 right-1/4 w-px h-full bg-blue-400/20" />
            <div className="absolute top-0 right-1/3 w-px h-full bg-blue-400/10" />
          </div>
        );
      case "floating-pages":
        return (
          <div className="absolute inset-0 bg-stone-900 overflow-hidden flex items-center justify-center">
            <div className="w-3/4 h-3/4 flex flex-col gap-3 rotate-[-5deg] opacity-60">
              <div className="w-full h-1/4 bg-stone-800 rounded-sm shadow-lg shadow-black/20" />
              <div className="w-5/6 h-1/4 bg-stone-700/80 rounded-sm shadow-lg shadow-black/20 translate-x-4" />
              <div className="w-4/6 h-1/4 bg-stone-800/50 rounded-sm shadow-lg shadow-black/20 translate-x-8" />
            </div>
          </div>
        );
      case "slow-signal":
        return (
          <div className="absolute inset-0 bg-black overflow-hidden flex items-center justify-center">
            <div className="w-full h-px bg-cyan-900/30 absolute top-1/2" />
            <div className="flex gap-1 items-end h-16 opacity-50">
              <div className="w-2 h-4 bg-cyan-800" />
              <div className="w-2 h-8 bg-cyan-700" />
              <div className="w-2 h-12 bg-cyan-600" />
              <div className="w-2 h-6 bg-cyan-800" />
              <div className="w-2 h-16 bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
              <div className="w-2 h-10 bg-cyan-600" />
              <div className="w-2 h-4 bg-cyan-800" />
            </div>
          </div>
        );
      case "afterglow":
        return (
          <div className="absolute inset-0 bg-gradient-to-tr from-orange-900 via-rose-900 to-purple-900 overflow-hidden">
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-yellow-300 via-transparent to-transparent mix-blend-overlay" />
          </div>
        );
      default:
        return (
          <div className="absolute inset-0 bg-neutral-900" />
        );
    }
  };

  const getCategoryIcon = () => {
    switch (category) {
      case "music":
        return (
          <svg className="w-8 h-8 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
        );
      case "movies-shows":
      case "youtube":
        return (
          <svg className="w-8 h-8 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case "books":
        return (
          <svg className="w-8 h-8 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case "visual-inspiration":
        return (
          <svg className="w-8 h-8 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
    }
  };

  return (
    <div 
      className={cn("relative w-full h-full min-h-[120px] rounded-t-[var(--radius-lg)] sm:rounded-[var(--radius-lg)] sm:rounded-b-none sm:rounded-tr-[var(--radius-lg)] overflow-hidden", className)}
      aria-hidden="true"
      title={title}
    >
      {renderArtwork()}
      <div className="absolute inset-0 bg-[var(--surface)]/10 ring-1 ring-inset ring-white/10" />
      <div className="absolute bottom-4 right-4 text-white">
        {getCategoryIcon()}
      </div>
    </div>
  );
}
