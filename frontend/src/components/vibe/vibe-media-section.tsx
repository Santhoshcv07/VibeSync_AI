import { VibeMediaSectionData, VibeRecommendation } from "./vibe-experience.data";
import { VibeRecommendationCard } from "./vibe-recommendation-card";

export interface VibeMediaSectionProps {
  section: VibeMediaSectionData;
  onUnavailableAction: (recommendation: VibeRecommendation) => void;
}

export function VibeMediaSection({ section, onUnavailableAction }: VibeMediaSectionProps) {
  // Determine grid columns based on category
  // Music is often smaller cards so it can handle 3 columns.
  const getGridCols = () => {
    if (section.category === "music") {
      return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
    }
    return "grid-cols-1 md:grid-cols-2";
  };

  return (
    <section id={section.id} className="py-12 md:py-16 border-t border-[var(--border)]">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2 max-w-2xl">
          <span className="text-caption font-bold tracking-widest text-[var(--primary)] uppercase">
            {section.eyebrow}
          </span>
          <h2 className="text-heading-4 md:text-heading-3 font-display font-semibold text-foreground">
            {section.title}
          </h2>
          <p className="text-body-lg text-foreground-muted mt-2">
            {section.description}
          </p>
        </div>
        
        <div className={`grid gap-6 ${getGridCols()}`}>
          {section.items.map((item) => (
            <VibeRecommendationCard 
              key={item.id} 
              recommendation={item} 
              onUnavailableAction={onUnavailableAction} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
