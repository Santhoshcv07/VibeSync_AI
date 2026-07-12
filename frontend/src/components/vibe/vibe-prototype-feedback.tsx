"use client";

import { useEffect, useState } from "react";
import { Portal } from "@/components/ui/portal";

export interface VibePrototypeFeedbackProps {
  message: string;
}

export function VibePrototypeFeedback({ message }: VibePrototypeFeedbackProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      // Small delay to allow CSS transition to trigger if it was just mounted
      const timer1 = setTimeout(() => setVisible(true), 50);
      
      const timer2 = setTimeout(() => {
        setVisible(false);
      }, 4000);
      
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [message]);

  if (!message) return null;

  return (
    <Portal>
      <div 
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none w-full max-w-sm px-4"
        role="status"
        aria-live="polite"
      >
        <div 
          className={`bg-zinc-900 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 px-4 py-3 rounded-[var(--radius-full)] shadow-lg text-body-sm font-medium transition-all duration-300 transform text-center ${
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          {message}
        </div>
      </div>
    </Portal>
  );
}
