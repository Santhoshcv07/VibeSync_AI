"use client";

import { ErrorState } from "@/components/ui";
import { Button } from "@/components/ui";
import Link from "next/link";

export interface RouteErrorProps {
  title?: string;
  description?: string;
  reset?: () => void;
  homeHref?: string;
}

export function RouteError({
  title = "We could not load this experience",
  description = "Something unexpected happened. Please try again.",
  reset,
  homeHref = "/dashboard",
}: RouteErrorProps) {
  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[50vh]">
      <ErrorState
        title={title}
        description={description}
        action={
          <div className="flex flex-wrap gap-4 mt-2">
            {reset && (
              <Button onClick={() => reset()} variant="primary">
                Try Again
              </Button>
            )}
            <Link href={homeHref}>
              <Button variant="outline">Return to Safety</Button>
            </Link>
          </div>
        }
      />
    </div>
  );
}
