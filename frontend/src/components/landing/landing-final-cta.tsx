import Link from "next/link";
import { Button } from "@/components/ui/button";

export function LandingFinalCta() {
  return (
    <section className="relative py-32 overflow-hidden border-t border-[var(--border)]">
      {/* Premium ambient artwork background */}
      <div className="absolute inset-0 bg-[var(--surface-floating)]" />
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 via-transparent to-[var(--secondary)]/10" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[var(--primary)]/5 to-transparent blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-[var(--secondary)]/5 to-transparent blur-3xl opacity-50" />
      <div className="absolute inset-0 bg-[url('/design-system/grid.svg')] opacity-5 bg-center [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />

      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
        <span className="inline-block mb-6 text-xs font-bold tracking-widest text-[var(--primary)] uppercase">
          Your next Vibe is waiting
        </span>
        <h2 className="text-display-md lg:text-display-lg font-display font-semibold tracking-tight text-foreground leading-[1.1] mb-6 max-w-3xl">
          Stop searching.<br />
          Start enjoying the moment.
        </h2>
        <p className="text-body-lg text-foreground-muted max-w-2xl mb-10">
          Choose a mood, choose your time, and let VibeSync shape the entertainment around you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Button asChild variant="primary" size="lg" className="w-full sm:w-auto min-w-[200px] font-medium text-base">
<Link href="/signup">
              Create My Vibe
            </Link>
</Button>
          <Button asChild variant="secondary" size="lg" className="w-full sm:w-auto min-w-[200px] font-medium text-base">
<Link href="/how-it-works">
              See How It Works
            </Link>
</Button>
        </div>
      </div>
    </section>
  );
}
