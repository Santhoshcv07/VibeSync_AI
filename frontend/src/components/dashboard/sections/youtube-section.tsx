"use client";

import { useState } from "react";

import { VibeMediaSectionData } from "@/components/vibe/vibe-experience.data";

interface YouTubeSectionProps {
  section: VibeMediaSectionData | null;
  isInitial?: boolean;
  isLoading?: boolean;
}

export function YouTubeSection({
  section,
  isInitial,
  isLoading,
}: YouTubeSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const showSkeletons =
    isInitial || isLoading || !section;

  const allItems = showSkeletons
    ? Array(3).fill(null)
    : section.items;

  // Show three compact YouTube cards on dashboard
  const items = allItems.slice(0, 3);

  return (
    <>
      {/* Main YouTube section */}
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
              className="
                flex
                h-5
                w-7
                items-center
                justify-center
                rounded
                bg-[#ff0000]
                text-[9px]
                text-white
              "
            >
              ▶
            </span>

            <span className="truncate">
              Watch Your Vibe
            </span>

            <span className="hidden text-xs font-normal text-white/40 sm:inline">
              (YouTube)
            </span>
          </h3>

          <button
            type="button"
            disabled={showSkeletons}
            onClick={() => setIsExpanded(true)}
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

        {/* Three compact YouTube cards */}
        <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-3">
          {items.map((item, index) => {
            if (showSkeletons || !item) {
              return (
                <div
                  key={`youtube-skeleton-${index}`}
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
                      aspect-video
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
                        w-5/6
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
                        h-7
                        rounded-md
                        bg-[#351522]
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

            const thumbnail =
              item.thumbnailUrl || item.imageUrl;

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
                  hover:border-red-400/45
                "
              >
                {/* YouTube thumbnail */}
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
                    aspect-video
                    w-full
                    overflow-hidden
                    bg-[#211538]
                  "
                >
                  {thumbnail ? (
                    <img
                      src={thumbnail}
                      alt={`${item.title} thumbnail`}
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
                        from-[#151b4a]
                        via-[#32195a]
                        to-[#651933]
                      "
                    >
                      <span
                        className="
                          flex
                          h-10
                          w-14
                          items-center
                          justify-center
                          rounded-lg
                          bg-[#ff0000]
                          text-lg
                          text-white
                        "
                      >
                        ▶
                      </span>
                    </div>
                  )}

                  {/* Dark image overlay */}
                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      bg-linear-to-t
                      from-black/35
                      via-transparent
                      to-transparent
                    "
                  />

                  {/* YouTube play button */}
                  <div
                    className="
                      absolute
                      left-1/2
                      top-1/2
                      flex
                      h-9
                      w-12
                      -translate-x-1/2
                      -translate-y-1/2
                      items-center
                      justify-center
                      rounded-lg
                      bg-[#ff0000]
                      text-white
                      opacity-0
                      shadow-lg
                      shadow-black/50
                      transition-all
                      duration-300
                      group-hover:scale-110
                      group-hover:opacity-100
                    "
                  >
                    <svg
                      width="16"
                      height="16"
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
                        bg-black/80
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

                {/* Video information */}
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
                      line-clamp-2
                      min-h-[32px]
                      text-xs
                      font-semibold
                      leading-4
                      text-white
                      transition-colors
                      hover:text-red-200
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

                  {!!item.metadata &&
                    (!!item.metadata.views ||
                      !!item.metadata.date) && (
                      <p className="mt-0.5 truncate text-[9px] text-white/35">
                        {!!item.metadata.views &&
                          `${String(
                            item.metadata.views
                          )} views`}

                        {!!item.metadata.views &&
                          !!item.metadata.date &&
                          " • "}

                        {!!item.metadata.date &&
                          String(
                            item.metadata.date
                          )}
                      </p>
                    )}

                  {/* Match score */}
                  <div className="mt-2">
                    <span className="text-[10px] font-semibold text-[#22c55e]">
                      {matchScore}% Match
                    </span>
                  </div>

                  {/* YouTube button */}
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
                      border-red-400/10
                      bg-[#34131e]
                      px-1.5
                      text-[9px]
                      font-semibold
                      text-[#ff5c5c]
                      transition-colors
                      hover:bg-[#491724]
                      hover:text-[#ff7373]
                    "
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                    </svg>

                    Watch on YouTube
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
                  <span
                    className="
                      flex
                      h-5
                      w-7
                      items-center
                      justify-center
                      rounded
                      bg-[#ff0000]
                      text-[9px]
                    "
                  >
                    ▶
                  </span>

                  Watch Your Vibe
                </h2>

                <p className="mt-1 text-xs text-white/45">
                  YouTube videos selected for your
                  current vibe.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setIsExpanded(false)
                }
                aria-label="Close YouTube gallery"
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

            {/* Modal cards */}
            <div className="overflow-y-auto p-5">
              <div
                className="
                  grid
                  grid-cols-1
                  gap-5
                  sm:grid-cols-2
                  lg:grid-cols-3
                "
              >
                {allItems.map(
                  (item, index) => {
                    const thumbnail =
                      item.thumbnailUrl ||
                      item.imageUrl;

                    return (
                      <article
                        key={`expanded-${item.id}`}
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
                          duration-300
                          hover:-translate-y-1
                          hover:border-red-400/40
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
                            aspect-video
                            overflow-hidden
                            bg-[#211538]
                          "
                        >
                          {thumbnail ? (
                            <img
                              src={thumbnail}
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
                                ▶️
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
                                bg-black/80
                                px-1.5
                                py-0.5
                                text-[10px]
                                font-semibold
                                text-white
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
                              min-h-[40px]
                              text-sm
                              font-semibold
                              leading-5
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
                                88,
                                96 - index
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
                              whitespace-nowrap
                              rounded-lg
                              bg-[#35131e]
                              text-xs
                              font-semibold
                              text-[#ff5c5c]
                              transition-colors
                              hover:bg-[#491724]
                            "
                          >
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                            </svg>

                            Watch on YouTube
                          </a>
                        </div>
                      </article>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}