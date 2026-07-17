import { AppPageContainer } from "@/components/app/app-page-container";
import { AppPageHeader } from "@/components/app/app-page-header";
import { VibeProfile } from "@/components/profile";

export default function ProfilePage() {
  return (
    <AppPageContainer>
      <AppPageHeader
        eyebrow="YOUR VIBE IDENTITY"
        title="Profile"
        description="View your fictional profile, listening statistics, and entertainment preferences."
      />
      <div className="mt-8">
        <VibeProfile />
      </div>
    </AppPageContainer>
  );
}
