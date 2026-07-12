import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

export interface SettingsActionBarProps {
  hasUnsavedChanges: boolean;
  onSave: () => void;
  onDiscard: () => void;
  onResetDefaults: () => void;
}

export function SettingsActionBar({
  hasUnsavedChanges,
  onSave,
  onDiscard,
  onResetDefaults,
}: SettingsActionBarProps) {
  return (
    <div 
      className={cn(
        "sticky bottom-6 z-40 mx-auto w-full max-w-5xl rounded-2xl border p-4 shadow-2xl backdrop-blur-md transition-all duration-300",
        hasUnsavedChanges 
          ? "bg-zinc-900/90 border-indigo-500/30 shadow-indigo-500/5" 
          : "bg-zinc-900/80 border-zinc-800"
      )}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-2">
            <div 
              className={cn(
                "w-2 h-2 rounded-full",
                hasUnsavedChanges ? "bg-indigo-500 animate-pulse" : "bg-zinc-600"
              )} 
              aria-hidden="true" 
            />
            <span className="text-sm font-medium text-zinc-200">
              {hasUnsavedChanges ? "You have unsaved local changes" : "No unsaved local changes"}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row w-full sm:w-auto items-center gap-3">
          <Button 
            variant="ghost" 
            onClick={onResetDefaults}
            className="w-full sm:w-auto text-zinc-400 hover:text-zinc-200"
          >
            Reset Demo Defaults
          </Button>
          <Button 
            variant="secondary" 
            onClick={onDiscard}
            disabled={!hasUnsavedChanges}
            className="w-full sm:w-auto"
          >
            Discard Changes
          </Button>
          <Button 
            variant="primary" 
            onClick={onSave}
            disabled={!hasUnsavedChanges}
            className="w-full sm:w-auto"
          >
            Save Local Preview
          </Button>
        </div>
      </div>
    </div>
  );
}
