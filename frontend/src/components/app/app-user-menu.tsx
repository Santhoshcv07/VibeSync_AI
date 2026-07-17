"use client";

import { DropdownMenu, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function AppUserMenu() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function loadUser() {
      try {
        const { fetchUserAction } = await import("@/app/actions/auth");
        const userData = await fetchUserAction();
        if (userData) {
          setUser(userData);
        } else {
          router.push("/login");
        }
      } catch (err) {
        console.error("Error fetching user", err);
      }
    }
    loadUser();
  }, [router]);

  const handleLogout = async () => {
    const { logoutAction } = await import("@/app/actions/auth");
    await logoutAction();
  };

  if (!user) {
    return (
      <div className="w-8 h-8 rounded-full bg-white/5 animate-pulse" />
    );
  }

  const initials = user.email ? user.email.substring(0, 2).toUpperCase() : "VS";

  return (
    <DropdownMenu
      label="User menu"
      trigger={
        <button 
          className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-purple-800 text-white flex items-center justify-center font-display font-bold text-[11px] hover:ring-2 hover:ring-violet-500/50 hover:ring-offset-2 hover:ring-offset-[#05020a] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-violet-500 shrink-0 shadow-lg shadow-purple-900/20"
          aria-label="Open user menu"
          type="button"
        >
          {initials}
        </button>
      }
    >
      <div className="px-3 py-2 border-b border-white/10 mb-1">
        <p className="text-body-sm font-semibold text-white truncate max-w-[160px]">{user.email}</p>
        <p className="text-caption text-white/50">VibeSync Explorer</p>
      </div>
      
      <DropdownMenuItem onClick={() => router.push("/profile")}>
        Profile
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => router.push("/settings")}>
        Settings
      </DropdownMenuItem>
      
      <div className="my-1 border-t border-white/10" />
      
      <DropdownMenuItem onClick={handleLogout} className="text-red-400 hover:text-red-300 hover:bg-red-400/10">
        Sign out
      </DropdownMenuItem>
    </DropdownMenu>
  );
}
