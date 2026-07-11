"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { Skeleton } from "./skeleton";
import { type MediaCardLayout } from "./media-card";
import { type MediaArtworkAspect } from "./media-artwork";

export interface MediaCardSkeletonProps extends HTMLAttributes<HTMLDivElement> {
  layout?: MediaCardLayout;
  aspect?: MediaArtworkAspect;
}

export const MediaCardSkeleton = forwardRef<HTMLDivElement, MediaCardSkeletonProps>(
  ({ className, layout = "vertical", aspect = "square", ...props }, ref) => {

    const aspectStyles = {
      square: "aspect-square",
      video: "aspect-video",
      poster: "aspect-[2/3]",
      book: "aspect-[2/3]",
    };

    return (
      <div
        ref={ref}
        aria-hidden="true"
        className={cn(
          "flex rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-0 overflow-hidden",
          layout === "vertical" ? "flex-col" : "flex-col sm:flex-row",
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "shrink-0 p-3 pb-0",
            layout === "vertical" ? "w-full" : "w-full sm:w-[220px] sm:pb-3"
          )}
        >
          <Skeleton variant="rectangle" className={cn("w-full h-full rounded-[var(--radius-md)]", aspectStyles[aspect])} />
        </div>

        <div className="flex flex-col flex-1 p-4 gap-4 justify-center">
          <div className="flex flex-col gap-2 w-full">
            <Skeleton variant="text" className="w-1/4 h-3 mb-1" />
            <Skeleton variant="text" className="w-3/4 h-5" />
            <Skeleton variant="text" className="w-1/2 h-4 mt-1" />
          </div>

          <div className="flex flex-col gap-2 mt-2">
            <Skeleton variant="text" className="w-full h-3.5" />
            <Skeleton variant="text" className="w-5/6 h-3.5" />
          </div>

          <div className="flex items-center gap-3 mt-auto pt-4">
            <Skeleton variant="rectangle" className="w-20 h-8 rounded-[var(--radius-md)]" />
            <Skeleton variant="rectangle" className="w-20 h-8 rounded-[var(--radius-md)]" />
          </div>
        </div>
      </div>
    );
  }
);
MediaCardSkeleton.displayName = "MediaCardSkeleton";
