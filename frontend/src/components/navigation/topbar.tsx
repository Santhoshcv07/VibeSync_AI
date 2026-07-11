"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface TopbarProps extends HTMLAttributes<HTMLElement> {
  start?: ReactNode;
  center?: ReactNode;
  end?: ReactNode;
}

export const Topbar = forwardRef<HTMLElement, TopbarProps>(
  ({ className, start, center, end, ...props }, ref) => {
    return (
      <header
        ref={ref}
        className={cn(
          "flex items-center w-full h-[64px] px-4 md:px-6 bg-[var(--surface)] border-b border-[var(--border)] z-40",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-4 min-w-0 flex-1">
          {start && <div className="flex items-center gap-2">{start}</div>}
        </div>
        <div className="flex items-center justify-center shrink-0 px-4">
          {center && <div>{center}</div>}
        </div>
        <div className="flex items-center justify-end gap-4 min-w-0 flex-1">
          {end && <div className="flex items-center gap-2">{end}</div>}
        </div>
      </header>
    );
  }
);
Topbar.displayName = "Topbar";
