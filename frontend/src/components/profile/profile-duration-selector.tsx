import { ProfileDuration, profileDurationOptions } from "./profile.data";
import { cn } from "@/lib/cn";

export interface ProfileDurationSelectorProps {
  value: ProfileDuration;
  onChange: (value: ProfileDuration) => void;
}

export function ProfileDurationSelector({ value, onChange }: ProfileDurationSelectorProps) {
  return (
    <fieldset className="space-y-4">
      <div className="space-y-1">
        <legend className="text-base font-semibold text-zinc-200">
          Preferred Vibe duration
        </legend>
        <p className="text-sm text-zinc-400">
          Choose the session length that usually fits your time.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {profileDurationOptions.map((option) => {
          const isSelected = value === option.value;

          return (
            <label
              key={option.value}
              className={cn(
                "relative flex cursor-pointer rounded-lg border p-4 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-zinc-950 transition-colors",
                isSelected
                  ? "bg-indigo-500/10 border-indigo-500/50"
                  : "bg-zinc-900/50 border-zinc-800 hover:bg-zinc-900 hover:border-zinc-700"
              )}
            >
              <input
                type="radio"
                name="preferredDuration"
                value={option.value}
                checked={isSelected}
                onChange={() => onChange(option.value)}
                className="sr-only" // Hide native radio, keep accessible via focus-within
                aria-describedby={`duration-desc-${option.value}`}
              />
              <div className="flex flex-1">
                <div className="flex flex-col">
                  <span
                    className={cn(
                      "block text-sm font-medium mb-1",
                      isSelected ? "text-indigo-400" : "text-zinc-200"
                    )}
                  >
                    {option.label}
                  </span>
                  <span
                    id={`duration-desc-${option.value}`}
                    className="block text-xs text-zinc-400 leading-relaxed"
                  >
                    {option.description}
                  </span>
                </div>
              </div>
              {isSelected && (
                <div className="absolute top-4 right-4 text-indigo-500" aria-hidden="true">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
