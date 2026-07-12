import { Card } from "@/components/ui/card";

export function SocialProof() {
  const testimonials = [
    {
      quote: "I had 30 minutes before bed and VibeSync gave me a music mix, one short video, and a reading pick that actually fit.",
      name: "Maya",
      context: "Night-reset Vibe",
      avatarColor: "bg-blue-500",
      avatarInitials: "M",
    },
    {
      quote: "It feels less like searching five apps and more like opening one complete mood.",
      name: "Arjun",
      context: "Weekend-chill Vibe",
      avatarColor: "bg-emerald-500",
      avatarInitials: "A",
    },
    {
      quote: "The time choices make the whole idea click. I am not getting a movie recommendation when I only have fifteen minutes.",
      name: "Noah",
      context: "Quick-break Vibe",
      avatarColor: "bg-purple-500",
      avatarInitials: "N",
    }
  ];

  return (
    <section className="py-24 bg-[var(--background)] relative">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16 gap-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-foreground-muted uppercase bg-[var(--surface-hover)] px-3 py-1 rounded-full border border-[var(--border)]">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            Concept preview
          </div>
          <span className="text-xs font-bold tracking-widest text-[var(--primary)] uppercase mt-2">
            Made for real-life moments
          </span>
          <h2 className="text-display-sm md:text-display-md font-display font-semibold tracking-tight text-foreground">
            Less choosing. More enjoying.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, idx) => (
            <Card key={idx} className="p-8 bg-[var(--surface)] border-[var(--border)] flex flex-col justify-between h-full hover:border-[var(--border-strong)] transition-colors">
              <blockquote className="text-body-lg text-foreground mb-8">
                “{t.quote}”
              </blockquote>
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full ${t.avatarColor} text-white flex items-center justify-center font-bold text-sm select-none`}>
                  {t.avatarInitials}
                </div>
                <div>
                  <p className="text-body-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-caption text-foreground-muted">{t.context}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
