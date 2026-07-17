import React, { forwardRef } from "react";
import { moodOptions, type VibeMood } from "./generate-vibe.types";
import { cn } from "@/lib/cn";

export interface MoodSelectorProps {
  value: VibeMood | null;
  onChange: (value: VibeMood) => void;
  error?: string;
  errorId?: string;
}

const moodStyles: Record<VibeMood, { gradient: string }> = {
  chill: { gradient: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)" },
  happy: { gradient: "linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)" },
  energetic: { gradient: "linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)" },
  focus: { gradient: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)" },
  romantic: { gradient: "linear-gradient(135deg, #f43f5e 0%, #d946ef 100%)" },
  low: { gradient: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)" },
};

const moodIcons: Record<VibeMood, React.JSX.Element> = {
  chill: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h4l3-9 5 18 3-9h5" /></svg>
  ),
  happy: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" x2="9.01" y1="9" y2="9" /><line x1="15" x2="15.01" y1="9" y2="9" /></svg>
  ),
  energetic: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
  ),
  focus: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>
  ),
  romantic: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
  ),
  low: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
  ),
};

export const MoodSelector = forwardRef<HTMLInputElement, MoodSelectorProps>(
  ({ value, onChange, error, errorId }, ref) => {
    return (
      <fieldset
        className="flex flex-col gap-5"
        aria-invalid={!!error}
        aria-errormessage={errorId}
      >
        <div className="flex flex-col gap-1">
          <legend className="text-xl font-bold tracking-tight text-white">
            1. Choose your mood
          </legend>
          <p className="text-[13px] text-white/60">
            Pick the vibe that best matches how you feel right now.
          </p>
        </div>

        <div
          className="grid grid-cols-6 gap-4"
          role="radiogroup"
        >
          {moodOptions.map((mood, index) => {
            const isSelected = value === mood.value;
            const palette = moodStyles[mood.value];

            return (
              <label
                key={mood.value}
                className={cn(
                  "group relative flex h-[182px] flex-col items-center justify-start",
                  "cursor-pointer overflow-hidden rounded-[20px]",
                  "border bg-[#0B1120]",
                  "px-4 pt-5 pb-4 text-center",
                  "transition-all duration-300",
                  isSelected
                    ? "border-[#7C4DFF] shadow-[0_0_35px_rgba(124,77,255,.22)]"
                    : "border-[#1B2440] hover:border-[#2C3761] hover:bg-[#10172A]",
                  error && !isSelected && "border-red-500"
                )}
              >
                <input
                  type="radio"
                  name="vibe-mood"
                  value={mood.value}
                  checked={isSelected}
                  onChange={() => onChange(mood.value)}
                  className="sr-only"
                  ref={index === 0 ? ref : undefined}
                />

                <div className="relative mb-4">
                  <div
                    className={cn(
                      "flex h-[56px] w-[56px] items-center justify-center rounded-full transition-all duration-300",
                      isSelected ? "text-white shadow-[0_0_20px_rgba(255,255,255,0.2)]" : "bg-[#161f36] text-white/40 group-hover:text-white/80 group-hover:bg-[#1a2542]"
                    )}
                    style={isSelected ? { background: palette.gradient } : {}}
                  >
                    {moodIcons[mood.value]}
                  </div>

                  {isSelected && (
                    <div
                      className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center bg-blue-500 border-[2.5px] border-[#0D1324]"
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-center gap-1.5 px-1">
                  <span className="text-[16px] font-semibold text-white">
                    {mood.label}
                  </span>
                  <span className="mt-2 text-[12px] leading-5 text-[#8D97B5]">
                    {mood.description}
                  </span>
                </div>
              </label>
            );
          })}
        </div>

        {error && (
          <p id={errorId} className="text-sm text-red-500 mt-1">
            {error}
          </p>
        )}
      </fieldset>
    );
  }
);

MoodSelector.displayName = "MoodSelector";
