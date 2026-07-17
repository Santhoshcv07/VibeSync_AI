"use client";

import {
  Music4,
  Film,
  ImageIcon,
  Play,
} from "lucide-react";

export function HeroArtwork() {
  return (
    <div className="relative flex h-[300px] w-full items-center justify-center overflow-hidden">

      {/* Purple background glow */}
      <div className="absolute right-10 h-[280px] w-[420px] rounded-full bg-fuchsia-600/10 blur-[90px]" />

      {/* Orbit 1 */}
      <div className="absolute h-[170px] w-[390px] rotate-[10deg] rounded-full border border-fuchsia-500/60" />

      {/* Orbit 2 */}
      <div className="absolute h-[210px] w-[470px] -rotate-[8deg] rounded-full border border-violet-500/35" />

      {/* Orbit 3 */}
      <div className="absolute h-[250px] w-[560px] rotate-[16deg] rounded-full border border-violet-500/20" />

      {/* Small stars */}
      <span className="absolute left-12 top-10 h-1 w-1 rounded-full bg-violet-300" />
      <span className="absolute left-24 bottom-12 h-1.5 w-1.5 rounded-full bg-fuchsia-400" />
      <span className="absolute right-20 top-8 h-1.5 w-1.5 rounded-full bg-violet-300" />
      <span className="absolute right-32 bottom-8 h-1 w-1 rounded-full bg-fuchsia-300" />
      <span className="absolute left-40 top-32 h-1 w-1 rounded-full bg-white/70" />

      {/* Glow */}
      <div className="absolute h-[150px] w-[150px] rounded-full bg-pink-500/40 blur-[70px]" />

      {/* Main orb */}
      <div className="relative z-20 flex h-[145px] w-[145px] items-center justify-center rounded-full bg-gradient-to-br from-pink-500 via-fuchsia-500 to-violet-600 shadow-[0_0_80px_rgba(236,72,153,0.55)]">

        <div className="absolute inset-[7px] rounded-full bg-gradient-to-br from-pink-400 via-fuchsia-500 to-indigo-700" />

        <div className="relative z-10 flex items-end gap-[4px]">
          <div className="h-7 w-[6px] rounded-full bg-cyan-300" />
          <div className="h-12 w-[6px] rounded-full bg-pink-300" />
          <div className="h-16 w-[6px] rounded-full bg-white" />
          <div className="h-12 w-[6px] rounded-full bg-pink-300" />
          <div className="h-7 w-[6px] rounded-full bg-cyan-300" />
        </div>
      </div>

      {/* Music */}
      <div className="absolute left-[34%] top-4 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-[#231D37]">
        <Music4 className="h-5 w-5 text-white" />
      </div>

      {/* Movie */}
      <div className="absolute right-14 top-8 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-[#231D37]">
        <Film className="h-5 w-5 text-white" />
      </div>

      {/* Image */}
      <div className="absolute bottom-10 left-[30%] flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-[#231D37]">
        <ImageIcon className="h-5 w-5 text-white" />
      </div>

      {/* Play */}
      <div className="absolute right-10 top-[53%] flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#231D37]">
        <Play className="ml-0.5 h-5 w-5 fill-white text-white" />
      </div>

    </div>
  );
}