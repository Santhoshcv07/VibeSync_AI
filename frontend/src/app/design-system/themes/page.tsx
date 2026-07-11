"use client";

import { useState } from "react";
import {
  MoodThemeProvider,
  useMoodTheme,
  MoodThemeScope
} from "@/components/theme";
import { moodThemes, moodThemeMetadata } from "@/lib/mood-theme";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { MediaCard } from "@/components/ui/media-card";
import { MediaArtwork } from "@/components/ui/media-artwork";
import { Badge } from "@/components/ui/badge";
import { Alert } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";


function ThemeSwitcher() {
  const { theme, setTheme, resetTheme } = useMoodTheme();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h2 className="text-heading-3">Active Theme: {moodThemeMetadata[theme].label}</h2>
          <p className="text-body text-foreground-muted">{moodThemeMetadata[theme].description}</p>
        </div>
        <Button variant="outline" onClick={resetTheme}>Reset to Default</Button>
      </div>

      <div className="flex flex-wrap gap-3">
        {moodThemes.map((m) => (
          <Button
            key={m}
            variant={theme === m ? "primary" : "secondary"}
            onClick={() => setTheme(m)}
            aria-pressed={theme === m}
          >
            {moodThemeMetadata[m].label}
          </Button>
        ))}
      </div>
    </div>
  );
}

function ComponentPreview() {
  return (
    <div className="space-y-8 p-6 sm:p-8 rounded-xl border border-border bg-[var(--surface)] mood-theme-transition">
      <div className="space-y-2">
        <h3 className="text-heading-2">Section Header</h3>
        <p className="text-body text-foreground-muted">Neutral preview content for demonstrating the active mood theme.</p>
      </div>

      <div className="flex flex-wrap gap-4">
        <Button variant="primary">Primary Action</Button>
        <Button variant="secondary">Secondary Action</Button>
        <Button variant="outline">Outline Action</Button>
      </div>

      <div className="max-w-md">
        <label className="text-label block mb-2">Example Input</label>
        <Input placeholder="Type something..." />
      </div>

      <div className="flex flex-wrap gap-4">
        <Badge variant="neutral">Default</Badge>
        <Badge variant="primary">Primary</Badge>
        <Badge variant="info">Info</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="danger">Danger</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Alert variant="neutral" title="Information">
          This is a standard informational alert.
        </Alert>
        <Alert variant="success" title="Success">
          The operation completed successfully.
        </Alert>
        <Alert variant="warning" title="Warning">
          Please review your configuration.
        </Alert>
        <Alert variant="danger" title="Error">
          A critical error occurred.
        </Alert>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Standard Card</CardTitle>
            <CardDescription>A basic content container.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-body-sm">The background and borders should adapt cleanly to the current mood.</p>
          </CardContent>
          <CardFooter>
            <Button variant="secondary" size="sm" fullWidth>Action</Button>
          </CardFooter>
        </Card>

        <MediaCard
          artwork={<MediaArtwork src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" alt="Abstract landscape" aspect="video" />}
          title="Media Content"
          description="Visual content demonstration."
        />
      </div>

      <div className="space-y-2">
        <label className="text-label">Progress</label>
        <Progress value={65} aria-label="Example progress" />
      </div>
    </div>
  );
}

function ThemeGallery() {
  return (
    <div className="space-y-6">
      <h3 className="text-heading-3">Theme Gallery</h3>
      <p className="text-body text-foreground-muted">Independent scopes using `MoodThemeScope`.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {moodThemes.map((m) => (
          <MoodThemeScope key={m} theme={m} className="p-5 rounded-xl border border-border flex flex-col gap-4">
            <div>
              <div className="text-title-md font-bold mb-1">{moodThemeMetadata[m].label}</div>
              <div className="text-caption text-foreground-subtle">{moodThemeMetadata[m].description}</div>
            </div>

            <div className="flex gap-2">
              <div className="w-8 h-8 rounded-full bg-[var(--primary)] shadow-sm" title="Primary" />
              <div className="w-8 h-8 rounded-full bg-[var(--surface)] border border-border" title="Surface" />
              <div className="w-8 h-8 rounded-full bg-[var(--accent)] shadow-sm" title="Accent" />
            </div>

            <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
              <Badge variant="primary">Badge</Badge>
              <Button variant="primary" size="sm">Action</Button>
            </div>
          </MoodThemeScope>
        ))}
      </div>
    </div>
  );
}

function MotionPreview() {
  const [remountKey, setRemountKey] = useState(0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-heading-3">Motion Utilities</h3>
          <p className="text-body text-foreground-muted">Reusable motion classes that respect reduced-motion settings.</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => setRemountKey(k => k + 1)}>Replay Entrances</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6" key={remountKey}>
        <div className="p-6 bg-[var(--surface)] border border-border rounded-xl flex flex-col items-center justify-center gap-3 motion-fade-in">
          <div className="w-12 h-12 rounded-lg bg-[var(--primary)] opacity-80" />
          <span className="text-label">Fade In</span>
        </div>

        <div className="p-6 bg-[var(--surface)] border border-border rounded-xl flex flex-col items-center justify-center gap-3 motion-slide-up">
          <div className="w-12 h-12 rounded-lg bg-[var(--secondary)] opacity-80" />
          <span className="text-label">Slide Up</span>
        </div>

        <div className="p-6 bg-[var(--surface)] border border-border rounded-xl flex flex-col items-center justify-center gap-3 motion-scale-in">
          <div className="w-12 h-12 rounded-lg bg-[var(--accent)] opacity-80" />
          <span className="text-label">Scale In</span>
        </div>

        <div className="p-6 bg-[var(--surface)] border border-border rounded-xl flex flex-col items-center justify-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[var(--primary)] to-[var(--secondary)] motion-soft-float" />
          <span className="text-label">Soft Float</span>
        </div>

        <div className="p-6 bg-[var(--surface)] border border-border rounded-xl flex flex-col items-center justify-center gap-3 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/20 to-[var(--accent)]/20 motion-ambient" />
          <div className="relative w-12 h-12 rounded-lg border-2 border-[var(--primary)]" />
          <span className="text-label relative">Ambient</span>
        </div>
      </div>
    </div>
  );
}

export default function ThemesPage() {
  return (
    <div className="page-container section-spacing space-y-16">
      <div className="space-y-4">
        <h1 className="text-display-lg">Mood Theme & Motion Foundations</h1>
        <p className="text-title-lg text-foreground-muted">Internal VibeSync design-system preview</p>
      </div>

      <MoodThemeProvider persist={false}>
        <div className="space-y-12">
          <ThemeSwitcher />
          <ComponentPreview />
        </div>
      </MoodThemeProvider>

      <hr className="border-border" />

      <ThemeGallery />

      <hr className="border-border" />

      <MotionPreview />
    </div>
  );
}
