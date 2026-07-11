"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export type AlertVariant = "neutral" | "info" | "success" | "warning" | "danger";

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  title?: string;
  icon?: ReactNode;
  children: ReactNode;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "neutral", title, icon, children, ...props }, ref) => {
    const isDanger = variant === "danger";

    const variantStyles = {
      neutral: "bg-[var(--surface)] border-[var(--border)] text-[var(--foreground)]",
      info: "bg-[rgba(56,189,248,0.1)] border-[rgba(56,189,248,0.2)] text-[var(--info)]",
      success: "bg-[rgba(52,211,153,0.1)] border-[rgba(52,211,153,0.2)] text-[var(--success)]",
      warning: "bg-[rgba(251,191,36,0.1)] border-[rgba(251,191,36,0.2)] text-[var(--warning)]",
      danger: "bg-[rgba(251,113,133,0.1)] border-[rgba(251,113,133,0.2)] text-[var(--danger)]",
    };

    return (
      <div
        ref={ref}
        role={isDanger ? "alert" : "status"}
        className={cn(
          "flex items-start gap-3 rounded-[var(--radius-md)] border p-4 text-body-sm transition-colors",
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {icon && (
          <span aria-hidden="true" className="mt-0.5 shrink-0 text-current">
            {icon}
          </span>
        )}
        <div className="flex flex-col gap-1 w-full text-foreground">
          {title && <h5 className="font-semibold text-current font-sans text-body">{title}</h5>}
          <div className="text-foreground-muted">{children}</div>
        </div>
      </div>
    );
  }
);

Alert.displayName = "Alert";
