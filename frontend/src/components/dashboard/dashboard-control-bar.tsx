"use client";

import { useState } from "react";

import { generateVibe } from "@/lib/api/vibes";
import { ApiError } from "@/lib/api/errors";
import { VibeExperienceData } from "@/components/vibe/vibe-experience.data";
import { VibeMood } from "@/components/generate/generate-vibe.types";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface DashboardControlBarProps {
  onGenerateStart: () => void;

  onGenerateComplete: (
    data: VibeExperienceData | null,
    error: string | null,
    context: Record<string, unknown> | null
  ) => void;

  isGenerating: boolean;
  error?: string | null;
}

export function DashboardControlBar({
  onGenerateStart,
  onGenerateComplete,
  isGenerating,
  error,
}: DashboardControlBarProps) {
  const [mood, setMood] = useState<VibeMood | "">("");
  const [activity, setActivity] = useState("");
  const [time, setTime] = useState("");
  const [energy, setEnergy] = useState("");

  const handleGenerate = async () => {
    if (!mood) {
      onGenerateComplete(
        null,
        "Please select how you are feeling.",
        null
      );

      return;
    }

    onGenerateStart();

    const context =
      `Doing: ${activity || "anything"}, ` +
      `Time: ${time || "any time"}, ` +
      `Energy: ${energy || "any"}`;

    try {
      const response = await generateVibe({
        mood: mood as VibeMood,
        context,
      });

      onGenerateComplete(response.data, null, {
        mood,
        activity,
        time,
        energy,
      });
    } catch (err) {
      if (
        err instanceof ApiError &&
        err.code === "VALIDATION_ERROR" &&
        err.details &&
        err.details.length > 0
      ) {
        const message = err.details
          .map(
            (detail) =>
              `${detail.field}: ${detail.message}`
          )
          .join(", ");

        onGenerateComplete(
          null,
          `Validation error - ${message}`,
          null
        );
      } else if (
        err instanceof ApiError &&
        err.message
      ) {
        onGenerateComplete(
          null,
          err.message,
          null
        );
      } else {
        onGenerateComplete(
          null,
          "Failed to generate your vibe. Please try again.",
          null
        );
      }
    }
  };

 const selectClassName = `
    h-12
    w-full
    rounded-lg
    border
    border-white/[0.14]
    bg-white/[0.08]
    px-4
    text-sm
    text-white
    shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]
    outline-none
    backdrop-blur-md
    transition-all
    duration-200
    hover:border-white/[0.22]
    hover:bg-white/[0.12]
    focus:border-violet-300/70
    focus:bg-white/[0.12]
    focus:ring-2
    focus:ring-violet-400/20
    [&>option]:bg-[#170b2b]
    [&>option]:text-white
  `;

  return (
    <div
      className="
        relative
        w-full
        overflow-hidden
        rounded-xl
        border
        border-[#8870c4]/35
       bg-white/[0.055]
        px-5
        py-4
        shadow-[0_18px_55px_rgba(4,2,25,0.28)]
       backdrop-blur-md
        md:px-6
      "
    >
      {/* Soft pink glow */}
      <div
        className="
          pointer-events-none
          absolute
          -top-28
          left-[20%]
          h-52
          w-[50%]
          rounded-full
          bg-fuchsia-500/15
          blur-[85px]
        "
      />

      {/* Soft blue glow */}
      <div
        className="
          pointer-events-none
          absolute
          -bottom-28
          right-0
          h-44
          w-72
          rounded-full
          bg-blue-500/10
          blur-[80px]
        "
      />

      <div
        className="
          relative
          z-10
          flex
          w-full
          flex-col
          items-stretch
          gap-5
          xl:flex-row
          xl:items-end
        "
      >
        {/* Dropdown controls */}
        <div
          className="
            grid
            min-w-0
            flex-1
            grid-cols-1
            gap-4
            sm:grid-cols-2
            xl:grid-cols-4
            xl:gap-0
          "
        >
          {/* Mood */}
          <div className="min-w-0 xl:border-r xl:border-white/10 xl:pr-5">
            <Select
              value={mood}
              onChange={(event) =>
                setMood(
                  event.target.value as VibeMood
                )
              }
              label="I'm feeling"
              className={selectClassName}
            >
              <option value="" disabled>
                Select mood...
              </option>

              <option value="chill">
                😔 Calm & Nostalgic
              </option>

              <option value="focus">
                🤓 Focused
              </option>

              <option value="happy">
                😀 Happy
              </option>

              <option value="energetic">
                ⚡ Energetic
              </option>

              <option value="romantic">
                ❤️ Romantic
              </option>
            </Select>
          </div>

          {/* Activity */}
          <div className="min-w-0 xl:border-r xl:border-white/10 xl:px-5">
            <Select
              value={activity}
              onChange={(event) =>
                setActivity(event.target.value)
              }
              label="Doing"
              className={selectClassName}
            >
              <option value="" disabled>
                Select activity...
              </option>

              <option value="Relaxing">
                ☕ Relaxing
              </option>

              <option value="Working">
                💻 Working
              </option>

              <option value="Studying">
                📚 Studying
              </option>

              <option value="Exercising">
                🏃 Exercising
              </option>

              <option value="Commuting">
                🚗 Commuting
              </option>
            </Select>
          </div>

          {/* Time */}
          <div className="min-w-0 xl:border-r xl:border-white/10 xl:px-5">
            <Select
              value={time}
              onChange={(event) =>
                setTime(event.target.value)
              }
              label="For"
              className={selectClassName}
            >
              <option value="" disabled>
                Select time...
              </option>

              <option value="15 min">
                ⏱️ 15 min
              </option>

              <option value="30 min">
                ⏱️ 30 min
              </option>

              <option value="1 hour">
                ⏱️ 1 hour
              </option>

              <option value="2+ Hours">
                🕓 2+ Hours
              </option>

              <option value="All Night">
                🌙 All Night
              </option>
            </Select>
          </div>

          {/* Energy */}
          <div className="min-w-0 xl:pl-5">
            <Select
              value={energy}
              onChange={(event) =>
                setEnergy(event.target.value)
              }
              label="Energy Level"
              className={selectClassName}
            >
              <option value="" disabled>
                Select energy...
              </option>

              <option value="Low">
                ⚡ Low
              </option>

              <option value="Medium">
                ⚡ Medium
              </option>

              <option value="High">
                ⚡ High
              </option>
            </Select>
          </div>
        </div>

        {/* Generate button */}
        <div className="w-full shrink-0 xl:w-[230px]">
          <Button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating}
            className="
              h-12
              w-full
              rounded-lg
              border
              border-white/20
              bg-linear-to-r
              from-[#a855f7]
              via-[#d946ef]
              to-[#ec4899]
              px-7
              text-sm
              font-semibold
              text-white
              shadow-[0_0_28px_rgba(217,70,239,0.32)]
              transition-all
              duration-300
              hover:scale-[1.015]
              hover:brightness-110
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {isGenerating
              ? "✨ Creating Your Vibe..."
              : "✨ Generate My Vibe"}
          </Button>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="relative z-10 mt-4 rounded-lg border border-red-400/20 bg-red-500/10 px-4 py-2.5">
          <p className="text-sm text-red-300">
            {error}
          </p>
        </div>
      )}
    </div>
  );
}