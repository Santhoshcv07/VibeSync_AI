"use client";

import { useState } from "react";
import { VibeMediaSectionData } from "@/components/vibe/vibe-experience.data";

interface MusicSectionProps {
  section: VibeMediaSectionData | null;
  isInitial?: boolean;
  isLoading?: boolean;
  mood?: string;
  context?: string;
}

interface MusicItem {
  id: string;
  title: string;
  creator: string;
  imageUrl?: string;
  destinationUrl: string;
  duration?: string;
  matchScore?: number;
}

export function MusicSection({
  section,
  isInitial,
  isLoading,
  mood,
  context,
}: MusicSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [additionalMusic, setAdditionalMusic] = useState<MusicItem[]>([]);
  const [isLoadingAdditional, setIsLoadingAdditional] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const showSkeletons = isInitial || isLoading || !section;

  const allItems = showSkeletons
    ? Array(4).fill(null)
    : section.items;

  // Show four compact cards on dashboard
  const items = allItems.slice(0, 4);

  const handleSeeAll = async () => {
    setIsExpanded(true);

    // Do not request the same data every time
    if (additionalMusic.length > 0) {
      return;
    }

    setIsLoadingAdditional(true);
    setLoadError(null);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/v1/vibes/music/search?limit=16",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mood: mood || "chill",
            context,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Music request failed: ${response.status}`
        );
      }

      const result = await response.json();

      if (result.data && Array.isArray(result.data)) {
        setAdditionalMusic(result.data);
      } else {
        setAdditionalMusic([]);
      }
    } catch (error) {
      console.error(
        "Error fetching additional music:",
        error
      );

      setLoadError(
        "Failed to load more music. Please try again."
      );
    } finally {
      setIsLoadingAdditional(false);
    }
  };

  const expandedItems = [
    ...(section?.items ?? []),
    ...additionalMusic,
  ];

  return (
    <>
      {/* Main dashboard music section */}
      <section
        className="
          flex
          h-full
          min-w-0
          flex-col
          overflow-hidden
          rounded-2xl
          border
          border-[#30205a]
          bg-[#100822]/90
          p-4
          shadow-[0_15px_45px_rgba(0,0,0,0.22)]
        "
      >
        {/* Header */}
        <div className="mb-4 flex shrink-0 items-center justify-between">
          <h3 className="flex min-w-0 items-center gap-2 text-sm font-semibold text-white">
            <span
              aria-hidden="true"
              className="text-lg text-[#1ed760]"
            >
              ♫
            </span>

            <span className="truncate">
              Soundtrack for Your Vibe
            </span>
          </h3>

          <button
            type="button"
            onClick={handleSeeAll}
            disabled={showSkeletons}
            className="
              shrink-0
              text-xs
              font-medium
              text-violet-300/75
              transition-colors
              hover:text-violet-200
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            See All
          </button>
        </div>

        {/* Four compact cards */}
        <div className="grid min-w-0 grid-cols-2 gap-3 lg:grid-cols-4">
          {items.map((item, index) => {
            if (showSkeletons || !item) {
              return (
                <div
                  key={`music-skeleton-${index}`}
                  className="
                    flex
                    min-w-0
                    flex-col
                    overflow-hidden
                    rounded-lg
                    border
                    border-white/10
                    bg-[#17102c]
                  "
                >
                  <div
                    className={`
                      aspect-[1.16/1]
                      w-full
                      bg-[#25183e]
                      ${
                        isLoading
                          ? "animate-pulse"
                          : ""
                      }
                    `}
                  />

                  <div className="flex flex-1 flex-col gap-2 p-2.5">
                    <div
                      className={`
                        h-3.5
                        w-4/5
                        rounded
                        bg-[#2b1c48]
                        ${
                          isLoading
                            ? "animate-pulse"
                            : ""
                        }
                      `}
                    />

                    <div
                      className={`
                        h-3
                        w-3/5
                        rounded
                        bg-[#24173d]
                        ${
                          isLoading
                            ? "animate-pulse"
                            : ""
                        }
                      `}
                    />

                    <div
                      className={`
                        mt-1
                        h-3
                        w-1/2
                        rounded
                        bg-[#173b2c]
                        ${
                          isLoading
                            ? "animate-pulse"
                            : ""
                        }
                      `}
                    />

                    <div
                      className={`
                        mt-auto
                        h-8
                        rounded-md
                        bg-[#172234]
                        ${
                          isLoading
                            ? "animate-pulse"
                            : ""
                        }
                      `}
                    />
                  </div>
                </div>
              );
            }

            const matchScore =
              item.matchScore ??
              Math.max(88, 96 - index);

            return (
              <article
                key={item.id}
                className="
                  group
                  flex
                  min-w-0
                  flex-col
                  overflow-hidden
                  rounded-lg
                  border
                  border-white/15
                  bg-[#17102c]
                  shadow-[0_8px_25px_rgba(0,0,0,0.18)]
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:border-violet-400/45
                "
              >
                {/* Music cover */}
                <a
                  href={item.destinationUrl || "#"}
                  target={
                    item.destinationUrl
                      ? "_blank"
                      : undefined
                  }
                  rel={
                    item.destinationUrl
                      ? "noopener noreferrer"
                      : undefined
                  }
                  onClick={(event) => {
                    if (!item.destinationUrl) {
                      event.preventDefault();
                    }
                  }}
                  className="
                    relative
                    block
                    aspect-[1.16/1]
                    w-full
                    overflow-hidden
                    bg-[#211538]
                  "
                >
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={`${item.title} cover`}
                      className="
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-500
                        group-hover:scale-105
                      "
                    />
                  ) : (
                    <div
                      className="
                        flex
                        h-full
                        w-full
                        items-center
                        justify-center
                        bg-linear-to-br
                        from-[#17264e]
                        via-[#32195a]
                        to-[#65195e]
                      "
                    >
                      <span className="text-3xl text-white/40">
                        ♫
                      </span>
                    </div>
                  )}

                  {/* Image shadow */}
                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      bg-linear-to-t
                      from-black/30
                      via-transparent
                      to-transparent
                    "
                  />

                  {/* Play icon */}
                  <div
                    className="
                      absolute
                      bottom-2
                      left-2
                      flex
                      h-7
                      w-7
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/35
                      bg-black/55
                      text-white
                      opacity-90
                      backdrop-blur-md
                      transition-all
                      group-hover:scale-110
                      group-hover:bg-[#1db954]
                    "
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="ml-0.5"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>

                  {/* Duration */}
                  {item.duration && (
                    <span
                      className="
                        absolute
                        bottom-2
                        right-2
                        rounded
                        bg-black/75
                        px-1.5
                        py-0.5
                        text-[9px]
                        font-semibold
                        text-white
                        backdrop-blur-sm
                      "
                    >
                      {item.duration}
                    </span>
                  )}
                </a>

                {/* Information */}
                <div className="flex flex-1 flex-col p-2.5">
                  <a
                    href={item.destinationUrl || "#"}
                    target={
                      item.destinationUrl
                        ? "_blank"
                        : undefined
                    }
                    rel={
                      item.destinationUrl
                        ? "noopener noreferrer"
                        : undefined
                    }
                    onClick={(event) => {
                      if (!item.destinationUrl) {
                        event.preventDefault();
                      }
                    }}
                    title={item.title}
                    className="
                      truncate
                      text-xs
                      font-semibold
                      text-white
                      transition-colors
                      hover:text-violet-200
                    "
                  >
                    {item.title}
                  </a>

                  <p
                    title={item.creator}
                    className="
                      mt-1
                      truncate
                      text-[10px]
                      text-white/50
                    "
                  >
                    {item.creator}
                  </p>

                  <div className="mt-2 flex items-center justify-between gap-2">
                    <span className="text-[10px] font-semibold text-[#22c55e]">
                      {matchScore}% Match
                    </span>

                    {item.duration && (
                      <span className="text-[9px] text-white/40">
                        {item.duration}
                      </span>
                    )}
                  </div>

                  {/* Spotify button */}
                  <a
                    href={item.destinationUrl || "#"}
                    target={
                      item.destinationUrl
                        ? "_blank"
                        : undefined
                    }
                    rel={
                      item.destinationUrl
                        ? "noopener noreferrer"
                        : undefined
                    }
                    onClick={(event) => {
                      if (!item.destinationUrl) {
                        event.preventDefault();
                      }
                    }}
                      className="
                        mt-2.5
                        flex
                        h-7
                        w-full
                        items-center
                        justify-center
                        gap-1
                        whitespace-nowrap
                        rounded-md
                        border
                        border-white/[0.06]
                        bg-[#162134]
                        px-1.5
                        text-[9px]
                        font-semibold
                        text-white
                        transition-colors
                        hover:bg-[#1c2b41]
                      "
                  >
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="#1ed760"
                      aria-hidden="true"
                    >
                      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.587 14.424a.636.636 0 0 1-.873.208c-2.394-1.462-5.41-1.792-8.966-.983a.64.64 0 0 1-.307-1.245c3.9-.89 7.234-.526 9.938 1.127a.636.636 0 0 1 .208.913zm1.168-3.07a.798.798 0 0 1-1.096.26c-2.73-1.674-6.938-2.174-10.158-1.192a.8.8 0 1 1-.466-1.531c3.7-1.127 8.358-.567 11.46 1.334a.8.8 0 0 1 .26 1.13zm.12-3.226C14.596 8.163 8.468 7.95 4.93 9.023a.998.998 0 1 1-.58-1.912c4.053-1.229 10.835-1.002 14.773 1.332a1 1 0 1 1-1.248 1.685z" />
                    </svg>

                    Open in Spotify
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* See All modal */}
      {isExpanded && !showSkeletons && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/80
            p-4
            backdrop-blur-md
            sm:p-6
          "
        >
          <div
            className="
              flex
              max-h-[90vh]
              w-full
              max-w-6xl
              flex-col
              overflow-hidden
              rounded-2xl
              border
              border-[#39225f]
              bg-[#10071e]
              shadow-2xl
            "
          >
            {/* Modal header */}
            <div
              className="
                flex
                shrink-0
                items-center
                justify-between
                border-b
                border-[#30204f]
                px-5
                py-4
              "
            >
              <div>
                <h2 className="flex items-center gap-2 text-lg font-bold text-white">
                  <span className="text-[#1ed760]">
                    ♫
                  </span>

                  Soundtrack for Your Vibe
                </h2>

                <p className="mt-1 text-xs text-white/45">
                  More music selected for your current
                  mood.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setIsExpanded(false)
                }
                aria-label="Close music gallery"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  text-white/60
                  transition-colors
                  hover:bg-white/10
                  hover:text-white
                "
              >
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>

            {/* Modal content */}
            <div className="overflow-y-auto p-5">
              {isLoadingAdditional ? (
                <div className="flex min-h-[350px] flex-col items-center justify-center">
                  <div
                    className="
                      h-11
                      w-11
                      animate-spin
                      rounded-full
                      border-4
                      border-[#1db954]
                      border-t-transparent
                    "
                  />

                  <p className="mt-4 text-sm text-white/55">
                    Loading more music...
                  </p>
                </div>
              ) : loadError ? (
                <div className="flex min-h-[350px] flex-col items-center justify-center text-center">
                  <p className="text-sm text-red-300">
                    {loadError}
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setAdditionalMusic([]);
                      handleSeeAll();
                    }}
                    className="
                      mt-5
                      rounded-lg
                      bg-[#1db954]/15
                      px-5
                      py-2
                      text-sm
                      font-semibold
                      text-[#1ed760]
                      transition-colors
                      hover:bg-[#1db954]/25
                    "
                  >
                    Retry
                  </button>
                </div>
              ) : (
                <div
                  className="
                    grid
                    grid-cols-2
                    gap-4
                    sm:grid-cols-3
                    lg:grid-cols-4
                  "
                >
                  {expandedItems.map(
                    (item, index) => (
                      <article
                        key={`${item.id}-${index}`}
                        className="
                          group
                          flex
                          min-w-0
                          flex-col
                          overflow-hidden
                          rounded-xl
                          border
                          border-white/10
                          bg-[#17102c]
                          transition-all
                          hover:-translate-y-1
                          hover:border-violet-400/40
                        "
                      >
                        <a
                          href={
                            item.destinationUrl ||
                            "#"
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                            relative
                            block
                            aspect-square
                            overflow-hidden
                            bg-[#211538]
                          "
                        >
                          {item.imageUrl ? (
                            <img
                              src={item.imageUrl}
                              alt={item.title}
                              className="
                                h-full
                                w-full
                                object-cover
                                transition-transform
                                duration-500
                                group-hover:scale-105
                              "
                            />
                          ) : (
                            <div
                              className="
                                flex
                                h-full
                                items-center
                                justify-center
                                bg-linear-to-br
                                from-indigo-950
                                to-purple-900
                              "
                            >
                              <span className="text-3xl">
                                🎵
                              </span>
                            </div>
                          )}

                          {item.duration && (
                            <span
                              className="
                                absolute
                                bottom-2
                                right-2
                                rounded
                                bg-black/75
                                px-1.5
                                py-0.5
                                text-[10px]
                                font-semibold
                              "
                            >
                              {item.duration}
                            </span>
                          )}
                        </a>

                        <div className="flex flex-1 flex-col p-3">
                          <h3
                            title={item.title}
                            className="
                              line-clamp-2
                              text-sm
                              font-semibold
                              text-white
                            "
                          >
                            {item.title}
                          </h3>

                          <p className="mt-1 truncate text-xs text-white/45">
                            {item.creator}
                          </p>

                          <p className="mt-2 text-xs font-semibold text-[#22c55e]">
                            {item.matchScore ??
                              Math.max(
                                85,
                                96 -
                                  (index % 10)
                              )}
                            % Match
                          </p>

                          <a
                            href={
                              item.destinationUrl ||
                              "#"
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                              mt-3
                              flex
                              h-9
                              items-center
                              justify-center
                              gap-2
                              rounded-lg
                              bg-[#172437]
                              text-xs
                              font-semibold
                              text-white
                              transition-colors
                              hover:bg-[#203149]
                            "
                          >
                            <span className="text-[#1ed760]">
                              ●
                            </span>

                            Open in Spotify
                          </a>
                        </div>
                      </article>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}