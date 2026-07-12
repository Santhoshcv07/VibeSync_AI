import { Button } from "@/components/ui/button";

export interface VibeHistoryFeedbackProps {
  message: string;
  restoreLabel?: string;
  onRestore?: () => void;
}

export function VibeHistoryFeedback({
  message,
  restoreLabel = "Restore",
  onRestore,
}: VibeHistoryFeedbackProps) {
  if (!message) return null;

  return (
    <div 
      className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 flex items-center gap-4 bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-900 px-4 py-3 rounded-lg shadow-xl"
      role="status"
      aria-live="polite"
    >
      <span className="text-sm font-medium">{message}</span>
      {onRestore && (
        <Button 
          variant="secondary" 
          size="sm" 
          onClick={onRestore}
          className="bg-zinc-800 text-zinc-100 hover:bg-zinc-700 dark:bg-zinc-200 dark:text-zinc-900 dark:hover:bg-zinc-300 ml-auto shrink-0"
        >
          {restoreLabel}
        </Button>
      )}
    </div>
  );
}
