"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

export type MobileNavProps = HTMLAttributes<HTMLElement>;

export interface MobileNavItemProps {
  href: string;
  label: string;
  icon?: ReactNode;
  active?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export const MobileNav = forwardRef<HTMLElement, MobileNavProps>(
  ({ className, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        className={cn(
          "flex items-center justify-around w-full bg-[var(--surface-elevated)] border-t border-[var(--border)] pb-[env(safe-area-inset-bottom)] h-[calc(env(safe-area-inset-bottom)+64px)] min-h-[64px]",
          className
        )}
        {...props}
      />
    );
  }
);
MobileNav.displayName = "MobileNav";

export const MobileNavItem = forwardRef<HTMLAnchorElement, MobileNavItemProps>(
  ({ className, href, label, icon, active, disabled, ...props }, ref) => {
    const content = (
      <>
        {icon && (
          <span className="shrink-0 mb-1" aria-hidden="true">
            {icon}
          </span>
        )}
        <span className="text-[10px] font-medium leading-none truncate w-full text-center">{label}</span>
      </>
    );

    const baseClasses = cn(
      "flex flex-col items-center justify-center flex-1 h-[64px] min-w-0 px-2 transition-colors",
      active ? "text-[var(--primary)]" : "text-foreground-muted",
      !disabled && !active && "hover:bg-[var(--surface-floating)] hover:text-foreground",
      disabled && "opacity-50 pointer-events-none",
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
MobileNavItem.displayName = "MobileNavItem";
