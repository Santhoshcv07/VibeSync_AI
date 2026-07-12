import { PageHeader } from "@/components/navigation";
import { Card, CardContent } from "@/components/ui";

export default function HowItWorksPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">
      <PageHeader
        title="How It Works"
        eyebrow="The Flow"
        description="Learn about the mood-to-entertainment pipeline."
      />
      <div className="mt-8">
        <Card>
          <CardContent className="p-8">
            <p className="text-body text-foreground-muted">
              The full explanation of our generation flow will be implemented in a future Phase 4 step.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
