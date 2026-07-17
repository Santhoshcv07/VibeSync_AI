"use client";

export function Nebula() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">

      {/* Top Glow */}
      <div
        className="
          absolute
          left-1/2
          top-[-140px]
          h-[340px]
          w-[340px]
          -translate-x-1/2
          rounded-full
          bg-violet-500/10
          blur-[120px]
        "
      />

      {/* Left Glow */}
      <div
        className="
          absolute
          left-[-120px]
          top-[28%]
          h-[260px]
          w-[260px]
          rounded-full
          bg-indigo-500/8
          blur-[110px]
        "
      />

      {/* Right Glow */}
      <div
        className="
          absolute
          right-[-120px]
          bottom-[20%]
          h-[260px]
          w-[260px]
          rounded-full
          bg-fuchsia-500/8
          blur-[120px]
        "
      />

      {/* Vertical atmosphere */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,.015), transparent 20%, transparent 80%, rgba(255,255,255,.02))",
        }}
      />
    </div>
  );
}
