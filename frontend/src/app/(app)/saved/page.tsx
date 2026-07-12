import { AppPageContainer } from "@/components/app/app-page-container";
import { AppPageHeader } from "@/components/app/app-page-header";
import { SavedVibesLibrary } from "@/components/saved";
import { Badge } from "@/components/ui/badge";

export default function SavedPage() {
  return (
    <AppPageContainer>
      <AppPageHeader
        eyebrow="YOUR COLLECTION"
        title="Saved Vibes"
        description="Return to entertainment experiences you want to revisit, then search, filter, and organize the collection your way."
        actions={
          <Badge variant="primary" className="uppercase tracking-wider">
            LOCAL PROTOTYPE
          </Badge>
        }
      />
      
      <div className="mb-8 p-4 bg-muted/50 rounded-lg border border-border">
        <p className="text-sm text-muted-foreground leading-relaxed">
          This collection uses fictional demonstration data. Search, filters, view preferences, remove actions, and restore actions remain only in this page and reset when you refresh.
        </p>
      </div>

      <SavedVibesLibrary />
    </AppPageContainer>
  );
}
