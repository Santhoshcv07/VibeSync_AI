import { Card } from "@/components/ui/card";

export function HowVibeSyncWorks() {
  const steps = [
    {
      title: "Choose your mood",
      description: "Happy, chill, focused, energetic, romantic, low, or completely custom.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5v14"/><path d="M22 10v4"/><path d="M7 5v14"/><path d="M2 10v4"/></svg>
      )
    },
    {
      title: "Tell us your time",
      description: "Choose 15 minutes, 30 minutes, 1 hour, or all night.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
      )
    },
    {
      title: "Enter your entertainment universe",
      description: "Explore rich recommendations across music, video, visual inspiration, movies, shows, and books.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
      )
    }
  ];

  return (
    <section className="py-24 bg-[var(--background)] relative">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-xs font-bold tracking-widest text-foreground-muted uppercase mb-4">
            How It Works
          </span>
          <h2 className="text-display-sm md:text-display-md font-display font-semibold tracking-tight text-foreground mb-6">
            From &quot;I don&apos;t know what I want&quot; to your perfect night.
          </h2>
          <p className="text-body-lg text-foreground-muted">
            VibeSync turns a feeling and a time window into one connected entertainment experience.
          </p>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <li key={index} className="relative">
              <Card className="h-full p-8 bg-[var(--surface)] border-[var(--border)] hover:border-[var(--border-strong)] transition-colors relative z-10 flex flex-col gap-6">
                <div className="w-14 h-14 rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] mb-2">
                  {step.icon}
                </div>
                <div className="absolute top-8 right-8 text-6xl font-display font-bold text-foreground opacity-5 select-none" aria-hidden="true">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-title-lg font-semibold text-foreground mb-3 leading-tight">{step.title}</h3>
                  <p className="text-body text-foreground-muted">{step.description}</p>
                </div>
              </Card>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
