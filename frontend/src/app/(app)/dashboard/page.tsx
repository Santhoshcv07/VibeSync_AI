import { AppPageContainer, AppPageHeader } from "@/components/app";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  DashboardHero,
  MoodShortcuts,
  TimeShortcuts,
  ContinueVibePreview,
  RecentVibesPreview,
  EntertainmentUniverse,
} from "@/components/dashboard";

export default function DashboardPage() {
  return (
    <AppPageContainer>
      <AppPageHeader
        eyebrow="YOUR VIBE SPACE"
        title="Welcome to your Vibe space"
        description="Create an entertainment experience around how you feel and how much time you have."
        actions={
          <Button asChild variant="primary">
<Link href="/generate">
              Generate a Vibe
            </Link>
</Button>
        }
      />

      <div className="flex flex-col gap-12 md:gap-16 py-6">
        <DashboardHero />
        
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <div className="lg:w-3/5">
            <MoodShortcuts />
          </div>
          <div className="lg:w-2/5">
            <TimeShortcuts />
          </div>
        </div>
        
        <ContinueVibePreview />
        
        <RecentVibesPreview />
        
        <EntertainmentUniverse />
      </div>
    </AppPageContainer>
  );
}
