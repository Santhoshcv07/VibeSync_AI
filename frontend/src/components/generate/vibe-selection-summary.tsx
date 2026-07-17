import React from "react";
import { type VibeMood, type VibeDuration } from "./generate-vibe.types";

export interface VibeSelectionSummaryProps {
  mood?: VibeMood | null;
  duration?: VibeDuration | null;
  intention?: string;
  isSubmitting?: boolean;
}

export function VibeSelectionSummary({ mood, duration, intention, isSubmitting }: VibeSelectionSummaryProps) {
  return (
    <div className="w-[320px] rounded-[24px] border border-white/5 bg-[#0D1324] p-5 shadow-[0_25px_80px_rgba(0,0,0,.45)]">
      
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[18px] font-bold text-white tracking-tight">
          Your Vibe preview
        </h3>
        <span className="rounded-full bg-[#18203c] px-3 py-1 text-[11px] font-medium text-purple-300 border border-white/5">
          Local preview
        </span>
      </div>

      <div className="overflow-hidden rounded-[16px]">
        <img
          src="/images/generate/vibesync-mountain-bg.jpeg"
          alt="Vibe Preview"
          className="h-[180px] w-full object-cover"
        />
      </div>

      <div className="mt-4">
        <p className="text-[14px] leading-[1.6] text-white/80">
          Choose a mood and time<br/>
          to shape the preview.
        </p>
      </div>

      <button className="mt-6 flex h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#ec4899] to-[#3b82f6] text-[15px] font-semibold text-white shadow-[0_0_20px_rgba(236,72,153,0.3)] transition-transform hover:scale-[1.02]">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
        Generate My Vibe
      </button>

    </div>
  );
}
