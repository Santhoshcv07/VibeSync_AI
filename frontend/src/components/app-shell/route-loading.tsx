import { Skeleton } from "@/components/ui";
import { Card, CardContent } from "@/components/ui";

export interface RouteLoadingProps {
  title?: string;
  cardCount?: number;
}

export function RouteLoading({
  title = "Loading your VibeSync experience",
  cardCount = 3,
}: RouteLoadingProps) {
  const safeCardCount = Math.max(1, Math.min(cardCount, 6));

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-5xl flex flex-col gap-8">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-4 mb-4">
        <Skeleton variant="text" className="h-6 w-32" />
        <Skeleton variant="text" className="h-10 md:h-12 w-3/4 max-w-md" />
        <Skeleton variant="text" className="h-6 w-1/2 max-w-sm mt-2" />
      </div>

      <p className="sr-only" aria-live="polite">
        {title}
      </p>

      {/* Content Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: safeCardCount }).map((_, i) => (
          <Card key={`route-loading-card-${i}`} className="w-full">
            <CardContent className="p-6 flex flex-col gap-4">
              <Skeleton variant="rectangle" className="h-40 w-full" />
              <div className="flex flex-col gap-2">
                <Skeleton variant="text" className="h-6 w-3/4" />
                <Skeleton variant="text" className="h-4 w-1/2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
