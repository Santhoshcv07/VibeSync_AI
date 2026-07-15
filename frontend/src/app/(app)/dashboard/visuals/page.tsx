"use client";

import { useRouter } from "next/navigation";

import { useCurrentVibe } from "@/components/vibe/current-vibe-provider";

export default function VisualGalleryPage() {
  const router = useRouter();
  const { currentVibe } = useCurrentVibe();

  const visualSection =
    currentVibe?.sections.find(
      (section) => section.category === "visual-inspiration"
    ) ?? null;

  const visualItems = visualSection?.items ?? [];

  return (
    <div className="min-h-screen w-full bg-[#05020a] px-6 py-8 text-white md:px-10">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-8">
        <div className="flex flex-col gap-5 border-b border-[#291245] pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="mb-4 inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
            >
              <span aria-hidden="true">←</span>
              Back to Dashboard
            </button>

            <h1 className="flex items-center gap-3 text-2xl font-bold tracking-tight md:text-3xl">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-sm font-bold text-[#e60023]">
                p
              </span>
              Your Visual Vibe
            </h1>

            <p className="mt-2 max-w-2xl text-sm text-white/55">
              Explore all the visual inspiration selected for your current
              mood.
            </p>
          </div>

          {visualItems.length > 0 && (
            <p className="text-xs text-white/40">
              {visualItems.length} visual
              {visualItems.length === 1 ? "" : "s"}
            </p>
          )}
        </div>

        {visualItems.length === 0 ? (
          <div className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-[#291245] bg-[#110822] px-6 text-center shadow-lg">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-[#37195c] bg-[#1c0f35] text-2xl">
              🖼️
            </div>

            <h2 className="text-xl font-semibold">
              No visual vibe available
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-white/50">
              Generate a vibe on the dashboard first, then return here to
              explore all of its visual inspiration.
            </p>

            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="mt-6 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#110822] transition-transform hover:scale-[1.02]"
            >
              Back to Dashboard
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visualItems.map((item) => {
              const cardContent = (
                <>
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-[#1c0f35]">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-indigo-950 to-purple-950">
                        <span className="text-3xl text-white/30">🖼️</span>
                      </div>
                    )}

                    <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/95 via-black/60 to-transparent px-4 pb-4 pt-12">
                      <h2 className="line-clamp-2 text-base font-semibold leading-snug text-white">
                        {item.title}
                      </h2>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 px-4 py-3">
                    <p className="truncate text-xs text-white/45">
                      {item.creator}
                    </p>

                    <span className="shrink-0 text-xs font-medium text-white/70">
                      Open Visual ↗
                    </span>
                  </div>
                </>
              );

              if (item.destinationUrl) {
                return (
                  <a
                    key={item.id}
                    href={item.destinationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group overflow-hidden rounded-xl border border-[#291245] bg-[#110822] shadow-lg transition-all hover:-translate-y-1 hover:border-[#4b2378]"
                  >
                    {cardContent}
                  </a>
                );
              }

              return (
                <article
                  key={item.id}
                  className="group overflow-hidden rounded-xl border border-[#291245] bg-[#110822] shadow-lg"
                >
                  {cardContent}
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}