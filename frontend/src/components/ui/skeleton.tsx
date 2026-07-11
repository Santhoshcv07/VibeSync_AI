"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type SkeletonVariant = "text" | "rectangle" | "circle";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = "rectangle", ...props }, ref) => {
    const variantStyles = {
      text: "rounded-[var(--radius-sm)] h-4 w-full",
      rectangle: "rounded-[var(--radius-lg)] h-full w-full",
      circle: "rounded-full h-12 w-12",
    };

    return (
      <div
        ref={ref}
        aria-hidden="true"
        className={cn(
          "bg-[var(--surface-floating)] animate-vibesync-pulse border border-[var(--border)] shrink-0",
          variantStyles[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Skeleton.displayName = "Skeleton";
