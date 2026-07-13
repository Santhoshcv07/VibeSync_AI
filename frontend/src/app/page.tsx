import { MarketingHeader, MarketingFooter } from "@/components/marketing";
import {
  LandingHero,
  PlatformRow,
  FeatureStrip,
  HowVibeSyncWorks,
} from "@/components/landing";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--background)] text-foreground overflow-x-hidden relative">
      {/* Mountain Background Image */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 w-full aspect-video bg-cover bg-top bg-no-repeat"
        style={{ backgroundImage: "url('/assets/bg-mountain.jpg')" }}
      >
        {/* Deep gradient overlay to blend into the rest of the site seamlessly */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#090314]/30 via-transparent to-[#090314]"></div>
      </div>

      <a
        href="#landing-main-content"
        className="fixed top-0 left-0 p-4 -translate-y-full focus:translate-y-0 z-50 bg-[var(--primary)] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--focus-ring)] transition-transform"
      >
        Skip to content
      </a>

      <MarketingHeader />
      
      <main id="landing-main-content" className="flex-1 flex flex-col w-full focus:outline-none" tabIndex={-1}>
        <LandingHero />
        <PlatformRow />
        <FeatureStrip />
        <div className="py-24 max-w-7xl mx-auto w-full px-4 md:px-8">
          <HowVibeSyncWorks />
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}
