"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardControlBar } from "@/components/dashboard/dashboard-control-bar";
import { DashboardResults } from "@/components/dashboard/dashboard-results";
import { VibeExperienceData } from "@/components/vibe/vibe-experience.data";
import { useCurrentVibe } from "@/components/vibe/current-vibe-provider";

export type DashboardState =
  | "initial"
  | "loading"
  | "success"
  | "error";

export default function DashboardPage() {
  const router = useRouter();

  const {
    currentVibe,
    setCurrentVibe,
  } = useCurrentVibe();

  const [dashboardState, setDashboardState] =
    useState<DashboardState>("initial");

  const [vibeData, setVibeData] =
    useState<VibeExperienceData | null>(null);

  const [selectedContext, setSelectedContext] =
    useState<Record<string, unknown> | null>(null);

  const [errorMsg, setErrorMsg] =
    useState<string | null>(null);

  useEffect(() => {
    if (currentVibe) {
      setVibeData(currentVibe);
      setDashboardState("success");
    }
  }, [currentVibe]);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#05020a] pb-24 text-white">

      {/* Mountain hero background */}
      <section className="relative w-full overflow-hidden">

        {/* Full mountain image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('/vibesync-mountain-bg.jpeg')",
          }}
        />

        {/* Dark overlay for readable text */}
        <div className="absolute inset-0 bg-[#05020a]/25" />

        {/* Purple atmosphere */}
        <div className="absolute inset-0 bg-linear-to-r from-[#090316]/35 via-transparent to-[#090316]/20" />

        {/* Smooth transition into dashboard */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-b from-transparent to-[#05020a]" />

        {/* Header and control bar */}
        <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-col gap-5 px-6 pb-16 pt-8 md:px-10">

          <DashboardHeader />

          <DashboardControlBar
            onGenerateStart={() => {
              setDashboardState("loading");
              setErrorMsg(null);
            }}

            onGenerateComplete={(
              data,
              error,
              context
            ) => {
              setSelectedContext(context);

              if (data) {
                setVibeData(data);
                setCurrentVibe(data);
                setDashboardState("success");
                setErrorMsg(null);
              } else {
                setDashboardState("error");

                setErrorMsg(
                  error ||
                    "Failed to generate your vibe."
                );
              }
            }}

            isGenerating={
              dashboardState === "loading"
            }

            error={
              dashboardState === "error"
                ? errorMsg
                : null
            }
          />
        </div>
      </section>

      {/* Dashboard recommendation content */}
      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 pb-12 md:px-10">

        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">

          <DashboardResults
            vibe={vibeData}
            context={selectedContext}
            dashboardState={dashboardState}
            onOpenVisualGallery={() =>
              router.push(
                "/dashboard/visuals"
              )
            }
          />

        </div>
      </div>
    </div>
  );
}