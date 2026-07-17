"use client";

import { Activity, Target, Smile, Zap, Heart, Moon } from "lucide-react";

const MOODS = [
  { label: "Chill", percent: 32, icon: Activity, color: "bg-blue-500/20", barColor: "bg-blue-400" },
  { label: "Focus", percent: 24, icon: Target, color: "bg-sky-500/20", barColor: "bg-sky-400" },
  { label: "Happy", percent: 18, icon: Smile, color: "bg-pink-500/20", barColor: "bg-pink-400" },
  { label: "Energetic", percent: 14, icon: Zap, color: "bg-purple-500/20", barColor: "bg-purple-400" },
  { label: "Romantic", percent: 7, icon: Heart, color: "bg-rose-500/20", barColor: "bg-rose-400" },
  { label: "Low", percent: 5, icon: Moon, color: "bg-indigo-500/20", barColor: "bg-indigo-400" },
];

export function ProfileTopMoods() {
  return (
    <div className="flex flex-col gap-4 rounded-[20px] border border-white/[0.06] bg-[#0D1220] p-4 shadow-[0_10px_40px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-[2px] hover:border-white/[0.1]">
      <div className="flex items-center justify-between px-2 pt-2">
        <h3 className="text-[22px] font-bold text-white">Your Top Moods</h3>
        <button className="text-[13px] font-semibold text-white/60 hover:text-white transition-colors">
          View all
        </button>
      </div>

      <div className="flex flex-col gap-4 mt-2">
        {MOODS.map((mood) => (
          <div key={mood.label} className="flex items-center gap-4 px-2">
            <div className={`flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full ${mood.color}`}>
              <mood.icon className={`h-4 w-4 ${mood.barColor.replace('bg-', 'text-')}`} />
            </div>
            
            <div className="w-[100px] text-[14px] text-white/90 font-medium">
              {mood.label}
            </div>

            <div className="flex-1 flex items-center">
              <div className="h-[8px] w-full overflow-hidden rounded-full bg-white/5">
                <div 
                  className={`h-full rounded-full ${mood.barColor}`} 
                  style={{ width: `${mood.percent}%` }} 
                />
              </div>
            </div>

            <div className="w-10 text-right text-[15px] text-white/60">
              {mood.percent}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
