"use client";

import { useMemo } from "react";

export function EnergyBeams() {
  const beams = useMemo(() => Array.from({ length: 4 }).map((_, i) => ({
    id: i,
    left: `${15 + ((i * 35) % 70)}%`,
    duration: 25 + (i * 5),
    delay: -((i * 15) % 30),
  })), []);

  return (
    <>
      {beams.map((beam) => (
        <div
          key={beam.id}
          className="absolute top-0 w-[2px] h-[35vh] animate-energy-fall mix-blend-screen"
          style={{
            left: beam.left,
            animationDuration: `${beam.duration}s`,
            animationDelay: `${beam.delay}s`,
            background: "linear-gradient(to bottom, transparent, rgba(168,85,247,0.9), rgba(34,211,238,0.9), transparent)",
            boxShadow: "0 0 20px rgba(34,211,238,0.5)"
          }}
        />
      ))}
    </>
  );
}
