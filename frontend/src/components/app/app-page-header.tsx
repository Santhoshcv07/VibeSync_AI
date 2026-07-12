import { ReactNode } from "react";

export interface AppPageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}

export function AppPageHeader({ eyebrow, title, description, actions }: AppPageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 w-full">
      <div className="flex flex-col gap-1 w-full max-w-2xl">
        {eyebrow && (
          <span className="text-caption font-bold tracking-widest text-[var(--primary)] uppercase">
            {eyebrow}
          </span>
        )}
        <h1 className="text-heading-3 md:text-heading-2 font-display font-semibold text-foreground m-0">
          {title}
        </h1>
        {description && (
          <p className="text-body text-foreground-muted mt-1">
            {description}
          </p>
        )}
      </div>
      
      {actions && (
        <div className="shrink-0 flex items-center gap-3 w-full sm:w-auto mt-2 sm:mt-0">
          {actions}
        </div>
      )}
    </div>
  );
}
