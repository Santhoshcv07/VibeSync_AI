import { VibeProfileData } from "./profile.data";
import { ProfileAvatar } from "./profile-avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface ProfileHeroProps {
  profile: VibeProfileData;
}

export function ProfileHero({ profile }: ProfileHeroProps) {
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

  return (
    <Card className="overflow-hidden border-zinc-800 bg-zinc-900/50 backdrop-blur-md">
      {/* Subtle abstract background accent based on mood */}
      <div className="h-24 w-full bg-gradient-to-r from-indigo-500/10 via-purple-500/5 to-transparent relative">
        <Badge
          variant="neutral"
          className="absolute top-4 right-4 bg-zinc-900/80 text-zinc-400 border-zinc-700 uppercase tracking-widest text-[10px]"
        >
          Fictional Profile
        </Badge>
      </div>

      <CardContent className="p-6 pt-0 relative">
        <div className="flex flex-col md:flex-row gap-6 md:items-end -mt-12 mb-6">
          <ProfileAvatar
            displayName={profile.displayName}
            mood={profile.favoriteMood}
            size="large"
            className="shadow-xl bg-zinc-900 border-zinc-700"
          />
          <div className="flex flex-col flex-1 pb-1">
            <h2 className="text-2xl font-bold text-zinc-50 m-0 leading-tight">
              {profile.displayName}
            </h2>
            <p className="text-zinc-400 text-sm font-medium">
              {profile.handle}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {profile.bio && (
            <p className="text-zinc-300 text-sm max-w-2xl leading-relaxed">
              {profile.bio}
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-zinc-800/50">
            <div className="flex flex-col space-y-1">
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Favorite Vibe
              </span>
              <span className="text-sm text-zinc-200 font-medium">
                {formatMood(profile.favoriteMood)}
              </span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Usual session
              </span>
              <span className="text-sm text-zinc-200 font-medium">
                {formatDuration(profile.preferredDuration)}
              </span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Interests
              </span>
              <span className="text-sm text-zinc-200 font-medium">
                {profile.interests.length} entertainment interests
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
