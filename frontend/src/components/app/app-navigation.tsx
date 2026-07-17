"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface AppNavigationItem {
  label: string;
  href: string;
  description: string;
  icon: ReactNode;
  exact?: boolean;
}

export const primaryNavigation: AppNavigationItem[] = [
  {
    label: "Home",
    href: "/dashboard",
    description: "Your VibeSync overview",
    exact: true,
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
  }
];

export const secondaryNavigation: AppNavigationItem[] = [
  {
    label: "Profile",
    href: "/profile",
    description: "Manage your profile preview",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  },
  {
    label: "Settings",
    href: "/settings",
    description: "Adjust your VibeSync preferences",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
  }
];

export interface AppNavigationProps {
  items: AppNavigationItem[];
  "aria-label"?: string;
  className?: string;
  onNavigate?: () => void;
}

export function AppNavigation({ items, "aria-label": ariaLabel, className, onNavigate }: AppNavigationProps) {
  const pathname = usePathname();

  return (
    <nav className={cn("flex flex-col gap-1", className)} aria-label={ariaLabel || "Application navigation"}>
      {items.map((item) => {
        const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-body font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--focus-ring)]",
              isActive 
                ? "bg-violet-500/20 text-violet-100 shadow-[0_0_20px_rgba(139,92,246,0.3)] border border-violet-500/30" 
                : "text-white/50 hover:bg-white/5 hover:text-white/90 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]"
            )}
            title={item.description}
          >
            <span aria-hidden="true" className={cn("shrink-0", isActive ? "text-[var(--primary)]" : "text-foreground-subtle")}>
              {item.icon}
            </span>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
