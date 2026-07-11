"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface ErrorStateProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  action?: ReactNode;
  details?: string;
}

export const ErrorState = forwardRef<HTMLDivElement, ErrorStateProps>(
  ({ className, title, description, action, details, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          "flex flex-col items-start justify-center p-6 w-full max-w-lg mx-auto gap-4 rounded-[var(--radius-lg)] bg-[rgba(251,113,133,0.05)] border border-[rgba(251,113,133,0.2)]",
          className
        )}
        {...props}
      >
        <div className="flex flex-col gap-1.5 w-full text-left">
          <h3 className="text-title-lg text-[var(--danger)] font-sans">
            {title}
          </h3>
          {description && (
            <p className="text-body text-foreground-muted">
              {description}
            </p>
          )}
        </div>
        {details && (
          <div className="w-full bg-[var(--background)] p-3 rounded-[var(--radius-md)] border border-[var(--border)] overflow-x-auto text-caption text-foreground-subtle font-mono">
            {details}
          </div>
        )}
        {action && <div className="mt-2">{action}</div>}
      </div>
    );
  }
);

ErrorState.displayName = "ErrorState";
