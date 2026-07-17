"use client";

export function HeroContent() {
  return (
    <div className="flex max-w-[560px] flex-col justify-center">

      {/* Badge */}
      <span className="mb-5 text-[13px] font-semibold uppercase tracking-[0.34em] text-[#8B5CF6]">
        GENERATE YOUR VIBE
      </span>

      {/* Title */}
      <h1 className="max-w-[560px] text-[58px] font-extrabold leading-[1.02] tracking-[-0.045em] text-white">
        Build an experience
        <br />
        around your moment
      </h1>

      {/* Description */}
      <p className="mt-8 max-w-[520px] text-[19px] leading-[1.8] text-white/72">
        Choose the feeling you want your entertainment experience to match,
        then tell VibeSync how much time you have.
      </p>

    </div>
  );
}