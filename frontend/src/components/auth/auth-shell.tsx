import { type ReactNode } from "react";
import { AuthBrandPanel } from "./auth-brand-panel";

export interface AuthShellProps {
  children: ReactNode;
}

export function AuthShell({ children }: AuthShellProps) {
  return (
    <div className="flex min-h-screen w-full bg-[var(--background)]">
      <AuthBrandPanel />
      <div className="flex flex-1 flex-col justify-center p-6 sm:p-12 lg:w-1/2 relative overflow-y-auto">
        {/* Subtle decorative glow for mobile fallback */}
        <div className="lg:hidden absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md h-64 bg-gradient-to-b from-[var(--primary)]/10 to-transparent blur-3xl pointer-events-none" aria-hidden="true" />
        
        <div className="relative z-10 w-full flex items-center justify-center min-h-[500px]">
          {children}
        </div>
      </div>
    </div>
  );
}
