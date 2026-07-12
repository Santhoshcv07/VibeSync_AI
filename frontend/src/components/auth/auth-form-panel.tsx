import { type ReactNode } from "react";
import Link from "next/link";
import { VibeSyncBrand } from "@/components/marketing/vibesync-brand";
import { cn } from "@/lib/cn";

export interface AuthFormPanelProps {
  children: ReactNode;
  className?: string;
}

export function AuthFormPanel({ children, className }: AuthFormPanelProps) {
  return (
    <div className={cn("w-full max-w-md mx-auto flex flex-col justify-center", className)}>
      <div className="lg:hidden mb-8 flex justify-center">
        <VibeSyncBrand />
      </div>
      
      {children}
      
      <div className="mt-8 text-center">
        <Link 
          href="/" 
          className="text-body-sm font-medium text-foreground-subtle hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] focus-visible:ring-[var(--focus-ring)] rounded-sm"
        >
          ← Back to VibeSync
        </Link>
      </div>
    </div>
  );
}
