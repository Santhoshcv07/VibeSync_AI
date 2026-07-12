import Link from "next/link";

const times = [
  {
    id: "15min",
    label: "15 min",
    headline: "Quick reset",
    examples: "Music · short video · visual board",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 14.5 8"/></svg>
  },
  {
    id: "30min",
    label: "30 min",
    headline: "Mini escape",
    examples: "Music session · video · reading",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 12"/></svg>
  },
  {
    id: "1hour",
    label: "1 hour",
    headline: "Settle into the mood",
    examples: "Episode · long-form video · playlist",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 12 17"/></svg>
  },
  {
    id: "allnight",
    label: "All night",
    headline: "Build the full journey",
    examples: "Movie · episodes · extended listening",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
  }
];

export function TimeShortcuts() {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <span className="text-caption font-bold tracking-widest text-[var(--primary)] uppercase">
          FIT THE MOMENT
        </span>
        <h2 className="text-heading-3 font-display font-semibold text-foreground">
          How much time do you have?
        </h2>
        <p className="text-body text-foreground-muted max-w-2xl">
          VibeSync shapes recommendations around the time available.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {times.map((time) => (
          <Link
            key={time.id}
            href="/generate"
            className="flex flex-col gap-3 p-5 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] group"
          >
            <div className="flex items-center justify-between">
              <span className="text-title-lg font-bold text-foreground">
                {time.label}
              </span>
              <div className="text-foreground-subtle group-hover:text-[var(--primary)] transition-colors">
                {time.icon}
              </div>
            </div>
            <div className="flex flex-col gap-1 mt-2">
              <span className="text-body font-semibold text-foreground">
                {time.headline}
              </span>
              <span className="text-caption text-foreground-muted">
                {time.examples}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
