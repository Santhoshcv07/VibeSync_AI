export const getApiBaseUrl = (): string => {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";
  if (!url || url.trim() === "") {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is required but was empty");
  }

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    throw new Error(`Invalid API base URL: ${url}`);
  }

  if (parsed.username || parsed.password) {
    throw new Error("API base URL cannot contain credentials");
  }
  if (parsed.search) {
    throw new Error("API base URL cannot contain query parameters");
  }
  if (parsed.hash) {
    throw new Error("API base URL cannot contain fragments");
  }
  // Application-level rule: backend expects /api/v1 prefix per request, base URL should just be the host
  if (parsed.pathname && parsed.pathname !== "/") {
    throw new Error("API base URL cannot contain a path");
  }

  return url.replace(/\/+$/, "");
};
