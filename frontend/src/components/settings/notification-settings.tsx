import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface NotificationSettingsProps {
  weeklyVibeDigest: boolean;
  newFeatureUpdates: boolean;
  quietRecommendations: boolean;
  onWeeklyVibeDigestChange: (value: boolean) => void;
  onNewFeatureUpdatesChange: (value: boolean) => void;
  onQuietRecommendationsChange: (value: boolean) => void;
}

export function NotificationSettings({
  weeklyVibeDigest,
  newFeatureUpdates,
  quietRecommendations,
  onWeeklyVibeDigestChange,
  onNewFeatureUpdatesChange,
  onQuietRecommendationsChange
}: NotificationSettingsProps) {

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
    <Card className="border-zinc-800 bg-zinc-900/50">
      <CardHeader>
        <div className="flex items-center gap-3">
          <CardTitle className="text-xl">Notification preview</CardTitle>
          <Badge variant="neutral" className="uppercase tracking-wider text-[10px]">
            PREVIEW ONLY
          </Badge>
        </div>
        <CardDescription className="text-zinc-400">
          Choose fictional notification preferences for a future account experience.
        </CardDescription>
        <div className="pt-2">
          <p className="text-xs text-indigo-400/80 font-medium">
            No browser, push, email, or device notification permission will be requested.
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pt-4 border-t border-zinc-800">
        {renderToggle(
          "toggle-weekly-digest",
          "Weekly Vibe digest",
          "Preview a weekly summary of entertainment discoveries.",
          weeklyVibeDigest,
          onWeeklyVibeDigestChange
        )}
        
        {renderToggle(
          "toggle-feature-updates",
          "New feature updates",
          "Preview occasional product-update notifications.",
          newFeatureUpdates,
          onNewFeatureUpdatesChange
        )}
        
        {renderToggle(
          "toggle-quiet-reminders",
          "Quiet recommendation reminders",
          "Preview gentle reminders without urgency or pressure.",
          quietRecommendations,
          onQuietRecommendationsChange
        )}
      </CardContent>
    </Card>
  );
}
