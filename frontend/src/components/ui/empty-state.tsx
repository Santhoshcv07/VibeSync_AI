"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, title, description, icon, action, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center text-center p-8 w-full max-w-md mx-auto gap-4 rounded-[var(--radius-lg)] bg-[var(--surface-floating)] border border-[var(--border)]",
          className
        )}
        {...props}
      >
        {icon && (
          <div aria-hidden="true" className="text-foreground-muted mb-2 text-4xl">
            {icon}
          </div>
        )}
        <div className="flex flex-col gap-1.5 w-full">
          <h3 className="text-heading-3 text-foreground font-sans">
            {title}
          </h3>
          {description && (
            <p className="text-body text-foreground-muted max-w-sm mx-auto">
              {description}
            </p>
          )}
        </div>
        {action && <div className="mt-2">{action}</div>}
      </div>
    );
  }
);

EmptyState.displayName = "EmptyState";
