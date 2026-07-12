import { MarketingHeader, MarketingFooter } from "@/components/marketing";
import {
  LandingHero,
  EntertainmentCategoryStrip,
  HowVibeSyncWorks,
  TimeAwareExperience,
  MoodShowcase,
  RecommendationShowcase,
  SocialProof,
  LandingFinalCta,
} from "@/components/landing";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--background)] text-foreground overflow-x-hidden">
      <a
        href="#landing-main-content"
        className="fixed top-0 left-0 p-4 -translate-y-full focus:translate-y-0 z-50 bg-[var(--primary)] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--focus-ring)] transition-transform"
      >
        Skip to content
      </a>

      <MarketingHeader />
      
      <main id="landing-main-content" className="flex-1 flex flex-col w-full focus:outline-none" tabIndex={-1}>
        <LandingHero />
        <EntertainmentCategoryStrip />
        <HowVibeSyncWorks />
        <TimeAwareExperience />
        <MoodShowcase />
        <RecommendationShowcase />
        <SocialProof />
        <LandingFinalCta />
      </main>

      <MarketingFooter />
    </div>
  );
}

