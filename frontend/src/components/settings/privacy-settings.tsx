import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface PrivacySettingsProps {
  rememberRecentMood: boolean;
  improvePrototypeExperience: boolean;
  hasClearedPrototypeData: boolean;
  onRememberRecentMoodChange: (value: boolean) => void;
  onImprovePrototypeExperienceChange: (value: boolean) => void;
  onClearPrototypeData: () => void;
}

export function PrivacySettings({
  rememberRecentMood,
  improvePrototypeExperience,
  hasClearedPrototypeData,
  onRememberRecentMoodChange,
  onImprovePrototypeExperienceChange,
  onClearPrototypeData
}: PrivacySettingsProps) {

  const renderToggle = (
    id: string,
    label: string,
    description: string,
    checked: boolean,
    onChange: (checked: boolean) => void
  ) => {
    return (
      <div className="flex items-start space-x-4 p-4 rounded-lg border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/50 transition-colors">
        <div className="flex items-center h-6">
          <input
            id={id}
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            className="w-5 h-5 rounded border-zinc-700 bg-zinc-950 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-zinc-950"
            aria-describedby={`${id}-description`}
          />
        </div>
        <div className="flex flex-col flex-1">
          <label htmlFor={id} className="text-sm font-medium text-zinc-200 cursor-pointer">
            {label}
          </label>
          <p id={`${id}-description`} className="text-sm text-zinc-400 mt-1">
            {description}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <Card className="border-zinc-800 bg-zinc-900/50">
        <CardHeader>
          <CardTitle className="text-xl">Privacy & local data</CardTitle>
          <CardDescription className="text-zinc-400">
            Preview future privacy choices without collecting, storing, tracking, or deleting real information.
          </CardDescription>
          <div className="pt-2">
            <p className="text-xs text-indigo-400/80 font-medium">
              This prototype does not collect analytics, usage events, mood history, or preference data.
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-4 border-t border-zinc-800">
          {renderToggle(
            "toggle-remember-mood",
            "Remember recent mood",
            "Preview a future preference that may remember the last selected mood.",
            rememberRecentMood,
            onRememberRecentMoodChange
          )}
          
          {renderToggle(
            "toggle-improve-experience",
            "Help improve the experience",
            "Preview a future optional product-improvement preference.",
            improvePrototypeExperience,
            onImprovePrototypeExperienceChange
          )}
        </CardContent>
      </Card>

      {/* Clear Data Simulation Card */}
      <Card className="border-rose-900/30 bg-zinc-900/50">
        <CardHeader>
          <CardTitle className="text-xl text-rose-500">Clear local prototype data</CardTitle>
          <CardDescription className="text-zinc-400">
            Simulate how a future clear-data action may be presented. No real browser, account, profile, Saved Vibe, history, or settings data will be deleted.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4 border-t border-rose-900/20">
          <Button 
            variant="danger" 
            onClick={onClearPrototypeData}
            disabled={hasClearedPrototypeData}
          >
            {hasClearedPrototypeData ? "Clear Simulation Complete" : "Simulate Clear Data"}
          </Button>
          {hasClearedPrototypeData && (
            <p className="text-sm text-zinc-400 mt-4">
              Prototype data clearing was simulated. No real information was deleted because nothing is stored.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
