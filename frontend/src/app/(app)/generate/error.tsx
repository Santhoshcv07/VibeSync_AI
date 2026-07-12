"use client";

import { RouteError } from "@/components/app-shell/route-error";

export default function GenerateError({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  _error;

  return (
    <RouteError 
      reset={reset} 
      homeHref="/dashboard"
    />
  );
}
