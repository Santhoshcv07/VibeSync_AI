"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { VibeExperienceData } from "@/components/vibe/vibe-experience.data";


interface CurrentVibeContextValue {
  currentVibe: VibeExperienceData | null;
  setCurrentVibe: (vibe: VibeExperienceData | null) => void;
}

interface CurrentVibeProviderProps {
  children: ReactNode;
}

const STORAGE_KEY = "vibesync-current-vibe";

const CurrentVibeContext = createContext<CurrentVibeContextValue | undefined>(
  undefined
);

export function CurrentVibeProvider({
  children,
}: CurrentVibeProviderProps) {
 const [currentVibe, setCurrentVibeState] =
  useState<VibeExperienceData | null>(null);

useEffect(() => {
  try {
    const storedVibe = window.sessionStorage.getItem(STORAGE_KEY);

    if (storedVibe) {
      setCurrentVibeState(
        JSON.parse(storedVibe) as VibeExperienceData
      );
    }
  } catch (error) {
    console.error("Failed to restore the current vibe:", error);
    window.sessionStorage.removeItem(STORAGE_KEY);
  }
}, []);
  const setCurrentVibe = (vibe: VibeExperienceData | null) => {
    setCurrentVibeState(vibe);

    try {
      if (vibe) {
        window.sessionStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(vibe)
        );
      } else {
        window.sessionStorage.removeItem(STORAGE_KEY);
      }
    } catch (error) {
      console.error("Failed to save the current vibe:", error);
    }
  };

  return (
    <CurrentVibeContext.Provider
      value={{ currentVibe, setCurrentVibe }}
    >
      {children}
    </CurrentVibeContext.Provider>
  );
}

export function useCurrentVibe(): CurrentVibeContextValue {
  const context = useContext(CurrentVibeContext);

  if (!context) {
    throw new Error(
      "useCurrentVibe must be used within a CurrentVibeProvider"
    );
  }

  return context;
}