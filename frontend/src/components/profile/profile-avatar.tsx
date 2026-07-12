import { ProfileMood } from "./profile.data";
import { cn } from "@/lib/cn";

export interface ProfileAvatarProps {
  displayName: string;
  mood: ProfileMood;
  size?: "medium" | "large";
  className?: string;
}

export function ProfileAvatar({
  displayName,
  mood,
  size = "medium",
  className,
}: ProfileAvatarProps) {
  // Extract fictional initials from the display name safely
  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return (name.substring(0, 2)).toUpperCase() || "?";
  };

  const initials = getInitials(displayName);
  const ariaLabel = `Abstract prototype avatar for ${displayName}`;

  // Map moods to subtle gradients and glow rings
  const moodStyles: Record<ProfileMood, string> = {
    chill: "from-blue-500/20 to-indigo-500/20 border-indigo-500/30",
    happy: "from-yellow-400/20 to-orange-400/20 border-orange-400/30",
    energetic: "from-rose-500/20 to-red-500/20 border-red-500/30",
    focus: "from-emerald-500/20 to-teal-500/20 border-teal-500/30",
    romantic: "from-pink-500/20 to-purple-500/20 border-pink-500/30",
    low: "from-slate-500/20 to-gray-500/20 border-slate-500/30",
  };

  const sizeClasses = {
    medium: "h-16 w-16 text-lg",
    large: "h-24 w-24 text-2xl",
  };

  return (
    <div
      className={cn(
        "relative flex items-center justify-center shrink-0 rounded-full bg-gradient-to-br border backdrop-blur-sm",
        "transition-colors duration-500", // Smooth mood transition
        sizeClasses[size],
        moodStyles[mood],
        className
      )}
      aria-label={ariaLabel}
      role="img"
    >
      {/* Decorative ambient ring */}
      <div
        className="absolute inset-[-4px] rounded-full border border-current opacity-20 animate-spin-slow motion-reduce:animate-none"
        aria-hidden="true"
        style={{ borderStyle: "dashed" }}
      />
      {/* Initials Text */}
      <span className="font-semibold text-white tracking-widest select-none">
        {initials}
      </span>
    </div>
  );
}
