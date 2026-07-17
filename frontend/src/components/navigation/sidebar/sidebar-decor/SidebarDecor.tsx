"use client";

import { useState, useEffect } from "react";
import "./animations.css";
import { LightBeams } from "./LightBeams";
import { EnergyBeams } from "./EnergyBeams";
import { Stars } from "./Stars";
import { FloatingIcons } from "./FloatingIcons";
import { Planet } from "./Planet";

export function SidebarDecor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize globally so parallax works even when mouse is outside the sidebar
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <LightBeams />
      <EnergyBeams />
      <Stars mouseX={mousePos.x} mouseY={mousePos.y} />
      <FloatingIcons />
      <Planet glowIntensity={1 + Math.abs(mousePos.y) * 0.2 + Math.abs(mousePos.x) * 0.1} />
    </div>
  );
}
