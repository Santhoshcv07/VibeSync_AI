import { AppPageContainer, AppPageHeader } from "@/components/app";
import { Card, CardContent } from "@/components/ui";
import { Badge } from "@/components/ui";

export interface RoutePlaceholderProps {
  eyebrow: string;
  title: string;
  description: string;
  plannedStep: string;
}

export function RoutePlaceholder({
  eyebrow,
  title,
  description,
  plannedStep,
}: RoutePlaceholderProps) {
  return (
    <AppPageContainer>
      <AppPageHeader
        title={title}
        eyebrow={eyebrow}
        description={description}
        actions={
          <Badge variant="primary" size="md">
            {plannedStep}
          </Badge>
        }
      />
      <div>
        <Card className="w-full border-dashed border-2">
          <CardContent className="p-12 flex flex-col items-center justify-center text-center min-h-[300px]">
            <p className="text-body text-foreground-muted max-w-lg">
              This interface is currently a structural placeholder. The full product view and related features will be implemented in {plannedStep}.
            </p>
          </CardContent>
        </Card>
      </div>
    </AppPageContainer>
  );
}
