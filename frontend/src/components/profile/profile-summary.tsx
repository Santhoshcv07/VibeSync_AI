import { VibeProfileData } from "./profile.data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/cn";

export interface ProfileSummaryProps {
  profile: VibeProfileData;
}

export function ProfileSummary({ profile }: ProfileSummaryProps) {
  // Helpers to format enum values into user-friendly strings
  const formatMood = (mood: string) => {
    return mood.charAt(0).toUpperCase() + mood.slice(1);
  };

  const formatDuration = (duration: string) => {
    switch (duration) {
      case "15-min":
        return "15 min";
      case "30-min":
        return "30 min";
      case "1-hour":
        return "1 hour";
      case "all-night":
        return "All night";
      default:
        return duration;
    }
  };

  // Determine completeness (Name, Mood, Duration, Interests, Balance)
  let completedAreas = 0;
  if (profile.displayName.trim().length >= 2) completedAreas++;
  if (profile.favoriteMood) completedAreas++;
  if (profile.preferredDuration) completedAreas++;
  if (profile.interests.length > 0) completedAreas++;
  if (
    profile.contentBalance.music >= 0 &&
    profile.contentBalance.video >= 0 &&
    profile.contentBalance.visuals >= 0 &&
    profile.contentBalance.books >= 0
  ) {
    completedAreas++;
  }

  const totalAreas = 5;
  const progressPercent = Math.round((completedAreas / totalAreas) * 100);
  const isComplete = completedAreas === totalAreas;

  return (
    <Card className="border-zinc-800 bg-zinc-900/50">
      <CardHeader>
        <CardTitle className="text-xl">Your Vibe profile</CardTitle>
        <CardDescription className="text-zinc-400">
          A local preview of the preferences that may shape future entertainment recommendations.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Fictional Completion Progress */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className={cn("font-medium", isComplete ? "text-indigo-400" : "text-zinc-300")}>
              {isComplete ? "Profile ready" : "Profile incomplete"}
            </span>
            <span className="text-zinc-500">{completedAreas} of {totalAreas} preference areas complete</span>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-zinc-800">
          <div className="space-y-1">
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Favorite mood</p>
            <p className="text-sm font-medium text-zinc-200">{formatMood(profile.favoriteMood)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Preferred duration</p>
            <p className="text-sm font-medium text-zinc-200">{formatDuration(profile.preferredDuration)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Entertainment interests</p>
            <p className="text-sm font-medium text-zinc-200">{profile.interests.length} selected</p>
          </div>
        </div>

        <div className="pt-2 text-xs text-zinc-500">
          Local only · Nothing is stored
        </div>
      </CardContent>
    </Card>
  );
}
