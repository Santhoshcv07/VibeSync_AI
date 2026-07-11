"use client";

import { useContext } from "react";
import { MoodThemeContext, type MoodThemeContextValue } from "./mood-theme-provider";

export function useMoodTheme(): MoodThemeContextValue {
  const context = useContext(MoodThemeContext);
  if (context === undefined) {
    throw new Error("useMoodTheme must be used within a MoodThemeProvider");
  }
  return context;
}
