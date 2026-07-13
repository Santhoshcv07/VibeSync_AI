import type { SVGProps } from "react";

const SmileIcon = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></svg>;
const ZapIcon = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
const StarIcon = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const PlayIcon = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="5 3 19 12 5 21 5 3"/></svg>;
const HeartIcon = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>;

export function HowVibeSyncWorks() {
  const steps = [
    {
      id: 1,
      title: "Choose Your Vibe",
      description: "Pick your mood, activity, and how much time you have.",
      icon: <SmileIcon className="w-8 h-8 text-white" />,
      color: "bg-[#8b5cf6]",
      glow: "shadow-[0_0_30px_rgba(139,92,246,0.6)]"
    },
    {
      id: 2,
      title: "AI Analyzes",
      description: "Our AI scans millions of possibilities in real time.",
      icon: <ZapIcon className="w-8 h-8 text-white" fill="currentColor" />,
      color: "bg-[#d946ef]",
      glow: "shadow-[0_0_30px_rgba(217,70,239,0.6)]"
    },
    {
      id: 3,
      title: "Build Your Perfect Mix",
      description: "Get music, movies, YouTube, Pinterest & books—curated just for you.",
      icon: <StarIcon className="w-8 h-8 text-white" fill="currentColor" />,
      color: "bg-[#f59e0b]",
      glow: "shadow-[0_0_30px_rgba(245,158,11,0.6)]"
    },
    {
      id: 4,
      title: "Enjoy & Explore",
      description: "Dive in, discover, and let VibeSync elevate your every moment.",
      icon: <PlayIcon className="w-8 h-8 text-white" fill="currentColor" />,
      color: "bg-[#10b981]",
      glow: "shadow-[0_0_30px_rgba(16,185,129,0.6)]"
    },
    {
      id: 5,
      title: "Save & Revisit",
      description: "Save your favorite vibes and revisit them anytime you need.",
      icon: <HeartIcon className="w-8 h-8 text-white" fill="currentColor" />,
      color: "bg-[#ec4899]",
      glow: "shadow-[0_0_30px_rgba(236,72,153,0.6)]"
    }
  ];

  return (
    <section className="w-full relative pb-20">
      <div className="flex flex-col items-center mb-16">
        <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
          <span className="text-accent">✧</span>
          How VibeSync AI Works
        </h2>
      </div>

      <div className="relative">
        {/* Desktop Connecting Line */}
        <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5 border-t-2 border-dashed border-[var(--border-strong)] z-0"></div>

        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-4 relative z-10 justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center lg:items-start text-center lg:text-left flex-1 max-w-[280px]">
              
              {/* Icon Container */}
              <div className={`w-24 h-24 rounded-full flex items-center justify-center ${step.color} ${step.glow} mb-6 relative`}>
                {step.icon}
                
                {/* Mobile Connector Arrow */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden absolute -bottom-10 left-1/2 -translate-x-1/2 text-foreground-muted">
                    ↓
                  </div>
                )}
                
                {/* Desktop Connector Arrow */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 -translate-y-1/2 translate-x-full text-foreground-muted bg-background px-2">
                    &rarr;
                  </div>
                )}
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-foreground mb-2 flex items-center justify-center lg:justify-start gap-2">
                <span>{step.id}.</span> {step.title}
              </h3>
              <p className="text-sm text-foreground-muted leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
