import { AppPageContainer } from "@/components/app/app-page-container";
import { AppPageHeader } from "@/components/app/app-page-header";
import { VibeSettings } from "@/components/settings";

export default function SettingsPage() {
  return (
    <AppPageContainer>
      <AppPageHeader
        eyebrow="YOUR EXPERIENCE"
        title="Settings"
        description="Preview how appearance, accessibility, recommendation, notification, and privacy preferences may shape VibeSync AI."
        actions={
          <div className="flex flex-col items-end gap-1">
            <span className="inline-flex items-center rounded-md bg-indigo-500/10 px-2 py-1 text-xs font-medium text-indigo-400 ring-1 ring-inset ring-indigo-500/20">
              LOCAL PROTOTYPE
            </span>
          </div>
        }
      />
      <div className="mt-8">
        <div className="mb-8 rounded-lg bg-indigo-500/5 border border-indigo-500/20 p-4 space-y-2">
          <p className="text-sm text-indigo-200">
            <strong>Prototype boundary:</strong> These settings are fictional demonstration preferences. Changes remain only in this page and reset when you refresh.
          </p>
          <p className="text-sm text-indigo-200/70">
            No account setting, preference, notification permission, or privacy choice is stored.
          </p>
        </div>
        <VibeSettings />
      </div>
    </AppPageContainer>
  );
}
