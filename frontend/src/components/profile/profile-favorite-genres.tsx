"use client";

import { Headphones, Sun, Guitar, Clapperboard, Moon, Mic2 } from "lucide-react";

const GENRES = [
  { label: "Lo-fi", percent: "32%", icon: Headphones, glow: "from-indigo-600/20 to-purple-600/20", iconColor: "text-purple-400" },
  { label: "Synthwave", percent: "22%", icon: Sun, glow: "from-fuchsia-600/20 to-pink-600/20", iconColor: "text-pink-400" },
  { label: "Indie", percent: "16%", icon: Guitar, glow: "from-orange-600/20 to-yellow-600/20", iconColor: "text-yellow-400" },
  { label: "Cinematic", percent: "14%", icon: Clapperboard, glow: "from-slate-600/20 to-gray-600/20", iconColor: "text-gray-300" },
  { label: "Ambient", percent: "9%", icon: Moon, glow: "from-blue-600/20 to-cyan-600/20", iconColor: "text-cyan-200" },
  { label: "Pop", percent: "7%", icon: Mic2, glow: "from-rose-600/20 to-red-600/20", iconColor: "text-rose-400" },
];

export function ProfileFavoriteGenres() {
  return (
    <div className="flex flex-col mt-6">
      <h3 className="text-[22px] font-bold text-white">Your Favorite Genres</h3>
      <p className="mt-1 text-[14px] text-white/60 leading-[1.6]">Based on your activity</p>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-6 gap-4">
        {GENRES.map((genre) => (
          <div 
            key={genre.label} 
            className="flex flex-col items-center justify-center h-[120px] rounded-[20px] border border-white/[0.06] bg-[#0D1220] shadow-[0_10px_40px_rgba(0,0,0,0.35)] relative overflow-hidden group cursor-pointer transition-all duration-300 hover:-translate-y-[2px] hover:border-white/[0.1]"
          >
            <div className={`absolute inset-0 bg-gradient-to-b ${genre.glow} opacity-50 group-hover:opacity-100 transition-opacity`} />
            
            <genre.icon className={`h-[36px] w-[36px] ${genre.iconColor} relative z-10 drop-shadow-[0_0_15px_currentColor]`} />
            
            <h4 className="mt-3 text-[16px] font-bold text-white relative z-10">{genre.label}</h4>
            <p className="mt-1 text-[14px] text-white/60 relative z-10 leading-none">{genre.percent}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
