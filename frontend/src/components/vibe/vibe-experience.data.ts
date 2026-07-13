export type VibeMediaCategory =
  | "music"
  | "movies-shows"
  | "youtube"
  | "visual-inspiration"
  | "books";

export type VibeArtworkVariant =
  | "aurora"
  | "midnight-window"
  | "soft-motion"
  | "quiet-frames"
  | "paper-moon"
  | "violet-room"
  | "blue-hour"
  | "floating-pages"
  | "slow-signal"
  | "afterglow";

export interface VibeRecommendation {
  id: string;
  category: VibeMediaCategory;
  title: string;
  creator: string;
  description: string;
  duration?: string;
  format: string;
  providerLabel: string;
  actionLabel: string;
  artworkVariant: VibeArtworkVariant;
  tags: string[];
  imageUrl?: string;
  thumbnailUrl?: string;
  destinationUrl?: string;
  platform?: string;
  matchScore?: number;
  year?: string | number;
  metadata?: Record<string, unknown>;
}

export interface VibeMediaSectionData {
  id: string;
  category: VibeMediaCategory;
  eyebrow: string;
  title: string;
  description: string;
  items: VibeRecommendation[];
}

export interface VibeExperienceData {
  id: string;
  title: string;
  mood: string;
  duration: string;
  description: string;
  intention: string;
  journeySummary: string;
  sections: VibeMediaSectionData[];
}

