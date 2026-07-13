"use client";

import {
  forwardRef,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  loadingText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      type = "button",
      loading = false,
      loadingText,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    const baseStyles =
      "inline-flex items-center justify-center gap-2 font-medium transition-all duration-fast select-none touch-manipulation focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";

    const sizeStyles = {
      sm: "h-8 px-3 text-body-sm rounded-[var(--radius-md)]",
      md: "h-11 px-5 text-body rounded-[var(--radius-lg)]",
      lg: "h-14 px-8 text-body-lg rounded-[var(--radius-xl)]",
    };

    const variantStyles = {
      primary:
        "bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary-hover)] shadow-[var(--shadow-sm)] focus-visible:shadow-[var(--glow-primary)] hover:shadow-[var(--glow-primary)]",
      secondary:
        "bg-[var(--surface-floating)] text-[var(--foreground)] border border-[var(--border)] hover:bg-[var(--surface-hover)] shadow-[var(--shadow-sm)]",
      outline:
        "bg-transparent text-[var(--foreground)] border border-[var(--border)] hover:bg-[var(--surface-hover)]",
      ghost:
        "bg-transparent text-[var(--foreground)] hover:bg-[var(--surface-hover)]",
      danger:
        "bg-[var(--danger)] text-[var(--primary-foreground)] hover:opacity-90 shadow-[var(--shadow-sm)]",
    };

    const widthStyles = fullWidth ? "w-full" : "";

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        className={cn(
          baseStyles,
          sizeStyles[size],
          variantStyles[variant],
          widthStyles,
          className
        )}
        {...props}
      >
        {loading && (
          <span className="vibesync-spinner" aria-hidden="true" />
        )}
        {!loading && leftIcon && (
          <span aria-hidden="true" className="shrink-0">
            {leftIcon}
          </span>
        )}
        {(loading && loadingText) ? loadingText : children}
        {!loading && rightIcon && (
          <span aria-hidden="true" className="shrink-0">
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
