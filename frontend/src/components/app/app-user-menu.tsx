"use client";

import { DropdownMenu, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export function AppUserMenu() {
  const router = useRouter();

  return (
    <DropdownMenu
      label="Prototype user menu"
      trigger={
        <button 
          className="w-8 h-8 rounded-full bg-[var(--primary-subtle)] text-[var(--primary)] flex items-center justify-center font-display font-bold text-sm hover:bg-[var(--primary)] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--focus-ring)] shrink-0"
          aria-label="Open prototype user menu"
          type="button"
        >
          VS
        </button>
      }
    >
      <div className="px-3 py-2 border-b border-[var(--border)] mb-1">
        <p className="text-body-sm font-semibold text-foreground">VibeSync Explorer</p>
        <p className="text-caption text-foreground-subtle">Prototype profile</p>
      </div>
      
      <DropdownMenuItem onClick={() => router.push("/profile")}>
        Profile
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => router.push("/settings")}>
        Settings
      </DropdownMenuItem>
      
      <div className="my-1 border-t border-[var(--border)]" />
      
      <DropdownMenuItem disabled>
        Sign out unavailable in prototype
      </DropdownMenuItem>
    </DropdownMenu>
  );
}
