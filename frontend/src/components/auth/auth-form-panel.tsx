"use client";

import { type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { VibeSyncBrand } from "@/components/marketing/vibesync-brand";
import { cn } from "@/lib/cn";

export interface AuthFormPanelProps {
  children: ReactNode;
  className?: string;
}

export function AuthFormPanel({ children, className }: AuthFormPanelProps) {
  const pathname = usePathname();
  const isLogin = pathname === "/login";

  return (
    <div className={cn("w-full max-w-[520px] mx-auto flex flex-col justify-center py-4", className)}>
      <div className="w-full h-fit bg-[#0d061a]/80 backdrop-blur-xl rounded-3xl shadow-[0_0_50px_rgba(131,56,236,0.15)] p-6 sm:p-8 lg:p-10 relative overflow-hidden border border-[#37195c] flex flex-col">
        {/* Decorative inner glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-1 bg-gradient-to-r from-transparent via-[#8338ec]/50 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[1px] bg-gradient-to-r from-transparent via-[#ff0a54]/30 to-transparent" />
        
        <div className="w-full flex flex-col relative z-10">
          <div className="lg:hidden mb-8 flex justify-center">
            <VibeSyncBrand />
          </div>

          {/* Tabs */}
          <div className="flex w-full border-b border-white/10 mb-8 relative">
            <Link 
              href="/login"
              className={cn(
                "flex-1 text-center py-3 text-[16px] font-semibold transition-colors relative",
                isLogin ? "text-white" : "text-white/50 hover:text-white/80"
              )}
            >
              Login
              {isLogin && (
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#ff7e67] via-[#ff0a54] to-[#8338ec]" />
              )}
            </Link>
            <Link 
              href="/signup"
              className={cn(
                "flex-1 text-center py-3 text-[16px] font-semibold transition-colors relative",
                !isLogin ? "text-white" : "text-white/50 hover:text-white/80"
              )}
            >
              Sign Up
              {!isLogin && (
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#ff7e67] via-[#ff0a54] to-[#8338ec]" />
              )}
            </Link>
          </div>

          <div className="flex flex-col w-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
