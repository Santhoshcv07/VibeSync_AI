import { Hero } from "@/components/generate/hero/hero";
import { GenerateVibeForm } from "@/components/generate";

export default function GeneratePage() {
  return (
    <div className="relative min-h-screen bg-[#050814] overflow-hidden">
      {/* Background Glows (Top Left & Right) */}
      <div className="pointer-events-none absolute left-0 top-0 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/20 blur-[150px]" />
      <div className="pointer-events-none absolute right-0 top-0 h-[800px] w-[800px] translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-600/20 blur-[150px]" />
      
      <div className="relative mx-auto w-[1180px] pt-8 pb-20 z-10">
        <Hero />
        
        <GenerateVibeForm />
      </div>
    </div>
  );
}
