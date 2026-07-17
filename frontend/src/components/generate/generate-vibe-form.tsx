"use client";

import { useState, useRef, FormEvent } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/cn";
import { MoodSelector } from "./mood-selector";
import { TimeSelector } from "./time-selector";
import { VibeIntentionField } from "./vibe-intention-field";
import { VibeSelectionSummary } from "./vibe-selection-summary";
import { MoodThemeScope } from "@/components/theme/mood-theme-scope";
import { type MoodTheme } from "@/lib/mood-theme";
import { generateVibe } from "@/lib/api/vibes";
import { ApiError } from "@/lib/api/errors";
import { VibeExperienceClient } from "@/components/vibe/vibe-experience-client";
import { type VibeExperienceData } from "@/components/vibe/vibe-experience.data";
import {
  type GenerateVibeFormValues,
  type GenerateVibeFormErrors,
  type GenerateVibeFieldName,
  type VibeMood,
  type VibeDuration
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
  const [apiError, setApiError] = useState<string | null>(null);
  const [vibeData, setVibeData] = useState<VibeExperienceData | null>(null);

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

  const handleSubmit = async (e?: FormEvent) => {
    if (e) e.preventDefault();
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
    setApiError(null);

    try {
      if (!values.mood) return; // Should be caught by validation

      const response = await generateVibe({
        mood: values.mood,
        context: values.intention.trim() || undefined,
      });

      setVibeData(response.data);
      setIsSuccess(true);

      setTimeout(() => {
        if (successHeadingRef.current) {
          successHeadingRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
          successHeadingRef.current.focus({ preventScroll: true });
        }
      }, 50);
    } catch (err: unknown) {
      if (err instanceof ApiError) {
        if (err.code === "VALIDATION_ERROR") {
          setApiError("Please check your inputs and try again.");
        } else if (err.code === "AI_UNAVAILABLE") {
          setApiError("AI generation is temporarily unavailable. Please try again later.");
        } else if (err.code === "AI_GENERATION_FAILED") {
          setApiError("The AI provider encountered an error. Please try again.");
        } else if (err.code === "REQUEST_TIMEOUT") {
          setApiError("The request timed out. Please try again.");
        } else if (err.code === "NETWORK_ERROR") {
          setApiError("Unable to reach the server. Please check your connection.");
        } else if (err.code === "INVALID_RESPONSE") {
          setApiError("The server returned an invalid response. Please try again.");
        } else {
          setApiError(err.message || "An unexpected error occurred.");
        }
      } else {
        setApiError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setVibeData(null);
    setValues({ mood: null, duration: null, intention: "" });
    setTouched({});
    setErrors({});
    setShowSummaryAlert(false);
    setApiError(null);

    setTimeout(() => {
      moodRef.current?.focus();
    }, 50);
  };

  if (isSuccess && vibeData) {
    return (
      <div className="w-full outline-none focus-visible:ring-2 focus-visible:ring-(--focus-ring) rounded-sm pb-12" ref={successHeadingRef} tabIndex={-1}>
        <div className="flex items-center max-w-5xl mx-auto px-4 py-6">
          <Button variant="ghost" size="sm" onClick={handleReset} className="text-foreground-muted hover:text-foreground">
            &larr; Create Another Vibe
          </Button>
        </div>
        <VibeExperienceClient experience={vibeData} />
      </div>
    );
  }

  const formContent = (
    <div className="w-full relative">
      <div aria-live="polite" className="sr-only">
        {isSubmitting ? "Generating your Vibe..." : ""}
        {apiError ? `Error: ${apiError}` : ""}
      </div>

      <form
        noValidate
        onSubmit={handleSubmit}
        className="mx-auto mt-6 flex max-w-[1220px] items-start gap-5"
        aria-busy={isSubmitting}
      >
        {/* LEFT */}
        <div className="flex w-[840px] flex-col gap-6">
          {apiError && (
            <Alert variant="danger" title="Generation Failed" className="mb-0">
              <div className="flex flex-col gap-3 items-start">
                <p>{apiError}</p>
                <Button variant="outline" size="sm" onClick={() => handleSubmit()} disabled={isSubmitting}>
                  Retry Generation
                </Button>
              </div>
            </Alert>
          )}

          {showSummaryAlert && Object.keys(errors).length > 0 && !apiError && (
            <Alert variant="danger" title="Complete your Vibe" className="mb-0">
              Choose the missing details and try again.
            </Alert>
          )}

          <div className="rounded-[24px] border border-white/10 bg-[#0A1020]/80 p-6 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,.35)]">
            <MoodSelector
              ref={moodRef}
              value={values.mood}
              onChange={handleMoodChange}
              error={errors.mood}
              errorId={errors.mood ? "mood-error" : undefined}
            />
          </div>

          <div className="rounded-[24px] border border-white/10 bg-[#0A1020]/80 p-6 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,.35)]">
            <TimeSelector
              ref={durationRef}
              value={values.duration}
              onChange={handleDurationChange}
              error={errors.duration}
              errorId={errors.duration ? "duration-error" : undefined}
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="sticky top-24 w-[300px] shrink-0">
          <VibeSelectionSummary
            mood={values.mood}
            duration={values.duration}
            intention={values.intention.trim()}
            isSubmitting={isSubmitting}
          />
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
