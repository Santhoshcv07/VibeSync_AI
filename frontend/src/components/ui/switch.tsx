"use client";

import { forwardRef, type InputHTMLAttributes, type ReactNode, useId } from "react";
import { cn } from "@/lib/cn";

export interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: ReactNode;
  description?: string;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    { className, id, label, description, disabled, ...props },
    ref
  ) => {
    const generatedId = useId();
    const switchId = id ?? generatedId;
    const descriptionId = `${switchId}-desc`;

    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={switchId}
          className={cn(
            "flex items-start gap-3 touch-manipulation",
            disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          )}
        >
          <div className="relative inline-flex items-center mt-0.5 shrink-0">
            <input
              ref={ref}
              type="checkbox"
              id={switchId}
              disabled={disabled}
              aria-describedby={description ? descriptionId : undefined}
              className={cn(
                "peer appearance-none h-6 w-11 rounded-full border border-[var(--border)] bg-[var(--surface)] transition-colors duration-fast focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]",
                "checked:bg-[var(--primary)] checked:border-[var(--primary)] cursor-pointer disabled:cursor-not-allowed",
                className
              )}
              {...props}
            />
            <span
              aria-hidden="true"
              className="absolute left-[3px] top-[3px] h-[16px] w-[16px] rounded-full bg-white transition-transform duration-fast peer-checked:translate-x-[20px] pointer-events-none"
            />
          </div>
          <div className="flex flex-col gap-1 leading-tight">
            <span className="text-body font-sans text-foreground select-none">
              {label}
            </span>
            {description && (
              <span
                id={descriptionId}
                className="text-caption text-foreground-muted"
              >
                {description}
              </span>
            )}
          </div>
        </label>
      </div>
    );
  }
);

Switch.displayName = "Switch";
