export type SavedVibeMood =
  | "chill"
  | "happy"
  | "energetic"
  | "focus"
  | "romantic"
  | "low";

export type SavedVibeArtworkVariant =
  | "midnight-reset"
  | "sunlit-drive"
  | "deep-work"
  | "violet-date"
  | "soft-landing"
  | "electric-hour";

export interface SavedVibe {
  id: string;
  title: string;
  mood: SavedVibeMood;
  moodLabel: string;
  duration: string;
  description: string;
  contentMix: string[];
  savedLabel: string;
  artworkVariant: SavedVibeArtworkVariant;
  href: string;
}

export type SavedVibeSort =
  | "recent"
  | "title-ascending"
  | "mood";

export type SavedVibeView =
  | "grid"
  | "list";

export const savedVibes: SavedVibe[] = [
  {
    id: "midnight-reset",
    title: "Midnight Reset",
    mood: "chill",
    moodLabel: "Chill",
    duration: "1 hour",
    description: "Soft sound, cinematic atmosphere, reflective visuals, and quiet reading for the end of a long day.",
    contentMix: ["Music", "Short film", "Visual inspiration", "Books"],
    savedLabel: "Added recently",
    artworkVariant: "midnight-reset",
    href: "/vibe/demo-vibe"
  },
  {
    id: "sunlit-drive",
    title: "Sunlit Drive",
    mood: "happy",
    moodLabel: "Happy",
    duration: "30 min",
    description: "Bright music, playful video, colorful visuals, and a quick reading moment for an easy lift.",
    contentMix: ["Music", "Video", "Visual inspiration", "Reading"],
    savedLabel: "Prototype collection",
    artworkVariant: "sunlit-drive",
    href: "/vibe/demo-vibe"
  },
  {
    id: "deep-work",
    title: "Deep Work Signal",
    mood: "focus",
    moodLabel: "Focus",
    duration: "1 hour",
    description: "Steady instrumental sound, distraction-light visuals, and thoughtful long-form content.",
    contentMix: ["Instrumental music", "Long-form video", "Visual focus", "Reading"],
    savedLabel: "Prototype collection",
    artworkVariant: "deep-work",
    href: "/vibe/demo-vibe"
  },
  {
    id: "violet-date",
    title: "Violet Date Night",
    mood: "romantic",
    moodLabel: "Romantic",
    duration: "All night",
    description: "Warm listening, cinematic stories, intimate visuals, and gentle reading for a slow evening.",
    contentMix: ["Music", "Movie or episodes", "Visual inspiration", "Books"],
    savedLabel: "Prototype collection",
    artworkVariant: "violet-date",
    href: "/vibe/demo-vibe"
  },
  {
    id: "soft-landing",
    title: "Soft Landing",
    mood: "low",
    moodLabel: "Low",
    duration: "30 min",
    description: "Gentle sound, unhurried video, quiet imagery, and a short reflective reading moment.",
    contentMix: ["Music", "Video", "Visual inspiration", "Short reading"],
    savedLabel: "Prototype collection",
    artworkVariant: "soft-landing",
    href: "/vibe/demo-vibe"
  },
  {
    id: "electric-hour",
    title: "Electric Hour",
    mood: "energetic",
    moodLabel: "Energetic",
    duration: "1 hour",
    description: "High-motion sound, bold video, vivid visual energy, and fast-paced discovery.",
    contentMix: ["Music", "Video", "Visual inspiration", "Discovery"],
    savedLabel: "Prototype collection",
    artworkVariant: "electric-hour",
    href: "/vibe/demo-vibe"
  }
];
