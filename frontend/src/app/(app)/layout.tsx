import type { ReactNode } from "react";
import { MoodThemeProvider } from "@/components/theme";
import { AppShell } from "@/components/app";
import { CurrentVibeProvider } from "@/components/vibe/current-vibe-provider";

export interface ApplicationLayoutProps {
  children: ReactNode;
}

export default function ApplicationLayout({
  children,
}: ApplicationLayoutProps) {
  return (
    <MoodThemeProvider defaultTheme="default" persist={false}>
      <CurrentVibeProvider>
        <div className="flex flex-col min-h-screen bg-[var(--background)] text-foreground overflow-x-hidden">
          <a
            href="#app-main-content"
            className="fixed top-0 left-0 p-4 -translate-y-full focus:translate-y-0 z-50 bg-[var(--primary)] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--focus-ring)] transition-transform"
          >
            Skip to content
          </a>

          <AppShell>
            <main
              id="app-main-content"
              className="flex-1 flex flex-col w-full focus:outline-none min-h-[100vh]"
              tabIndex={-1}
            >
              {children}
            </main>
          </AppShell>
        </div>
      </CurrentVibeProvider>
    </MoodThemeProvider>
  );
}