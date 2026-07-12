import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

export function ContinueVibePreview() {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-caption font-bold tracking-widest text-[var(--primary)] uppercase">
            CONTINUE YOUR VIBE
          </span>
          <div className="flex items-center gap-3">
            <h2 className="text-heading-3 font-display font-semibold text-foreground">
              Pick up the experience
            </h2>
            <Badge variant="neutral" size="sm">Prototype preview</Badge>
          </div>
        </div>
      </div>

      <Card className="overflow-hidden border-[var(--border)]">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 bg-[var(--surface-floating)] p-6 md:p-8 flex flex-col justify-center gap-4 border-b md:border-b-0 md:border-r border-[var(--border)] relative overflow-hidden">
            {/* Abstract preview art */}
            <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-indigo-500 to-cyan-500" aria-hidden="true" />
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[var(--surface-floating)] to-transparent" aria-hidden="true" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="neutral">Chill</Badge>
                <Badge variant="neutral">1 hour</Badge>
              </div>
              <h3 className="text-heading-3 font-display font-semibold text-foreground">
                Midnight Reset
              </h3>
            </div>
          </div>
          
          <div className="md:w-2/3 p-6 md:p-8 flex flex-col justify-center">
            <p className="text-body-lg text-foreground-muted max-w-xl mb-8">
              A calm late-night mix of atmospheric music, one cinematic video, reflective visuals, and a quiet reading pick.
            </p>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex-1 max-w-sm w-full flex flex-col gap-2">
                <div className="flex justify-between text-body-sm font-medium">
                  <span className="text-foreground">Experience preview</span>
                  <span className="text-foreground-muted">42%</span>
                </div>
                <Progress value={42} aria-label="Experience preview progress" />
              </div>
              
              <Button asChild>
<Link href="/vibe/demo-vibe">
                  Open Preview Vibe
                </Link>
</Button>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}
