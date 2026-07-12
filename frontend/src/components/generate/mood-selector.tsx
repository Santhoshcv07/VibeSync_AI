import { forwardRef } from "react";
import { moodOptions, type VibeMood } from "./generate-vibe.types";
import { cn } from "@/lib/cn";

export interface MoodSelectorProps {
  value: VibeMood | null;
  onChange: (value: VibeMood) => void;
  error?: string;
  errorId?: string;
}

export const MoodSelector = forwardRef<HTMLInputElement, MoodSelectorProps>(
  ({ value, onChange, error, errorId }, ref) => {
    return (
      <fieldset 
        className="flex flex-col gap-4"
        aria-invalid={!!error}
        aria-errormessage={errorId}
      >
        <div className="flex flex-col gap-1">
          <legend className="text-heading-3 font-display font-semibold text-foreground">
            Choose your mood
          </legend>
          <p className="text-body text-foreground-muted">
            Choose the feeling you want your entertainment experience to match.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" role="radiogroup" aria-labelledby="mood-legend">
          {moodOptions.map((mood, index) => {
            const isSelected = value === mood.value;
            let icon;
            switch(mood.value) {
              case "chill": icon = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h4l3-9 5 18 3-9h5"/></svg>; break;
              case "happy": icon = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></svg>; break;
              case "energetic": icon = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>; break;
              case "focus": icon = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>; break;
              case "romantic": icon = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>; break;
              case "low": icon = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>; break;
            }

            let color;
            switch(mood.value) {
              case "chill": color = "bg-blue-500"; break;
              case "happy": color = "bg-amber-500"; break;
              case "energetic": color = "bg-orange-500"; break;
              case "focus": color = "bg-emerald-500"; break;
              case "romantic": color = "bg-rose-500"; break;
              case "low": color = "bg-slate-500"; break;
            }

            return (
              <label 
                key={mood.value}
                className={cn(
                  "relative flex items-center gap-4 p-4 rounded-[var(--radius-lg)] border bg-[var(--surface)] cursor-pointer transition-all focus-within:ring-2 focus-within:ring-[var(--focus-ring)] focus-within:ring-offset-2 focus-within:ring-offset-[var(--background)]",
                  isSelected 
                    ? "border-[var(--primary)] bg-[var(--primary-subtle)]" 
                    : "border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--surface-floating)]",
                  error && !isSelected && "border-[var(--danger)]"
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
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center shrink-0 text-white transition-all",
                  isSelected ? color : "bg-[var(--foreground-muted)] text-[var(--background)]"
                )}>
                  {icon}
                </div>
                <div className="flex flex-col gap-0.5 pr-6">
                  <span className={cn(
                    "text-title-md font-semibold transition-colors",
                    isSelected ? "text-[var(--primary)]" : "text-foreground"
                  )}>
                    {mood.label}
                  </span>
                  <span className="text-body-sm text-foreground-muted">
                    {mood.description}
                  </span>
                </div>
                {isSelected && (
                  <div className="absolute top-4 right-4 text-[var(--primary)]" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                )}
              </label>
            );
          })}
        </div>

        {error && <p id={errorId} className="text-body-sm text-danger mt-1">{error}</p>}
      </fieldset>
    );
  }
);

MoodSelector.displayName = "MoodSelector";
