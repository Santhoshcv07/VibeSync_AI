"use client";

const TABS = ["Overview", "Preferences", "Activity", "Achievements", "Connections", "Subscription"];

export function ProfileTabs() {
  return (
    <div className="flex items-center gap-8 border-b border-[#1e2338]">
      {TABS.map((tab, i) => (
        <div
          key={tab}
          className={`pb-4 text-[14px] font-medium cursor-pointer transition-colors relative ${
            i === 0 ? "text-white" : "text-white/40 hover:text-white/70"
          }`}
        >
          {tab}
          {i === 0 && (
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-fuchsia-500 rounded-t-full shadow-[0_0_10px_rgba(217,70,239,0.8)]" />
          )}
        </div>
      ))}
    </div>
  );
}
