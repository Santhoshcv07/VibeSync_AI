"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type SidebarProps = HTMLAttributes<HTMLElement>;
export type SidebarHeaderProps = HTMLAttributes<HTMLDivElement>;
export type SidebarContentProps = HTMLAttributes<HTMLDivElement>;
export type SidebarFooterProps = HTMLAttributes<HTMLDivElement>;

export interface SidebarSectionProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
}

export const Sidebar = forwardRef<HTMLElement, SidebarProps>(
  ({ className, ...props }, ref) => {
    return (
      <aside
        ref={ref}
        className={cn(
          "flex flex-col h-full w-[280px] bg-[var(--surface-elevated)] border-r border-[var(--border)] overflow-hidden",
          className
        )}
        {...props}
      />
    );
  }
);
Sidebar.displayName = "Sidebar";

export const SidebarHeader = forwardRef<HTMLDivElement, SidebarHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("shrink-0 p-6 border-b border-[var(--border)]", className)}
        {...props}
      />
    );
  }
);
SidebarHeader.displayName = "SidebarHeader";

export const SidebarContent = forwardRef<HTMLDivElement, SidebarContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex-1 overflow-y-auto p-4 flex flex-col gap-6", className)}
        {...props}
      />
    );
  }
);
SidebarContent.displayName = "SidebarContent";

export const SidebarFooter = forwardRef<HTMLDivElement, SidebarFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("shrink-0 p-4 border-t border-[var(--border)]", className)}
        {...props}
      />
    );
  }
);
SidebarFooter.displayName = "SidebarFooter";

export const SidebarSection = forwardRef<HTMLDivElement, SidebarSectionProps>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("flex flex-col gap-2", className)} {...props}>
        {title && (
          <h3 className="px-2 text-caption font-semibold uppercase tracking-wider text-foreground-muted">
            {title}
          </h3>
        )}
        {children}
      </div>
    );
  }
);
SidebarSection.displayName = "SidebarSection";
