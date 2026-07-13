import { LoginForm } from "@/components/auth/login-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="w-full flex flex-col mx-auto animate-fade-in">
      <div className="mb-4 w-full text-center">
        <h1 className="text-2xl font-bold text-white mb-1">
          Welcome back ✨
        </h1>
        <p className="text-sm text-white/70">
          Continue building moments around your mood.
        </p>
      </div>

      <LoginForm />

      <div className="mt-5 text-sm text-white/60 text-center w-full">
        New to VibeSync AI?{" "}
        <Link 
          href="/signup" 
          className="text-white hover:text-white/80 font-medium hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8338ec] rounded-sm"
        >
          Create an account
        </Link>
      </div>
    </div>
  );
}
