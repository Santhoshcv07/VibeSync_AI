import { Bell, BellRing, Sparkles, Hexagon, Mail } from "lucide-react";

export function SettingsNotificationsCard() {
  return (
    <div className="flex flex-col rounded-[20px] border border-white/[0.06] bg-[#0D1220] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.12] hover:shadow-[0_15px_50px_rgba(0,0,0,0.5)]">
      
      {/* Header */}
      <div className="flex items-center gap-5 pb-6 border-b border-white/[0.06]">
        <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[16px] bg-purple-500/10 border border-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.15)]">
          <Bell className="h-6 w-6 text-purple-400" />
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="text-[22px] font-bold text-white leading-none mb-1.5">Notifications</h3>
          <p className="text-[14px] text-white/60 leading-none">Manage how you want to be notified.</p>
        </div>
      </div>

      <div className="flex flex-col">
        
        {/* New Vibes */}
        <div className="group flex items-center justify-between h-[72px] border-b border-white/[0.06] last:border-b-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.02] border border-white/[0.05] group-hover:bg-purple-500/10 group-hover:border-purple-500/30 transition-all duration-300">
              <BellRing className="h-4 w-4 text-white/40 group-hover:text-purple-400 transition-colors duration-300" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-[15px] font-semibold text-white leading-none mb-1.5">New vibes & updates</span>
              <span className="text-[13px] text-white/50 leading-none">Get notified when new vibes drop.</span>
            </div>
          </div>
          <button className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full bg-purple-600 shadow-[0_0_10px_rgba(147,51,234,0.4)] transition-colors focus:outline-none">
            <span className="translate-x-[22px] inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform" />
          </button>
        </div>

        {/* Vibe Generation Complete */}
        <div className="group flex items-center justify-between h-[72px] border-b border-white/[0.06] last:border-b-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.02] border border-white/[0.05] group-hover:bg-purple-500/10 group-hover:border-purple-500/30 transition-all duration-300">
              <Sparkles className="h-4 w-4 text-white/40 group-hover:text-purple-400 transition-colors duration-300" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-[15px] font-semibold text-white leading-none mb-1.5">Vibe generation complete</span>
              <span className="text-[13px] text-white/50 leading-none">Get notified when your vibe is ready.</span>
            </div>
          </div>
          <button className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full bg-purple-600 shadow-[0_0_10px_rgba(147,51,234,0.4)] transition-colors focus:outline-none">
            <span className="translate-x-[22px] inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform" />
          </button>
        </div>

        {/* Weekly Digest */}
        <div className="group flex items-center justify-between h-[72px] border-b border-white/[0.06] last:border-b-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.02] border border-white/[0.05] group-hover:bg-purple-500/10 group-hover:border-purple-500/30 transition-all duration-300">
              <Hexagon className="h-4 w-4 text-white/40 group-hover:text-purple-400 transition-colors duration-300" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-[15px] font-semibold text-white leading-none mb-1.5">Weekly vibe digest</span>
              <span className="text-[13px] text-white/50 leading-none">Receive a weekly summary of your vibes.</span>
            </div>
          </div>
          <button className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full bg-[#1e2338] transition-colors focus:outline-none border border-white/5">
            <span className="translate-x-[2px] inline-block h-5 w-5 transform rounded-full bg-white/40 transition-transform" />
          </button>
        </div>

        {/* Marketing */}
        <div className="group flex items-center justify-between h-[72px] border-b border-white/[0.06] last:border-b-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.02] border border-white/[0.05] group-hover:bg-purple-500/10 group-hover:border-purple-500/30 transition-all duration-300">
              <Mail className="h-4 w-4 text-white/40 group-hover:text-purple-400 transition-colors duration-300" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-[15px] font-semibold text-white leading-none mb-1.5">Marketing & promotions</span>
              <span className="text-[13px] text-white/50 leading-none">Receive updates about offers and promotions.</span>
            </div>
          </div>
          <button className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full bg-[#1e2338] transition-colors focus:outline-none border border-white/5">
            <span className="translate-x-[2px] inline-block h-5 w-5 transform rounded-full bg-white/40 transition-transform" />
          </button>
        </div>

      </div>
    </div>
  );
}
