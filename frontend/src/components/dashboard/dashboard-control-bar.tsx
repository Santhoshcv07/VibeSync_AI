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
  onGenerateComplete: (data: VibeExperienceData | null, error: string | null, context: Record<string, unknown> | null) => void;
  isGenerating: boolean;
  error?: string | null;
}

export function DashboardControlBar({ onGenerateStart, onGenerateComplete, isGenerating, error }: DashboardControlBarProps) {
  const [mood, setMood] = useState<VibeMood | "">("");
  const [activity, setActivity] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [energy, setEnergy] = useState<string>("");

  const handleGenerate = async () => {
    if (!mood) {
      onGenerateComplete(null, "Please select how you are feeling.", null);
      return;
    }
    
    onGenerateStart();
    
    // Map activity, time, energy to context safely
    const context = `Doing: ${activity || 'anything'}, Time: ${time || 'any time'}, Energy: ${energy || 'any'}`;
    
    try {
      const response = await generateVibe({
        mood: mood as VibeMood,
        context,
      });
      onGenerateComplete(response.data, null, { mood, activity, time, energy });
    } catch (err) {
      if (err instanceof ApiError && err.code === "VALIDATION_ERROR" && err.details && err.details.length > 0) {
        const msg = err.details.map(d => `${d.field}: ${d.message}`).join(", ");
        onGenerateComplete(null, `Validation error - ${msg}`, null);
      } else if (err instanceof ApiError && err.message) {
        onGenerateComplete(null, err.message, null);
      } else {
        onGenerateComplete(null, "Failed to generate your vibe. Please try again.", null);
      }
    }
  };

  return (
    <div className="w-full bg-[#150a29]/80 backdrop-blur-xl border border-[#37195c] rounded-2xl p-4 shadow-lg shadow-purple-900/10">
      <div className="flex flex-col xl:flex-row items-center gap-4">
        
        <div className="flex flex-col sm:flex-row items-center gap-4 flex-1 w-full xl:w-auto">
          {/* I'm feeling */}
          <div className="flex flex-col gap-1.5 w-full sm:flex-1">
            <Select 
              value={mood} 
              onChange={(e) => setMood(e.target.value as VibeMood)}
              className="bg-[#1c0f35] border-[#37195c] text-white"
              label="I'm feeling"
            >
              <option value="" disabled>Select mood...</option>
              <option value="chill">😔 Calm & Nostalgic</option>
              <option value="focus">🤓 Focused</option>
              <option value="happy">😀 Happy</option>
              <option value="energetic">⚡️ Energetic</option>
              <option value="romantic">❤️ Romantic</option>
            </Select>
          </div>

          {/* Doing */}
          <div className="flex flex-col gap-1.5 w-full sm:flex-1">
            <Select 
              value={activity} 
              onChange={(e) => setActivity(e.target.value)}
              className="bg-[#1c0f35] border-[#37195c] text-white"
              label="Doing"
            >
              <option value="" disabled>Select activity...</option>
              <option value="Relaxing">☕ Relaxing</option>
              <option value="Working">💻 Working</option>
              <option value="Studying">📚 Studying</option>
              <option value="Exercising">🏃 Exercising</option>
              <option value="Commuting">🚗 Commuting</option>
            </Select>
          </div>

          {/* For */}
          <div className="flex flex-col gap-1.5 w-full sm:flex-1">
            <Select 
              value={time} 
              onChange={(e) => setTime(e.target.value)}
              className="bg-[#1c0f35] border-[#37195c] text-white"
              label="For"
            >
              <option value="" disabled>Select time...</option>
              <option value="15 min">⏱️ 15 min</option>
              <option value="30 min">⏱️ 30 min</option>
              <option value="1 hour">⏱️ 1 hour</option>
              <option value="2+ Hours">🕓 2+ Hours</option>
              <option value="All Night">🌙 All Night</option>
            </Select>
          </div>

          {/* Energy Level */}
          <div className="flex flex-col gap-1.5 w-full sm:flex-1">
            <Select 
              value={energy} 
              onChange={(e) => setEnergy(e.target.value)}
              className="bg-[#1c0f35] border-[#37195c] text-white"
              label="Energy Level"
            >
              <option value="" disabled>Select energy...</option>
              <option value="Low">⚡ Low</option>
              <option value="Medium">⚡ Medium</option>
              <option value="High">⚡ High</option>
            </Select>
          </div>
        </div>

        {/* Generate Button */}
        <div className="w-full xl:w-auto mt-2 xl:mt-5 flex-shrink-0">
          <Button 
            onClick={handleGenerate} 
            disabled={isGenerating}
            className="w-full xl:w-auto h-10 px-8 bg-gradient-to-r from-[#e81cff] to-[#40c9ff] text-white font-semibold rounded-md border-0 hover:opacity-90 transition-opacity"
          >
            {isGenerating ? "Generating..." : "✨ Generate My Vibe"}
          </Button>
        </div>
      </div>
      {error && <p className="text-sm text-red-400 mt-3">{error}</p>}
    </div>
  );
}
