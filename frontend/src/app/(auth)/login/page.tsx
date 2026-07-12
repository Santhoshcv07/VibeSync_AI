import { LoginForm } from "@/components/auth/login-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="w-full flex flex-col max-w-md mx-auto animate-fade-in">
      <div className="mb-8 w-full text-center lg:text-left">
        <span className="inline-block text-xs font-bold tracking-widest text-[var(--primary)] uppercase mb-3">
          WELCOME BACK
        </span>
        <h1 className="text-heading-2 font-display font-semibold text-foreground mb-3">
          Sign in to VibeSync
        </h1>
        <p className="text-body text-foreground-muted">
          Return to your saved Vibes, entertainment history, and personalized mood experiences.
        </p>
      </div>

      <LoginForm />

      <div className="mt-8 text-body-sm text-foreground-subtle text-center w-full">
        New to VibeSync?{" "}
        <Link 
          href="/signup" 
          className="text-[var(--primary)] font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--focus-ring)] rounded-sm"
        >
          Create an account
        </Link>
      </div>
    </div>
  );
}
