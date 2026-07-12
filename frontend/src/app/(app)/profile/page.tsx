import { AppPageContainer } from "@/components/app/app-page-container";
import { AppPageHeader } from "@/components/app/app-page-header";
import { VibeProfile } from "@/components/profile";

export default function ProfilePage() {
  return (
    <AppPageContainer>
      <AppPageHeader
        eyebrow="YOUR VIBE IDENTITY"
        title="Profile"
        description="Shape the fictional profile and entertainment preferences that will eventually personalize future Vibe experiences."
        actions={
          <div className="flex flex-col items-end gap-1">
            <span className="inline-flex items-center rounded-md bg-indigo-500/10 px-2 py-1 text-xs font-medium text-indigo-400 ring-1 ring-inset ring-indigo-500/20">
              LOCAL PROTOTYPE
            </span>
          </div>
        }
      />
      <div className="mt-8">
        <div className="mb-8 rounded-lg bg-indigo-500/5 border border-indigo-500/20 p-4">
          <p className="text-sm text-indigo-200">
            <strong>Prototype boundary:</strong> This profile uses fictional demonstration data. Edits remain only in this page and reset when you refresh. No account, profile, preference, or identity information is stored.
          </p>
        </div>
        <VibeProfile />
      </div>
    </AppPageContainer>
  );
}
