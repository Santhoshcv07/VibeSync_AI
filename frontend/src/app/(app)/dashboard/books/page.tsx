"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useCurrentVibe } from "@/components/vibe/current-vibe-provider";

interface SearchBookItem {
  id: string;
  title: string;
  creator: string;
  imageUrl?: string | null;
  destinationUrl: string;
  description?: string | null;
}

export default function BooksGalleryPage() {
  const router = useRouter();
  const { currentVibe } = useCurrentVibe();

  const [books, setBooks] = useState<SearchBookItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const bookSection =
    currentVibe?.sections.find(
      (section) => section.category === "books"
    ) ?? null;

  const dashboardBooks = bookSection?.items ?? [];

  const currentMood = currentVibe?.mood ?? "inspiration";

  const currentContext =
    currentVibe?.description ??
    currentVibe?.intention ??
    "";

  const fetchMoreBooks = async () => {
    setIsLoading(true);
    setHasError(false);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/v1/vibes/books/search?limit=15",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mood: currentMood,
            context: currentContext,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Book search failed with status ${response.status}`
        );
      }

      const result = await response.json();

      const fetchedBooks: SearchBookItem[] =
        Array.isArray(result.data) ? result.data : [];

      /*
       * Remove books already displayed on the dashboard so that
       * "See All" gives different recommendations.
       */
      const dashboardBookTitles = new Set(
        dashboardBooks.map((book) =>
          book.title.trim().toLowerCase()
        )
      );

      const differentBooks = fetchedBooks.filter(
        (book) =>
          !dashboardBookTitles.has(
            book.title.trim().toLowerCase()
          )
      );

      /*
       * Prefer different books. If Google returns too few after
       * filtering, use the original API results as a fallback.
       */
      setBooks(
        differentBooks.length >= 6
          ? differentBooks.slice(0, 12)
          : fetchedBooks.slice(0, 12)
      );
    } catch (error) {
      console.error("Failed to load additional books:", error);

      setBooks([]);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMoreBooks();
  }, [currentMood, currentContext]);

  return (
    <div className="min-h-screen w-full bg-[#05020a] px-6 py-8 text-white md:px-10">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-8">

        {/* Page header */}
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
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#47276d] bg-[#1c0f35] text-lg">
                📚
              </span>

              Discover More Books
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/55">
              Explore more reading recommendations selected for your{" "}
              <span className="font-medium text-violet-300">
                {currentMood}
              </span>{" "}
              vibe.
            </p>
          </div>

          {!isLoading && books.length > 0 && (
            <p className="text-xs text-white/40">
              {books.length} new book
              {books.length === 1 ? "" : "s"} discovered
            </p>
          )}
        </div>

        {/* Loading state */}
        {isLoading ? (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col rounded-xl border border-[#291245] bg-[#110822] p-3"
              >
                <div className="aspect-[2/3] w-full animate-pulse rounded-lg bg-[#1c0f35]" />

                <div className="mt-3 h-4 w-4/5 animate-pulse rounded bg-[#1c0f35]" />

                <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-[#1c0f35]" />

                <div className="mt-5 h-8 w-full animate-pulse rounded bg-[#1c0f35]" />
              </div>
            ))}
          </div>
        ) : hasError ? (

          /* Error state */
          <div className="flex min-h-[380px] flex-col items-center justify-center rounded-2xl border border-[#291245] bg-[#110822] px-6 text-center">
            <div className="mb-4 text-4xl">📚</div>

            <h2 className="text-xl font-semibold">
              Books could not be loaded
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-white/50">
              The Google Books service may be temporarily unavailable.
              Try loading the recommendations again.
            </p>

            <button
              type="button"
              onClick={fetchMoreBooks}
              className="mt-6 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#110822] transition-transform hover:scale-[1.02]"
            >
              Try Again
            </button>
          </div>
        ) : books.length === 0 ? (

          /* No results state */
          <div className="flex min-h-[380px] flex-col items-center justify-center rounded-2xl border border-[#291245] bg-[#110822] px-6 text-center">
            <div className="mb-4 text-4xl">📖</div>

            <h2 className="text-xl font-semibold">
              No additional books found
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-white/50">
              Try generating another vibe to discover a different
              reading collection.
            </p>

            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="mt-6 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#110822]"
            >
              Back to Dashboard
            </button>
          </div>
        ) : (

          /* Different Google Books results */
          <section>
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-white">
                More Books for Your Vibe
              </h2>

              <p className="mt-1 text-xs text-white/45">
                Fresh recommendations beyond the books shown on your
                dashboard.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {books.map((book) => (
                <article
                  key={book.id}
                  className="group flex min-w-0 flex-col rounded-xl border border-[#291245] bg-[#110822] p-3 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-[#4b2378]"
                >
                  <a
                    href={book.destinationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block aspect-[2/3] w-full overflow-hidden rounded-lg border border-[#352052] bg-[#1c0f35]"
                  >
                    {book.imageUrl ? (
                      <img
                        src={book.imageUrl}
                        alt={`${book.title} book cover`}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center bg-linear-to-br from-[#fef3c7] to-[#d97706] p-5 text-center">
                        <h3 className="font-serif text-sm font-bold uppercase leading-tight text-[#451a03]">
                          {book.title}
                        </h3>

                        <p className="mt-3 text-[10px] uppercase text-[#78350f]">
                          {book.creator}
                        </p>
                      </div>
                    )}
                  </a>

                  <div className="flex flex-1 flex-col pt-3">
                    <h3
                      title={book.title}
                      className="line-clamp-2 min-h-[40px] text-sm font-semibold leading-5 text-white"
                    >
                      {book.title}
                    </h3>

                    <p className="mt-1 truncate text-xs text-white/45">
                      {book.creator}
                    </p>

                    <a
                      href={book.destinationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 flex w-full items-center justify-center rounded-md border border-white/5 bg-white/10 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-white/15"
                    >
                      View Book ↗
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}