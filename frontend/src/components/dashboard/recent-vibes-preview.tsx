import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const recentVibes = [
  {
    id: "slow-sunday",
    title: "Slow Sunday",
    mood: "Chill",
    time: "All night",
    description: "Warm music, a thoughtful movie, soft interiors, and reflective fiction.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "electric-break",
    title: "Electric Break",
    mood: "Energetic",
    time: "30 min",
    description: "Fast tracks, one high-energy video, and bold visual inspiration.",
    color: "from-orange-500 to-amber-500",
  },
  {
    id: "deep-work",
    title: "Deep Work Window",
    mood: "Focus",
    time: "1 hour",
    description: "Instrumental focus music, a distraction-light visual set, and one reading pick.",
    color: "from-emerald-500 to-teal-500",
  }
];

export function RecentVibesPreview() {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-caption font-bold tracking-widest text-[var(--primary)] uppercase">
            RECENT VIBES
          </span>
          <div className="flex items-center gap-3">
            <h2 className="text-heading-3 font-display font-semibold text-foreground">
              Preview your entertainment history
            </h2>
            <Badge variant="neutral" size="sm" className="hidden sm:inline-flex">Prototype preview</Badge>
          </div>
          <p className="text-body text-foreground-muted max-w-2xl mt-1">
            These fictional examples demonstrate how generated Vibes will appear after recommendation features are connected.
          </p>
          <div className="sm:hidden mt-2">
            <Badge variant="neutral" size="sm">Prototype preview</Badge>
          </div>
        </div>
        <Button asChild variant="outline" className="shrink-0">
<Link href="/history">
            View History
          </Link>
</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recentVibes.map((vibe) => (
          <Card key={vibe.id} className="flex flex-col h-full overflow-hidden border-[var(--border)] group">
            <div className={`h-32 bg-gradient-to-br ${vibe.color} opacity-80 group-hover:opacity-100 transition-opacity flex items-end p-4 shrink-0`} aria-hidden="true">
              <div className="flex items-center gap-2">
                <Badge variant="neutral" className="bg-white/20 text-white border-white/30 backdrop-blur-md hover:bg-white/30">{vibe.mood}</Badge>
                <Badge variant="neutral" className="bg-black/20 text-white border-white/20 backdrop-blur-md hover:bg-black/30">{vibe.time}</Badge>
              </div>
            </div>
            <CardContent className="flex flex-col flex-1 p-5 gap-4">
              <div className="flex flex-col gap-1.5 flex-1">
                <h3 className="text-title-lg font-bold text-foreground line-clamp-1">
                  {vibe.title}
                </h3>
                <p className="text-body-sm text-foreground-muted line-clamp-3">
                  {vibe.description}
                </p>
              </div>
              <Button asChild variant="secondary" className="w-full mt-auto">
<Link href="/vibe/demo-vibe">
                  View Preview
                </Link>
</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
