import { SignupForm } from "@/components/auth/signup-form";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="w-full flex flex-col mx-auto animate-fade-in">
      <div className="mb-4 w-full text-center">
        <h1 className="text-2xl font-bold text-white mb-1">
          Create your account ✨
        </h1>
        <p className="text-sm text-white/70">
          Start your personalized entertainment journey.
        </p>
      </div>

      <SignupForm />

      <div className="mt-5 text-sm text-white/60 text-center w-full">
        Already have an account?{" "}
        <Link 
          href="/login" 
          className="text-white hover:text-white/80 font-medium hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8338ec] rounded-sm"
        >
          Log in
        </Link>
      </div>
    </div>
  );
}
