"use client";

import { forwardRef, type InputHTMLAttributes, useId } from "react";
import { cn } from "@/lib/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className, id, label, helperText, error, required, disabled, ...props },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const descriptionId = `${inputId}-desc`;

    const hasError = Boolean(error);
    const description = hasError ? error : helperText;

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-label text-foreground"
          >
            {label}
            {required && <span aria-hidden="true" className="ml-1 text-danger">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          required={required}
          disabled={disabled}
          aria-invalid={hasError || undefined}
          aria-describedby={description ? descriptionId : undefined}
          className={cn(
            "flex h-11 w-full rounded-[var(--radius-md)] border bg-[var(--surface)] px-3 py-2 text-body font-sans text-foreground transition-colors",
            "file:border-0 file:bg-transparent file:text-sm file:font-medium",
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

Input.displayName = "Input";
