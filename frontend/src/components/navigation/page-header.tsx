"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface PageHeaderProps extends HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}

export const PageHeader = forwardRef<HTMLDivElement, PageHeaderProps>(
  ({ className, eyebrow, title, description, actions, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col gap-4 md:flex-row md:items-start md:justify-between w-full", className)}
        {...props}
      >
        <div className="flex flex-col gap-1.5 min-w-0 flex-1">
          {eyebrow && (
            <span className="text-caption font-semibold uppercase tracking-wider text-[var(--primary)]">
              {eyebrow}
            </span>
          )}
          <h1 className="text-display-md font-display font-semibold leading-tight tracking-tight text-foreground truncate w-full">
            {title}
          </h1>
          {description && (
            <p className="text-body-lg text-foreground-muted max-w-3xl mt-1">
              {description}
            </p>
          )}
        </div>
        {actions && (
          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            {actions}
          </div>
        )}
      </div>
    );
  }
);
PageHeader.displayName = "PageHeader";
