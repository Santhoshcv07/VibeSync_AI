"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export type MediaCardLayout = "vertical" | "horizontal";

export interface MediaCardProps extends HTMLAttributes<HTMLElement> {
  title: string;
  subtitle?: string;
  description?: string;
  artwork?: ReactNode;
  eyebrow?: string;
  badge?: ReactNode;
  metadata?: ReactNode;
  actions?: ReactNode;
  footer?: ReactNode;
  layout?: MediaCardLayout;
  selected?: boolean;
}

export const MediaCard = forwardRef<HTMLElement, MediaCardProps>(
  (
    {
      className,
      title,
      subtitle,
      description,
      artwork,
      eyebrow,
      badge,
      metadata,
      actions,
      footer,
      layout = "vertical",
      selected = false,
      ...props
    },
    ref
  ) => {
    return (
      <article
        ref={ref}
        className={cn(
          "group relative flex rounded-[var(--radius-lg)] border bg-[var(--surface)] text-foreground shadow-[var(--shadow-sm)] transition-all overflow-hidden",
          layout === "vertical" ? "flex-col" : "flex-col sm:flex-row",
          selected
            ? "border-[var(--primary)] bg-[var(--surface-floating)] ring-1 ring-[var(--primary)]"
            : "border-[var(--border)]",
          className
        )}
        {...props}
      >
        {artwork && (
          <div
            className={cn(
              "shrink-0 p-3 pb-0",
              layout === "vertical" ? "w-full" : "w-full sm:w-[220px] sm:pb-3"
            )}
          >
            {artwork}
          </div>
        )}

        <div className="flex flex-col flex-1 p-4 gap-3">
          <header className="flex flex-col gap-1 w-full">
            {(eyebrow || badge) && (
              <div className="flex items-center justify-between gap-2 mb-1">
                {eyebrow && (
                  <span className="text-caption font-semibold uppercase tracking-wider text-[var(--primary)]">
                    {eyebrow}
                  </span>
                )}
                {badge && <div>{badge}</div>}
              </div>
            )}

            <h3 className="text-title-md font-display font-semibold leading-tight text-foreground line-clamp-2">
              {title}
            </h3>

            {subtitle && (
              <p className="text-body-sm font-medium text-foreground-subtle">
                {subtitle}
              </p>
            )}
          </header>

          {description && (
            <p className="text-body-sm text-foreground-muted line-clamp-3">
              {description}
            </p>
          )}

          {metadata && (
            <div className="text-caption text-foreground-muted flex items-center gap-2 flex-wrap mt-auto pt-2">
              {metadata}
            </div>
          )}

          {(actions || footer) && (
            <div className="flex items-center justify-between gap-3 mt-1 pt-3 border-t border-[var(--border)] flex-wrap">
              {actions && <div className="flex items-center gap-2 flex-wrap">{actions}</div>}
              {footer && <div className="text-caption text-foreground-muted ml-auto">{footer}</div>}
            </div>
          )}
        </div>
      </article>
    );
  }
);
MediaCard.displayName = "MediaCard";
