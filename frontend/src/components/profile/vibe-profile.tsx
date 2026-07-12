"use client";

import { useState } from "react";
import { 
  demoProfile, 
  VibeProfileData, 
  ProfileMood, 
  ProfileDuration, 
  ProfileInterest, 
  ProfileContentBalance 
} from "./profile.data";
import { ProfileHero } from "./profile-hero";
import { ProfileSummary } from "./profile-summary";
import { ProfileIdentityForm } from "./profile-identity-form";
import { ProfilePreferences } from "./profile-preferences";
import { ProfileFeedback } from "./profile-feedback";

// Safe cloning helper to avoid mutating original or nested arrays/objects
function cloneProfile(profile: VibeProfileData): VibeProfileData {
  return {
    ...profile,
    interests: [...profile.interests],
    contentBalance: {
      ...profile.contentBalance,
    },
  };
}

export function VibeProfile() {
  const [profile, setProfile] = useState<VibeProfileData>(() => cloneProfile(demoProfile));
  const [draftProfile, setDraftProfile] = useState<VibeProfileData>(() => cloneProfile(demoProfile));
  const [isEditingIdentity, setIsEditingIdentity] = useState(false);
  
  // Feedback state
  const [feedbackMessage, setFeedbackMessage] = useState("");
  // We use a counter to force feedback re-triggers even if message is the same
  const [feedbackCounter, setFeedbackCounter] = useState(0);

  const [identityErrors, setIdentityErrors] = useState<{
    displayName?: string;
    bio?: string;
  }>({});

  const showFeedback = (msg: string) => {
    setFeedbackMessage(msg);
    setFeedbackCounter((c) => c + 1);
  };

  // --- Identity Handlers ---

  const handleStartEditingIdentity = () => {
    setDraftProfile(cloneProfile(profile));
    setIdentityErrors({});
    setIsEditingIdentity(true);
  };

  const handleDisplayNameChange = (value: string) => {
    setDraftProfile({ ...draftProfile, displayName: value });
    if (identityErrors.displayName) {
      setIdentityErrors({ ...identityErrors, displayName: undefined });
    }
  };

  const handleBioChange = (value: string) => {
    setDraftProfile({ ...draftProfile, bio: value });
    if (identityErrors.bio) {
      setIdentityErrors({ ...identityErrors, bio: undefined });
    }
  };

  const handleSaveIdentity = () => {
    const trimmedName = draftProfile.displayName.trim();
    const errors: typeof identityErrors = {};

    if (trimmedName.length < 2) {
      errors.displayName = "Enter a display name with at least 2 characters.";
    } else if (trimmedName.length > 40) {
      errors.displayName = "Keep the display name to 40 characters or fewer.";
    }

    if (draftProfile.bio && draftProfile.bio.length > 160) {
      errors.bio = "Keep the profile bio to 160 characters or fewer.";
    }

    if (Object.keys(errors).length > 0) {
      setIdentityErrors(errors);
      return;
    }

    const updatedProfile = {
      ...draftProfile,
      displayName: trimmedName,
    };

    setProfile(cloneProfile(updatedProfile));
    setDraftProfile(cloneProfile(updatedProfile));
    setIsEditingIdentity(false);
    showFeedback("Profile identity was updated locally. Nothing was stored.");
  };

  const handleCancelIdentity = () => {
    setDraftProfile(cloneProfile(profile));
    setIdentityErrors({});
    setIsEditingIdentity(false);
    showFeedback("Profile identity changes were cancelled.");
  };

  // --- Preference Handlers ---

  const handleFavoriteMoodChange = (mood: ProfileMood) => {
    const newProfile = { ...profile, favoriteMood: mood };
    setProfile(cloneProfile(newProfile));
    if (isEditingIdentity) {
      setDraftProfile({ ...draftProfile, favoriteMood: mood });
    }
    showFeedback("Favorite mood was updated locally. Nothing was stored.");
  };

  const handlePreferredDurationChange = (duration: ProfileDuration) => {
    const newProfile = { ...profile, preferredDuration: duration };
    setProfile(cloneProfile(newProfile));
    if (isEditingIdentity) {
      setDraftProfile({ ...draftProfile, preferredDuration: duration });
    }
    showFeedback("Preferred Vibe duration was updated locally. Nothing was stored.");
  };

  const handleInterestsChange = (interests: ProfileInterest[]) => {
    const newProfile = { ...profile, interests };
    setProfile(cloneProfile(newProfile));
    if (isEditingIdentity) {
      setDraftProfile({ ...draftProfile, interests: [...interests] });
    }
    showFeedback("Entertainment interests were updated locally. Nothing was stored.");
  };

  const handleContentBalanceChange = (balance: ProfileContentBalance) => {
    const newProfile = { ...profile, contentBalance: balance };
    setProfile(cloneProfile(newProfile));
    if (isEditingIdentity) {
      setDraftProfile({ ...draftProfile, contentBalance: { ...balance } });
    }
    showFeedback("Content balance was updated locally. Nothing was stored.");
  };

  // --- Reset Handler ---

  const handleResetProfile = () => {
    const reset = cloneProfile(demoProfile);
    setProfile(reset);
    setDraftProfile(reset);
    setIsEditingIdentity(false);
    setIdentityErrors({});
    showFeedback("The fictional demo profile was restored locally. Nothing was stored.");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <ProfileHero profile={profile} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
          <ProfileSummary profile={profile} />
        </div>
        
        <div className="lg:col-span-2 space-y-8">
          <ProfileIdentityForm
            profile={profile}
            draftProfile={draftProfile}
            isEditing={isEditingIdentity}
            errors={identityErrors}
            onStartEditing={handleStartEditingIdentity}
            onDisplayNameChange={handleDisplayNameChange}
            onBioChange={handleBioChange}
            onSave={handleSaveIdentity}
            onCancel={handleCancelIdentity}
          />

          <ProfilePreferences
            profile={profile}
            onFavoriteMoodChange={handleFavoriteMoodChange}
            onPreferredDurationChange={handlePreferredDurationChange}
            onInterestsChange={handleInterestsChange}
            onContentBalanceChange={handleContentBalanceChange}
            onResetProfile={handleResetProfile}
          />
        </div>
      </div>

      <ProfileFeedback key={feedbackCounter} message={feedbackMessage} />
    </div>
  );
}
