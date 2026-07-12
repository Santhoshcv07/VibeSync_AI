import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/cn";

export function MoodShowcase() {
  const moods = [
    {
      name: "Chill",
      description: "Soft ambient blues and relaxed structure.",
      gradient: "from-blue-500/20 to-indigo-900/40",
      border: "border-blue-500/30",
      featured: false,
    },
    {
      name: "Energetic",
      description: "High-contrast neon and vibrant accents.",
      gradient: "from-fuchsia-600/20 to-orange-500/20",
      border: "border-fuchsia-500/40",
      featured: true,
    },
    {
      name: "Focus",
      description: "Minimalist graphite and muted greens.",
      gradient: "from-emerald-900/40 to-teal-900/20",
      border: "border-emerald-500/20",
      featured: false,
    },
    {
      name: "Romantic",
      description: "Warm rose, deep burgundy, and soft shadows.",
      gradient: "from-rose-900/30 to-red-900/20",
      border: "border-rose-500/20",
      featured: false,
    }
  ];

  return (
    <section className="py-24 bg-[var(--background)]">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="max-w-xl">
            <span className="inline-block text-xs font-bold tracking-widest text-[var(--primary)] uppercase mb-4">
              The interface feels the vibe too
            </span>
            <h2 className="text-display-sm md:text-display-md font-display font-semibold tracking-tight text-foreground mb-6">
              Your recommendations change. The atmosphere changes with them.
            </h2>
            <p className="text-body-lg text-foreground-muted mb-8">
              Each Vibe carries its own visual energy while keeping the experience readable, consistent, and unmistakably VibeSync.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              {moods.filter(m => !m.featured).map(mood => (
                <div key={mood.name} className={cn("p-4 rounded-[var(--radius-lg)] border bg-gradient-to-br flex flex-col gap-2", mood.gradient, mood.border)}>
                  <span className="text-label font-semibold">{mood.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative w-full h-[450px]">
            {moods.filter(m => m.featured).map(mood => (
              <Card key={mood.name} className={cn(
                "absolute inset-0 w-full h-full p-8 flex flex-col justify-between border-2 bg-gradient-to-br shadow-[var(--shadow-lg)]",
                mood.gradient,
                mood.border
              )}>
                <div className="flex justify-between items-start">
                  <Badge variant="primary" className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white border-none">
                    Current Mood
                  </Badge>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-fuchsia-400" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-display-sm font-display font-bold text-white drop-shadow-md">
                    {mood.name} Mode Active
                  </h3>
                  <p className="text-body text-white/80 max-w-sm">
                    {mood.description}
                  </p>
                </div>
                
                <div className="mt-8 pt-6 border-t border-white/10 flex gap-4">
                  <div className="h-12 flex-1 bg-white/10 rounded-[var(--radius-md)] border border-white/5" />
                  <div className="h-12 flex-1 bg-white/10 rounded-[var(--radius-md)] border border-white/5" />
                </div>
              </Card>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
