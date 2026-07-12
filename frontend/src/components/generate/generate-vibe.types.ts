export type VibeMood = "chill" | "happy" | "energetic" | "focus" | "romantic" | "low";
export type VibeDuration = "15-min" | "30-min" | "1-hour" | "all-night";

export interface GenerateVibeFormValues {
  mood: VibeMood | null;
  duration: VibeDuration | null;
  intention: string;
}

export type GenerateVibeFieldName = "mood" | "duration" | "intention";
export type GenerateVibeFormErrors = Partial<Record<GenerateVibeFieldName, string>>;

export interface VibeMoodOption {
  value: VibeMood;
  label: string;
  description: string;
}

export const moodOptions: VibeMoodOption[] = [
  { value: "chill", label: "Chill", description: "Soft, spacious, and easygoing" },
  { value: "happy", label: "Happy", description: "Bright, playful, and uplifting" },
  { value: "energetic", label: "Energetic", description: "Fast, bold, and high-motion" },
  { value: "focus", label: "Focus", description: "Clear, steady, and distraction-light" },
  { value: "romantic", label: "Romantic", description: "Warm, intimate, and cinematic" },
  { value: "low", label: "Low", description: "Gentle, comforting, and unhurried" },
];

export interface VibeDurationOption {
  value: VibeDuration;
  label: string;
  description: string;
  example: string;
}

export const durationOptions: VibeDurationOption[] = [
  { value: "15-min", label: "15 min", description: "Quick reset", example: "Music · short video · visual board" },
  { value: "30-min", label: "30 min", description: "Mini escape", example: "Music session · video · reading" },
  { value: "1-hour", label: "1 hour", description: "Settle into the mood", example: "Episode · long-form video · playlist" },
  { value: "all-night", label: "All night", description: "Build the full journey", example: "Movie · episodes · extended listening" },
];
