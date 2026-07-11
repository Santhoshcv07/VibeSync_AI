import { type HTMLAttributes } from "react";
import { type MoodTheme } from "@/lib/mood-theme";
import { cn } from "@/lib/cn";

export interface MoodThemeScopeProps extends HTMLAttributes<HTMLDivElement> {
  theme: MoodTheme;
}

export function MoodThemeScope({ theme, className, children, ...props }: MoodThemeScopeProps) {
  return (
    <div
      data-mood-theme={theme}
      className={cn("bg-[var(--background)] text-foreground mood-theme-transition", className)}
      {...props}
    >
      {children}
    </div>
  );
}
