"use client";

import { VibeMediaSectionData } from "@/components/vibe/vibe-experience.data";

interface VisualSectionProps {
  section: VibeMediaSectionData | null;
  isInitial?: boolean;
  isLoading?: boolean;
  onSeeAll?: () => void;
}

export function VisualSection({
  section,
  isInitial = false,
  isLoading = false,
  onSeeAll,
}: VisualSectionProps) {
  const showSkeletons =
    isInitial || isLoading || !section;

  const displayItems = showSkeletons
    ? Array(6).fill(null)
    : section.items.slice(0, 6);

  const pinterestUrl =
    !showSkeletons &&
    section?.items[0]?.destinationUrl
      ? section.items[0].destinationUrl
      : "https://www.pinterest.com/search/pins/?q=aesthetic%20inspiration";

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
        border-[#3b2b78]/70
        bg-[#101536]/80
        p-3.5
        shadow-[0_16px_45px_rgba(0,0,0,0.25)]
        backdrop-blur-xl
      "
    >
      {/* Soft glass glow */}
      <div
        className="
          pointer-events-none
          absolute
          -left-16
          -top-20
          h-44
          w-44
          rounded-full
          bg-blue-500/10
          blur-[70px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-20
          right-0
          h-40
          w-48
          rounded-full
          bg-violet-500/10
          blur-[70px]
        "
      />

      {/* Header */}
      <div className="relative z-10 mb-3 flex shrink-0 items-center justify-between">
        <div className="flex min-w-0 items-center gap-2">
          <span
            className="
              flex
              h-5
              w-5
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-[#e60023]
              text-[12px]
              font-bold
              text-white
            "
          >
            P
          </span>

          <h3 className="truncate text-sm font-semibold text-white">
            See Your Vibe{" "}
            <span className="font-normal text-white/45">
              (Pinterest)
            </span>
          </h3>
        </div>

        <button
          type="button"
          onClick={onSeeAll}
          disabled={showSkeletons || !onSeeAll}
          className="
            shrink-0
            text-xs
            font-medium
            text-violet-300
            transition-colors
            hover:text-violet-100
            disabled:cursor-default
            disabled:opacity-40
          "
        >
          See All
        </button>
      </div>

      {/* Pinterest image grid */}
      <div
        className="
          relative
          z-10
          grid
          flex-1
          grid-cols-3
          grid-rows-2
          gap-2
        "
      >
        {displayItems.map((item, index) => {
          if (showSkeletons) {
            return (
              <div
                key={`visual-skeleton-${index}`}
                className={`
                  min-h-[76px]
                  overflow-hidden
                  rounded-md
                  border
                  border-white/10
                  bg-[#192044]
                  ${
                    isLoading
                      ? "animate-pulse"
                      : ""
                  }
                `}
              />
            );
          }

          return (
            <a
              key={item.id}
              href={
                item.destinationUrl || "#"
              }
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
                group
                relative
                block
                min-h-[76px]
                overflow-hidden
                rounded-md
                border
                border-white/10
                bg-[#182044]
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:border-violet-300/50
                hover:shadow-[0_8px_24px_rgba(76,29,149,0.25)]
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
                    w-full
                    items-center
                    justify-center
                    bg-linear-to-br
                    from-[#172554]
                    via-[#312e81]
                    to-[#581c87]
                  "
                >
                  <span className="text-lg opacity-50">
                    🖼️
                  </span>
                </div>
              )}

              {/* Dark title overlay */}
              <div
                className="
                  absolute
                  inset-x-0
                  bottom-0
                  bg-linear-to-t
                  from-black/95
                  via-black/65
                  to-transparent
                  px-2
                  pb-1.5
                  pt-7
                "
              >
                <p
                  title={item.title}
                  className="
                    truncate
                    text-[9px]
                    font-semibold
                    leading-tight
                    text-white
                  "
                >
                  {item.title}
                </p>
              </div>
            </a>
          );
        })}
      </div>

      {/* Pinterest button */}
      <div className="relative z-10 mt-3 flex shrink-0 justify-center">
        <a
          href={
            showSkeletons
              ? "#"
              : pinterestUrl
          }
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
            inline-flex
            h-8
            min-w-[195px]
            items-center
            justify-center
            gap-2
            rounded-full
            border
            border-white/10
            px-5
            text-[11px]
            font-semibold
            transition-all
            duration-300
            ${
              showSkeletons
                ? `
                  cursor-default
                  bg-white/5
                  text-white/30
                `
                : `
                  bg-[#25204c]/90
                  text-white
                  hover:-translate-y-0.5
                  hover:bg-[#30285f]
                  hover:shadow-[0_7px_20px_rgba(88,28,135,0.25)]
                `
            }
          `}
        >
          <span
            className="
              flex
              h-4
              w-4
              items-center
              justify-center
              rounded-full
              bg-[#e60023]
              text-[9px]
              font-bold
              text-white
            "
          >
            P
          </span>

          Explore More on Pinterest
        </a>
      </div>
    </section>
  );
}