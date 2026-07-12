import { VibeProfileData, ProfileMood, ProfileDuration, ProfileInterest, ProfileContentBalance } from "./profile.data";
import { ProfileMoodSelector } from "./profile-mood-selector";
import { ProfileDurationSelector } from "./profile-duration-selector";
import { ProfileInterestSelector } from "./profile-interest-selector";
import { ProfileContentBalance as ProfileContentBalanceControl } from "./profile-content-balance";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface ProfilePreferencesProps {
  profile: VibeProfileData;
  onFavoriteMoodChange: (mood: ProfileMood) => void;
  onPreferredDurationChange: (duration: ProfileDuration) => void;
  onInterestsChange: (interests: ProfileInterest[]) => void;
  onContentBalanceChange: (balance: ProfileContentBalance) => void;
  onResetProfile: () => void;
}

export function ProfilePreferences({
  profile,
  onFavoriteMoodChange,
  onPreferredDurationChange,
  onInterestsChange,
  onContentBalanceChange,
  onResetProfile,
}: ProfilePreferencesProps) {
  return (
    <Card className="border-zinc-800 bg-zinc-900/50">
      <CardHeader>
        <CardTitle className="text-xl">Entertainment preferences</CardTitle>
        <CardDescription className="text-zinc-400">
          Adjust the fictional preference signals that may guide future Vibe generation.
        </CardDescription>
        <div className="pt-2">
          <p className="text-xs text-indigo-400/80 font-medium">
            Preference changes remain local to this page and do not affect real recommendations.
          </p>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-10 pt-4 border-t border-zinc-800">
        <ProfileMoodSelector
          value={profile.favoriteMood}
          onChange={onFavoriteMoodChange}
        />
        
        <ProfileDurationSelector
          value={profile.preferredDuration}
          onChange={onPreferredDurationChange}
        />
        
        <ProfileInterestSelector
          values={profile.interests}
          onChange={onInterestsChange}
        />
        
        <ProfileContentBalanceControl
          value={profile.contentBalance}
          onChange={onContentBalanceChange}
        />

        <div className="pt-8 border-t border-zinc-800 flex justify-end">
          <Button variant="secondary" onClick={onResetProfile}>
            Reset Demo Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
