"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

export type SidebarNavProps = HTMLAttributes<HTMLElement>;

export interface SidebarNavItemProps {
  href: string;
  label: string;
  icon?: ReactNode;
  active?: boolean;
  badge?: ReactNode;
  disabled?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export const SidebarNav = forwardRef<HTMLElement, SidebarNavProps>(
  ({ className, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        className={cn("flex flex-col gap-1 w-full", className)}
        {...props}
      />
    );
  }
);
SidebarNav.displayName = "SidebarNav";

export const SidebarNavItem = forwardRef<HTMLAnchorElement, SidebarNavItemProps>(
  ({ className, href, label, icon, active, badge, disabled, ...props }, ref) => {
    const content = (
      <>
        {icon && (
          <span className="shrink-0" aria-hidden="true">
            {icon}
          </span>
        )}
        <span className="flex-1 truncate">{label}</span>
        {active && (
          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[var(--primary)] rounded-r-full" />
        )}
        {badge && <span className="shrink-0 ml-auto">{badge}</span>}
      </>
    );

    const baseClasses = cn(
      "group relative flex items-center gap-3 rounded-[var(--radius-md)] px-3 py-2 text-body-sm font-medium transition-colors w-full",
      active
        ? "bg-[var(--surface-floating)] text-foreground"
        : "text-foreground-muted",
      !disabled && !active && "hover:bg-[var(--surface-floating)] hover:text-foreground",
      disabled && "opacity-50 pointer-events-none cursor-not-allowed",
      className
    );

    if (disabled) {
      return (
        <span
          className={baseClasses}
          aria-disabled="true"
        >
          {content}
        </span>
      );
    }

    return (
      <Link
        ref={ref}
        href={href}
        className={baseClasses}
        aria-current={active ? "page" : undefined}
        {...props}
      >
        {content}
      </Link>
    );
  }
);
SidebarNavItem.displayName = "SidebarNavItem";
