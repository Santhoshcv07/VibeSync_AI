"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { VibePrototypeFeedback } from "./vibe-prototype-feedback";
import Link from "next/link";

export function VibeExperienceActions() {
  const [isSaved, setIsSaved] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackId, setFeedbackId] = useState(0);

  const handleSaveToggle = () => {
    setIsSaved(!isSaved);
    if (!isSaved) {
      setFeedbackMessage("Saved only in this page preview. Nothing was stored.");
    } else {
      setFeedbackMessage("Removed from this page preview. Nothing was stored.");
    }
    setFeedbackId(prev => prev + 1);
  };

  const handleCopyLink = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        setFeedbackMessage("Demo Vibe link copied.");
      } else {
        throw new Error("Clipboard API not available");
      }
    } catch {
      setFeedbackMessage("Copy is unavailable in this browser. You can copy the current page address manually.");
    }
    setFeedbackId(prev => prev + 1);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
        <Button 
          variant={isSaved ? "secondary" : "primary"} 
          size="lg" 
          className="w-full sm:w-auto font-semibold"
          onClick={handleSaveToggle}
        >
          {isSaved ? "Saved for this preview" : "Save Vibe"}
        </Button>
        <Button 
          variant="outline" 
          size="lg" 
          className="w-full sm:w-auto bg-[var(--surface)]/50 backdrop-blur-sm border-white/20 text-white hover:bg-[var(--surface)]/80"
          onClick={handleCopyLink}
        >
          Copy Share Link
        </Button>
      </div>
      <Button asChild variant="ghost" size="sm" className="w-fit text-white/70 hover:text-white px-0 hover:bg-transparent justify-start">
<Link href="/generate">
          Create Another Vibe
        </Link>
</Button>

      {/* Render feedback uniquely to force re-render if the same message is clicked twice */}
      <VibePrototypeFeedback key={feedbackId} message={feedbackMessage} />
    </div>
  );
}
