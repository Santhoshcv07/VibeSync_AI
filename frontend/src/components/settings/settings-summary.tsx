import { VibeSettingsData, appearanceOptions, motionOptions, recommendationStyleOptions } from "./settings.data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface SettingsSummaryProps {
  settings: VibeSettingsData;
  hasUnsavedChanges: boolean;
  hasClearedPrototypeData: boolean;
}

export function SettingsSummary({
  settings,
  hasUnsavedChanges,
  hasClearedPrototypeData,
}: SettingsSummaryProps) {
  const getLabel = (options: { value: string; label: string }[], value: string) => {
    return options.find((opt) => opt.value === value)?.label || value;
  };

  return (
    <Card className="border-zinc-800 bg-zinc-900/50">
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <CardTitle className="text-xl">Experience overview</CardTitle>
          {hasUnsavedChanges ? (
            <Badge variant="warning" className="uppercase tracking-wider text-[10px] shrink-0">
              Unsaved local changes
            </Badge>
          ) : hasClearedPrototypeData ? (
            <Badge variant="neutral" className="uppercase tracking-wider text-[10px] shrink-0">
              Prototype data clear simulated
            </Badge>
          ) : (
            <Badge variant="success" className="uppercase tracking-wider text-[10px] shrink-0">
              Local preview is up to date
            </Badge>
          )}
        </div>
        <CardDescription className="text-zinc-400">
          A local preview of how your VibeSync preferences may be organized in a future account experience.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-zinc-800">
          <div className="space-y-1">
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Appearance</p>
            <p className="text-sm font-medium text-zinc-200">
              {getLabel(appearanceOptions, settings.appearance)}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Motion</p>
            <p className="text-sm font-medium text-zinc-200">
              {getLabel(motionOptions, settings.motion)}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Recommendation style</p>
            <p className="text-sm font-medium text-zinc-200">
              {getLabel(recommendationStyleOptions, settings.recommendationStyle)}
            </p>
          </div>
        </div>

        <div className="pt-2 text-xs text-zinc-500">
          Local only · Nothing is stored
        </div>
      </CardContent>
    </Card>
  );
}
