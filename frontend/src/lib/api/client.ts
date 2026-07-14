import { getApiBaseUrl } from "./config";
import { ApiError, isBackendErrorBody } from "./errors";

const DEFAULT_TIMEOUT_MS = 60000;

export interface RequestOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
  timeout?: number;
}

export async function apiRequest<TResponse>(
  path: string,
  options: RequestOptions = {}
): Promise<TResponse> {
  if (!path.startsWith("/")) {
    throw new Error("Path must be application-relative starting with /");
  }

  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}${path}`;

  const {
    timeout = DEFAULT_TIMEOUT_MS,
    body,
    headers: customHeaders,
    signal: callerSignal,
    ...restInit
  } = options;

  let isAbortedByTimeout = false;
  const controller = new AbortController();

  const timeoutId = setTimeout(() => {
    isAbortedByTimeout = true;
    controller.abort(new Error("Timeout"));
  }, timeout);

  const abortListener = () => {
    controller.abort(callerSignal?.reason);
  };

  if (callerSignal) {
    if (callerSignal.aborted) {
      clearTimeout(timeoutId);
      throw new ApiError({
        code: "REQUEST_ABORTED",
        message: "The request was aborted.",
      });
    }
    callerSignal.addEventListener("abort", abortListener);
  }

  const headers = new Headers(customHeaders);
  if (!headers.has("Accept")) {
    headers.set("Accept", "application/json");
  }

  let finalBody: BodyInit | undefined;
  if (body !== undefined) {
    if (body instanceof FormData || body instanceof URLSearchParams) {
      finalBody = body;
    } else {
      finalBody = JSON.stringify(body);
      if (!headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
      }
    }
  }

  try {
    const response = await fetch(url, {
      ...restInit,
      headers,
      body: finalBody,
      signal: controller.signal,
    });

    if (response.ok) {
      if (response.status === 204) {
        return undefined as unknown as TResponse;
      }
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        try {
          return (await response.json()) as TResponse;
        } catch (e) {
          throw new ApiError({
            code: "INVALID_RESPONSE",
            message: "The server returned an invalid response.",
            status: response.status,
            cause: e,
          });
        }
      }
      throw new ApiError({
        code: "INVALID_RESPONSE",
        message: "The server returned an invalid response.",
        status: response.status,
      });
    } else {
      let data: unknown;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        try {
          data = await response.json();
        } catch {
          // Ignore JSON parse error for error responses
        }
      }

      if (isBackendErrorBody(data)) {
        throw new ApiError({
          code: data.error.code,
          message: data.error.message,
          status: response.status,
          details: data.error.details,
          requestId: data.error.request_id,
        });
      }

      throw new ApiError({
        code: "HTTP_ERROR",
        message: "The request could not be completed.",
        status: response.status,
      });
    }
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof Error) {
      if (error.name === "AbortError" || controller.signal.aborted) {
        if (isAbortedByTimeout) {
          throw new ApiError({
            code: "REQUEST_TIMEOUT",
            message: "The request timed out.",
            cause: error,
          });
        }
        if (callerSignal?.aborted) {
          throw new ApiError({
            code: "REQUEST_ABORTED",
            message: "The request was aborted.",
            cause: error,
          });
        }
      }

      throw new ApiError({
        code: "NETWORK_ERROR",
        message:
          "Unable to reach the server. Please check your connection and try again.",
        cause: error,
      });
    }

    throw new ApiError({
      code: "NETWORK_ERROR",
      message:
        "Unable to reach the server. Please check your connection and try again.",
    });
  } finally {
    clearTimeout(timeoutId);
    if (callerSignal) {
      callerSignal.removeEventListener("abort", abortListener);
    }
  }
}
