export type ProfileMood =
  | "chill"
  | "happy"
  | "energetic"
  | "focus"
  | "romantic"
  | "low";

export type ProfileDuration =
  | "15-min"
  | "30-min"
  | "1-hour"
  | "all-night";

export type ProfileInterest =
  | "music"
  | "video"
  | "movies-series"
  | "visual-inspiration"
  | "books-reading";

export type ProfileContentCategory =
  | "music"
  | "video"
  | "visuals"
  | "books";

export interface ProfileContentBalance {
  music: number;
  video: number;
  visuals: number;
  books: number;
}

export interface VibeProfileData {
  displayName: string;
  handle: string;
  bio: string;
  favoriteMood: ProfileMood;
  preferredDuration: ProfileDuration;
  interests: ProfileInterest[];
  contentBalance: ProfileContentBalance;
}

export interface ProfileMoodOption {
  value: ProfileMood;
  label: string;
  description: string;
}

export interface ProfileDurationOption {
  value: ProfileDuration;
  label: string;
  description: string;
}

export interface ProfileInterestOption {
  value: ProfileInterest;
  label: string;
  description: string;
}

export const demoProfile: VibeProfileData = {
  displayName: "Alex Morgan",
  handle: "@alexvibes",
  bio: "Curating calm nights, focused mornings, and unexpected entertainment discoveries.",
  favoriteMood: "chill",
  preferredDuration: "1-hour",
  interests: ["music", "video", "visual-inspiration", "books-reading"],
  contentBalance: {
    music: 35,
    video: 25,
    visuals: 20,
    books: 20,
  },
};

export const profileMoodOptions: ProfileMoodOption[] = [
  {
    value: "chill",
    label: "Chill",
    description: "Slow, atmospheric, and easy to settle into.",
  },
  {
    value: "happy",
    label: "Happy",
    description: "Bright, playful, and naturally uplifting.",
  },
  {
    value: "energetic",
    label: "Energetic",
    description: "Bold, fast-moving, and momentum-driven.",
  },
  {
    value: "focus",
    label: "Focus",
    description: "Clear, steady, and distraction-light.",
  },
  {
    value: "romantic",
    label: "Romantic",
    description: "Warm, cinematic, and intimate.",
  },
  {
    value: "low",
    label: "Low",
    description: "Gentle, quiet, and emotionally soft.",
  },
];

export const profileDurationOptions: ProfileDurationOption[] = [
  {
    value: "15-min",
    label: "15 min",
    description: "A quick entertainment reset.",
  },
  {
    value: "30-min",
    label: "30 min",
    description: "A compact Vibe with room to explore.",
  },
  {
    value: "1-hour",
    label: "1 hour",
    description: "A balanced experience across several formats.",
  },
  {
    value: "all-night",
    label: "All night",
    description: "A longer entertainment journey without rushing.",
  },
];

export const profileInterestOptions: ProfileInterestOption[] = [
  {
    value: "music",
    label: "Music",
    description: "Albums, playlists, and sound-led experiences.",
  },
  {
    value: "video",
    label: "Video",
    description: "Short videos, long-form viewing, and discovery.",
  },
  {
    value: "movies-series",
    label: "Movies & Series",
    description: "Cinematic stories and episodic entertainment.",
  },
  {
    value: "visual-inspiration",
    label: "Visual Inspiration",
    description: "Moodboards, photography, art, and visual discovery.",
  },
  {
    value: "books-reading",
    label: "Books & Reading",
    description: "Books, essays, articles, and reflective reading.",
  },
];
