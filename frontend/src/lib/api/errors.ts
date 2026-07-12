import type { ApiErrorBody, ApiErrorDetail } from "./types";

export type ApiErrorCode =
  | "NETWORK_ERROR"
  | "REQUEST_TIMEOUT"
  | "INVALID_RESPONSE"
  | "REQUEST_ABORTED"
  | "HTTP_ERROR"
  | string;

export class ApiError extends Error {
  public readonly code: ApiErrorCode;
  public readonly status: number | null;
  public readonly details: ApiErrorDetail[];
  public readonly requestId: string | null;

  constructor({
    message,
    code,
    status = null,
    details = [],
    requestId = null,
    cause,
  }: {
    message: string;
    code: ApiErrorCode;
    status?: number | null;
    details?: ApiErrorDetail[];
    requestId?: string | null;
    cause?: unknown;
  }) {
    super(message, { cause });
    this.name = "ApiError";
    this.code = code;
    this.status = status;
    this.details = details;
    this.requestId = requestId;

    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export function isBackendErrorBody(data: unknown): data is ApiErrorBody {
  if (!data || typeof data !== "object") return false;

  const record = data as Record<string, unknown>;
  if (!record.error || typeof record.error !== "object") return false;

  const errorObj = record.error as Record<string, unknown>;
  if (typeof errorObj.code !== "string") return false;
  if (typeof errorObj.message !== "string") return false;

  if (errorObj.details !== undefined) {
    if (!Array.isArray(errorObj.details)) return false;
    for (const d of errorObj.details) {
      if (!d || typeof d !== "object") return false;
      if (typeof (d as Record<string, unknown>).field !== "string") return false;
      if (typeof (d as Record<string, unknown>).message !== "string") return false;
    }
  }

  if (errorObj.request_id !== undefined && errorObj.request_id !== null) {
    if (typeof errorObj.request_id !== "string") return false;
  }

  return true;
}
