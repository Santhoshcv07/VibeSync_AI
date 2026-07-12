import { Card } from "@/components/ui/card";
import { cn } from "@/lib/cn";

export function TimeAwareExperience() {
  const times = [
    {
      duration: "15 MIN",
      title: "A quick reset",
      examples: ["Short music mix", "Focused YouTube pick", "Visual mood board", "Book discovery"],
      featured: false,
    },
    {
      duration: "30 MIN",
      title: "A complete mini escape",
      examples: ["Curated music session", "Medium-length video", "Visual inspiration", "Reading session"],
      featured: true,
    },
    {
      duration: "1 HOUR",
      title: "Settle into the mood",
      examples: ["Long-form video", "One episode", "Deep-focus playlist", "Guided reading session"],
      featured: false,
    },
    {
      duration: "ALL NIGHT",
      title: "Build the full journey",
      examples: ["Full movie", "Episode sequence", "Extended playlist", "Long-form viewing", "Immersive reading"],
      featured: false,
    }
  ];

  return (
    <section className="py-24 bg-[var(--surface-floating)] relative border-y border-[var(--border)] overflow-hidden">
      {/* Decorative gradient for the featured item */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-full bg-[var(--primary)]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-xs font-bold tracking-widest text-foreground-muted uppercase mb-4">
            Built for the time you actually have
          </span>
          <h2 className="text-display-sm md:text-display-md font-display font-semibold tracking-tight text-foreground mb-6">
            Fifteen minutes should not recommend a three-hour movie.
          </h2>
          <p className="text-body-lg text-foreground-muted">
            VibeSync shapes the experience around your available time, so every recommendation makes sense for the moment.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {times.map((time) => (
            <Card 
              key={time.duration} 
              className={cn(
                "p-6 h-full flex flex-col transition-all duration-300",
                time.featured 
                  ? "bg-[var(--surface-elevated)] border-[var(--primary)]/30 shadow-[var(--shadow-md)] shadow-[var(--primary)]/10 scale-[1.02] lg:scale-105 z-10 ring-1 ring-[var(--primary)]/20" 
                  : "bg-[var(--surface)] border-[var(--border)] opacity-80 hover:opacity-100"
              )}
            >
              <div className="mb-6">
                <span className={cn(
                  "inline-block px-3 py-1 rounded-full text-xs font-bold tracking-widest mb-4 border",
                  time.featured ? "bg-[var(--primary)] text-white border-[var(--primary)]" : "bg-[var(--surface-hover)] text-foreground border-[var(--border)]"
                )}>
                  {time.duration}
                </span>
                <h3 className="text-title font-semibold text-foreground">{time.title}</h3>
              </div>
              <ul className="flex-1 flex flex-col gap-3 mt-auto border-t border-[var(--border)] pt-6">
                {time.examples.map((example, i) => (
                  <li key={i} className="flex items-start gap-2 text-body-sm text-foreground-muted">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5 text-foreground-muted/50"><path d="M5 12h14"/></svg>
                    {example}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-caption text-foreground-muted/70 italic">
            Experience rules shown for product preview. Live recommendations will be connected in a later phase.
          </p>
        </div>
      </div>
    </section>
  );
}
