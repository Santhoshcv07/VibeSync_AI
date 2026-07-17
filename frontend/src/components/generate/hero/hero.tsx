"use client";

import { HeroArtwork } from "./hero-artwork";
import { HeroContent } from "./hero-content";
import { PrototypeNotice } from "./prototype-notice";

export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-[26px] border border-[#22243a] bg-[#090B18] shadow-[0_18px_70px_rgba(0,0,0,0.35)]">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_35%,rgba(168,85,247,0.12),transparent_40%)]" />

      <div className="relative">

        {/* HERO */}
        <div
          className="
            grid
            grid-cols-[58%_42%]
            items-center
            gap-2
            px-12
            pt-8
            pb-5
          "
        >
          <HeroContent />

          <div className="flex items-center justify-center">
            <HeroArtwork />
          </div>
        </div>

        <PrototypeNotice />

      </div>

    </section>
  );
}