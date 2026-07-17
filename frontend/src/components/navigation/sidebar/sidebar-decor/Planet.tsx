"use client";

interface PlanetProps {
  glowIntensity?: number;
}

export function Planet({ glowIntensity = 1 }: PlanetProps) {
  return (
    <div className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] pointer-events-none z-20">
      
      {/* Massive Cinematic Bloom */}
      <div 
        className="absolute inset-0 bg-purple-600/30 blur-[80px] rounded-full mix-blend-screen transition-all duration-700 ease-out" 
        style={{ transform: `scale(${1 + (glowIntensity - 1) * 0.5})`, opacity: glowIntensity }} 
      />
      
      {/* The Animated Floating Group */}
      <div 
        className="relative w-full h-full flex items-center justify-center animate-planet-float"
        style={{ perspective: '800px', transformStyle: 'preserve-3d' }}
      >
        
        {/* Tilted Ring Container */}
        <div 
          className="absolute flex items-center justify-center"
          style={{ transform: 'rotateX(75deg) rotateY(-10deg)', transformStyle: 'preserve-3d' }}
        >
          {/* Main Ring */}
          <div 
            className="absolute w-[220px] h-[220px] rounded-full border-[2px] border-[#d8b4fe] animate-ring-rotate"
            style={{
              opacity: 0.6,
              boxShadow: '0 0 20px rgba(168,85,247,0.8), inset 0 0 20px rgba(168,85,247,0.8)'
            }}
          />
          {/* Inner Thick Ring Glow */}
          <div 
            className="absolute w-[190px] h-[190px] rounded-full border-[8px] border-[#a855f7] animate-ring-rotate"
            style={{
              opacity: 0.3,
              filter: 'blur(4px)',
              animationDirection: 'reverse'
            }}
          />
        </div>

        {/* Planet Sphere */}
        <div 
          className="absolute w-[110px] h-[110px] rounded-full"
          style={{
            background: 'radial-gradient(circle at 40% 30%, #e879f9 0%, #8b5cf6 50%, #0c0717 90%)',
            boxShadow: `
              inset -20px -20px 40px rgba(0,0,0,0.8), 
              inset 5px 5px 15px rgba(255,255,255,0.2),
              0 0 30px rgba(139,92,246,0.5)
            `,
            transform: 'translateZ(1px)', // Ensure it renders correctly with the 3D ring intersection
          }}
        />
      </div>
    </div>
  );
}
