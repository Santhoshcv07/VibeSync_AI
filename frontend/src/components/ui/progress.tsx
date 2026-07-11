"use client";

import { forwardRef, type HTMLAttributes, useId } from "react";
import { cn } from "@/lib/cn";

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, max = 100, label, showValue = false, ...props }, ref) => {
    const labelId = useId();

    // Clamp safely between 0 and max. Handle invalid max safely.
    const safeMax = typeof max === 'number' && max > 0 ? max : 100;
    const safeValue = Math.min(Math.max(0, value), safeMax);
    const percentage = Math.round((safeValue / safeMax) * 100);

    return (
      <div className={cn("flex flex-col gap-1.5 w-full", className)} {...props}>
        {(label || showValue) && (
          <div className="flex items-center justify-between gap-4 w-full">
            {label && (
              <span id={labelId} className="text-label text-foreground">
                {label}
              </span>
            )}
            {showValue && (
              <span className="text-caption text-foreground-muted font-medium ml-auto">
                {percentage}%
              </span>
            )}
          </div>
        )}
        <div
          ref={ref}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={safeMax}
          aria-valuenow={safeValue}
          aria-labelledby={label ? labelId : undefined}
          className="h-2 w-full overflow-hidden rounded-[var(--radius-pill)] bg-[var(--surface-floating)] border border-[var(--border)]"
        >
          <div
            className="h-full bg-[var(--primary)] transition-all duration-normal ease-standard"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }
);

Progress.displayName = "Progress";
