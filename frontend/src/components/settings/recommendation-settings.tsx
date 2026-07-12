import { 
  SettingsRecommendationStyle, 
  SettingsArtworkStyle,
  recommendationStyleOptions,
  artworkStyleOptions
} from "./settings.data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/cn";

export interface RecommendationSettingsProps {
  recommendationStyle: SettingsRecommendationStyle;
  artworkStyle: SettingsArtworkStyle;
  includeBooks: boolean;
  includeLongFormVideo: boolean;
  showWhyRecommended: boolean;
  onRecommendationStyleChange: (value: SettingsRecommendationStyle) => void;
  onArtworkStyleChange: (value: SettingsArtworkStyle) => void;
  onIncludeBooksChange: (value: boolean) => void;
  onIncludeLongFormVideoChange: (value: boolean) => void;
  onShowWhyRecommendedChange: (value: boolean) => void;
}

export function RecommendationSettings({
  recommendationStyle,
  artworkStyle,
  includeBooks,
  includeLongFormVideo,
  showWhyRecommended,
  onRecommendationStyleChange,
  onArtworkStyleChange,
  onIncludeBooksChange,
  onIncludeLongFormVideoChange,
  onShowWhyRecommendedChange
}: RecommendationSettingsProps) {

  const renderRadioGroup = <T extends string>(
    legend: string,
    name: string,
    options: { value: T; label: string; description: string }[],
    currentValue: T,
    onChange: (value: T) => void
  ) => (
    <fieldset className="space-y-3">
      <legend className="text-sm font-semibold text-zinc-200 mb-2">{legend}</legend>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {options.map((option) => {
          const isSelected = currentValue === option.value;
          return (
            <label
              key={option.value}
              className={cn(
                "relative flex cursor-pointer rounded-lg border p-4 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-zinc-950 transition-colors",
                isSelected
                  ? "bg-indigo-500/10 border-indigo-500/50"
                  : "bg-zinc-900/50 border-zinc-800 hover:bg-zinc-900 hover:border-zinc-700"
              )}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={isSelected}
                onChange={() => onChange(option.value)}
                className="sr-only"
                aria-describedby={`${name}-desc-${option.value}`}
              />
              <div className="flex flex-1">
                <div className="flex flex-col">
                  <span
                    className={cn(
                      "block text-sm font-medium mb-1",
                      isSelected ? "text-indigo-400" : "text-zinc-200"
                    )}
                  >
                    {option.label}
                  </span>
                  <span
                    id={`${name}-desc-${option.value}`}
                    className="block text-xs text-zinc-400 leading-relaxed"
                  >
                    {option.description}
                  </span>
                </div>
              </div>
              {isSelected && (
                <div className="absolute top-4 right-4 text-indigo-500" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </label>
          );
        })}
      </div>
    </fieldset>
  );

  const renderToggle = (
    id: string,
    label: string,
    description: string,
    checked: boolean,
    onChange: (checked: boolean) => void
  ) => (
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

  return (
    <Card className="border-zinc-800 bg-zinc-900/50">
      <CardHeader>
        <CardTitle className="text-xl">Recommendation experience</CardTitle>
        <CardDescription className="text-zinc-400">
          Preview how future Vibe recommendations may balance familiarity, discovery, explanation, and visual style.
        </CardDescription>
        <div className="pt-2">
          <p className="text-xs text-indigo-400/80 font-medium">
            These controls do not affect real recommendations in this prototype.
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-8 pt-4 border-t border-zinc-800">
        {renderRadioGroup(
          "Recommendation style",
          "recommendationStyle",
          recommendationStyleOptions,
          recommendationStyle,
          onRecommendationStyleChange
        )}
        
        {renderRadioGroup(
          "Artwork style",
          "artworkStyle",
          artworkStyleOptions,
          artworkStyle,
          onArtworkStyleChange
        )}

        <div className="space-y-4 pt-4 border-t border-zinc-800/50">
          {renderToggle(
            "toggle-include-books",
            "Include books and reading",
            "Allow future Vibes to include books, essays, and reflective reading.",
            includeBooks,
            onIncludeBooksChange
          )}
          
          {renderToggle(
            "toggle-include-video",
            "Include long-form video",
            "Allow future Vibes to include longer video experiences.",
            includeLongFormVideo,
            onIncludeLongFormVideoChange
          )}
          
          {renderToggle(
            "toggle-why-recommended",
            "Explain why recommendations fit",
            "Show supporting context for recommendation choices.",
            showWhyRecommended,
            onShowWhyRecommendedChange
          )}
        </div>
      </CardContent>
    </Card>
  );
}
