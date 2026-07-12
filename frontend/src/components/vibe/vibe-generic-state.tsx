import Link from "next/link";
import { Button } from "@/components/ui/button";

export interface VibeGenericStateProps {
  vibeId: string;
}

export function VibeGenericState({ vibeId }: VibeGenericStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center max-w-2xl mx-auto px-4 py-12 gap-8">
      <div className="flex flex-col gap-4 items-center">
        <span className="text-caption font-bold tracking-widest text-[var(--primary)] uppercase">
          VIBE EXPERIENCE
        </span>
        <h1 className="text-heading-3 md:text-heading-2 font-display font-semibold text-foreground">
          This Vibe is not available in the prototype
        </h1>
        <p className="text-body-lg text-foreground-muted max-w-xl mx-auto">
          Only the static demo Vibe is available during this frontend implementation phase.
        </p>
      </div>

      <div className="bg-[var(--surface-subtle)] border border-[var(--border)] p-4 rounded-[var(--radius-md)]">
        <span className="text-body-sm text-foreground-muted">Requested Vibe: </span>
        <span className="text-body font-mono text-foreground">{vibeId}</span>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto">
        <Button asChild variant="primary" size="lg" className="w-full sm:w-auto font-semibold">
<Link href="/vibe/demo-vibe">
            Open Demo Vibe
          </Link>
</Button>
        <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
<Link href="/generate">
            Generate a Vibe
          </Link>
</Button>
      </div>
    </div>
  );
}
