"use client";

import { Star, Music, Bookmark, Flame } from "lucide-react";

const ACHIEVEMENTS = [
  {
    title: "First Vibe",
    description: "Generated your first vibe",
    icon: Star,
    color: "text-blue-400",
    glow: "shadow-[0_0_15px_rgba(96,165,250,0.4)]",
    border: "border-blue-500/30",
  },
  {
    title: "Explorer",
    description: "Generated 10 vibes",
    icon: Music,
    color: "text-cyan-400",
    glow: "shadow-[0_0_15px_rgba(34,211,238,0.4)]",
    border: "border-cyan-500/30",
  },
  {
    title: "Collector",
    description: "Saved 25 bookmarks",
    icon: Bookmark,
    color: "text-pink-400",
    glow: "shadow-[0_0_15px_rgba(244,114,182,0.4)]",
    border: "border-pink-500/30",
  },
  {
    title: "Streak Master",
    description: "7 days in a row",
    icon: Flame,
    color: "text-orange-400",
    titleColor: "text-orange-400",
    glow: "shadow-[0_0_15px_rgba(251,146,60,0.4)]",
    border: "border-orange-500/30",
  },
];

export function ProfileAchievements() {
  return (
    <div className="flex flex-col gap-4 rounded-[20px] border border-white/[0.06] bg-[#0D1220] p-4 shadow-[0_10px_40px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-[2px] hover:border-white/[0.1]">
      <div className="flex items-center justify-between px-2 pt-2">
        <h3 className="text-[22px] font-bold text-white">Achievements</h3>
        <button className="text-[13px] font-semibold text-white/60 hover:text-white transition-colors">
          View all
        </button>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-4 px-2 pb-2">
        {ACHIEVEMENTS.map((ach) => (
          <div key={ach.title} className="flex flex-col items-center text-center h-full justify-start">
            
            <div className={`flex h-[72px] w-[72px] shrink-0 items-center justify-center ${ach.border} border rounded-[16px] mb-4 bg-white/[0.02] ${ach.glow}`}>
              <ach.icon className={`h-8 w-8 ${ach.color}`} />
            </div>
            
            <h4 className={`text-[13px] font-bold ${ach.titleColor || 'text-white'}`}>{ach.title}</h4>
            <p className="mt-1 text-[12px] leading-[1.6] text-white/60 max-w-[80px]">
              {ach.description}
            </p>

          </div>
        ))}
      </div>
    </div>
  );
}
