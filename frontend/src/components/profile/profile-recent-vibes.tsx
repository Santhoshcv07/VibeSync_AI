"use client";

import { Play } from "lucide-react";
import Image from "next/image";

const RECENT_VIBES = [
  {
    title: "Midnight Reset",
    mood: "Chill",
    time: "1 hour ago",
    match: "92%",
    image: "/vibe_cyber_room.png"
  },
  {
    title: "Sunlit Drive",
    mood: "Happy",
    time: "3 hours ago",
    match: "91%",
    image: "/vibe_sunset_highway.png"
  },
  {
    title: "Deep Work Signal",
    mood: "Focus",
    time: "Yesterday",
    match: "90%",
    image: "/vibe_cozy_bedroom.png"
  },
  {
    title: "Violet Date Night",
    mood: "Romantic",
    time: "2 days ago",
    match: "93%",
    image: "/vibe_rainy_city.png"
  },
];

export function ProfileRecentVibes() {
  return (
    <div className="flex flex-col gap-4 rounded-[20px] border border-white/[0.06] bg-[#0D1220] p-4 shadow-[0_10px_40px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-[2px] hover:border-white/[0.1]">
      <div className="flex items-center justify-between px-2 pt-2">
        <h3 className="text-[22px] font-bold text-white">Recently Played Vibes</h3>
        <button className="text-[13px] font-semibold text-white/60 transition-colors hover:text-white">
          View all
        </button>
      </div>

      <div className="flex flex-col gap-2 mt-2">
        {RECENT_VIBES.map((vibe, i) => (
          <div 
            key={i} 
            className="group relative flex cursor-pointer items-center gap-4 rounded-[16px] border border-transparent p-2 transition-all duration-200 hover:bg-white/[0.04]"
          >
            
            <div className="relative h-[60px] w-[60px] shrink-0 overflow-hidden rounded-[12px] transition-all duration-200 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              <Image 
                src={vibe.image} 
                alt={vibe.title} 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-105" 
              />
            </div>
            
            <div className="flex flex-1 flex-col justify-center">
              <h4 className="text-[14px] font-bold text-white transition-colors duration-200 group-hover:text-fuchsia-400 leading-[1.6]">
                {vibe.title}
              </h4>
              <div className="mt-1 flex items-center">
                <span className="text-[13px] text-white/60">
                  {vibe.mood}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end justify-center pr-4 border-r border-white/10">
              <span className="text-[13px] text-white/60">{vibe.time}</span>
              <span className="text-[13px] font-bold text-[#22c55e] mt-0.5">{vibe.match} Match</span>
            </div>

            <div className="pl-4 pr-2 flex items-center justify-center">
              <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#1a1f35] transition-all duration-200 group-hover:scale-110 group-hover:border-fuchsia-500/50 group-hover:bg-fuchsia-500/10 group-hover:shadow-[0_0_12px_rgba(217,70,239,0.2)]">
                <Play className="ml-0.5 h-4 w-4 fill-white text-white transition-colors duration-200 group-hover:fill-fuchsia-400 group-hover:text-fuchsia-400" />
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
