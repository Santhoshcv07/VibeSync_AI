"use client";

import { ProfileInterest, profileInterestOptions } from "./profile.data";
import { cn } from "@/lib/cn";
import { Alert } from "@/components/ui/alert";
import { useState } from "react";

export interface ProfileInterestSelectorProps {
  values: ProfileInterest[];
  onChange: (values: ProfileInterest[]) => void;
}

export function ProfileInterestSelector({ values, onChange }: ProfileInterestSelectorProps) {
  const [errorFeedback, setErrorFeedback] = useState<string | null>(null);

  const handleToggle = (interestValue: ProfileInterest) => {
    const isCurrentlySelected = values.includes(interestValue);
    
    if (isCurrentlySelected) {
      if (values.length <= 1) {
        // Enforce at least one interest
        setErrorFeedback("Keep at least one entertainment interest selected.");
        return;
      }
      setErrorFeedback(null);
      onChange(values.filter((v) => v !== interestValue));
    } else {
      setErrorFeedback(null);
      onChange([...values, interestValue]);
    }
  };

  return (
    <fieldset className="space-y-4">
      <div className="space-y-1">
        <legend className="text-base font-semibold text-zinc-200">
          Entertainment interests
        </legend>
        <p className="text-sm text-zinc-400">
          Select the formats you want represented in future Vibe experiences.
        </p>
      </div>

      {errorFeedback && (
        <Alert variant="danger" className="py-2">
          {errorFeedback}
        </Alert>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {profileInterestOptions.map((option) => {
          const isSelected = values.includes(option.value);

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
                type="checkbox"
                name="interests"
                value={option.value}
                checked={isSelected}
                onChange={() => handleToggle(option.value)}
                className="sr-only" // Hide native checkbox, keep accessible via focus-within
                aria-describedby={`interest-desc-${option.value}`}
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
                    id={`interest-desc-${option.value}`}
                    className="block text-xs text-zinc-400 leading-relaxed"
                  >
                    {option.description}
                  </span>
                </div>
              </div>
              <div className="flex items-center ml-4">
                <div
                  className={cn(
                    "w-5 h-5 rounded flex items-center justify-center border transition-colors",
                    isSelected
                      ? "bg-indigo-500 border-indigo-500 text-white"
                      : "bg-zinc-900 border-zinc-700 text-transparent"
                  )}
                  aria-hidden="true"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-3.5 h-3.5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
