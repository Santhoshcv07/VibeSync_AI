"use client";

import { forwardRef, type InputHTMLAttributes, type ReactNode, useId } from "react";
import { cn } from "@/lib/cn";

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: ReactNode;
  description?: string;
  error?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    { className, id, label, description, error, required, disabled, ...props },
    ref
  ) => {
    const generatedId = useId();
    const radioId = id ?? generatedId;
    const descriptionId = `${radioId}-desc`;

    const hasError = Boolean(error);
    const helperMessage = hasError ? error : description;

    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={radioId}
          className={cn(
            "flex items-start gap-3 touch-manipulation",
            disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          )}
        >
          <input
            ref={ref}
            type="radio"
            id={radioId}
            required={required}
            disabled={disabled}
            aria-describedby={helperMessage ? descriptionId : undefined}
            className={cn(
              "mt-0.5 h-4 w-4 shrink-0 rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--primary)] transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]",
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

Radio.displayName = "Radio";
