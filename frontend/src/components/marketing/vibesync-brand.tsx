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
        "group flex items-center gap-2.5 rounded-[var(--radius-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
        className
      )}
      aria-label="VibeSync AI Home"
    >
      <div
        className="flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--primary)] to-indigo-600 p-1.5 shadow-[var(--shadow-sm)]"
        aria-hidden="true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 text-white"
        >
          <path d="M12 2v20" />
          <path d="M17 5v14" />
          <path d="M22 10v4" />
          <path d="M7 5v14" />
          <path d="M2 10v4" />
        </svg>
      </div>

      <span className="flex items-baseline gap-1 text-title font-display font-semibold tracking-tight text-foreground">
        VibeSync
        {!compact && (
          <span className="text-caption font-semibold uppercase tracking-wider text-[var(--primary)]">
            AI
          </span>
        )}
      </span>
    </Link>
  );
}
