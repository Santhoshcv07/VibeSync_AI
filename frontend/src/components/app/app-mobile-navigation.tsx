"use client";

import { useState } from "react";
import { Drawer } from "@/components/ui/drawer";
import { IconButton } from "@/components/ui/icon-button";
import { VibeSyncBrand } from "@/components/marketing/vibesync-brand";
import { AppNavigation, primaryNavigation, secondaryNavigation } from "./app-navigation";
import { Badge } from "@/components/ui/badge";

const MenuIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
);

export function AppMobileNavigation() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton 
        variant="ghost" 
        onClick={() => setOpen(true)}
        label="Open navigation"
        className="lg:hidden"
      >
        {MenuIcon}
      </IconButton>

      <Drawer
        open={open}
        onOpenChange={setOpen}
        title="Application Navigation"
        side="left"
        closeLabel="Close navigation"
        className="flex flex-col h-full lg:hidden"
      >
        <div className="flex items-center mb-6 shrink-0">
          <VibeSyncBrand />
        </div>

        <div className="flex-1 overflow-y-auto flex flex-col gap-6 -mx-2 px-2">
          <div>
            <AppNavigation items={primaryNavigation} aria-label="Primary application navigation" onNavigate={() => setOpen(false)} />
          </div>

          <div>
            <AppNavigation items={secondaryNavigation} aria-label="Secondary application navigation" onNavigate={() => setOpen(false)} />
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-[var(--border)] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shrink-0 shadow-inner">
              <span className="text-white font-semibold text-sm">S</span>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
}
