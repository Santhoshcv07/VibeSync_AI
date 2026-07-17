"use client";

import { SettingsHeader } from "./settings-header";
import { SettingsProfileBanner } from "./settings-profile-banner";
import { SettingsExperienceCard } from "./settings-experience-card";
import { SettingsRecommendationsCard } from "./settings-recommendations-card";
import { SettingsAppearanceCard } from "./settings-appearance-card";
import { SettingsNotificationsCard } from "./settings-notifications-card";
import { SettingsPrivacyCard } from "./settings-privacy-card";
import { Lock } from "lucide-react";

export function VibeSettings() {
  return (
    <div className="mx-auto max-w-[1320px] pb-20 animate-in fade-in duration-500">
      
      <SettingsHeader />

      <div className="mt-8 space-y-6">
        <SettingsProfileBanner />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            <SettingsExperienceCard />
            <SettingsRecommendationsCard />
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            <SettingsAppearanceCard />
            <SettingsNotificationsCard />
            <SettingsPrivacyCard />
          </div>

        </div>

        {/* Footer Note */}
        <div className="mt-8 flex items-center justify-center gap-2 text-white/40">
          <Lock className="h-4 w-4" />
          <span className="text-[13px] font-medium">Your preferences are secure and private. VibeSync AI respects your privacy.</span>
        </div>
      </div>
    </div>
  );
}
