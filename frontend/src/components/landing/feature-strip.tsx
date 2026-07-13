import type { SVGProps } from "react";

const SmileIcon = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></svg>;
const ZapIcon = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
const HeartIcon = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>;
const ClockIcon = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const StarIcon = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;

export function FeatureStrip() {
  const features = [
    {
      title: "AI Mood Magic",
      description: "Advanced AI understands your mood, energy, and time to deliver hyper-personalized picks.",
      icon: <SmileIcon className="w-5 h-5 text-[#f472b6]" />,
      iconBg: "bg-[#f472b6]/20",
    },
    {
      title: "All-in-One Universe",
      description: "Music, movies, YouTube, visual inspiration, and books—everything in one beautiful experience.",
      icon: <ZapIcon className="w-5 h-5 text-[#34d399]" />,
      iconBg: "bg-[#34d399]/20",
    },
    {
      title: "100% Personalized",
      description: "Every recommendation is crafted around the selected mood, context, and available time.",
      icon: <HeartIcon className="w-5 h-5 text-[#d946ef]" />,
      iconBg: "bg-[#d946ef]/20",
    },
    {
      title: "Perfect for Any Time",
      description: "From a few minutes to all night, VibeSync adapts to the moment.",
      icon: <ClockIcon className="w-5 h-5 text-[#38bdf8]" />,
      iconBg: "bg-[#38bdf8]/20",
    },
    {
      title: "Save & Sync Everywhere",
      description: "Save your favorite Vibes and revisit them whenever persistence is available.",
      icon: <StarIcon className="w-5 h-5 text-[#fbbf24]" />,
      iconBg: "bg-[#fbbf24]/20",
    },
  ];

  return (
    <section className="w-full py-12 pb-16 relative">
      <div className="container mx-auto max-w-[1440px] px-4 md:px-8">
        <div className="bg-surface/60 backdrop-blur-md border border-[var(--border-strong)] rounded-2xl shadow-md overflow-hidden">
          <div className="flex flex-col lg:flex-row items-stretch divide-y lg:divide-y-0 lg:divide-x divide-[var(--border-strong)]">
            {features.map((feature, index) => (
              <div key={index} className="flex-1 p-6 lg:p-8 flex flex-col gap-4 hover:bg-surface/80 transition-colors">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${feature.iconBg}`}>
                  {feature.icon}
                </div>
                <h3 className="text-base font-semibold text-foreground leading-tight">{feature.title}</h3>
                <p className="text-sm text-foreground-muted leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
