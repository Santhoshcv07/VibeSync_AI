import { ReactNode } from "react";
import { VibeExperienceData } from "./vibe-experience.data";
import { Badge } from "@/components/ui/badge";

export interface VibeExperienceHeroProps {
  experience: VibeExperienceData;
  actions: ReactNode;
}

export function VibeExperienceHero({ experience, actions }: VibeExperienceHeroProps) {
  return (
    <div className="relative w-full rounded-[var(--radius-xl)] overflow-hidden min-h-[500px] flex flex-col justify-end">
      {/* Decorative ambient background using chill mood color language */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-blue-950 to-slate-950"
        aria-hidden="true"
      >
        <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-violet-900/20 blur-[100px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-0 left-1/4 w-1/2 h-1/2 bg-cyan-900/20 blur-[80px] rounded-full mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-30 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      <div className="relative z-10 p-6 md:p-12 lg:p-16 flex flex-col gap-8 w-full max-w-5xl mx-auto">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="info" className="uppercase tracking-widest text-[0.65rem] font-bold shrink-0">
              STATIC PROTOTYPE
            </Badge>
            <span className="text-caption font-bold tracking-widest text-blue-300 uppercase shrink-0">
              YOUR GENERATED VIBE PREVIEW
            </span>
          </div>

          <h1 className="text-display-md md:text-display-lg font-display font-bold text-white tracking-tight text-balance">
            {experience.title}
          </h1>

          <div className="flex flex-wrap items-center gap-2 mt-2">
            <Badge variant="neutral" className="bg-white/10 text-white hover:bg-white/20 border-white/10">
              {experience.mood}
            </Badge>
            <Badge variant="neutral" className="bg-white/10 text-white hover:bg-white/20 border-white/10">
              {experience.duration}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 w-full mt-4">
          <div className="md:col-span-7 flex flex-col gap-6">
            <p className="text-body-lg text-zinc-300 leading-relaxed text-balance">
              {experience.description}
            </p>
            
            {experience.intention && (
              <div className="bg-white/5 border border-white/10 p-4 rounded-[var(--radius-md)] border-l-4 border-l-blue-400 backdrop-blur-sm">
                <span className="text-caption text-zinc-400 uppercase tracking-widest font-bold block mb-1">Built around</span>
                <p className="text-body text-zinc-200 italic break-words">&quot;{experience.intention}&quot;</p>
              </div>
            )}
          </div>

          <div className="md:col-span-5 flex flex-col justify-end gap-6">
            <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-[var(--radius-md)] backdrop-blur-sm">
              <p className="text-body-sm text-blue-200">
                This experience uses fictional demonstration content. No AI model or entertainment provider was contacted.
              </p>
            </div>
            
            {actions}
          </div>
        </div>
      </div>
    </div>
  );
}
