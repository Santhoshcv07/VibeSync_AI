"use client";

import { Input } from "@/components/ui/input";

export function DashboardHeader() {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 w-full">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Good Evening, Arjun <span aria-hidden="true">👋</span>
        </h1>
        <p className="text-sm md:text-base text-white/60">
          Let&apos;s build your perfect vibe
        </p>
      </div>
      
      <div className="flex items-center gap-4 w-full md:w-auto">
        <div className="relative w-full md:w-[320px]">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <Input 
            placeholder="Search for songs, movies, books, anything..." 
            className="pl-9 bg-[#110822] border-[#291245] text-sm h-10 w-full placeholder:text-white/30 text-white rounded-full focus-visible:ring-[#7e22ce]"
          />
        </div>
        
        <button aria-label="Notifications" className="shrink-0 w-10 h-10 rounded-full border border-[#291245] bg-[#110822] flex items-center justify-center text-white/70 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
        </button>
        
        <div className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-sm">
          A
        </div>
      </div>
    </div>
  );
}
