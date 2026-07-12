export type SettingsAppearance = "midnight" | "soft-dark" | "light";

export type SettingsMotion = "full" | "reduced" | "none";

export type SettingsDensity = "comfortable" | "compact";

export type SettingsRecommendationStyle = "balanced" | "familiar" | "discovery";

export type SettingsArtworkStyle = "cinematic" | "minimal" | "expressive";

export interface VibeSettingsData {
  appearance: SettingsAppearance;
  motion: SettingsMotion;
  density: SettingsDensity;
  highContrast: boolean;
  largerText: boolean;
  descriptiveLabels: boolean;
  recommendationStyle: SettingsRecommendationStyle;
  artworkStyle: SettingsArtworkStyle;
  includeBooks: boolean;
  includeLongFormVideo: boolean;
  showWhyRecommended: boolean;
  weeklyVibeDigest: boolean;
  newFeatureUpdates: boolean;
  quietRecommendations: boolean;
  rememberRecentMood: boolean;
  improvePrototypeExperience: boolean;
}

export interface SettingsOption<TValue extends string> {
  value: TValue;
  label: string;
  description: string;
}

export const demoSettings: VibeSettingsData = {
  appearance: "midnight",
  motion: "reduced",
  density: "comfortable",
  highContrast: false,
  largerText: false,
  descriptiveLabels: true,
  recommendationStyle: "balanced",
  artworkStyle: "cinematic",
  includeBooks: true,
  includeLongFormVideo: true,
  showWhyRecommended: true,
  weeklyVibeDigest: false,
  newFeatureUpdates: true,
  quietRecommendations: true,
  rememberRecentMood: false,
  improvePrototypeExperience: false,
};

export const appearanceOptions: SettingsOption<SettingsAppearance>[] = [
  {
    value: "midnight",
    label: "Midnight",
    description: "Deep graphite surfaces with violet atmosphere.",
  },
  {
    value: "soft-dark",
    label: "Soft Dark",
    description: "Gentler dark surfaces with lower visual contrast.",
  },
  {
    value: "light",
    label: "Light",
    description: "Bright neutral surfaces with dark readable text.",
  },
];

export const motionOptions: SettingsOption<SettingsMotion>[] = [
  {
    value: "full",
    label: "Full motion",
    description: "Use all supported decorative transitions.",
  },
  {
    value: "reduced",
    label: "Reduced motion",
    description: "Keep movement subtle and limit decorative animation.",
  },
  {
    value: "none",
    label: "No decorative motion",
    description: "Remove optional movement from the preview.",
  },
];

export const densityOptions: SettingsOption<SettingsDensity>[] = [
  {
    value: "comfortable",
    label: "Comfortable",
    description: "More space between controls and content.",
  },
  {
    value: "compact",
    label: "Compact",
    description: "A denser layout while preserving readability.",
  },
];

export const recommendationStyleOptions: SettingsOption<SettingsRecommendationStyle>[] = [
  {
    value: "balanced",
    label: "Balanced",
    description: "Mix familiar entertainment with new discoveries.",
  },
  {
    value: "familiar",
    label: "Familiar",
    description: "Favor comfortable choices close to known preferences.",
  },
  {
    value: "discovery",
    label: "Discovery",
    description: "Prioritize variety and unexpected entertainment ideas.",
  },
];

export const artworkStyleOptions: SettingsOption<SettingsArtworkStyle>[] = [
  {
    value: "cinematic",
    label: "Cinematic",
    description: "Rich gradients, atmosphere, and layered visual depth.",
  },
  {
    value: "minimal",
    label: "Minimal",
    description: "Cleaner composition with fewer decorative elements.",
  },
  {
    value: "expressive",
    label: "Expressive",
    description: "Bolder shapes, contrast, and energetic visual accents.",
  },
];
