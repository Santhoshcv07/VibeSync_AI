"use client";

import { forwardRef, type TextareaHTMLAttributes, useId } from "react";
import { cn } from "@/lib/cn";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { className, id, label, helperText, error, required, disabled, ...props },
    ref
  ) => {
    const generatedId = useId();
    const textareaId = id ?? generatedId;
    const descriptionId = `${textareaId}-desc`;

    const hasError = Boolean(error);
    const description = hasError ? error : helperText;

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-label text-foreground"
          >
            {label}
            {required && <span aria-hidden="true" className="ml-1 text-danger">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          required={required}
          disabled={disabled}
          aria-invalid={hasError || undefined}
          aria-describedby={description ? descriptionId : undefined}
          className={cn(
            "flex min-h-[5rem] w-full rounded-[var(--radius-md)] border bg-[var(--surface)] px-3 py-2 text-body font-sans text-foreground transition-colors resize-y",
            "placeholder:text-foreground-subtle",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]",
            "disabled:cursor-not-allowed disabled:opacity-50",
            hasError
              ? "border-[var(--danger)] focus-visible:border-[var(--danger)]"
              : "border-[var(--border)] focus-visible:border-[var(--primary)] hover:border-[var(--border-strong)]",
            className
          )}
          {...props}
        />
        {description && (
          <p
            id={descriptionId}
            className={cn(
              "text-caption",
              hasError ? "text-danger" : "text-foreground-muted"
            )}
          >
            {description}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
