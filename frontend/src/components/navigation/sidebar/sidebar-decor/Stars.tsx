"use client";

import { useMemo } from "react";

interface StarsProps {
  mouseX: number;
  mouseY: number;
}

export function Stars({ mouseX, mouseY }: StarsProps) {
  const stars = useMemo(() => Array.from({ length: 75 }).map((_, i) => ({
    id: i,
    left: `${(i * 23) % 100}%`,
    top: `${(i * 17) % 100}%`,
    size: (i % 3) + 1,
    duration: 2 + ((i * 3) % 4),
    delay: -((i * 5) % 10),
    depth: ((i % 3) + 1) * 1.5, 
  })), []);

  return (
    <>
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white animate-twinkle mix-blend-screen"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
            transform: `translate(${mouseX * star.depth}px, ${mouseY * star.depth}px)`,
            transition: 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            boxShadow: star.size > 1 ? `0 0 ${star.size * 2}px rgba(255,255,255,0.8)` : 'none'
          }}
        />
      ))}
    </>
  );
}
