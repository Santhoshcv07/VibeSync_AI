"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type BadgeVariant = "neutral" | "primary" | "info" | "success" | "warning" | "danger";
export type BadgeSize = "sm" | "md";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "neutral", size = "md", dot = false, children, ...props }, ref) => {

    const sizeStyles = {
      sm: "px-2 py-0.5 text-caption",
      md: "px-3 py-1 text-label",
    };

    const variantStyles = {
      neutral: "bg-[var(--surface-floating)] text-[var(--foreground)] border border-[var(--border)]",
      primary: "bg-[var(--primary)] text-[var(--primary-foreground)]",
      info: "bg-[rgba(56,189,248,0.1)] text-[var(--info)] border border-[rgba(56,189,248,0.2)]",
      success: "bg-[rgba(52,211,153,0.1)] text-[var(--success)] border border-[rgba(52,211,153,0.2)]",
      warning: "bg-[rgba(251,191,36,0.1)] text-[var(--warning)] border border-[rgba(251,191,36,0.2)]",
      danger: "bg-[rgba(251,113,133,0.1)] text-[var(--danger)] border border-[rgba(251,113,133,0.2)]",
    };

    const dotColors = {
      neutral: "bg-[var(--foreground-muted)]",
      primary: "bg-white",
      info: "bg-[var(--info)]",
      success: "bg-[var(--success)]",
      warning: "bg-[var(--warning)]",
      danger: "bg-[var(--danger)]",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-1.5 rounded-[var(--radius-pill)] font-medium font-sans whitespace-nowrap",
          sizeStyles[size],
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {dot && (
          <span
            aria-hidden="true"
            className={cn("h-1.5 w-1.5 rounded-full shrink-0", dotColors[variant])}
          />
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";
