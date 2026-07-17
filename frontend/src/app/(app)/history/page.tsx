import { AppPageContainer } from "@/components/app/app-page-container";
import { AppPageHeader } from "@/components/app/app-page-header";
import { VibeHistoryTimeline } from "@/components/history";
import { Badge } from "@/components/ui/badge";

export default function HistoryPage() {
  return (
    <AppPageContainer>
      <AppPageHeader
        eyebrow="YOUR TIMELINE"
        title="Vibe History"
        description="Revisit the entertainment experiences you explored before, then search, filter, reopen, or generate a similar Vibe."
        actions={<Badge variant="primary" className="pointer-events-none uppercase tracking-widest text-[10px]">Local Prototype</Badge>}
      />
      <div className="py-6 sm:py-8 max-w-4xl">
        <p className="text-sm text-muted-foreground bg-muted/30 p-4 rounded-lg border border-border/50 mb-10">
          This timeline uses fictional demonstration activity. Search, filters, expanded details, remove actions, and restore actions remain only in this page and reset when you refresh.
          <br /><br />
          <strong>Note:</strong> Timeline labels are fictional and shown only to demonstrate the future history experience.
        </p>
        <VibeHistoryTimeline />
      </div>
    </AppPageContainer>
  );
}
