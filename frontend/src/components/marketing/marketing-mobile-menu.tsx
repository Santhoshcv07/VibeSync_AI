"use client";

import Link from "next/link";
import { Drawer, Button } from "@/components/ui";
import { marketingNavigation } from "./marketing-navigation";
import { VibeSyncBrand } from "./vibesync-brand";
import { cn } from "@/lib/cn";

export interface MarketingMobileMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pathname: string;
}

export function MarketingMobileMenu({
  open,
  onOpenChange,
  pathname,
}: MarketingMobileMenuProps) {
  return (
    <Drawer
      open={open}
      onOpenChange={onOpenChange}
      title="VibeSync navigation"
      side="right"
      size="sm"
      className="md:hidden"
    >
      <div className="flex flex-col h-full">
        <div className="mb-8 px-2">
          <VibeSyncBrand onClick={() => onOpenChange(false)} />
        </div>
        
        <nav aria-label="Mobile navigation" className="flex flex-col gap-2">
          {marketingNavigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => onOpenChange(false)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "block px-4 py-3 text-body font-medium rounded-[var(--radius-lg)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]",
                  isActive
                    ? "bg-[var(--surface-floating)] text-foreground"
                    : "text-foreground-muted hover:bg-[var(--surface-hover)] hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-8 flex flex-col gap-3">
          <Button
            asChild
            variant="secondary"
            fullWidth
            size="lg"
            onClick={() => onOpenChange(false)}
          >
            <Link href="/login">Sign In</Link>
          </Button>
          <Button
            asChild
            variant="primary"
            fullWidth
            size="lg"
            onClick={() => onOpenChange(false)}
          >
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
      </div>
    </Drawer>
  );
}
