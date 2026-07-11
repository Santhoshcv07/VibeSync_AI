"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface AppShellProps extends HTMLAttributes<HTMLDivElement> {
  sidebar?: ReactNode;
  topbar?: ReactNode;
  mobileNav?: ReactNode;
  children: ReactNode;
}

export const AppShell = forwardRef<HTMLDivElement, AppShellProps>(
  ({ className, sidebar, topbar, mobileNav, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex h-[100dvh] w-full overflow-hidden bg-[var(--background)]", className)}
        {...props}
      >
        {sidebar && (
          <div className="hidden lg:block shrink-0 h-full">
            {sidebar}
          </div>
        )}
        <div className="flex flex-col flex-1 min-w-0 h-full">
          {topbar && <div className="shrink-0">{topbar}</div>}
          <main className="flex-1 overflow-y-auto flex flex-col w-full relative">
            <div className={cn("flex flex-col flex-1 w-full", mobileNav ? "pb-[calc(env(safe-area-inset-bottom)+64px)] lg:pb-0" : undefined)}>
              {children}
            </div>
          </main>
          {mobileNav && (
            <div className="block lg:hidden shrink-0 fixed bottom-0 z-50 w-full left-0">
              {mobileNav}
            </div>
          )}
        </div>
      </div>
    );
  }
);
AppShell.displayName = "AppShell";
