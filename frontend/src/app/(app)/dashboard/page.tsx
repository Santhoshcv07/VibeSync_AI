"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardControlBar } from "@/components/dashboard/dashboard-control-bar";
import { DashboardResults } from "@/components/dashboard/dashboard-results";
import { VibeExperienceData } from "@/components/vibe/vibe-experience.data";

export type DashboardState = "initial" | "loading" | "success" | "error";

export default function DashboardPage() {
  const [dashboardState, setDashboardState] = useState<DashboardState>("initial");
  const [vibeData, setVibeData] = useState<VibeExperienceData | null>(null);
  const [selectedContext, setSelectedContext] = useState<Record<string, unknown> | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  return (
    <div className="flex flex-col min-h-screen bg-[#05020a] w-full text-white pb-24 overflow-x-hidden relative">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-fuchsia-900/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 px-6 md:px-10 pt-8 pb-12 flex flex-col max-w-[1600px] mx-auto w-full gap-6">
        <DashboardHeader />
        
        <DashboardControlBar 
          onGenerateStart={() => {
            setDashboardState("loading");
            setErrorMsg(null);
          }}
          onGenerateComplete={(data, error, context) => {
            setSelectedContext(context);
            if (data) {
              setVibeData(data);
              setDashboardState("success");
              setErrorMsg(null);
            } else {
              setDashboardState("error");
              setErrorMsg(error || "Failed to generate your vibe.");
            }
          }}
          isGenerating={dashboardState === "loading"}
          error={dashboardState === "error" ? errorMsg : null}
        />
        
        {/* Always render the results grid to maintain structure */}
        <div className="mt-2 animate-in fade-in duration-700 slide-in-from-bottom-8">
          <DashboardResults 
            vibe={vibeData} 
            context={selectedContext}
            dashboardState={dashboardState}
          />
        </div>
      </div>
    </div>
  );
}
