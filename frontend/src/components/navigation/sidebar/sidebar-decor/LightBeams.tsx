"use client";

import { useMemo } from "react";

export function LightBeams() {
  // Deterministic random generation to avoid hydration mismatch
  const beams = useMemo(() => Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    left: `${(i * 17) % 100}%`,
    duration: 25 + ((i * 7) % 20),
    delay: -((i * 11) % 40),
    height: 10 + ((i * 19) % 30),
  })), []);

  return (
    <>
      {beams.map((beam) => (
        <div
          key={beam.id}
          className="absolute top-0 w-[1px] rounded-full bg-purple-500/15 animate-vertical-fall"
          style={{
            left: beam.left,
            height: `${beam.height}vh`,
            animationDuration: `${beam.duration}s`,
            animationDelay: `${beam.delay}s`,
            boxShadow: "0 0 8px rgba(168,85,247,0.4)"
          }}
        />
      ))}
    </>
  );
}
