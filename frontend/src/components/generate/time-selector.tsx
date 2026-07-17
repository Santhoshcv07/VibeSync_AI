import React, { forwardRef } from "react";
import { durationOptions, type VibeDuration } from "./generate-vibe.types";
import { cn } from "@/lib/cn";

export interface TimeSelectorProps {
  value: VibeDuration | null;
  onChange: (value: VibeDuration) => void;
  error?: string;
  errorId?: string;
}

const durationIcons: Record<VibeDuration, React.JSX.Element> = {
  "15-min": (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 14.5 8" />
    </svg>
  ),
  "30-min": (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 12" />
    </svg>
  ),
  "1-hour": (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 12 17" />
    </svg>
  ),
  "all-night": (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ),
};

export const TimeSelector = forwardRef<HTMLInputElement, TimeSelectorProps>(
  ({ value, onChange, error, errorId }, ref) => {
    return (
      <fieldset
        className="flex flex-col gap-5"
        aria-invalid={!!error}
        aria-errormessage={errorId}
      >
        <div className="flex flex-col gap-1">
          <legend className="text-xl font-bold tracking-tight text-white">
            2. How much time do you have?
          </legend>
          <p className="text-[13px] text-white/60">
            Select the time available for this entertainment experience.
          </p>
        </div>

        <div className="grid grid-cols-4 gap-3" role="radiogroup">
          {durationOptions.map((duration, index) => {
            const isSelected = value === duration.value;

            return (
              <label
                key={duration.value}
                className={cn(
                  "group relative flex flex-col justify-start cursor-pointer text-left",
                  "w-full p-5 rounded-[20px]",
                  "bg-[#0D1324] backdrop-blur-xl",
                  "transition-all duration-300 ease-out",
                  isSelected
                    ? "border border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.2)] bg-[#150f2d]"
                    : "border border-white/5 hover:border-white/10 hover:bg-[#11182B]",
                  error && !isSelected && "border-red-500"
                )}
              >
                <input
                  type="radio"
                  name="vibe-duration"
                  value={duration.value}
                  checked={isSelected}
                  onChange={() => onChange(duration.value)}
                  className="sr-only"
                  ref={index === 0 ? ref : undefined}
                />

                <div className="flex items-center gap-2 mb-3">
                  <div
                    className={cn(
                      "transition-colors duration-300",
                      isSelected ? "text-purple-400" : "text-white/60 group-hover:text-white/90"
                    )}
                  >
                    {durationIcons[duration.value]}
                  </div>
                  <h3 className={cn("text-[16px] font-bold leading-none", isSelected ? "text-white" : "text-white")}>
                    {duration.label}
                  </h3>
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="text-[13px] font-semibold text-white/90 leading-[1.2]">
                    {duration.description}
                  </span>
                  <span className="text-[11px] text-white/40 leading-[1.4] pr-2">
                    {duration.example}
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

TimeSelector.displayName = "TimeSelector";
