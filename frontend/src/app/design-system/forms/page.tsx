"use client";

import { Input, Textarea, Select, Checkbox, Radio, Switch, Button } from "@/components/ui";

export default function FormsPreviewPage() {
  return (
    <main className="page-container section-spacing flex flex-col gap-12 pb-24">
      <header className="flex flex-col gap-4">
        <h1 className="text-display-lg text-primary">Form Foundations</h1>
        <p className="text-body-lg text-foreground-muted">
          Internal VibeSync design-system preview
        </p>
      </header>

      <section className="flex flex-col gap-8 max-w-lg">
        <h2 className="text-heading-2 border-b border-[var(--border)] pb-2">Input</h2>

        <div className="flex flex-col gap-6">
          <Input placeholder="Default input" />
          <Input
            label="Username"
            placeholder="Enter your username"
          />
          <Input
            label="Email Address"
            type="email"
            placeholder="name@example.com"
            helperText="We'll never share your email with anyone else."
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            required
          />
          <Input
            label="API Key"
            placeholder="sk_..."
            error="API key has expired."
          />
          <Input
            label="Project Name"
            placeholder="Disabled input"
            disabled
          />
        </div>
      </section>

      <section className="flex flex-col gap-8 max-w-lg">
        <h2 className="text-heading-2 border-b border-[var(--border)] pb-2">Textarea</h2>

        <div className="flex flex-col gap-6">
          <Textarea placeholder="Default textarea" />
          <Textarea
            label="Bio"
            placeholder="Tell us a little bit about yourself"
            helperText="Maximum 500 characters."
          />
          <Textarea
            label="Feedback"
            error="Please enter at least 10 characters."
          />
          <Textarea
            label="Notes"
            placeholder="Disabled textarea"
            disabled
          />
        </div>
      </section>

      <section className="flex flex-col gap-8 max-w-lg">
        <h2 className="text-heading-2 border-b border-[var(--border)] pb-2">Select</h2>

        <div className="flex flex-col gap-6">
          <Select defaultValue="">
            <option value="" disabled>Default select</option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
          </Select>
          <Select label="Country" helperText="Select your country of residence.">
            <option value="" disabled selected>Select a country</option>
            <option value="us">United States</option>
            <option value="ca">Canada</option>
            <option value="uk">United Kingdom</option>
          </Select>
          <Select label="Role" error="Please select a role.">
            <option value="" disabled selected>Select a role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </Select>
          <Select label="Theme" disabled>
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </Select>
        </div>
      </section>

      <section className="flex flex-col gap-8 max-w-lg">
        <h2 className="text-heading-2 border-b border-[var(--border)] pb-2">Checkbox</h2>

        <div className="flex flex-col gap-6">
          <Checkbox label="Default checkbox" />
          <Checkbox label="Checked checkbox" defaultChecked />
          <Checkbox
            label="Subscribe to newsletter"
            description="Get weekly updates on new features and releases."
          />
          <Checkbox
            label="I agree to the Terms of Service"
            required
          />
          <Checkbox
            label="Accept Privacy Policy"
            error="You must accept the privacy policy to continue."
          />
          <Checkbox
            label="Disabled checkbox"
            disabled
          />
        </div>
      </section>

      <section className="flex flex-col gap-8 max-w-lg">
        <h2 className="text-heading-2 border-b border-[var(--border)] pb-2">Radio</h2>

        <div className="flex flex-col gap-4">
          <Radio
            name="plan"
            value="free"
            label="Free Plan"
            defaultChecked
          />
          <Radio
            name="plan"
            value="pro"
            label="Pro Plan"
            description="$9.99/month, billed annually."
          />
          <Radio
            name="plan"
            value="enterprise"
            label="Enterprise Plan"
            disabled
          />
        </div>
      </section>

      <section className="flex flex-col gap-8 max-w-lg">
        <h2 className="text-heading-2 border-b border-[var(--border)] pb-2">Switch</h2>

        <div className="flex flex-col gap-6">
          <Switch label="Default switch (Off)" />
          <Switch label="Checked switch (On)" defaultChecked />
          <Switch
            label="Enable Notifications"
            description="Receive push notifications when someone mentions you."
          />
          <Switch
            label="Disabled switch"
            disabled
          />
        </div>
      </section>

      <section className="flex flex-col gap-8 max-w-lg pt-6 border-t border-[var(--border)] mt-8">
        <Button>Submit Form Demo</Button>
      </section>

    </main>
  );
}
