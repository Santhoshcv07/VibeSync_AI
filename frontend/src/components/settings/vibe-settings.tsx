"use client";

import { useState } from "react";
import { demoSettings, VibeSettingsData } from "./settings.data";
import { SettingsSummary } from "./settings-summary";
import { SettingsPreview } from "./settings-preview";
import { AppearanceSettings } from "./appearance-settings";
import { AccessibilitySettings } from "./accessibility-settings";
import { RecommendationSettings } from "./recommendation-settings";
import { NotificationSettings } from "./notification-settings";
import { PrivacySettings } from "./privacy-settings";
import { SettingsActionBar } from "./settings-action-bar";
import { SettingsFeedback } from "./settings-feedback";

function areSettingsEqual(first: VibeSettingsData, second: VibeSettingsData): boolean {
  return (
    first.appearance === second.appearance &&
    first.motion === second.motion &&
    first.density === second.density &&
    first.highContrast === second.highContrast &&
    first.largerText === second.largerText &&
    first.descriptiveLabels === second.descriptiveLabels &&
    first.recommendationStyle === second.recommendationStyle &&
    first.artworkStyle === second.artworkStyle &&
    first.includeBooks === second.includeBooks &&
    first.includeLongFormVideo === second.includeLongFormVideo &&
    first.showWhyRecommended === second.showWhyRecommended &&
    first.weeklyVibeDigest === second.weeklyVibeDigest &&
    first.newFeatureUpdates === second.newFeatureUpdates &&
    first.quietRecommendations === second.quietRecommendations &&
    first.rememberRecentMood === second.rememberRecentMood &&
    first.improvePrototypeExperience === second.improvePrototypeExperience
  );
}

export function VibeSettings() {
  const [savedSettings, setSavedSettings] = useState<VibeSettingsData>(() => ({
    ...demoSettings,
  }));

  const [draftSettings, setDraftSettings] = useState<VibeSettingsData>(() => ({
    ...demoSettings,
  }));

  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackCounter, setFeedbackCounter] = useState(0);
  const [hasClearedPrototypeData, setHasClearedPrototypeData] = useState(false);

  const hasUnsavedChanges = !areSettingsEqual(savedSettings, draftSettings);

  const showFeedback = (msg: string) => {
    setFeedbackMessage(msg);
    setFeedbackCounter((c) => c + 1);
  };

  function updateDraft<TKey extends keyof VibeSettingsData>(key: TKey, value: VibeSettingsData[TKey]): void {
    setDraftSettings((current) => ({
      ...current,
      [key]: value,
    }));
  }

  // --- Handlers ---

  const handleSave = () => {
    setSavedSettings({ ...draftSettings });
    showFeedback("Settings were saved to this local page preview. Nothing was stored.");
  };

  const handleDiscard = () => {
    setDraftSettings({ ...savedSettings });
    showFeedback("Unsaved settings changes were discarded.");
  };

  const handleResetDefaults = () => {
    setDraftSettings({ ...demoSettings });
    showFeedback("Demo defaults were loaded into the local preview. Save the preview to keep them until refresh.");
  };

  const handleClearPrototypeData = () => {
    setHasClearedPrototypeData(true);
    showFeedback("Prototype data clearing was simulated. No real information was deleted because nothing is stored.");
  };

  return (
    <div className="relative pb-32 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Sticky Desktop Preview) */}
        <div className="lg:col-span-1 space-y-8">
          <div className="sticky top-24 space-y-8">
            <SettingsSummary 
              settings={savedSettings}
              hasUnsavedChanges={hasUnsavedChanges}
              hasClearedPrototypeData={hasClearedPrototypeData}
            />
            <SettingsPreview settings={draftSettings} />
          </div>
        </div>
        
        {/* Right Column (Settings Controls) */}
        <div className="lg:col-span-2 space-y-8">
          <AppearanceSettings
            appearance={draftSettings.appearance}
            motion={draftSettings.motion}
            density={draftSettings.density}
            onAppearanceChange={(v) => updateDraft("appearance", v)}
            onMotionChange={(v) => updateDraft("motion", v)}
            onDensityChange={(v) => updateDraft("density", v)}
          />

          <AccessibilitySettings
            highContrast={draftSettings.highContrast}
            largerText={draftSettings.largerText}
            descriptiveLabels={draftSettings.descriptiveLabels}
            onHighContrastChange={(v) => updateDraft("highContrast", v)}
            onLargerTextChange={(v) => updateDraft("largerText", v)}
            onDescriptiveLabelsChange={(v) => updateDraft("descriptiveLabels", v)}
          />

          <RecommendationSettings
            recommendationStyle={draftSettings.recommendationStyle}
            artworkStyle={draftSettings.artworkStyle}
            includeBooks={draftSettings.includeBooks}
            includeLongFormVideo={draftSettings.includeLongFormVideo}
            showWhyRecommended={draftSettings.showWhyRecommended}
            onRecommendationStyleChange={(v) => updateDraft("recommendationStyle", v)}
            onArtworkStyleChange={(v) => updateDraft("artworkStyle", v)}
            onIncludeBooksChange={(v) => updateDraft("includeBooks", v)}
            onIncludeLongFormVideoChange={(v) => updateDraft("includeLongFormVideo", v)}
            onShowWhyRecommendedChange={(v) => updateDraft("showWhyRecommended", v)}
          />

          <NotificationSettings
            weeklyVibeDigest={draftSettings.weeklyVibeDigest}
            newFeatureUpdates={draftSettings.newFeatureUpdates}
            quietRecommendations={draftSettings.quietRecommendations}
            onWeeklyVibeDigestChange={(v) => updateDraft("weeklyVibeDigest", v)}
            onNewFeatureUpdatesChange={(v) => updateDraft("newFeatureUpdates", v)}
            onQuietRecommendationsChange={(v) => updateDraft("quietRecommendations", v)}
          />

          <PrivacySettings
            rememberRecentMood={draftSettings.rememberRecentMood}
            improvePrototypeExperience={draftSettings.improvePrototypeExperience}
            hasClearedPrototypeData={hasClearedPrototypeData}
            onRememberRecentMoodChange={(v) => updateDraft("rememberRecentMood", v)}
            onImprovePrototypeExperienceChange={(v) => updateDraft("improvePrototypeExperience", v)}
            onClearPrototypeData={handleClearPrototypeData}
          />
        </div>
      </div>

      <SettingsActionBar
        hasUnsavedChanges={hasUnsavedChanges}
        onSave={handleSave}
        onDiscard={handleDiscard}
        onResetDefaults={handleResetDefaults}
      />

      <SettingsFeedback key={feedbackCounter} message={feedbackMessage} />
    </div>
  );
}
