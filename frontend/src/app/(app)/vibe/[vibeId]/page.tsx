import { AppPageContainer } from "@/components/app/app-page-container";
import { 
  demoVibeExperience, 
  VibeGenericState,
  VibeExperienceClient
} from "@/components/vibe";

export default async function VibeDetailPage({
  params,
}: {
  params: Promise<{ vibeId: string }>;
}) {
  const { vibeId } = await params;

  if (vibeId === "demo-vibe") {
    return (
      <AppPageContainer>
        <VibeExperienceClient experience={demoVibeExperience} />
      </AppPageContainer>
    );
  }

  return (
    <AppPageContainer>
      <VibeGenericState vibeId={vibeId} />
    </AppPageContainer>
  );
}
