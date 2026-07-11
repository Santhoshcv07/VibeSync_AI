"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  MediaArtwork,
  MediaCard,
  MediaCardSkeleton,
  Button,
  Badge
} from "@/components/ui";

export default function CardsPreviewPage() {
  return (
    <main className="page-container section-spacing flex flex-col gap-16 pb-24">
      <header className="flex flex-col gap-4">
        <h1 className="text-display-lg text-primary">Card Foundations</h1>
        <p className="text-body-lg text-foreground-muted">
          Internal VibeSync design-system preview
        </p>
      </header>

      <section className="flex flex-col gap-8">
        <h2 className="text-heading-2 border-b border-[var(--border)] pb-2 max-w-4xl">Base Cards</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          <Card>
            <CardContent className="pt-6">
              <p className="text-body">Minimal default card.</p>
            </CardContent>
          </Card>

          <Card interactive>
            <CardHeader>
              <CardTitle>Interactive Card</CardTitle>
              <CardDescription>Hover over me to see the surface change.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-body">This card does not have semantic button behavior automatically.</p>
            </CardContent>
          </Card>

          <Card selected>
            <CardHeader>
              <CardTitle>Selected Card</CardTitle>
              <CardDescription>Visual state for active or chosen items.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-body">Primary border and subtle surface tint.</p>
            </CardContent>
            <CardFooter>
              <Button size="sm">Action</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Very Long Title That Should Wrap Properly Without Breaking the Card Layout</CardTitle>
              <CardDescription>A long description that verifies wrapping behavior when the text exceeds the container width to ensure readable comfortable line heights.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="flex flex-col gap-8">
        <h2 className="text-heading-2 border-b border-[var(--border)] pb-2 max-w-4xl">Media Artwork</h2>

        <div className="flex flex-wrap gap-6 items-start max-w-4xl">
          <div className="flex flex-col gap-2 w-48">
            <MediaArtwork src="/design-system/media-square.svg" alt="" aspect="square" />
            <span className="text-caption text-center text-foreground-muted">Square</span>
          </div>
          <div className="flex flex-col gap-2 w-64">
            <MediaArtwork src="/design-system/media-video.svg" alt="" aspect="video" />
            <span className="text-caption text-center text-foreground-muted">Video</span>
          </div>
          <div className="flex flex-col gap-2 w-40">
            <MediaArtwork src="/design-system/media-poster.svg" alt="" aspect="poster" />
            <span className="text-caption text-center text-foreground-muted">Poster</span>
          </div>
          <div className="flex flex-col gap-2 w-40">
            <MediaArtwork src="/design-system/media-book.svg" alt="" aspect="book" />
            <span className="text-caption text-center text-foreground-muted">Book</span>
          </div>
          <div className="flex flex-col gap-2 w-48">
            <MediaArtwork alt="Missing" fallbackLabel="No Cover Available" aspect="square" />
            <span className="text-caption text-center text-foreground-muted">Fallback</span>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-8">
        <h2 className="text-heading-2 border-b border-[var(--border)] pb-2 max-w-6xl">Vertical Media Cards</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <MediaCard
            title="Minimal Layout"
            artwork={<MediaArtwork src="/design-system/media-square.svg" alt="" />}
          />

          <MediaCard
            title="Full Content Card"
            subtitle="Subtitle goes here"
            description="This is a description of the media item that can span multiple lines to test the line clamp."
            eyebrow="Category"
            badge={<Badge variant="primary" size="sm">New</Badge>}
            metadata={
              <>
                <span>2026</span>
                <span>•</span>
                <span>1h 45m</span>
              </>
            }
            actions={<Button size="sm">Play</Button>}
            artwork={<MediaArtwork src="/design-system/media-video.svg" alt="" aspect="video" />}
          />

          <MediaCard
            title="Selected Poster"
            subtitle="Author Name"
            selected
            artwork={<MediaArtwork src="/design-system/media-poster.svg" alt="" aspect="poster" />}
          />

          <MediaCard
            title="A Very Long Title That Needs To Wrap To Two Lines In The Card Header"
            subtitle="Fallback Artwork"
            artwork={<MediaArtwork alt="Missing" fallbackLabel="Image not found" />}
          />
        </div>
      </section>

      <section className="flex flex-col gap-8">
        <h2 className="text-heading-2 border-b border-[var(--border)] pb-2 max-w-4xl">Horizontal Media Cards</h2>

        <div className="flex flex-col gap-6 max-w-3xl">
          <MediaCard
            layout="horizontal"
            title="Standard Horizontal Card"
            subtitle="Subtitle text"
            description="A horizontal layout is great for list views where you want to show more metadata alongside the artwork."
            artwork={<MediaArtwork src="/design-system/media-video.svg" alt="" aspect="video" />}
          />

          <MediaCard
            layout="horizontal"
            title="Horizontal with Actions"
            subtitle="Author Name"
            metadata={
              <>
                <span>Article</span>
                <span>•</span>
                <span>5 min read</span>
              </>
            }
            actions={<Button size="sm">Read</Button>}
            footer="Added today"
            artwork={<MediaArtwork src="/design-system/media-square.svg" alt="" aspect="square" />}
          />

          <MediaCard
            layout="horizontal"
            selected
            title="Selected Horizontal Card"
            subtitle="Movie Title"
            artwork={<MediaArtwork src="/design-system/media-poster.svg" alt="" aspect="poster" />}
          />
        </div>
      </section>

      <section className="flex flex-col gap-8">
        <h2 className="text-heading-2 border-b border-[var(--border)] pb-2 max-w-6xl">Media Card Skeletons</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <MediaCardSkeleton layout="vertical" aspect="square" />
          <MediaCardSkeleton layout="vertical" aspect="poster" />
          <MediaCardSkeleton layout="vertical" aspect="video" />
        </div>

        <div className="flex flex-col gap-6 max-w-3xl mt-4">
          <MediaCardSkeleton layout="horizontal" aspect="video" />
          <MediaCardSkeleton layout="horizontal" aspect="square" />
        </div>
      </section>

    </main>
  );
}
