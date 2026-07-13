import Link from "next/link";
import { cn } from "@/lib/cn";

export interface VibeSyncBrandProps {
  href?: string;
  compact?: boolean;
  className?: string;
  onClick?: () => void;
}

export function VibeSyncBrand({
  href = "/",
  compact = false,
  className,
  onClick,
}: VibeSyncBrandProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "group flex items-center gap-3 rounded-[var(--radius-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
        className
      )}
      aria-label="VibeSync AI Home"
    >
      {/* Colorful Equalizer Logo */}
      <div className="flex shrink-0 items-center gap-[3px]" aria-hidden="true">
        <div className="w-[5px] h-[10px] rounded-full bg-[#00e5ff]"></div>
        <div className="w-[5px] h-[18px] rounded-full bg-[#3a86ff]"></div>
        <div className="w-[5px] h-[26px] rounded-full bg-[#8338ec]"></div>
        <div className="w-[5px] h-[18px] rounded-full bg-gradient-to-b from-[#ffbe0b] to-[#ff006e]"></div>
        <div className="w-[5px] h-[10px] rounded-full bg-[#ff006e]"></div>
      </div>

      <span className="flex items-baseline text-2xl font-bold tracking-tight">
        <span className="text-white">Vibe</span>
        <span className="bg-gradient-to-b from-[#ff8fa3] to-[#ff0a54] bg-clip-text text-transparent">
          Sync
        </span>
        {!compact && (
          <span className="ml-1.5 bg-gradient-to-b from-[#b558f6] to-[#732bf5] bg-clip-text text-transparent">
            AI
          </span>
        )}
      </span>
    </Link>
  );
}
