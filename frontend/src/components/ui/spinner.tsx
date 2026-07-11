"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type SpinnerSize = "sm" | "md" | "lg";

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  size?: SpinnerSize;
  label?: string;
}

export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ className, size = "md", label = "Loading", ...props }, ref) => {
    const sizeStyles = {
      sm: "h-3.5 w-3.5 border-2",
      md: "h-5 w-5 border-2",
      lg: "h-8 w-8 border-[3px]",
    };

    return (
      <span
        ref={ref}
        role="status"
        className={cn("inline-flex items-center justify-center shrink-0", className)}
        {...props}
      >
        <span
          className={cn("vibesync-spinner text-current", sizeStyles[size])}
          aria-hidden="true"
        />
        {label && <span className="sr-only">{label}</span>}
      </span>
    );
  }
);

Spinner.displayName = "Spinner";
