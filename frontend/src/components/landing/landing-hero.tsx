import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EntertainmentCollage } from "./entertainment-collage";

export function LandingHero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-24 lg:pb-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text */}
          <div className="max-w-2xl flex flex-col gap-6">
            <div>
              <span className="inline-block mb-4 text-xs font-bold tracking-widest text-[var(--primary)] uppercase bg-[var(--primary)]/10 px-3 py-1 rounded-full border border-[var(--primary)]/20">
                Your Mood. Your Moment. Your Entertainment.
              </span>
              <h1 className="text-display-md lg:text-display-lg font-display font-semibold tracking-tight text-foreground leading-[1.1]">
                One mood.<br className="hidden sm:block" />
                A whole world to enjoy.
              </h1>
            </div>
            
            <p className="text-body-lg text-foreground-muted leading-relaxed">
              Tell VibeSync how you feel and how much time you have. Get a personalized mix of music, videos, visual inspiration, movies, shows, and books built around your moment.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <Button asChild variant="primary" size="lg" className="sm:w-auto font-medium">
<Link href="/signup">
                  Build My Vibe
                </Link>
</Button>
              <Button asChild variant="outline" size="lg" className="sm:w-auto font-medium">
<Link href="/how-it-works">
                  See How It Works
                </Link>
</Button>
            </div>
            
            <p className="text-body-sm text-foreground-muted mt-4">
              No endless searching. No tab overload. Just one experience that fits now.
            </p>
          </div>

          {/* Right Column: Collage */}
          <div className="w-full h-full min-h-[400px] flex items-center justify-center lg:justify-end">
            <EntertainmentCollage />
          </div>

        </div>
      </div>
    </section>
  );
}
