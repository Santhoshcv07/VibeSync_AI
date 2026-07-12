export function EntertainmentCategoryStrip() {
  const categories = [
    {
      label: "Music",
      phrase: "Soundtrack the moment",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
      )
    },
    {
      label: "Movies & Shows",
      phrase: "Find what fits your time",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 3v18"/><path d="M3 7.5h4"/><path d="M3 12h18"/><path d="M3 16.5h4"/><path d="M17 3v18"/><path d="M17 7.5h4"/><path d="M17 16.5h4"/></svg>
      )
    },
    {
      label: "YouTube",
      phrase: "Watch without wandering",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>
      )
    },
    {
      label: "Visual Inspiration",
      phrase: "See the mood",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
      )
    },
    {
      label: "Books",
      phrase: "Read into the feeling",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
      )
    }
  ];

  return (
    <section className="py-8 border-y border-[var(--border)] bg-[var(--surface)]">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 justify-center" aria-label="Entertainment categories">
          {categories.map((category) => (
            <li key={category.label} className="flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[var(--surface-elevated)] border border-[var(--border)] text-foreground shadow-[var(--shadow-sm)]" aria-hidden="true">
                {category.icon}
              </div>
              <div>
                <h3 className="text-body-sm font-semibold text-foreground">{category.label}</h3>
                <p className="text-caption text-foreground-muted">{category.phrase}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
