"use client";

import { VibeMediaSectionData } from "@/components/vibe/vibe-experience.data";

interface MovieSectionProps {
  section: VibeMediaSectionData | null;
  isInitial?: boolean;
  isLoading?: boolean;
}

export function MovieSection({
  section,
  isInitial = false,
  isLoading = false,
}: MovieSectionProps) {
  const showSkeletons =
    isInitial || isLoading || !section;

  const featured = showSkeletons
    ? null
    : section.items[0];

  const netflixUrl = featured
    ? featured.destinationUrl ||
      `https://www.netflix.com/search?q=${encodeURIComponent(
        featured.title
      )}`
    : "#";

  return (
    <section
      className="
        relative
        flex
        h-full
        min-h-[292px]
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-[#34447e]/70
        bg-[#0d1533]/85
        p-3.5
        shadow-[0_16px_45px_rgba(0,0,0,0.28)]
        backdrop-blur-xl
      "
    >
      {/* Poster background glow */}
      {!showSkeletons &&
        featured?.imageUrl && (
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              scale-125
              bg-cover
              bg-center
              opacity-[0.08]
              blur-3xl
            "
            style={{
              backgroundImage: `url(${featured.imageUrl})`,
            }}
          />
        )}

      {/* Purple background glow */}
      <div
        className="
          pointer-events-none
          absolute
          -right-20
          -top-24
          h-52
          w-52
          rounded-full
          bg-violet-500/10
          blur-[80px]
        "
      />

      {/* Header */}
      <div className="relative z-10 mb-3 flex items-center justify-between">
        <div className="flex min-w-0 items-center gap-2">
          <span
            className="
              text-lg
              font-black
              leading-none
              text-[#e50914]
            "
          >
            N
          </span>

          <h3 className="truncate text-sm font-semibold text-white">
            Featured for Your Vibe{" "}
            <span className="font-normal text-white/45">
              (Netflix)
            </span>
          </h3>
        </div>

        <a
          href={netflixUrl}
          target={
            showSkeletons
              ? undefined
              : "_blank"
          }
          rel={
            showSkeletons
              ? undefined
              : "noopener noreferrer"
          }
          onClick={(event) => {
            if (showSkeletons) {
              event.preventDefault();
            }
          }}
          className="
            shrink-0
            text-xs
            font-medium
            text-violet-300
            transition-colors
            hover:text-violet-100
          "
        >
          See All
        </a>
      </div>

      {/* Main movie area */}
      <div
        className="
          relative
          z-10
          grid
          min-h-0
          flex-1
          grid-cols-[108px_minmax(0,1fr)]
          gap-3.5
        "
      >
        {/* Movie poster */}
        <div
          className={`
            relative
            min-h-[174px]
            overflow-hidden
            rounded-md
            border
            border-white/10
            bg-[#172044]
            shadow-[0_12px_30px_rgba(0,0,0,0.35)]
            ${
              isLoading
                ? "animate-pulse"
                : ""
            }
          `}
        >
          {!showSkeletons &&
          featured?.imageUrl ? (
            <img
              src={featured.imageUrl}
              alt={`${featured.title} movie poster`}
              className="
                h-full
                w-full
                object-cover
                transition-transform
                duration-500
                hover:scale-105
              "
            />
          ) : (
            <div
              className="
                flex
                h-full
                min-h-[174px]
                w-full
                items-center
                justify-center
                bg-linear-to-br
                from-[#172554]
                via-[#312e81]
                to-[#581c87]
              "
            >
              {!showSkeletons && (
                <span className="text-2xl opacity-50">
                  🎬
                </span>
              )}
            </div>
          )}
        </div>

        {/* Movie details */}
        <div className="flex min-w-0 flex-col justify-center">
          {showSkeletons ? (
            <>
              <div
                className={`
                  mb-2
                  h-5
                  w-4/5
                  rounded
                  bg-[#1a244b]
                  ${
                    isLoading
                      ? "animate-pulse"
                      : ""
                  }
                `}
              />

              <div
                className={`
                  mb-3
                  h-3
                  w-3/5
                  rounded
                  bg-[#1a244b]
                  ${
                    isLoading
                      ? "animate-pulse"
                      : ""
                  }
                `}
              />

              <div
                className={`
                  mb-2
                  h-3
                  w-full
                  rounded
                  bg-[#1a244b]
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
                  w-4/5
                  rounded
                  bg-[#1a244b]
                  ${
                    isLoading
                      ? "animate-pulse"
                      : ""
                  }
                `}
              />
            </>
          ) : (
            <>
              {/* Movie title */}
              <h4
                title={featured?.title}
                className="
                  truncate
                  text-[18px]
                  font-bold
                  leading-tight
                  text-white
                "
              >
                {featured?.title}
              </h4>

              {/* Year, runtime, rating and score */}
              <div
                className="
                  mt-2
                  flex
                  flex-wrap
                  items-center
                  gap-2
                  text-[10px]
                  font-medium
                  text-white/65
                "
              >
                <span>
                  {featured?.year || "2010"}
                </span>

                <span
                  className="
                    rounded
                    bg-white/[0.06]
                    px-1.5
                    py-0.5
                  "
                >
                  {featured?.duration || "2h"}
                </span>

                <span
                  className="
                    rounded
                    border
                    border-white/15
                    bg-white/[0.04]
                    px-1.5
                    py-0.5
                  "
                >
                  {String(
                    featured?.metadata?.rating ||
                      "PG-13"
                  )}
                </span>

                <span
                  className="
                    flex
                    items-center
                    gap-1
                    font-semibold
                    text-white/85
                  "
                >
                  <span className="text-amber-400">
                    ★
                  </span>

                  {String(
                    featured?.metadata?.imdb ||
                      "8.0/10"
                  )}
                </span>
              </div>

              {/* Movie genre chips */}
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {featured?.tags
                  .slice(0, 3)
                  .map((tag) => (
                    <span
                      key={String(tag)}
                      className="
                        rounded
                        border
                        border-white/[0.07]
                        bg-white/[0.06]
                        px-2
                        py-1
                        text-[9px]
                        capitalize
                        leading-none
                        text-white/65
                      "
                    >
                      {String(tag)}
                    </span>
                  ))}
              </div>

              {/* Match percentage */}
              <p
                className="
                  mt-2.5
                  text-[11px]
                  font-bold
                  text-[#31e878]
                "
              >
                {featured?.matchScore ?? 93}%
                Match
              </p>

              {/* Movie description — only once */}
              <p
              className="
                mt-2
                text-[10px]
                leading-[1.55]
                text-white/65
              "
            >
              {featured?.description}
            </p>
            </>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div
        className="
          relative
          z-10
          mt-3
          flex
          shrink-0
          items-center
          gap-2
        "
      >
        {/* Netflix */}
        <a
          href={netflixUrl}
          target={
            showSkeletons
              ? undefined
              : "_blank"
          }
          rel={
            showSkeletons
              ? undefined
              : "noopener noreferrer"
          }
          onClick={(event) => {
            if (showSkeletons) {
              event.preventDefault();
            }
          }}
          className={`
            flex
            h-9
            min-w-0
            flex-1
            items-center
            justify-center
            gap-2
            rounded-md
            text-[11px]
            font-semibold
            transition-all
            duration-300
            ${
              showSkeletons
                ? `
                  cursor-default
                  bg-[#192044]
                  text-white/30
                `
                : `
                  bg-[#e50914]
                  text-white
                  hover:bg-[#f6121d]
                  hover:shadow-[0_8px_24px_rgba(229,9,20,0.28)]
                `
            }
          `}
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <polygon points="6 3 20 12 6 21" />
          </svg>

          Watch on Netflix
        </a>

        {/* Save */}
        <button
          type="button"
          disabled={showSkeletons}
          aria-label="Save movie"
          title="Save"
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-md
            border
            border-white/10
            bg-white/[0.05]
            text-white/75
            transition-colors
            hover:bg-white/10
            hover:text-white
            disabled:cursor-default
            disabled:opacity-30
          "
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M19 21l-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        </button>

        {/* More information */}
        <button
          type="button"
          disabled={showSkeletons}
          title="More information"
          className="
            flex
            h-9
            shrink-0
            items-center
            justify-center
            gap-1.5
            rounded-md
            border
            border-white/10
            bg-white/[0.05]
            px-3
            text-[10px]
            font-medium
            text-white/80
            transition-colors
            hover:bg-white/10
            hover:text-white
            disabled:cursor-default
            disabled:opacity-30
          "
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
            />

            <path d="M12 16v-4" />

            <path d="M12 8h.01" />
          </svg>

          More Info
        </button>
      </div>

      {/* Carousel separator and dots */}
      <div
        className="
          relative
          z-10
          mt-3
          flex
          items-center
          justify-center
          border-t
          border-white/[0.07]
          pt-2.5
        "
      >
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#e50914]" />

          <span className="h-1.5 w-1.5 rounded-full bg-white/25" />

          <span className="h-1.5 w-1.5 rounded-full bg-white/25" />

          <span className="h-1.5 w-1.5 rounded-full bg-white/25" />

          <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
        </div>
      </div>
    </section>
  );
}