"use client";

import { ProfileHero } from "./profile-hero";
import { ProfileStats } from "./profile-stats";
import { ProfileTabs } from "./profile-tabs";
import { ProfileTopMoods } from "./profile-top-moods";
import { ProfileRecentVibes } from "./profile-recent-vibes";
import { ProfileAchievements } from "./profile-achievements";
import { ProfileListeningChart } from "./profile-listening-chart";
import { ProfileFavoriteGenres } from "./profile-favorite-genres";

export function VibeProfile() {
  return (
    <div className="mx-auto max-w-[1320px] space-y-6 pb-20 animate-in fade-in duration-500">
      <ProfileHero />
      <ProfileStats />
      
      <div className="mt-8 mb-6">
        <ProfileTabs />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-6">
        {/* Left Column */}
        <div className="flex flex-col gap-6">
          <ProfileTopMoods />
          <ProfileAchievements />
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          <ProfileRecentVibes />
          <ProfileListeningChart />
        </div>
      </div>

      <ProfileFavoriteGenres />
    </div>
  );
}
