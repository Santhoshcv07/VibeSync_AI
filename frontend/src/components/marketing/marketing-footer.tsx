import Link from "next/link";
import { VibeSyncBrand } from "./vibesync-brand";

export function MarketingFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)] text-foreground">
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="md:col-span-2">
            <VibeSyncBrand className="mb-4" />
            <p className="text-body font-medium text-foreground mb-2">
              Entertainment that matches your moment.
            </p>
            <p className="text-body-sm text-foreground-muted max-w-sm">
              Build a personalized mix of music, video, visual inspiration, movies, shows, and books around your mood and available time.
            </p>
          </div>

          <div>
            <h3 className="text-label font-semibold tracking-wider uppercase text-foreground mb-4">
              Product
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/how-it-works" className="text-body-sm text-foreground-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--focus-ring)] rounded-sm">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/signup" className="text-body-sm text-foreground-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--focus-ring)] rounded-sm">
                  Get Started
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-body-sm text-foreground-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--focus-ring)] rounded-sm">
                  Sign In
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-label font-semibold tracking-wider uppercase text-foreground mb-4">
              Company
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/about" className="text-body-sm text-foreground-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--focus-ring)] rounded-sm">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-label font-semibold tracking-wider uppercase text-foreground mb-4">
              Legal
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/privacy" className="text-body-sm text-foreground-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--focus-ring)] rounded-sm">
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col md:flex-row md:items-center justify-between gap-4 border-t border-[var(--border)] pt-8">
          <p className="text-caption text-foreground-muted">
            &copy; {currentYear} VibeSync AI
          </p>
          <p className="text-caption text-foreground-muted">
            Designed for mood-driven entertainment discovery.
          </p>
        </div>
      </div>
    </footer>
  );
}
