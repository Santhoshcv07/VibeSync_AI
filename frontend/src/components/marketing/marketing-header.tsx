"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { Button, IconButton } from "@/components/ui";
import { VibeSyncBrand } from "./vibesync-brand";
import { marketingNavigation } from "./marketing-navigation";
import { MarketingMobileMenu } from "./marketing-mobile-menu";

const MenuIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

export function MarketingHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-md transition-colors">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Primary navigation" className="flex h-16 md:h-20 items-center justify-between">
            <div className="flex items-center">
              <VibeSyncBrand />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:gap-x-8 lg:gap-x-12">
              {marketingNavigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <div key={item.href} className="relative flex flex-col justify-center">
                    <Link
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "text-sm font-medium transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--focus-ring)] rounded-sm",
                        isActive ? "text-[#d946ef]" : "text-white/70"
                      )}
                    >
                      {item.label}
                    </Link>
                    {isActive && (
                      <div className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-gradient-to-r from-[#d946ef] to-[#9d4edd] rounded-full" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex md:items-center md:gap-x-4">
              <button type="button" className="text-white/70 hover:text-white p-2 rounded-full transition-colors" aria-label="Toggle dark mode">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
              </button>
              <Link href="/login">
                <Button variant="outline" size="sm" className="bg-transparent border-white/20 text-white hover:bg-white/10 hover:border-white/30 rounded-xl px-5 h-9 font-medium">Sign In</Button>
              </Link>
              <Link href="/signup">
                <Button size="sm" className="bg-gradient-to-r from-[#9d4edd] via-[#d946ef] to-[#ff5e7e] text-white border-0 hover:opacity-90 rounded-xl px-5 h-9 font-medium shadow-none">Get Started Free</Button>
              </Link>
            </div>

            {/* Mobile Menu Trigger */}
            <div className="flex items-center md:hidden">
              <IconButton
                variant="ghost"
                label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={mobileMenuOpen}
                onClick={() => setMobileMenuOpen(true)}
              >
                {MenuIcon}
              </IconButton>
            </div>
          </nav>
        </div>
      </header>

      <MarketingMobileMenu
        open={mobileMenuOpen}
        onOpenChange={setMobileMenuOpen}
        pathname={pathname}
      />
    </>
  );
}
