"use client";

import { RouteError } from "@/components/app-shell/route-error";

export default function GlobalError({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  _error;

  return (
    <html lang="en">
      <body>
        <RouteError 
          reset={reset} 
          homeHref="/"
        />
      </body>
    </html>
  );
}
