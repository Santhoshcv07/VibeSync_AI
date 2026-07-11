"use client";

import {
  Alert,
  Badge,
  Spinner,
  Progress,
  Skeleton,
  EmptyState,
  ErrorState,
  Button
} from "@/components/ui";

export default function FeedbackPreviewPage() {
  return (
    <main className="page-container section-spacing flex flex-col gap-16 pb-24">
      <header className="flex flex-col gap-4">
        <h1 className="text-display-lg text-primary">Feedback Foundations</h1>
        <p className="text-body-lg text-foreground-muted">
          Internal VibeSync design-system preview
        </p>
      </header>

      <section className="flex flex-col gap-8">
        <h2 className="text-heading-2 border-b border-[var(--border)] pb-2 max-w-2xl">Alerts</h2>

        <div className="flex flex-col gap-4 max-w-2xl">
          <Alert>
            This is a neutral alert providing general status information.
          </Alert>
          <Alert variant="info" title="Update available">
            A new version of VibeSync is ready. Please refresh to update.
          </Alert>
          <Alert variant="success" title="Profile saved">
            Your profile details have been successfully updated.
          </Alert>
          <Alert variant="warning" title="Connection unstable">
            We are having trouble connecting to the network. Trying to reconnect...
          </Alert>
          <Alert variant="danger" title="Payment failed">
            Your recent transaction could not be processed. Please check your billing details.
          </Alert>
          <Alert variant="info" icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
          }>
            This alert includes a custom inline SVG icon for extra context.
          </Alert>
        </div>
      </section>

      <section className="flex flex-col gap-8">
        <h2 className="text-heading-2 border-b border-[var(--border)] pb-2 max-w-2xl">Badges</h2>

        <div className="flex flex-wrap gap-4 items-center max-w-2xl">
          <div className="flex gap-2 items-center">
            <Badge>Neutral</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
          </div>
          <div className="flex gap-2 items-center">
            <Badge size="sm">Small Badge</Badge>
            <Badge size="md">Medium Badge</Badge>
          </div>
          <div className="flex gap-2 items-center">
            <Badge dot>Dot</Badge>
            <Badge dot variant="success">Online</Badge>
            <Badge dot variant="danger">Offline</Badge>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-8">
        <h2 className="text-heading-2 border-b border-[var(--border)] pb-2 max-w-2xl">Spinners</h2>

        <div className="flex flex-wrap gap-8 items-center max-w-2xl">
          <div className="flex flex-col items-center gap-2">
            <Spinner size="sm" />
            <span className="text-caption text-foreground-muted">Small</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Spinner size="md" />
            <span className="text-caption text-foreground-muted">Medium</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Spinner size="lg" />
            <span className="text-caption text-foreground-muted">Large</span>
          </div>
          <div className="flex items-center gap-3 p-4 bg-primary text-primary-foreground rounded-md">
            <Spinner size="md" />
            <span>Processing order...</span>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-8">
        <h2 className="text-heading-2 border-b border-[var(--border)] pb-2 max-w-2xl">Progress</h2>

        <div className="flex flex-col gap-6 max-w-xl">
          <Progress value={0} label="0% Progress" />
          <Progress value={45} label="Partial progress (45%)" />
          <Progress value={100} label="Completed (100%)" />
          <Progress value={72} label="File upload" showValue />
          <Progress value={-50} label="Below zero clamping test" />
          <Progress value={150} max={100} label="Above maximum clamping test" showValue />
        </div>
      </section>

      <section className="flex flex-col gap-8">
        <h2 className="text-heading-2 border-b border-[var(--border)] pb-2 max-w-2xl">Skeletons</h2>

        <div className="flex flex-col gap-4 max-w-md p-4 border border-[var(--border)] rounded-[var(--radius-lg)]">
          <div className="flex items-center gap-4">
            <Skeleton variant="circle" />
            <div className="flex flex-col gap-2 flex-1">
              <Skeleton variant="text" className="w-3/4" />
              <Skeleton variant="text" className="w-1/2" />
            </div>
          </div>
          <Skeleton variant="rectangle" className="h-32 mt-2" />
        </div>
      </section>

      <section className="flex flex-col gap-8">
        <h2 className="text-heading-2 border-b border-[var(--border)] pb-2 max-w-2xl">Empty State</h2>

        <EmptyState
          title="No saved Vibes yet"
          description="When you save a Vibe, it will appear here so you can easily access it later."
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
          }
          action={<Button variant="primary">Discover Vibes</Button>}
        />
      </section>

      <section className="flex flex-col gap-8">
        <h2 className="text-heading-2 border-b border-[var(--border)] pb-2 max-w-2xl">Error State</h2>

        <ErrorState
          title="Recommendations could not be loaded"
          description="We encountered an unexpected issue while fetching your personalized recommendations. Please try again."
          action={<Button variant="outline">Try Again</Button>}
          details="Error: Failed to fetch (Network request failed)"
        />
      </section>

    </main>
  );
}
