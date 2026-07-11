"use client";

import { createContext, useState, useEffect, type ReactNode } from "react";
import {
  type MoodTheme,
  DEFAULT_MOOD_THEME,
  isMoodTheme
} from "@/lib/mood-theme";
import { cn } from "@/lib/cn";

export interface MoodThemeProviderProps {
  children: ReactNode;
  defaultTheme?: MoodTheme;
  storageKey?: string;
  persist?: boolean;
}

export interface MoodThemeContextValue {
  theme: MoodTheme;
  setTheme: (theme: MoodTheme) => void;
  resetTheme: () => void;
}

export const MoodThemeContext = createContext<MoodThemeContextValue | undefined>(undefined);

export function MoodThemeProvider({
  children,
  defaultTheme = DEFAULT_MOOD_THEME,
  storageKey = "vibesync-mood-theme",
  persist = false,
}: MoodThemeProviderProps) {
  const [theme, setThemeState] = useState<MoodTheme>(() => {
    // Avoid hydration mismatch by ignoring storage on first render pass
    return defaultTheme;
  });

  useEffect(() => {
    if (!persist) return;
    try {
      const storedTheme = window.localStorage.getItem(storageKey);
      if (isMoodTheme(storedTheme)) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setThemeState(storedTheme);
      }
    } catch {
      // Ignore storage errors gracefully
    }
  }, [persist, storageKey]);

  const setTheme = (newTheme: MoodTheme) => {
    setThemeState(newTheme);
    if (persist) {
      try {
        window.localStorage.setItem(storageKey, newTheme);
      } catch {
        // Ignore storage errors gracefully
      }
    }
  };

  const resetTheme = () => setTheme(defaultTheme);

  return (
    <MoodThemeContext.Provider value={{ theme, setTheme, resetTheme }}>
      <div data-mood-theme={theme} className={cn("mood-theme-transition w-full h-full min-h-[inherit] bg-[var(--background)] text-foreground")}>
        {children}
      </div>
    </MoodThemeContext.Provider>
  );
}
