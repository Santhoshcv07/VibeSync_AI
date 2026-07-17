"use client";

import {
  Music4,
  Headphones,
  Play,
  Film,
  ImageIcon,
} from "lucide-react";
import { useEffect, useState, useMemo } from "react";

export function SidebarPlanet() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const iconsList = useMemo(() => [
    <Music4 size={16} key="music" />,
    <Headphones size={16} key="headphones" />,
    <Film size={16} key="film" />,
    <Play size={16} key="play" />,
    <ImageIcon size={16} key="image" />,
    <img src="/icons/vibesync-logo.svg" width={18} height={18} alt="VibeSync" key="logo" />,
  ], []);

  const trails = useMemo(() => Array.from({ length: 6 }).map((_, i) => ({
    id: `trail-${i}`,
    left: `${15 + i * 13}%`,
    delay: `${i * 0.8}s`,
  })), []);

  const stars = useMemo(() => Array.from({ length: 22 }).map((_, i) => ({
    id: `star-${i}`,
    left: `${15 + Math.random() * 70}%`,
    top: `${-520 + i * 28}px`,
    size: Math.random() > 0.5 ? "2px" : "3px",
    duration: `${5 + Math.random() * 5}s, ${2 + Math.random() * 3}s`,
    delay: `${Math.random() * 6}s`,
  })), []);

  const fallingIcons = useMemo(() => Array.from({ length: 12 }).map((_, i) => {
    const isLogo = Math.random() < 0.25;
    const iconIndex = isLogo ? 5 : Math.floor(Math.random() * 5);
    return {
      id: `icon-${i}`,
      iconIndex,
      left: `${18 + Math.random() * 64}%`,
      top: `${-700 + i * 80}px`,
      duration: `${12 + Math.random() * 10}s`,
      delay: `${Math.random() * 12}s`,
      scale: 0.75 + Math.random() * 0.5,
      opacity: 0.45 + Math.random() * 0.4,
    };
  }), []);

  return (
    <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-[78px]">
      
      {/* Nebula Background */}
      <div
        className="absolute pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 30% 20%, rgba(168,85,247,.10), transparent 45%),
            radial-gradient(circle at 80% 55%, rgba(99,102,241,.08), transparent 45%),
            radial-gradient(circle at 50% 90%, rgba(236,72,153,.06), transparent 40%)
          `,
          transform: `translate(${mousePos.x * 3}px, ${mousePos.y * 3}px)`,
          width: "280px",
          height: "800px",
          left: "-100px",
          top: "-600px",
        }}
      />

      {/* Light trails */}
      {trails.map((trail) => (
        <div
          key={trail.id}
          className="absolute top-0 w-px animate-trail"
          style={{
            left: trail.left,
            height: "100%",
            background:
              "linear-gradient(to bottom, transparent, rgba(168,85,247,.35), transparent)",
            animationDelay: trail.delay,
            animationDuration: "7s",
          }}
        />
      ))}

      {/* Falling stars */}
      <div className="absolute inset-0" style={{ transform: `translate(${mousePos.x * 5}px, ${mousePos.y * 5}px)` }}>
        {stars.map((star) => (
          <span
            key={star.id}
            className="absolute rounded-full bg-violet-200 animate-star animate-twinkle"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              animation: `starFall linear infinite, twinkle ease-in-out infinite`,
              animationDuration: star.duration,
              animationDelay: star.delay,
              filter: "drop-shadow(0 0 6px rgba(167,139,250,.8))",
            }}
          />
        ))}
      </div>

      {/* Falling icons */}
      <div className="absolute inset-0" style={{ transform: `translate(${mousePos.x * 8}px, ${mousePos.y * 8}px)` }}>
        {fallingIcons.map((icon) => (
          <div
            key={icon.id}
            className="absolute flex items-center justify-center rounded-full bg-[#1a1730]/80 border border-violet-500/20 text-violet-300 backdrop-blur-md animate-icon-fall transition-all duration-500 hover:scale-125 hover:text-fuchsia-300"
            style={{
              left: icon.left,
              top: icon.top,
              width: "30px",
              height: "30px",
              animationDuration: icon.duration,
              animationDelay: icon.delay,
              transform: `scale(${icon.scale})`,
              opacity: icon.opacity,
              boxShadow: "0 0 18px rgba(168,85,247,.25)",
            }}
          >
            {iconsList[icon.iconIndex]}
          </div>
        ))}
      </div>

      {/* Planet Area */}
      <div className="relative h-[78px] w-[78px]" style={{ transform: `translate(${mousePos.x * 12}px, ${mousePos.y * 12}px)` }}>
        {/* glow */}
        <div className="absolute inset-0 scale-150 rounded-full bg-violet-500/30 blur-3xl" />

        {/* ring */}
        <div
          className="
            absolute
            left-1/2
            top-1/2
            h-[95px]
            w-[140px]
            rounded-full
            border
            border-violet-300/60
            animate-orbit
          "
          style={{
            boxShadow: "0 0 24px rgba(168,85,247,.28)",
          }}
        />

        {/* planet glow layer */}
        <div className="absolute h-[150px] w-[150px] rounded-full bg-violet-500/25 blur-[70px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

        {/* planet */}
        <div
          className="
            absolute
            inset-0
            rounded-full
            animate-planet
            bg-gradient-to-br
            from-fuchsia-400
            via-violet-500
            to-indigo-700
          "
        />
      </div>

    </div>
  );
}
