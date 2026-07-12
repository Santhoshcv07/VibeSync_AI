import { AppPageContainer } from "@/components/app/app-page-container";
import { AppPageHeader } from "@/components/app/app-page-header";
import { GenerateVibeForm } from "@/components/generate";
import { Badge } from "@/components/ui/badge";

export default function GeneratePage() {
  return (
    <AppPageContainer>
      <AppPageHeader
        eyebrow="GENERATE YOUR VIBE"
        title="Build an experience around your moment"
        description="Choose the feeling you want your entertainment experience to match, then tell VibeSync how much time you have."
      />
      <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-[var(--surface-subtle)] p-4 rounded-[var(--radius-md)] border border-[var(--border)]">
        <Badge variant="info" className="shrink-0 uppercase tracking-wider text-[0.65rem] font-bold">Frontend prototype</Badge>
        <p className="text-body-sm text-foreground-muted">
          Your selections stay in this page only. No AI request is sent, no recommendation is generated, and no information is stored.
        </p>
      </div>
      <div className="w-full mt-8 md:mt-12">
        <GenerateVibeForm />
      </div>
    </AppPageContainer>
  );
}
