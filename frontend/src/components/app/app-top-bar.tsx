"use client";

import { usePathname } from "next/navigation";
import { AppMobileNavigation } from "./app-mobile-navigation";
import { AppUserMenu } from "./app-user-menu";
import { Badge } from "@/components/ui/badge";

const routeLabels: Record<string, string> = {
  "/dashboard": "Home",
  "/generate": "Generate Vibe",
  "/saved": "Saved Vibes",
  "/history": "History",
  "/profile": "Profile",
  "/settings": "Settings",
};

export function AppTopBar() {
  const pathname = usePathname();
  
  let currentArea = "VibeSync App";
  if (pathname.startsWith("/vibe/")) {
    currentArea = "Vibe Experience";
  } else if (routeLabels[pathname]) {
    currentArea = routeLabels[pathname];
  }

  return (
    <header className="h-16 shrink-0 border-b border-[var(--border)] bg-[var(--surface)]/80 backdrop-blur-md sticky top-0 z-40 px-4 md:px-6 flex items-center gap-4">
      <AppMobileNavigation />
      
      <span className="text-body font-semibold text-foreground lg:hidden" aria-hidden="true">
        {currentArea}
      </span>
      
      <div className="flex-1" />
      
      <AppUserMenu />
    </header>
  );
}
