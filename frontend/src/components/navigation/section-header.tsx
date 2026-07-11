"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface SectionHeaderProps extends HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  headingLevel?: 2 | 3;
}

export const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ className, eyebrow, title, description, action, headingLevel = 2, ...props }, ref) => {
    const HeadingTag = `h${headingLevel}` as React.ElementType;

    return (
      <div
        ref={ref}
        className={cn("flex flex-col gap-3 md:flex-row md:items-end md:justify-between w-full", className)}
        {...props}
      >
        <div className="flex flex-col gap-1 min-w-0 flex-1">
          {eyebrow && (
            <span className="text-caption font-semibold uppercase tracking-wider text-[var(--primary)]">
              {eyebrow}
            </span>
          )}
          <HeadingTag className="text-heading-2 font-display font-semibold leading-tight tracking-tight text-foreground line-clamp-1">
            {title}
          </HeadingTag>
          {description && (
            <p className="text-body-sm text-foreground-muted max-w-2xl mt-0.5 line-clamp-2">
              {description}
            </p>
          )}
        </div>
        {action && (
          <div className="flex items-center gap-2 shrink-0 mt-2 md:mt-0">
            {action}
          </div>
        )}
      </div>
    );
  }
);
SectionHeader.displayName = "SectionHeader";
