import { apiRequest } from "./client";
import { type VibeMood } from "@/components/generate/generate-vibe.types";
import { type VibeExperienceData } from "@/components/vibe/vibe-experience.data";
import { type ApiSuccessResponse } from "./types";

export interface GenerateVibeRequest {
  mood: VibeMood;
  context?: string | null;
}

export async function generateVibe(
  request: GenerateVibeRequest,
  signal?: AbortSignal
): Promise<ApiSuccessResponse<VibeExperienceData>> {
  return apiRequest<ApiSuccessResponse<VibeExperienceData>>("/api/v1/vibes/generate", {
    method: "POST",
    body: request,
    signal,
  });
}
