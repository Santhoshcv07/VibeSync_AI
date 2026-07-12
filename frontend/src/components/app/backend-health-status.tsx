"use client";

import { useEffect, useState, useRef } from "react";
import { getHealth } from "@/lib/api";

type HealthState = "Checking" | "Connected" | "Unavailable" | "Retrying";

export function BackendHealthStatus() {
  const [status, setStatus] = useState<HealthState>("Checking");
  const abortControllerRef = useRef<AbortController | null>(null);

  const checkHealth = async (isRetry = false) => {
    if (isRetry) setStatus("Retrying");
    
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      await getHealth({ signal: controller.signal });
      setStatus("Connected");
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.name === "AbortError" || (err as { code?: string }).code === "REQUEST_ABORTED") {
          return;
        }
      }
      setStatus("Unavailable");
    }
  };

  useEffect(() => {
    let ignore = false;
    
    const init = async () => {
      try {
        await getHealth({ signal: abortControllerRef.current?.signal });
        if (!ignore) setStatus("Connected");
      } catch (err: unknown) {
        if (!ignore) {
          if (err instanceof Error) {
            if (err.name !== "AbortError" && (err as { code?: string }).code !== "REQUEST_ABORTED") {
              setStatus("Unavailable");
            }
          } else {
            setStatus("Unavailable");
          }
        }
      }
    };
    
    const controller = new AbortController();
    abortControllerRef.current = controller;
    
    init();

    return () => {
      ignore = true;
      controller.abort();
    };
  }, []);

  const dotColor = 
    status === "Connected" ? "bg-[var(--success)]" :
    status === "Unavailable" ? "bg-[var(--danger)]" :
    "bg-[var(--warning)]";

  const isPending = status === "Checking" || status === "Retrying";

  return (
    <div className="flex items-center gap-2 text-caption text-foreground-subtle" aria-live="polite">
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2 shrink-0">
          {isPending && (
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotColor}`}></span>
          )}
          <span className={`relative inline-flex rounded-full h-2 w-2 ${dotColor}`}></span>
        </span>
        <span>Backend &middot; {status}</span>
      </div>
      
      {status === "Unavailable" && (
        <button
          type="button"
          onClick={() => checkHealth(true)}
          disabled={isPending}
          className="text-[var(--primary)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] rounded px-1 -ml-1 transition-colors"
          aria-label="Retry backend connection"
        >
          Retry
        </button>
      )}
    </div>
  );
}
