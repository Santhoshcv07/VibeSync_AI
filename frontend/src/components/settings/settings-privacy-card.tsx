import { Shield, HardDrive, Download, Trash2 } from "lucide-react";

export function SettingsPrivacyCard() {
  return (
    <div className="flex flex-col rounded-[20px] border border-white/[0.06] bg-[#0D1220] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.12] hover:shadow-[0_15px_50px_rgba(0,0,0,0.5)]">
      
      {/* Header */}
      <div className="flex items-center gap-5 pb-6 border-b border-white/[0.06]">
        <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[16px] bg-purple-500/10 border border-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.15)]">
          <Shield className="h-6 w-6 text-purple-400" />
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="text-[22px] font-bold text-white leading-none mb-1.5">Privacy & data</h3>
          <p className="text-[14px] text-white/60 leading-none">Control your data and privacy settings.</p>
        </div>
      </div>

      <div className="flex flex-col">
        
        {/* Data Storage */}
        <div className="group flex items-center justify-between h-[72px] border-b border-white/[0.06] last:border-b-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.02] border border-white/[0.05] group-hover:bg-purple-500/10 group-hover:border-purple-500/30 transition-all duration-300">
              <HardDrive className="h-4 w-4 text-white/40 group-hover:text-purple-400 transition-colors duration-300" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-[15px] font-semibold text-white leading-none mb-1.5">Data storage</span>
              <span className="text-[13px] text-white/50 leading-none">Your data is stored securely in the cloud.</span>
            </div>
          </div>
          <button className="rounded-[10px] bg-[#1a1f36] border border-white/10 px-4 py-2 text-[12px] font-bold text-white hover:bg-[#252a41] hover:border-white/20 transition-all shadow-sm">
            Manage Data
          </button>
        </div>

        {/* Download Data */}
        <div className="group flex items-center justify-between h-[72px] border-b border-white/[0.06] last:border-b-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.02] border border-white/[0.05] group-hover:bg-purple-500/10 group-hover:border-purple-500/30 transition-all duration-300">
              <Download className="h-4 w-4 text-white/40 group-hover:text-purple-400 transition-colors duration-300" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-[15px] font-semibold text-white leading-none mb-1.5">Download your data</span>
              <span className="text-[13px] text-white/50 leading-none">Export a copy of your data and vibe history.</span>
            </div>
          </div>
          <button className="rounded-[10px] bg-[#1a1f36] border border-white/10 px-4 py-2 text-[12px] font-bold text-white hover:bg-[#252a41] hover:border-white/20 transition-all shadow-sm">
            Download
          </button>
        </div>

        {/* Clear History */}
        <div className="group flex items-center justify-between h-[72px] border-b border-white/[0.06] last:border-b-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.02] border border-white/[0.05] group-hover:bg-purple-500/10 group-hover:border-purple-500/30 transition-all duration-300">
              <Trash2 className="h-4 w-4 text-white/40 group-hover:text-purple-400 transition-colors duration-300" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-[15px] font-semibold text-white leading-none mb-1.5">Clear history</span>
              <span className="text-[13px] text-white/50 leading-none">Remove all your vibe history and activity.</span>
            </div>
          </div>
          <button className="rounded-[10px] bg-[#1a1f36] border border-white/10 px-4 py-2 text-[12px] font-bold text-white hover:bg-[#252a41] hover:border-white/20 transition-all shadow-sm">
            Clear
          </button>
        </div>

        {/* Delete Account */}
        <div className="group flex items-center justify-between h-[72px] border-b border-white/[0.06] last:border-b-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-red-500/5 border border-red-500/10 group-hover:bg-red-500/10 group-hover:border-red-500/30 transition-all duration-300">
              <Trash2 className="h-4 w-4 text-red-500/50 group-hover:text-red-400 transition-colors duration-300" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-[15px] font-semibold text-red-400 leading-none mb-1.5">Delete account</span>
              <span className="text-[13px] text-white/50 leading-none">Permanently delete your account and all data.</span>
            </div>
          </div>
          <button className="rounded-[10px] bg-red-500/10 border border-red-500/20 px-4 py-2 text-[12px] font-bold text-red-400 hover:bg-red-500/20 hover:border-red-500/30 transition-all shadow-sm">
            Delete
          </button>
        </div>

      </div>
    </div>
  );
}
