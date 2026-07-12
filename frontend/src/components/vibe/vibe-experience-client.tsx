"use client";

import { useState } from "react";
import { VibeExperienceData, VibeRecommendation } from "./vibe-experience.data";
import { VibeExperienceHero } from "./vibe-experience-hero";
import { VibeExperienceActions } from "./vibe-experience-actions";
import { VibeJourneyOverview } from "./vibe-journey-overview";
import { VibeMediaSection } from "./vibe-media-section";
import { VibePrototypeFeedback } from "./vibe-prototype-feedback";

export interface VibeExperienceClientProps {
  experience: VibeExperienceData;
}

export function VibeExperienceClient({ experience }: VibeExperienceClientProps) {
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleUnavailableAction = (recommendation: VibeRecommendation) => {
    // Adding timestamp to force re-render/re-trigger of the effect if clicked repeatedly
    setFeedbackMessage(`Provider links are unavailable in this static prototype. (${recommendation.providerLabel})#${Date.now()}`);
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-5xl mx-auto">
      <VibeExperienceHero 
        experience={experience} 
        actions={<VibeExperienceActions />} 
      />
      
      <div className="px-4 md:px-8 flex flex-col w-full">
        <VibeJourneyOverview journeySummary={experience.journeySummary} />
        
        <div className="flex flex-col w-full">
          {experience.sections.map((section) => (
            <VibeMediaSection 
              key={section.id} 
              section={section} 
              onUnavailableAction={handleUnavailableAction} 
            />
          ))}
        </div>
      </div>

      <VibePrototypeFeedback message={feedbackMessage ? feedbackMessage.split('#')[0] : ""} />
    </div>
  );
}
