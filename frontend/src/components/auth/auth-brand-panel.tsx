import { VibeSyncBrand } from "@/components/marketing/vibesync-brand";
import { AuthVisualUniverse } from "./auth-visual-universe";

export function AuthBrandPanel() {
  return (
    <div className="hidden lg:flex w-1/2 bg-[var(--surface-floating)] border-r border-[var(--border)] relative overflow-hidden flex-col justify-between p-12 lg:p-16">
      <div className="relative z-10">
        <VibeSyncBrand />
        <div className="mt-16 max-w-md">
          <span className="inline-block text-xs font-bold tracking-widest text-[var(--primary)] uppercase mb-4">
            Your entertainment, in sync
          </span>
          <h2 className="text-display-sm font-display font-semibold tracking-tight text-foreground mb-6">
            One feeling.<br />
            One moment.<br />
            A whole world to enjoy.
          </h2>
          <p className="text-body-lg text-foreground-muted">
            VibeSync turns your mood and available time into a connected entertainment experience across music, video, visual inspiration, movies, shows, and books.
          </p>
        </div>
      </div>

      <div className="relative z-10 mt-12 mb-auto flex-1 flex items-center justify-center">
        <AuthVisualUniverse />
      </div>

      <div className="relative z-10 mt-12">
        <p className="text-body-sm font-medium text-foreground-muted">
          Less searching. More enjoying.
        </p>
      </div>

      {/* Abstract Background Noise */}
      <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("/design-system/noise.png")' }} />
    </div>
  );
}
