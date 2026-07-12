import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export interface AccessibilitySettingsProps {
  highContrast: boolean;
  largerText: boolean;
  descriptiveLabels: boolean;
  onHighContrastChange: (value: boolean) => void;
  onLargerTextChange: (value: boolean) => void;
  onDescriptiveLabelsChange: (value: boolean) => void;
}

export function AccessibilitySettings({
  highContrast,
  largerText,
  descriptiveLabels,
  onHighContrastChange,
  onLargerTextChange,
  onDescriptiveLabelsChange
}: AccessibilitySettingsProps) {

  // Reusable custom checkbox row for accessibility toggles
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
        <CardTitle className="text-xl">Accessibility preferences</CardTitle>
        <CardDescription className="text-zinc-400">
          Preview optional presentation preferences while preserving the browser and operating system as the source of truth.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 pt-4 border-t border-zinc-800">
        {renderToggle(
          "toggle-high-contrast",
          "Higher contrast preview",
          "Strengthen text and border separation inside the preview.",
          highContrast,
          onHighContrastChange
        )}
        
        {renderToggle(
          "toggle-larger-text",
          "Larger preview text",
          "Increase text size inside the preview card only.",
          largerText,
          onLargerTextChange
        )}
        
        {renderToggle(
          "toggle-descriptive-labels",
          "Show descriptive labels",
          "Display additional context explaining why a Vibe may fit.",
          descriptiveLabels,
          onDescriptiveLabelsChange
        )}
      </CardContent>
    </Card>
  );
}
