import { forwardRef } from "react";
import { Textarea } from "@/components/ui/textarea";

export interface VibeIntentionFieldProps {
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  error?: string;
  errorId?: string;
}

export const VibeIntentionField = forwardRef<HTMLTextAreaElement, VibeIntentionFieldProps>(
  ({ value, onChange, onBlur, error }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        <div className="flex items-end justify-between mb-1">
          <label htmlFor="intention" className="text-label text-foreground flex items-center gap-2">
            What do you want from this Vibe?
            <span className="text-caption text-foreground-subtle font-normal bg-[var(--surface-floating)] px-2 py-0.5 rounded-full border border-[var(--border)]">Optional</span>
          </label>
          <span className="text-caption text-foreground-muted" aria-live="polite">
            {value.length} / 180
          </span>
        </div>
        
        <p className="text-body-sm text-foreground-muted mb-2">
          Add a short note to shape the future recommendation experience.
        </p>
        
        <Textarea
          ref={ref}
          id="intention"
          name="intention"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          error={error}
          placeholder="Example: I want a calm reset after a long day."
          maxLength={180}
          className="resize-none min-h-[100px]"
        />
      </div>
    );
  }
);

VibeIntentionField.displayName = "VibeIntentionField";
