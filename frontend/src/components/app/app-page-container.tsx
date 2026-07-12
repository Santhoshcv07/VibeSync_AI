import { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface AppPageContainerProps {
  children: ReactNode;
  className?: string;
}

export function AppPageContainer({ children, className }: AppPageContainerProps) {
  return (
    <div className={cn("w-full max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-10 flex flex-col gap-6 flex-1", className)}>
      {children}
    </div>
  );
}
