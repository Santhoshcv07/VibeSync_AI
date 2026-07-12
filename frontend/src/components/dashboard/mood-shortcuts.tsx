import Link from "next/link";

const moods = [
  {
    id: "chill",
    label: "Chill",
    description: "Soft, spacious, and easygoing",
    color: "bg-blue-500",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h4l3-9 5 18 3-9h5"/></svg>
  },
  {
    id: "happy",
    label: "Happy",
    description: "Bright, playful, and uplifting",
    color: "bg-amber-500",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></svg>
  },
  {
    id: "energetic",
    label: "Energetic",
    description: "Fast, bold, and high-motion",
    color: "bg-orange-500",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
  },
  {
    id: "focus",
    label: "Focus",
    description: "Clear, steady, and distraction-light",
    color: "bg-emerald-500",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
  },
  {
    id: "romantic",
    label: "Romantic",
    description: "Warm, intimate, and cinematic",
    color: "bg-rose-500",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
  },
  {
    id: "low",
    label: "Low",
    description: "Gentle, comforting, and unhurried",
    color: "bg-slate-500",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
  }
];

export function MoodShortcuts() {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <span className="text-caption font-bold tracking-widest text-[var(--primary)] uppercase">
          START WITH A FEELING
        </span>
        <h2 className="text-heading-3 font-display font-semibold text-foreground">
          Choose a mood shortcut
        </h2>
        <p className="text-body text-foreground-muted max-w-2xl">
          These previews show the moods VibeSync will support in the Generate Vibe experience.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {moods.map((mood) => (
          <Link
            key={mood.id}
            href="/generate"
            aria-label={`Open Generate Vibe to create a ${mood.label} experience`}
            className="flex items-center gap-4 p-4 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-floating)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] group"
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 text-white ${mood.color} bg-opacity-90 group-hover:bg-opacity-100 transition-all`}>
              {mood.icon}
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-title-md font-semibold text-foreground group-hover:text-[var(--primary)] transition-colors">
                {mood.label}
              </span>
              <span className="text-body-sm text-foreground-muted">
                {mood.description}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
