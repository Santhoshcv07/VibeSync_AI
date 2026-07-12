"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export interface ProfileFeedbackProps {
  message: string;
}

export function ProfileFeedback({ message }: ProfileFeedbackProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      const showTimer = setTimeout(() => {
        setIsVisible(true);
      }, 10);

      const hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 3500);

      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [message]);

  if (!message) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 sm:bottom-8 sm:right-8"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div
        className={cn(
          "flex items-center gap-3 bg-zinc-900 border border-zinc-800 shadow-xl rounded-lg px-4 py-3 transform transition-all duration-300 ease-out",
          isVisible
            ? "translate-y-0 opacity-100 scale-100"
            : "translate-y-4 opacity-0 scale-95 pointer-events-none"
        )}
      >
        <div className="flex-shrink-0 w-2 h-2 rounded-full bg-indigo-500 animate-pulse" aria-hidden="true" />
        <p className="text-sm font-medium text-zinc-200">
          {message}
        </p>
      </div>
    </div>
  );
}
