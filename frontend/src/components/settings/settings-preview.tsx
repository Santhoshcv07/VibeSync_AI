import { VibeSettingsData } from "./settings.data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

export interface SettingsPreviewProps {
  settings: VibeSettingsData;
}

export function SettingsPreview({ settings }: SettingsPreviewProps) {
  // Mapping local draft settings to CSS classes to simulate preview changes
  // without mutating global HTML classes or real next-themes providers.

  const appearanceClasses = {
    "midnight": "bg-zinc-950 border-zinc-800 text-zinc-100",
    "soft-dark": "bg-slate-800 border-slate-700 text-slate-200",
    "light": "bg-zinc-50 border-zinc-200 text-zinc-900",
  };

  const textClasses = settings.largerText ? "text-base" : "text-sm";
  const headingClasses = settings.largerText ? "text-2xl" : "text-xl";

  const densityClasses = settings.density === "compact" ? "p-3 space-y-2" : "p-6 space-y-4";
  
  const contrastBorderClass = settings.highContrast ? "border-2 border-indigo-500" : "border";

  const artworkStyleClasses = {
    "cinematic": "bg-gradient-to-br from-indigo-500/40 via-purple-500/30 to-rose-500/20",
    "minimal": "bg-zinc-800",
    "expressive": "bg-gradient-to-tr from-amber-500/60 to-rose-600/60",
  };

  // Note: Operating system 'prefers-reduced-motion' naturally overrides animations 
  // in tailwind via `motion-reduce:animate-none` which is baked into our utilities if we use standard tailwind animations.
  // Here we simulate the local preference.
  const motionClass = settings.motion === "full" ? "animate-pulse" : settings.motion === "reduced" ? "animate-pulse duration-[3000ms]" : "";

  return (
    <Card className="border-indigo-500/30 bg-zinc-900/80 ring-1 ring-indigo-500/20 shadow-lg shadow-indigo-500/5 overflow-hidden">
      <CardHeader>
        <CardTitle className="text-xl">Live interface preview</CardTitle>
        <CardDescription className="text-zinc-400">
          These controls affect only this preview card. They do not change the real application theme or accessibility settings.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="bg-black/50 p-6 md:p-10 border-t border-zinc-800 flex justify-center">
        {/* The miniature "App" preview area */}
        <div
          className={cn(
            "w-full max-w-sm rounded-xl transition-all duration-300 relative overflow-hidden",
            appearanceClasses[settings.appearance],
            densityClasses,
            contrastBorderClass
          )}
        >
          {/* Fictional Artwork Header */}
          <div 
            className={cn(
              "w-full h-32 rounded-lg mb-4 flex items-center justify-center overflow-hidden relative",
              artworkStyleClasses[settings.artworkStyle]
            )}
          >
             <div className={cn("absolute inset-0 bg-white/10 mix-blend-overlay", motionClass)} />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider opacity-60">
              Your next Vibe
            </span>
            <h4 className={cn("font-bold tracking-tight", headingClasses)}>
              Midnight Reset
            </h4>
          </div>

          <p className={cn("opacity-80 leading-relaxed", textClasses)}>
            A calm mix of sound, visuals, video, and reading for the end of a long day.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            <span className="inline-flex items-center rounded-full bg-indigo-500/20 px-2.5 py-0.5 text-xs font-medium text-indigo-400">
              Chill
            </span>
            <span className="inline-flex items-center rounded-full bg-zinc-500/20 px-2.5 py-0.5 text-xs font-medium opacity-80">
              1 hour
            </span>
          </div>

          {settings.descriptiveLabels && (
            <div className="pt-4 mt-4 border-t border-current/10">
              <span className="block text-xs font-bold uppercase tracking-wide opacity-60 mb-1">
                Why this fits
              </span>
              <span className={cn("block opacity-80", textClasses)}>
                Built for a calm one-hour evening reset.
              </span>
            </div>
          )}

          <div className="pt-6">
            <Button variant="primary" fullWidth disabled>
              Preview action
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
