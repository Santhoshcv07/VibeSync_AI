"use client";

import {
  forwardRef,
  type ButtonHTMLAttributes,
} from "react";
import { cn } from "@/lib/cn";

export type IconButtonVariant =
  | "secondary"
  | "outline"
  | "ghost"
  | "danger";

export type IconButtonSize = "sm" | "md" | "lg";

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  loading?: boolean;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      label,
      variant = "secondary",
      size = "md",
      type = "button",
      loading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    const baseStyles =
      "inline-flex items-center justify-center transition-all duration-fast select-none touch-manipulation focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] shrink-0";

    const sizeStyles = {
      sm: "h-8 w-8 rounded-[var(--radius-md)]",
      md: "h-11 w-11 rounded-[var(--radius-lg)]",
      lg: "h-14 w-14 rounded-[var(--radius-xl)]",
    };

    const variantStyles = {
      secondary:
        "bg-[var(--surface-floating)] text-[var(--foreground)] border border-[var(--border)] hover:bg-[var(--surface-hover)] shadow-[var(--shadow-sm)]",
      outline:
        "bg-transparent text-[var(--foreground)] border border-[var(--border)] hover:bg-[var(--surface-hover)]",
      ghost:
        "bg-transparent text-[var(--foreground)] hover:bg-[var(--surface-hover)]",
      danger:
        "bg-[var(--danger)] text-[var(--primary-foreground)] hover:opacity-90 shadow-[var(--shadow-sm)]",
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        aria-label={label}
        className={cn(
          baseStyles,
          sizeStyles[size],
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {loading ? (
          <span className="vibesync-spinner" aria-hidden="true" />
        ) : (
          children
        )}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";
