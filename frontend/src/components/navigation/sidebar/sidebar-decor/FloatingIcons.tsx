"use client";

import { useMemo } from "react";
import { Music, Sparkles, Activity, Circle, Star, Disc } from "lucide-react";

const ICONS = [Music, Sparkles, Activity, Circle, Star, Disc];
const COLORS = ['text-purple-400', 'text-pink-400', 'text-blue-400', 'text-cyan-400'];

export function FloatingIcons() {
  const icons = useMemo(() => Array.from({ length: 12 }).map((_, i) => ({
    id: `icon-${i}`,
    Icon: ICONS[i % ICONS.length],
    color: COLORS[(i * 3) % COLORS.length],
    left: `${5 + ((i * 27) % 90)}%`,
    duration: 18 + ((i * 13) % 17),
    delay: -((i * 19) % 40),
    size: 10 + (i % 6),
    opacity: 0.4 + ((i % 5) * 0.1),
  })), []);

  const particles = useMemo(() => Array.from({ length: 30 }).map((_, i) => ({
    id: `particle-${i}`,
    left: `${(i * 19) % 100}%`,
    duration: 20 + ((i * 7) % 20),
    delay: -((i * 23) % 40),
    size: 2 + (i % 3),
    opacity: 0.3 + ((i % 4) * 0.1),
  })), []);

  return (
    <>
      {/* Floating Icons */}
      {icons.map((item) => (
        <div
          key={item.id}
          className={`absolute top-0 animate-vertical-fall ${item.color}`}
          style={{
            left: item.left,
            animationDuration: `${item.duration}s`,
            animationDelay: `${item.delay}s`,
            opacity: item.opacity,
            width: `${item.size}px`,
            height: `${item.size}px`,
            filter: 'drop-shadow(0 0 4px currentColor)'
          }}
        >
          <item.Icon size={item.size} />
        </div>
      ))}

      {/* Floating Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute top-0 rounded-full bg-purple-400 animate-vertical-fall mix-blend-screen"
          style={{
            left: particle.left,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
            opacity: particle.opacity,
            boxShadow: '0 0 8px rgba(168,85,247,0.8)'
          }}
        />
      ))}
    </>
  );
}
