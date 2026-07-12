import { apiRequest } from "./client";
import { ApiError } from "./errors";
import type { HealthResponse } from "./types";

export function validateHealthResponse(data: unknown): HealthResponse {
  if (!data || typeof data !== "object") {
    throw new ApiError({ code: "INVALID_RESPONSE", message: "The server returned an invalid response." });
  }
  const record = data as Record<string, unknown>;
  if (record.status !== "ok") {
    throw new ApiError({ code: "INVALID_RESPONSE", message: "The server returned an invalid response." });
  }
  if (record.service !== "vibesync-api") {
    throw new ApiError({ code: "INVALID_RESPONSE", message: "The server returned an invalid response." });
  }
  if (typeof record.version !== "string" || record.version.trim() === "") {
    throw new ApiError({ code: "INVALID_RESPONSE", message: "The server returned an invalid response." });
  }
  return {
    status: record.status as string,
    service: record.service as string,
    version: record.version as string,
  };
}

export async function getHealth(options?: { signal?: AbortSignal }): Promise<HealthResponse> {
  const data = await apiRequest<unknown>("/health", {
    method: "GET",
    cache: "no-store",
    signal: options?.signal,
  });
  return validateHealthResponse(data);
}
