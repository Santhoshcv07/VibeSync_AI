export const moodThemes = [
  "default",
  "happy",
  "chill",
  "energetic",
  "romantic",
  "focus",
  "sad",
  "angry",
] as const;

export type MoodTheme = (typeof moodThemes)[number];

export const DEFAULT_MOOD_THEME: MoodTheme = "default";

export function isMoodTheme(value: unknown): value is MoodTheme {
  return typeof value === "string" && (moodThemes as readonly string[]).includes(value);
}

export interface MoodThemeMetadata {
  label: string;
  description: string;
}

export const moodThemeMetadata: Record<MoodTheme, MoodThemeMetadata> = {
  default: { label: "Default", description: "Balanced VibeSync atmosphere" },
  happy: { label: "Happy", description: "Warm, bright, optimistic" },
  chill: { label: "Chill", description: "Calm, cool, spacious" },
  energetic: { label: "Energetic", description: "Vivid, fast, high-energy" },
  romantic: { label: "Romantic", description: "Warm, intimate, soft" },
  focus: { label: "Focus", description: "Controlled, clear, low-distraction" },
  sad: { label: "Sad", description: "Quiet, reflective, subdued" },
  angry: { label: "Angry", description: "Intense, bold, high-contrast" },
};
