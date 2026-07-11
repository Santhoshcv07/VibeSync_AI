import { Button, IconButton } from "@/components/ui";

const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const HeartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

export default function ButtonPreviewPage() {
  return (
    <main className="page-container section-spacing flex flex-col gap-12 pb-24">
      <header className="flex flex-col gap-4">
        <h1 className="text-display-lg text-primary">Button Foundations</h1>
        <p className="text-body-lg text-foreground-muted">
          Internal VibeSync design-system preview
        </p>
      </header>

      <section className="flex flex-col gap-6">
        <h2 className="text-heading-2">Variants</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <Button variant="primary">Primary Action</Button>
          <Button variant="secondary">Secondary Action</Button>
          <Button variant="outline">Outline Action</Button>
          <Button variant="ghost">Ghost Action</Button>
          <Button variant="danger">Danger Action</Button>
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-heading-2">Sizes</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <Button size="sm">Small Button</Button>
          <Button size="md">Medium Button</Button>
          <Button size="lg">Large Button</Button>
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-heading-2">Icons & Full Width</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <Button leftIcon={<StarIcon />}>Left Icon</Button>
          <Button rightIcon={<HeartIcon />} variant="secondary">
            Right Icon
          </Button>
        </div>
        <div className="w-full max-w-sm mt-4">
          <Button fullWidth variant="outline">
            Full Width Button
          </Button>
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-heading-2">States</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <Button loading>Loading...</Button>
          <Button loading loadingText="Saving..." variant="secondary" />
          <Button disabled>Disabled Action</Button>
          <Button disabled variant="outline">
            Disabled Outline
          </Button>
        </div>
      </section>

      <hr className="border-[var(--border)] my-6" />

      <section className="flex flex-col gap-6">
        <h2 className="text-heading-2">Icon Buttons</h2>

        <div className="flex flex-col gap-4">
          <h3 className="text-heading-3">Variants</h3>
          <div className="flex flex-wrap gap-4 items-center">
            <IconButton variant="secondary" label="Favorite">
              <StarIcon />
            </IconButton>
            <IconButton variant="outline" label="Like">
              <HeartIcon />
            </IconButton>
            <IconButton variant="ghost" label="Save">
              <StarIcon />
            </IconButton>
            <IconButton variant="danger" label="Delete">
              <HeartIcon />
            </IconButton>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-heading-3">Sizes</h3>
          <div className="flex flex-wrap gap-4 items-center">
            <IconButton size="sm" label="Small Icon">
              <StarIcon />
            </IconButton>
            <IconButton size="md" label="Medium Icon">
              <StarIcon />
            </IconButton>
            <IconButton size="lg" label="Large Icon">
              <StarIcon />
            </IconButton>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-heading-3">States</h3>
          <div className="flex flex-wrap gap-4 items-center">
            <IconButton loading label="Loading Icon">
              <StarIcon />
            </IconButton>
            <IconButton disabled label="Disabled Icon">
              <HeartIcon />
            </IconButton>
          </div>
        </div>
      </section>
    </main>
  );
}
