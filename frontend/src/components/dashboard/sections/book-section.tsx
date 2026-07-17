"use client";

import Link from "next/link";

import { VibeMediaSectionData } from "@/components/vibe/vibe-experience.data";

interface BookSectionProps {
  section: VibeMediaSectionData | null;
  isInitial?: boolean;
  isLoading?: boolean;
}

export function BookSection({
  section,
  isInitial,
  isLoading,
}: BookSectionProps) {
  const showSkeletons =
    isInitial || isLoading || !section;

  const displayItems = showSkeletons
    ? Array(3).fill(null)
    : section.items.slice(0, 3);

  return (
    <section
      className="
        relative
        flex
        h-full
        min-h-[320px]
        flex-col
        overflow-visible
        rounded-xl
        border
        border-[#27315f]
        bg-linear-to-br
        from-[#11183b]
        via-[#0d1431]
        to-[#090f27]
        px-4
        py-4
        shadow-[0_18px_50px_rgba(0,0,0,0.28)]
      "
    >
      {/* Soft background glow */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          overflow-hidden
          rounded-xl
        "
      >
        <div
          className="
            absolute
            -right-16
            -top-20
            h-48
            w-48
            rounded-full
            bg-violet-500/10
            blur-[75px]
          "
        />

        <div
          className="
            absolute
            -bottom-24
            left-1/4
            h-44
            w-44
            rounded-full
            bg-blue-500/5
            blur-[70px]
          "
        />
      </div>

      {/* Header */}
      <div
        className="
          relative
          z-10
          mb-4
          flex
          shrink-0
          items-center
          justify-between
        "
      >
        <h3
          className="
            flex
            min-w-0
            items-center
            gap-2
            text-sm
            font-semibold
            text-white
          "
        >
          <span
            aria-hidden="true"
            className="text-base"
          >
            📚
          </span>

          <span>Read Your Vibe</span>

          <span
            className="
              text-xs
              font-normal
              text-violet-200/55
            "
          >
            (Books)
          </span>
        </h3>

        {showSkeletons ? (
          <span
            className="
              text-xs
              text-violet-300/40
            "
          >
            See All
          </span>
        ) : (
          <Link
            href="/dashboard/books"
            className="
              shrink-0
              text-xs
              font-medium
              text-violet-400
              transition-colors
              hover:text-violet-200
            "
          >
            See All
          </Link>
        )}
      </div>

      {/* Books */}
      <div
        className="
          relative
          z-10
          grid
          flex-1
          grid-cols-3
          gap-3
        "
      >
        {displayItems.map((item, index) => {
          if (showSkeletons) {
            return (
              <div
                key={`book-skeleton-${index}`}
                className="
                  flex
                  min-w-0
                  flex-col
                  overflow-hidden
                  rounded-md
                  border
                  border-[#28325e]
                  bg-[#101735]
                  p-1.5
                "
              >
                <div
                  className={`
                    aspect-[2/3]
                    w-full
                    rounded-sm
                    bg-[#192143]
                    ${
                      isLoading
                        ? "animate-pulse"
                        : ""
                    }
                  `}
                />

                <div
                  className={`
                    mt-2
                    h-3
                    w-4/5
                    rounded
                    bg-[#192143]
                    ${
                      isLoading
                        ? "animate-pulse"
                        : ""
                    }
                  `}
                />

                <div
                  className={`
                    mt-1.5
                    h-2
                    w-1/2
                    rounded
                    bg-[#192143]
                    ${
                      isLoading
                        ? "animate-pulse"
                        : ""
                    }
                  `}
                />

                <div
                  className={`
                    mt-3
                    h-3
                    w-2/5
                    rounded
                    bg-[#192143]
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
                    w-full
                    rounded
                    bg-[#192143]
                    ${
                      isLoading
                        ? "animate-pulse"
                        : ""
                    }
                  `}
                />
              </div>
            );
          }

          const bookUrl =
            item.destinationUrl || "#";

          return (
            <article
              key={item.id}
              className="
                group
                flex
                min-w-0
                flex-col
                overflow-hidden
                rounded-md
                border
                border-[#2a3563]
                bg-[#101735]/90
                p-1.5
                shadow-[0_8px_24px_rgba(0,0,0,0.2)]
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:border-violet-400/45
              "
            >
              {/* Cover */}
              <a
                href={bookUrl}
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
                className="
                  block
                  aspect-[2/3]
                  w-full
                  overflow-hidden
                  rounded-sm
                  bg-[#17203e]
                "
              >
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={`${item.title} book cover`}
                    className="
                      h-full
                      w-full
                      object-cover
                      transition-transform
                      duration-500
                      group-hover:scale-[1.03]
                    "
                  />
                ) : (
                  <div
                    className="
                      flex
                      h-full
                      w-full
                      flex-col
                      items-center
                      justify-center
                      bg-linear-to-br
                      from-[#17264d]
                      via-[#18244a]
                      to-[#0b1430]
                      p-3
                      text-center
                    "
                  >
                    <span
                      className="
                        mb-3
                        text-xl
                      "
                    >
                      📖
                    </span>

                    <h4
                      className="
                        line-clamp-4
                        font-serif
                        text-[10px]
                        font-bold
                        uppercase
                        leading-[1.35]
                        text-white
                      "
                    >
                      {item.title}
                    </h4>

                    <p
                      className="
                        mt-3
                        line-clamp-2
                        text-[8px]
                        text-white/55
                      "
                    >
                      {item.creator}
                    </p>
                  </div>
                )}
              </a>

              {/* Information */}
              <div
                className="
                  flex
                  min-h-[100px]
                  flex-1
                  flex-col
                  px-1
                  pb-0.5
                  pt-2
                "
              >
                <a
                  href={bookUrl}
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
                  title={item.title}
                  className="
                    line-clamp-2
                    min-h-[30px]
                    text-[11px]
                    font-medium
                    leading-[15px]
                    text-white
                    transition-colors
                    hover:text-violet-300
                  "
                >
                  {item.title}
                </a>

                <p
                  title={item.creator}
                  className="
                    mt-1
                    truncate
                    text-[9px]
                    text-[#aab1ce]
                  "
                >
                  {item.creator}
                </p>

                {/* Match */}
                {item.matchScore != null && (
                  <p
                    className="
                      mt-2
                      text-[10px]
                      font-semibold
                      text-[#4ade80]
                    "
                  >
                    {item.matchScore}% Match
                  </p>
                )}

                {/* View Book */}
                <a
                  href={bookUrl}
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
                  className="
                    mt-auto
                    flex
                    h-8
                    w-full
                    items-center
                    justify-center
                    rounded
                    border
                    border-white/10
                    bg-[#28304f]
                    px-2
                    text-[10px]
                    font-medium
                    text-white
                    shadow-inner
                    shadow-white/[0.04]
                    transition-all
                    hover:border-violet-300/25
                    hover:bg-[#343d61]
                  "
                >
                  View Book
                </a>
              </div>
            </article>
          );
        })}
      </div>

      {/* Right carousel arrow */}
      {!showSkeletons && (
        <Link
          href="/dashboard/books"
          aria-label="View more books"
          className="
            absolute
            -right-3
            top-1/2
            z-20
            flex
            h-9
            w-7
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            border
            border-[#303b69]
            bg-[#151d42]
            text-lg
            text-white/65
            shadow-lg
            transition-all
            hover:border-violet-400/50
            hover:bg-[#202955]
            hover:text-white
          "
        >
          ›
        </Link>
      )}
    </section>
  );
}