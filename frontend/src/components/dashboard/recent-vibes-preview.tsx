"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";

const defaultColorOptions = [
  "from-blue-500 to-cyan-500",
  "from-orange-500 to-amber-500",
  "from-emerald-500 to-teal-500",
  "from-purple-500 to-fuchsia-500",
  "from-rose-500 to-pink-500"
];

function getRandomColor(index: number) {
  return defaultColorOptions[index % defaultColorOptions.length];
}

export function RecentVibesPreview() {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const { fetchVibeHistoryAction } = await import("@/app/actions/vibes");
        const data = await fetchVibeHistoryAction(3); // Just the top 3
        setHistory(data);
      } catch (err) {
        console.error("Error fetching history", err);
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, []);

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
          </div>
          <p className="text-body text-foreground-muted max-w-2xl mt-1">
            Revisit your recently generated Vibes.
          </p>
        </div>
        <Button asChild variant="outline" className="shrink-0">
          <Link href="/history">
            View History
          </Link>
        </Button>
      </div>

      <div className="min-h-[250px] relative">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Spinner size="lg" />
          </div>
        ) : history.length === 0 ? (
          <div className="flex items-center justify-center p-12 border border-dashed border-[var(--border)] rounded-xl bg-white/5">
            <p className="text-foreground-muted">You haven't generated any vibes yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {history.map((vibe, index) => {
              const color = getRandomColor(index);
              return (
                <Card key={vibe.id} className="flex flex-col h-full overflow-hidden border-[var(--border)] group">
                  <div className={`h-32 bg-gradient-to-br ${color} opacity-80 group-hover:opacity-100 transition-opacity flex items-end p-4 shrink-0`} aria-hidden="true">
                    <div className="flex items-center gap-2">
                      <Badge variant="neutral" className="bg-white/20 text-white border-white/30 backdrop-blur-md hover:bg-white/30 capitalize">{vibe.mood}</Badge>
                      {vibe.timeOfDay && <Badge variant="neutral" className="bg-black/20 text-white border-white/20 backdrop-blur-md hover:bg-black/30 capitalize">{vibe.timeOfDay}</Badge>}
                    </div>
                  </div>
                  <CardContent className="flex flex-col flex-1 p-5 gap-4">
                    <div className="flex flex-col gap-1.5 flex-1">
                      <h3 className="text-title-lg font-bold text-foreground line-clamp-1 capitalize">
                        {vibe.mood} {vibe.activity} Vibe
                      </h3>
                      <p className="text-body-sm text-foreground-muted line-clamp-3">
                        {vibe.aiSummary || "A custom personalized vibe experience."}
                      </p>
                    </div>
                    <Button asChild variant="secondary" className="w-full mt-auto">
                      <Link href={`/vibe/${vibe.id}`}>
                        View Preview
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
