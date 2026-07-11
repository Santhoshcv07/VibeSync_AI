"use client";

import { forwardRef, type SelectHTMLAttributes, useId } from "react";
import { cn } from "@/lib/cn";

export interface SelectProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { className, id, label, helperText, error, required, disabled, children, ...props },
    ref
  ) => {
    const generatedId = useId();
    const selectId = id ?? generatedId;
    const descriptionId = `${selectId}-desc`;

    const hasError = Boolean(error);
    const description = hasError ? error : helperText;

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="text-label text-foreground"
          >
            {label}
            {required && <span aria-hidden="true" className="ml-1 text-danger">*</span>}
          </label>
        )}
        <div className="relative w-full">
          <select
            ref={ref}
            id={selectId}
            required={required}
            disabled={disabled}
            aria-invalid={hasError || undefined}
            aria-describedby={description ? descriptionId : undefined}
            className={cn(
              "appearance-none flex h-11 w-full rounded-[var(--radius-md)] border bg-[var(--surface)] pl-3 pr-10 py-2 text-body font-sans text-foreground transition-colors",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]",
              "disabled:cursor-not-allowed disabled:opacity-50",
              hasError
                ? "border-[var(--danger)] focus-visible:border-[var(--danger)]"
                : "border-[var(--border)] focus-visible:border-[var(--primary)] hover:border-[var(--border-strong)]",
              className
            )}
            {...props}
          >
            {children}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-foreground-subtle">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </div>
        </div>
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

Select.displayName = "Select";
