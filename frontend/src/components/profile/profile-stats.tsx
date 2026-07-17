"use client";

import { Sparkles, ListMusic, Bookmark, Clock, Flame } from "lucide-react";

const STATS = [
  { label: "Vibes Generated", value: "128", icon: Sparkles, color: "text-fuchsia-400" },
  { label: "Playlists Created", value: "24", icon: ListMusic, color: "text-cyan-400" },
  { label: "Bookmarks Saved", value: "48", icon: Bookmark, color: "text-pink-400" },
  { label: "Hours Explored", value: "82", icon: Clock, color: "text-sky-400" },
  { label: "Days Streak", value: "7", icon: Flame, color: "text-orange-400" },
];

export function ProfileStats() {
  return (
    <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-[36px] rounded-[16px] bg-[#0A0D18] border border-[#1e2338] px-8 py-[20px]">
      {STATS.map((stat, i) => (
        <div key={i} className="flex items-center gap-4 flex-1">
          <stat.icon className={`h-[26px] w-[26px] ${stat.color}`} />
          <div className="flex flex-col">
            <p className="text-[22px] font-bold text-white leading-tight">{stat.value}</p>
            <p className="text-[12px] text-white/50">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
