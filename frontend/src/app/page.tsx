import { getBackendHealth } from "@/lib/api";

export default async function Home() {
  let backendStatus = "Unavailable";
  let backendService = "Unknown";
  let backendHealth = "Unknown";
  let errorMsg = "";

  try {
    const health = await getBackendHealth();
    backendStatus = "Connected";
    backendService = health.service;
    backendHealth = health.status;
  } catch {
    backendStatus = "Unavailable";
    errorMsg = "Please start the FastAPI backend on port 8000 (uvicorn app.main:app --app-dir backend --reload)";
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-900 p-8">
      <h1 className="text-4xl font-bold mb-2">VibeSync AI</h1>
      <h2 className="text-xl text-gray-600 mb-8">Local Development Setup</h2>

      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <ul className="space-y-4">
          <li className="flex justify-between border-b pb-2">
            <span className="font-semibold">Frontend:</span>
            <span className="text-green-600 font-medium">Running</span>
          </li>
          <li className="flex justify-between border-b pb-2">
            <span className="font-semibold">Backend:</span>
            <span className={backendStatus === "Connected" ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
              {backendStatus}
            </span>
          </li>
          {backendStatus === "Connected" && (
            <>
              <li className="flex justify-between border-b pb-2">
                <span className="font-semibold">Service Name:</span>
                <span>{backendService}</span>
              </li>
              <li className="flex justify-between border-b pb-2">
                <span className="font-semibold">Service Status:</span>
                <span className="capitalize">{backendHealth}</span>
              </li>
            </>
          )}
        </ul>

        {errorMsg && (
          <div className="mt-4 p-3 bg-red-50 text-red-700 text-sm rounded border border-red-200">
            {errorMsg}
          </div>
        )}
      </div>

      <p className="mt-8 text-sm text-gray-500 italic max-w-md text-center">
        Temporary setup verification page — the official VibeSync interface will be built in a later phase.
      </p>
    </div>
  );
}
