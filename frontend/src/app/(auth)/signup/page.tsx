import { SignupForm } from "@/components/auth/signup-form";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="w-full flex flex-col max-w-md mx-auto animate-fade-in">
      <div className="mb-8 w-full text-center lg:text-left">
        <span className="inline-block text-xs font-bold tracking-widest text-[var(--primary)] uppercase mb-3">
          CREATE YOUR VIBESYNC
        </span>
        <h1 className="text-heading-2 font-display font-semibold text-foreground mb-3">
          Create your account
        </h1>
        <p className="text-body text-foreground-muted">
          Save your favorite Vibes, revisit past experiences, and build entertainment around every mood.
        </p>
      </div>

      <SignupForm />

      <div className="mt-8 text-body-sm text-foreground-subtle text-center w-full">
        Already have an account?{" "}
        <Link 
          href="/login" 
          className="text-[var(--primary)] font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--focus-ring)] rounded-sm"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
