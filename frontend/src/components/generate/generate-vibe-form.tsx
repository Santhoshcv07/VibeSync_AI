"use client";

import { useState, useRef, FormEvent } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { MoodSelector } from "./mood-selector";
import { TimeSelector } from "./time-selector";
import { VibeIntentionField } from "./vibe-intention-field";
import { VibeSelectionSummary } from "./vibe-selection-summary";
import { GenerateVibeSuccessPreview } from "./generate-vibe-success-preview";
import { MoodThemeScope } from "@/components/theme/mood-theme-scope";
import { type MoodTheme } from "@/lib/mood-theme";
import { 
  type GenerateVibeFormValues, 
  type GenerateVibeFormErrors, 
  type GenerateVibeFieldName,
  type VibeMood,
  type VibeDuration,
  moodOptions,
  durationOptions
} from "./generate-vibe.types";

export function GenerateVibeForm() {
  const [values, setValues] = useState<GenerateVibeFormValues>({
    mood: null,
    duration: null,
    intention: "",
  });

  const [errors, setErrors] = useState<GenerateVibeFormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<GenerateVibeFieldName, boolean>>>({});
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showSummaryAlert, setShowSummaryAlert] = useState(false);

  const moodRef = useRef<HTMLInputElement>(null);
  const durationRef = useRef<HTMLInputElement>(null);
  const intentionRef = useRef<HTMLTextAreaElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);

  const validateField = (name: GenerateVibeFieldName, currentValues: GenerateVibeFormValues): string | undefined => {
    switch (name) {
      case "mood":
        if (!currentValues.mood) return "Choose a mood for your Vibe.";
        return undefined;
      case "duration":
        if (!currentValues.duration) return "Choose how much time you have.";
        return undefined;
      case "intention":
        if (currentValues.intention.trim() && currentValues.intention.trim().length < 3) {
          return "Add at least 3 characters, or leave this field empty.";
        }
        return undefined;
    }
  };

  const validateAll = (currentValues: GenerateVibeFormValues): GenerateVibeFormErrors => {
    const newErrors: GenerateVibeFormErrors = {};
    const fields: GenerateVibeFieldName[] = ["mood", "duration", "intention"];
    
    fields.forEach((field) => {
      const error = validateField(field, currentValues);
      if (error) newErrors[field] = error;
    });
    
    return newErrors;
  };

  const handleMoodChange = (mood: VibeMood) => {
    const newValues = { ...values, mood };
    setValues(newValues);
    setTouched((prev) => ({ ...prev, mood: true }));
    if (showSummaryAlert || touched.mood) {
      setErrors((prev) => ({ ...prev, mood: validateField("mood", newValues) }));
    } else {
      setErrors((prev) => ({ ...prev, mood: undefined }));
    }
  };

  const handleDurationChange = (duration: VibeDuration) => {
    const newValues = { ...values, duration };
    setValues(newValues);
    setTouched((prev) => ({ ...prev, duration: true }));
    if (showSummaryAlert || touched.duration) {
      setErrors((prev) => ({ ...prev, duration: validateField("duration", newValues) }));
    } else {
      setErrors((prev) => ({ ...prev, duration: undefined }));
    }
  };

  const handleIntentionChange = (intention: string) => {
    const newValues = { ...values, intention };
    setValues(newValues);
    if (showSummaryAlert || touched.intention) {
      setErrors((prev) => ({ ...prev, intention: validateField("intention", newValues) }));
    }
  };

  const handleIntentionBlur = () => {
    setTouched((prev) => ({ ...prev, intention: true }));
    setErrors((prev) => ({ ...prev, intention: validateField("intention", values) }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const newErrors = validateAll(values);
    setErrors(newErrors);

    setTouched({ mood: true, duration: true, intention: true });

    if (Object.keys(newErrors).length > 0) {
      setShowSummaryAlert(true);
      
      if (newErrors.mood) {
        moodRef.current?.focus();
      } else if (newErrors.duration) {
        durationRef.current?.focus();
      } else if (newErrors.intention) {
        intentionRef.current?.focus();
      }
      
      return;
    }

    setShowSummaryAlert(false);
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        successHeadingRef.current?.focus();
      }, 50);
    }, 750);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setValues({ mood: null, duration: null, intention: "" });
    setTouched({});
    setErrors({});
    setShowSummaryAlert(false);
    
    setTimeout(() => {
      moodRef.current?.focus();
    }, 50);
  };

  if (isSuccess) {
    const moodLabel = moodOptions.find(o => o.value === values.mood)?.label || "";
    const durationLabel = durationOptions.find(o => o.value === values.duration)?.label || "";
    
    return (
      <div className="w-full outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] rounded-sm" ref={successHeadingRef} tabIndex={-1}>
        <GenerateVibeSuccessPreview 
          moodLabel={moodLabel}
          durationLabel={durationLabel}
          intention={values.intention.trim()}
          onReset={handleReset}
        />
      </div>
    );
  }

  const formContent = (
    <div className="w-full relative">
      <div aria-live="polite" className="sr-only">
        {isSubmitting ? "Preparing your Vibe preview locally." : ""}
      </div>

      <form 
        noValidate 
        onSubmit={handleSubmit} 
        className="flex flex-col lg:flex-row gap-10 lg:gap-16 w-full"
        aria-busy={isSubmitting}
      >
        <div className="flex-1 flex flex-col gap-10 min-w-0">
          {showSummaryAlert && Object.keys(errors).length > 0 && (
            <Alert variant="danger" title="Complete your Vibe" className="mb-2">
              Choose the missing details and try again.
            </Alert>
          )}

          <MoodSelector 
            ref={moodRef}
            value={values.mood} 
            onChange={handleMoodChange} 
            error={errors.mood} 
            errorId={errors.mood ? "mood-error" : undefined}
          />
          
          <TimeSelector 
            ref={durationRef}
            value={values.duration} 
            onChange={handleDurationChange} 
            error={errors.duration} 
            errorId={errors.duration ? "duration-error" : undefined}
          />

          <div className="pb-8">
            <VibeIntentionField 
              ref={intentionRef}
              value={values.intention} 
              onChange={handleIntentionChange} 
              onBlur={handleIntentionBlur}
              error={errors.intention} 
              errorId={errors.intention ? "intention-error" : undefined}
            />
          </div>
        </div>

        <div className="lg:w-[400px] shrink-0">
          <div className="sticky top-24 flex flex-col gap-6">
            <VibeSelectionSummary 
              mood={values.mood} 
              duration={values.duration} 
              intention={values.intention.trim()} 
            />
            
            <div className="flex flex-col gap-3">
              <Button type="submit" variant="primary" size="lg" disabled={isSubmitting} className="w-full font-semibold whitespace-nowrap">
                {isSubmitting ? (
                  <>
                    <Spinner size="sm" className="mr-2" />
                    Preparing local preview…
                  </>
                ) : (
                  "Generate My Vibe"
                )}
              </Button>
              <p className="text-caption text-foreground-subtle text-center">
                Local prototype only—no AI or provider request will be sent.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );

  const getMoodTheme = (mood: VibeMood): MoodTheme => {
    if (mood === "low") return "sad";
    return mood as unknown as MoodTheme;
  };

  if (values.mood) {
    return (
      <MoodThemeScope theme={getMoodTheme(values.mood)}>
        {formContent}
      </MoodThemeScope>
    );
  }

  return formContent;
}
