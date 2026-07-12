"use client";

import { cn } from "@/lib/cn";

export interface PasswordRequirementsProps {
  password: string;
}

interface PasswordRequirement {
  id: string;
  label: string;
  test: (password: string) => boolean;
}

const requirements: PasswordRequirement[] = [
  { id: "length", label: "At least 8 characters", test: (p) => p.length >= 8 },
  { id: "uppercase", label: "One uppercase letter", test: (p) => /[A-Z]/.test(p) },
  { id: "lowercase", label: "One lowercase letter", test: (p) => /[a-z]/.test(p) },
  { id: "number", label: "One number", test: (p) => /[0-9]/.test(p) },
];

export function PasswordRequirements({ password }: PasswordRequirementsProps) {
  return (
    <div className="flex flex-col gap-2 mt-2 p-4 bg-[var(--surface-elevated)] border border-[var(--border)] rounded-[var(--radius-md)]">
      {requirements.map((req) => {
        const met = req.test(password);
        return (
          <div key={req.id} className="flex items-center gap-2 text-body-sm">
            <span aria-hidden="true" className={cn("flex-shrink-0 flex items-center justify-center w-4 h-4 rounded-full", met ? "bg-[var(--success)] text-white" : "bg-[var(--surface)] border border-[var(--border)] text-foreground-muted")}>
              {met ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              )}
            </span>
            <span className={cn("transition-colors", met ? "text-foreground" : "text-foreground-muted")}>
              {req.label}
              <span className="sr-only">, {met ? "Met" : "Not met"}</span>
            </span>
          </div>
        );
      })}
    </div>
  );
}