export const demoVibeExperience: VibeExperienceData = {
  id: "demo-vibe",
  title: "Midnight Reset",
  mood: "Chill",
  duration: "1 hour",
  description: "A calm late-night entertainment journey designed around soft sound, cinematic atmosphere, reflective visuals, and quiet reading.",
  intention: "A calm reset after a long day.",
  journeySummary: "Begin with spacious sound, settle into a cinematic watch, wander through slow visual inspiration, and close with a reflective reading moment.",
  sections: [
    {
      id: "music-section",
      category: "music",
      eyebrow: "01 · LISTEN",
      title: "Soundtrack the reset",
      description: "Original fictional listening concepts for a quiet transition into the Vibe.",
      items: [
        {
          id: "music-1",
          category: "music",
          title: "Blue Hour Drift",
          creator: "North Window",
          description: "Airy synth textures, distant piano, and a slow pulse that leaves room to think.",
          duration: "18 min",
          format: "Ambient session",
          providerLabel: "Future music integration",
          actionLabel: "Open Music Preview",
          artworkVariant: "aurora",
          tags: ["Ambient", "Instrumental", "Slow pulse"]
        },
        {
          id: "music-2",
          category: "music",
          title: "Rooms After Rain",
          creator: "Quiet District",
          description: "Warm keys and softened rhythm for the moment when the day finally becomes quiet.",
          duration: "22 min",
          format: "Lo-fi sequence",
          providerLabel: "Future music integration",
          actionLabel: "Open Music Preview",
          artworkVariant: "midnight-window",
          tags: ["Lo-fi", "Warm keys", "Night"]
        },
        {
          id: "music-3",
          category: "music",
          title: "Slow Signal",
          creator: "Afterlight Radio",
          description: "Minimal electronic movement with soft bass and long spaces between each idea.",
          duration: "16 min",
          format: "Electronic mix",
          providerLabel: "Future music integration",
          actionLabel: "Open Music Preview",
          artworkVariant: "slow-signal",
          tags: ["Minimal", "Electronic", "Atmospheric"]
        }
      ]
    },
    {
      id: "movies-shows-section",
      category: "movies-shows",
      eyebrow: "02 · WATCH",
      title: "Stay inside the atmosphere",
      description: "Fictional cinematic concepts shaped for a calm one-hour viewing window.",
      items: [
        {
          id: "watch-1",
          category: "movies-shows",
          title: "The Last Window Awake",
          creator: "A fictional short film by Mira Vale",
          description: "A quiet city story about two strangers who notice the same illuminated window every night.",
          duration: "42 min",
          format: "Short film",
          providerLabel: "Future movie and show integration",
          actionLabel: "Open Watch Preview",
          artworkVariant: "quiet-frames",
          tags: ["Reflective", "City night", "Character story"]
        },
        {
          id: "watch-2",
          category: "movies-shows",
          title: "Letters from the Blue Room",
          creator: "A fictional anthology episode by Sol North",
          description: "One self-contained episode following the memories hidden inside an old apartment.",
          duration: "48 min",
          format: "Anthology episode",
          providerLabel: "Future movie and show integration",
          actionLabel: "Open Watch Preview",
          artworkVariant: "violet-room",
          tags: ["Atmospheric", "Memory", "Slow cinema"]
        }
      ]
    },
    {
      id: "youtube-section",
      category: "youtube",
      eyebrow: "03 · DISCOVER",
      title: "Watch without wandering",
      description: "Fictional long-form video concepts chosen to continue the calm atmosphere.",
      items: [
        {
          id: "youtube-1",
          category: "youtube",
          title: "Why Quiet Spaces Feel Bigger at Night",
          creator: "Stillframe Studio",
          description: "A visual essay exploring light, architecture, silence, and the feeling of empty cities.",
          duration: "14 min",
          format: "Visual essay",
          providerLabel: "Future video integration",
          actionLabel: "Open Video Preview",
          artworkVariant: "blue-hour",
          tags: ["Architecture", "Night", "Visual essay"]
        },
        {
          id: "youtube-2",
          category: "youtube",
          title: "A Slow Train Through the Sleeping Coast",
          creator: "Open Window Films",
          description: "A fictional ambient travel film with quiet landscapes, natural sound, and no narration.",
          duration: "20 min",
          format: "Ambient travel film",
          providerLabel: "Future video integration",
          actionLabel: "Open Video Preview",
          artworkVariant: "soft-motion",
          tags: ["Travel", "Natural sound", "No narration"]
        }
      ]
    },
    {
      id: "visual-inspiration-section",
      category: "visual-inspiration",
      eyebrow: "04 · EXPLORE",
      title: "See the feeling",
      description: "Original visual-board concepts that translate the Vibe into color, space, and texture.",
      items: [
        {
          id: "visual-1",
          category: "visual-inspiration",
          title: "Midnight Interiors",
          creator: "VibeSync visual-board concept",
          description: "Deep blue rooms, warm lamps, rain-softened windows, bookshelves, and quiet corners.",
          format: "Visual mood board",
          providerLabel: "Future visual-inspiration integration",
          actionLabel: "Explore Visual Preview",
          artworkVariant: "midnight-window",
          tags: ["Interiors", "Warm light", "Midnight blue"]
        },
        {
          id: "visual-2",
          category: "visual-inspiration",
          title: "After-Rain Color Study",
          creator: "VibeSync visual-board concept",
          description: "Reflective streets, violet skies, silver surfaces, and soft gradients after a storm.",
          format: "Color and texture board",
          providerLabel: "Future visual-inspiration integration",
          actionLabel: "Explore Visual Preview",
          artworkVariant: "afterglow",
          tags: ["Color", "Texture", "After rain"]
        }
      ]
    },
    {
      id: "books-section",
      category: "books",
      eyebrow: "05 · READ",
      title: "Close with a quiet page",
      description: "Fictional reading concepts designed to end the Vibe with reflection rather than noise.",
      items: [
        {
          id: "books-1",
          category: "books",
          title: "The Cartographer of Quiet Places",
          creator: "Elian Rowe",
          description: "A fictional reflective novel about a mapmaker documenting places people visit when they need silence.",
          duration: "12 min sample",
          format: "Reflective fiction",
          providerLabel: "Future books integration",
          actionLabel: "Open Reading Preview",
          artworkVariant: "floating-pages",
          tags: ["Fiction", "Reflection", "Slow travel"]
        },
        {
          id: "books-2",
          category: "books",
          title: "Small Rituals for the End of the Day",
          creator: "Nora Lune",
          description: "A fictional essay collection about light, music, rooms, and the habits that help a day become complete.",
          duration: "10 min sample",
          format: "Personal essays",
          providerLabel: "Future books integration",
          actionLabel: "Open Reading Preview",
          artworkVariant: "paper-moon",
          tags: ["Essays", "Daily rituals", "Calm"]
        }
      ]
    }
  ]
};
