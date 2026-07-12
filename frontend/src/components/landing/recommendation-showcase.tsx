import Link from "next/link";
import { MediaCard } from "@/components/ui/media-card";
import { Button } from "@/components/ui/button";

export function RecommendationShowcase() {
  const recommendations = [
    {
      provider: "Music",
      title: "Afterglow Radio",
      metadata: "18-track mood mix · 1 hr 12 min",
      reason: "Warm electronic textures for a calm late-night reset.",
      actionLabel: "Open Music",
      type: "square" as const,
      color: "from-purple-900 to-indigo-950",
    },
    {
      provider: "Movie & Show",
      title: "Signals After Midnight",
      metadata: "Sci-fi drama · 52 min episode",
      reason: "A thoughtful, atmospheric watch that fits a one-hour Vibe.",
      actionLabel: "View Watch Pick",
      type: "poster" as const,
      color: "from-zinc-800 to-zinc-950",
    },
    {
      provider: "YouTube",
      title: "Cities That Never Sleep",
      metadata: "Night documentary · 24 min",
      reason: "A cinematic city journey with the right pace for this mood.",
      actionLabel: "Watch Preview",
      type: "video" as const,
      color: "from-red-900/40 to-slate-900",
    },
    {
      provider: "Visual Inspiration",
      title: "Electric Quiet",
      metadata: "24-image mood collection",
      reason: "Deep blues, reflective streets, soft interiors, and quiet neon.",
      actionLabel: "Explore Collection",
      type: "square" as const,
      color: "from-cyan-900 to-emerald-950",
    },
    {
      provider: "Book",
      title: "The Space Between Hours",
      metadata: "Reflective fiction · 286 pages",
      reason: "A quiet story for slowing down without losing your sense of wonder.",
      actionLabel: "View Book",
      type: "poster" as const,
      color: "from-amber-900 to-stone-950",
    },
  ];

  return (
    <section className="py-24 bg-[var(--surface)] border-y border-[var(--border)] overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-16">
          <span className="inline-block text-xs font-bold tracking-widest text-[var(--primary)] uppercase mb-4">
            More than a list of links
          </span>
          <h2 className="text-display-sm md:text-display-md font-display font-semibold tracking-tight text-foreground mb-6">
            Every recommendation arrives ready to explore.
          </h2>
          <p className="text-body-lg text-foreground-muted">
            See the artwork, understand why it matches, and open the experience when you are ready.
          </p>
        </div>

        {/* Horizontal scrollable showcase on mobile, grid on desktop */}
        <div className="flex overflow-x-auto pb-8 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 snap-x snap-mandatory hide-scrollbar">
          {recommendations.map((rec) => (
            <div key={rec.title} className="snap-start shrink-0 w-[280px] sm:w-auto h-full flex">
              <MediaCard 
                title={rec.title}
                subtitle={rec.metadata}
                eyebrow={rec.provider}
                description={rec.reason}
                artwork={
                  <div className={`w-full rounded-[var(--radius-md)] aspect-${rec.type === "video" ? "video" : rec.type === "poster" ? "[2/3]" : "square"} bg-gradient-to-br ${rec.color} flex items-center justify-center p-6 relative overflow-hidden`}>
                     <div className="absolute inset-0 bg-white/5 [mask-image:repeating-linear-gradient(45deg,black,transparent_2px,black_4px)]" />
                     <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center border border-white/10 z-10">
                       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white" className="opacity-80"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                     </div>
                  </div>
                }
                actions={
                  <Button asChild variant="secondary" size="sm" className="w-full font-medium">
<Link href="/signup">
                      {rec.actionLabel}
                    </Link>
</Button>
                }
                className="h-full bg-[var(--surface-elevated)] border-[var(--border)] w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
