"use client";

import { forwardRef, type InputHTMLAttributes, type ReactNode, useId } from "react";
import { cn } from "@/lib/cn";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: ReactNode;
  description?: string;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    { className, id, label, description, error, required, disabled, ...props },
    ref
  ) => {
    const generatedId = useId();
    const checkboxId = id ?? generatedId;
    const descriptionId = `${checkboxId}-desc`;

    const hasError = Boolean(error);
    const helperMessage = hasError ? error : description;

    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={checkboxId}
          className={cn(
            "flex items-start gap-3 touch-manipulation",
            disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          )}
        >
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            required={required}
            disabled={disabled}
            aria-invalid={hasError || undefined}
            aria-describedby={helperMessage ? descriptionId : undefined}
            className={cn(
              "mt-0.5 h-4 w-4 shrink-0 rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface)] text-[var(--primary)] transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]",
              "checked:bg-[var(--primary)] checked:border-[var(--primary)] accent-[var(--primary)]",
              hasError && "border-[var(--danger)]",
              className
            )}
            {...props}
          />
          <div className="flex flex-col gap-1 leading-tight">
            <span className="text-body font-sans text-foreground select-none">
              {label}
              {required && <span aria-hidden="true" className="ml-1 text-danger">*</span>}
            </span>
            {helperMessage && (
              <span
                id={descriptionId}
                className={cn(
                  "text-caption",
                  hasError ? "text-danger" : "text-foreground-muted"
                )}
              >
                {helperMessage}
              </span>
            )}
          </div>
        </label>
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
