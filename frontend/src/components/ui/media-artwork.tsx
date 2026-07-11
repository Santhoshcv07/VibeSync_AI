"use client";

import { forwardRef, type HTMLAttributes } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

export type MediaArtworkAspect = "square" | "video" | "poster" | "book";

export interface MediaArtworkProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt: string;
  aspect?: MediaArtworkAspect;
  fallbackLabel?: string;
  priority?: boolean;
}

export const MediaArtwork = forwardRef<HTMLDivElement, MediaArtworkProps>(
  (
    {
      className,
      src,
      alt,
      aspect = "square",
      fallbackLabel,
      priority = false,
      ...props
    },
    ref
  ) => {
    const aspectStyles = {
      square: "aspect-square",
      video: "aspect-video",
      poster: "aspect-[2/3]",
      book: "aspect-[2/3]",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full overflow-hidden rounded-[var(--radius-md)] bg-[var(--surface-floating)] flex items-center justify-center shrink-0 border border-[var(--border)]",
          aspectStyles[aspect],
          className
        )}
        {...props}
      >
        {src ? (
          <Image
            src={src}
            alt={alt || ""}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-all"
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 p-4 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="text-foreground-muted"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
            {fallbackLabel && (
              <span className="text-caption text-foreground-muted max-w-[80%] line-clamp-2">
                {fallbackLabel}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
);
MediaArtwork.displayName = "MediaArtwork";
