export type VibeHistoryMood =
  | "chill"
  | "happy"
  | "energetic"
  | "focus"
  | "romantic"
  | "low";

export type VibeHistoryGroup =
  | "today"
  | "yesterday"
  | "earlier-this-week"
  | "last-week";

export type VibeHistoryDateRange =
  | "all"
  | "today"
  | "this-week"
  | "last-week";

export type VibeHistorySort =
  | "newest"
  | "oldest";

export type VibeHistoryArtworkVariant =
  | "midnight-reset"
  | "morning-bloom"
  | "focus-current"
  | "golden-motion"
  | "violet-evening"
  | "quiet-horizon"
  | "electric-night"
  | "rain-window";

export interface VibeHistoryEntryData {
  id: string;
  title: string;
  mood: VibeHistoryMood;
  moodLabel: string;
  duration: string;
  generatedAtIso: string;
  generatedTimeLabel: string;
  group: VibeHistoryGroup;
  groupLabel: string;
  description: string;
  intention: string;
  contentMix: string[];
  artworkVariant: VibeHistoryArtworkVariant;
  vibeHref: string;
  generateAgainHref: string;
}

export interface VibeHistoryGroupData {
  group: VibeHistoryGroup;
  label: string;
  entries: VibeHistoryEntryData[];
}

export const vibeHistoryEntries: VibeHistoryEntryData[] = [
  {
    id: "history-midnight-reset",
    title: "Midnight Reset",
    mood: "chill",
    moodLabel: "Chill",
    duration: "1 hour",
    generatedAtIso: "2026-07-11T21:15:00+05:30",
    generatedTimeLabel: "9:15 PM",
    group: "today",
    groupLabel: "Today",
    description: "Soft sound, cinematic atmosphere, reflective visuals, and quiet reading for the end of a long day.",
    intention: "A calm reset after a long day.",
    contentMix: ["Music", "Short film", "Visual inspiration", "Books"],
    artworkVariant: "midnight-reset",
    vibeHref: "/vibe/demo-vibe",
    generateAgainHref: "/generate"
  },
  {
    id: "history-morning-bloom",
    title: "Morning Bloom",
    mood: "happy",
    moodLabel: "Happy",
    duration: "30 min",
    generatedAtIso: "2026-07-11T08:20:00+05:30",
    generatedTimeLabel: "8:20 AM",
    group: "today",
    groupLabel: "Today",
    description: "Bright listening, colorful visuals, and a playful short watch for an easy start.",
    intention: "Start the day with something light and positive.",
    contentMix: ["Music", "Short video", "Visual inspiration", "Reading"],
    artworkVariant: "morning-bloom",
    vibeHref: "/vibe/demo-vibe",
    generateAgainHref: "/generate"
  },
  {
    id: "history-focus-current",
    title: "Focus Current",
    mood: "focus",
    moodLabel: "Focus",
    duration: "1 hour",
    generatedAtIso: "2026-07-10T16:40:00+05:30",
    generatedTimeLabel: "4:40 PM",
    group: "yesterday",
    groupLabel: "Yesterday",
    description: "Steady instrumental sound, distraction-light visuals, and thoughtful long-form content.",
    intention: "Stay clear and focused for the next hour.",
    contentMix: ["Instrumental music", "Long-form video", "Visual focus", "Reading"],
    artworkVariant: "focus-current",
    vibeHref: "/vibe/demo-vibe",
    generateAgainHref: "/generate"
  },
  {
    id: "history-golden-motion",
    title: "Golden Motion",
    mood: "energetic",
    moodLabel: "Energetic",
    duration: "30 min",
    generatedAtIso: "2026-07-10T10:05:00+05:30",
    generatedTimeLabel: "10:05 AM",
    group: "yesterday",
    groupLabel: "Yesterday",
    description: "Fast music, bold movement, vivid visuals, and a compact discovery session.",
    intention: "Bring back momentum before the next task.",
    contentMix: ["Music", "Video", "Visual inspiration", "Discovery"],
    artworkVariant: "golden-motion",
    vibeHref: "/vibe/demo-vibe",
    generateAgainHref: "/generate"
  },
  {
    id: "history-violet-evening",
    title: "Violet Evening",
    mood: "romantic",
    moodLabel: "Romantic",
    duration: "All night",
    generatedAtIso: "2026-07-08T20:30:00+05:30",
    generatedTimeLabel: "8:30 PM",
    group: "earlier-this-week",
    groupLabel: "Earlier this week",
    description: "Warm listening, cinematic stories, intimate visuals, and gentle reading for a slow evening.",
    intention: "Create a warm and cinematic evening atmosphere.",
    contentMix: ["Music", "Movie or episodes", "Visual inspiration", "Books"],
    artworkVariant: "violet-evening",
    vibeHref: "/vibe/demo-vibe",
    generateAgainHref: "/generate"
  },
  {
    id: "history-quiet-horizon",
    title: "Quiet Horizon",
    mood: "low",
    moodLabel: "Low",
    duration: "30 min",
    generatedAtIso: "2026-07-07T19:10:00+05:30",
    generatedTimeLabel: "7:10 PM",
    group: "earlier-this-week",
    groupLabel: "Earlier this week",
    description: "Gentle sound, unhurried video, soft imagery, and a short reflective reading moment.",
    intention: "Keep the evening quiet and unhurried.",
    contentMix: ["Music", "Video", "Visual inspiration", "Short reading"],
    artworkVariant: "quiet-horizon",
    vibeHref: "/vibe/demo-vibe",
    generateAgainHref: "/generate"
  },
  {
    id: "history-electric-night",
    title: "Electric Night",
    mood: "energetic",
    moodLabel: "Energetic",
    duration: "1 hour",
    generatedAtIso: "2026-07-04T22:00:00+05:30",
    generatedTimeLabel: "10:00 PM",
    group: "last-week",
    groupLabel: "Last week",
    description: "High-motion sound, bold video, vivid visual energy, and fast-paced discovery.",
    intention: "Stay energized through a late creative session.",
    contentMix: ["Music", "Video", "Visual inspiration", "Discovery"],
    artworkVariant: "electric-night",
    vibeHref: "/vibe/demo-vibe",
    generateAgainHref: "/generate"
  },
  {
    id: "history-rain-window",
    title: "Rain Window",
    mood: "chill",
    moodLabel: "Chill",
    duration: "15 min",
    generatedAtIso: "2026-07-03T18:25:00+05:30",
    generatedTimeLabel: "6:25 PM",
    group: "last-week",
    groupLabel: "Last week",
    description: "A compact pause with soft music, rain-textured visuals, and one quiet video.",
    intention: "Take a short break before returning to work.",
    contentMix: ["Music", "Short video", "Visual inspiration"],
    artworkVariant: "rain-window",
    vibeHref: "/vibe/demo-vibe",
    generateAgainHref: "/generate"
  }
];
