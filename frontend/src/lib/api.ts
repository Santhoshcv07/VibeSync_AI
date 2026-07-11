export type HealthResponse = {
  status: string;
  service: string;
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";

export async function getBackendHealth(): Promise<HealthResponse> {
  const response = await fetch(`${API_BASE_URL}/health`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Backend health request failed: ${response.status}`);
  }

  return response.json() as Promise<HealthResponse>;
}
