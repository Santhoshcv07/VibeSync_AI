"use client";

import { Lock } from "lucide-react";

export function PrototypeNotice() {
  return (
    <div className="border-t border-white/6 px-10 py-6">

      <div className="flex items-center gap-5 rounded-2xl border border-white/6 bg-[#101321] px-6 py-5">

        {/* Lock */}
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-violet-600/20 border border-violet-500/20">
          <Lock className="h-6 w-6 text-violet-300" />
        </div>

        {/* Text */}
        <div className="flex flex-col">

          <div className="flex items-center gap-4">

            <span className="rounded-full bg-violet-600/20 px-4 py-1 text-[12px] font-semibold uppercase tracking-[0.16em] text-violet-300">
              FRONTEND PROTOTYPE
            </span>

            <span className="text-[18px] font-medium text-white">
              Your selections stay on this page only.
            </span>

          </div>

          <p className="mt-2 text-[16px] leading-7 text-white/60">
            No AI request is sent, no recommendation is generated, and no
            personal information is stored.
          </p>

        </div>

      </div>

    </div>
  );
}