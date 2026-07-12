import { forwardRef } from "react";
import { durationOptions, type VibeDuration } from "./generate-vibe.types";
import { cn } from "@/lib/cn";

export interface TimeSelectorProps {
  value: VibeDuration | null;
  onChange: (value: VibeDuration) => void;
  error?: string;
  errorId?: string;
}

export const TimeSelector = forwardRef<HTMLInputElement, TimeSelectorProps>(
  ({ value, onChange, error, errorId }, ref) => {
    return (
      <fieldset 
        className="flex flex-col gap-4"
        aria-invalid={!!error}
        aria-errormessage={errorId}
      >
        <div className="flex flex-col gap-1">
          <legend className="text-heading-3 font-display font-semibold text-foreground">
            How much time do you have?
          </legend>
          <p className="text-body text-foreground-muted">
            Choose the time available for this entertainment experience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" role="radiogroup" aria-labelledby="time-legend">
          {durationOptions.map((duration, index) => {
            const isSelected = value === duration.value;
            
            let icon;
            switch(duration.value) {
              case "15-min": icon = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 14.5 8"/></svg>; break;
              case "30-min": icon = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 12"/></svg>; break;
              case "1-hour": icon = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 12 17"/></svg>; break;
              case "all-night": icon = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>; break;
            }

            return (
              <label 
                key={duration.value}
                className={cn(
                  "relative flex flex-col gap-3 p-5 rounded-[var(--radius-lg)] border bg-[var(--surface)] cursor-pointer transition-all focus-within:ring-2 focus-within:ring-[var(--focus-ring)] focus-within:ring-offset-2 focus-within:ring-offset-[var(--background)]",
                  isSelected 
                    ? "border-[var(--primary)] bg-[var(--primary-subtle)]" 
                    : "border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--surface-floating)]",
                  error && !isSelected && "border-[var(--danger)]"
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
                
                <div className="flex items-center justify-between">
                  <span className={cn(
                    "text-title-lg font-bold transition-colors",
                    isSelected ? "text-[var(--primary)]" : "text-foreground"
                  )}>
                    {duration.label}
                  </span>
                  <div className={cn(
                    "transition-colors",
                    isSelected ? "text-[var(--primary)]" : "text-foreground-subtle"
                  )}>
                    {icon}
                  </div>
                </div>
                <div className="flex flex-col gap-1 mt-2">
                  <span className={cn(
                    "text-body font-semibold transition-colors",
                    isSelected ? "text-foreground" : "text-foreground"
                  )}>
                    {duration.description}
                  </span>
                  <span className="text-caption text-foreground-muted">
                    {duration.example}
                  </span>
                </div>
              </label>
            );
          })}
        </div>

        {error && <p id={errorId} className="text-body-sm text-danger mt-1">{error}</p>}
      </fieldset>
    );
  }
);

TimeSelector.displayName = "TimeSelector";
