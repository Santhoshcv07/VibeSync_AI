"use client";

import { Input } from "@/components/ui/input";

export function DashboardHeader() {
  return (
    <div className="flex w-full flex-col items-start justify-between gap-4 md:flex-row md:items-center">
      {/* Greeting */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Good Evening, Arjun <span aria-hidden="true">👋</span>
        </h1>

        <p className="text-sm text-white/60 md:text-base">
          Let&apos;s build your perfect vibe
        </p>
      </div>

      {/* Search, notification and profile */}
      <div className="flex w-full items-center gap-4 md:w-auto">
        {/* Glass search bar */}
        <div className="relative w-full md:w-[360px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-white/45"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>

          <Input
            placeholder="Search for songs, movies, books, anything..."
            className="
              h-12
              w-full
              rounded-full
              border
              border-white/15
              bg-[#241344]/30
              pl-12
              pr-5
              text-sm
              text-white
              shadow-inner
              shadow-white/[0.03]
              outline-none
              backdrop-blur-sm
              transition-all
              duration-200
              placeholder:text-white/40
              hover:border-white/25
              hover:bg-[#35205c]/35
              focus-visible:border-violet-300/70
              focus-visible:bg-[#35205c]/40
              focus-visible:ring-2
              focus-visible:ring-violet-400/20
            "
          />
        </div>

        {/* Glass notification button */}
        <button
          type="button"
          aria-label="Notifications"
          className="
            flex
            h-12
            w-12
            shrink-0
            items-center
            justify-center
            rounded-full
            border
            border-white/15
            bg-[#241344]/30
            text-white/75
            shadow-inner
            shadow-white/[0.03]
            backdrop-blur-sm
            transition-all
            duration-200
            hover:border-violet-300/50
            hover:bg-[#35205c]/40
            hover:text-white
            focus:outline-none
            focus:ring-2
            focus:ring-violet-400/25
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
          </svg>
        </button>

        {/* Profile */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-sm font-bold shadow-lg shadow-purple-900/30">
          A
        </div>
      </div>
    </div>
  );
}