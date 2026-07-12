export interface VibeJourneyOverviewProps {
  journeySummary: string;
}

export function VibeJourneyOverview({ journeySummary }: VibeJourneyOverviewProps) {
  const steps = [
    { number: "01", label: "Listen", description: "Ease into the atmosphere" },
    { number: "02", label: "Watch", description: "Stay with one focused story" },
    { number: "03", label: "Discover", description: "Explore one thoughtful video" },
    { number: "04", label: "See", description: "Collect the visual feeling" },
    { number: "05", label: "Read", description: "End with a quiet page" },
  ];

  return (
    <div className="w-full py-12 md:py-16">
      <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
        <div className="flex-1 max-w-xl">
          <h2 className="text-heading-3 md:text-heading-2 font-display font-semibold text-foreground mb-4">
            Your one-hour journey
          </h2>
          <p className="text-body-lg text-foreground-muted leading-relaxed">
            {journeySummary}
          </p>
        </div>
        
        <div className="flex-1 w-full bg-[var(--surface-floating)] p-6 md:p-8 rounded-[var(--radius-lg)] border border-[var(--border)] shadow-sm">
          <ol className="flex flex-col gap-6" aria-label="Journey sequence">
            {steps.map((step) => (
              <li key={step.number} className="flex items-start gap-4 group">
                <div className="flex flex-col items-center gap-2 shrink-0">
                  <div className="w-8 h-8 rounded-full bg-[var(--surface-subtle)] border border-[var(--border)] flex items-center justify-center text-caption font-bold text-foreground-muted group-hover:bg-[var(--primary)] group-hover:text-primary-foreground group-hover:border-[var(--primary)] transition-colors">
                    {step.number}
                  </div>
                  {step.number !== "05" && (
                    <div className="w-px h-8 bg-[var(--border)] group-hover:bg-[var(--primary)]/30 transition-colors" aria-hidden="true" />
                  )}
                </div>
                <div className="pt-1">
                  <span className="block text-label font-bold text-foreground uppercase tracking-widest mb-1">
                    {step.label}
                  </span>
                  <span className="block text-body-sm text-foreground-muted">
                    {step.description}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
