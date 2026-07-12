import { PageHeader } from "@/components/navigation";
import { Card, CardContent } from "@/components/ui";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">
      <PageHeader
        title="About VibeSync"
        eyebrow="Our Story"
        description="The entertainment vision behind VibeSync AI."
      />
      <div className="mt-8">
        <Card>
          <CardContent className="p-8">
            <p className="text-body text-foreground-muted">
              The full about interface and product story will be implemented in a future Phase 4 step.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
