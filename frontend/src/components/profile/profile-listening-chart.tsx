"use client";

import { ChevronDown } from "lucide-react";

export function ProfileListeningChart() {
  return (
    <div className="flex flex-col rounded-[20px] border border-white/[0.06] bg-[#0D1220] p-4 shadow-[0_10px_40px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-[2px] hover:border-white/[0.1] overflow-hidden h-[360px]">
      <div className="flex items-start justify-between px-2 pt-2">
        <div>
          <h3 className="text-[22px] font-bold text-white">Listening Time</h3>
          <div className="mt-2 flex items-end gap-2">
            <span className="text-[32px] font-bold text-white leading-none">28h 45m</span>
          </div>
          <p className="mt-1 text-[14px] text-white/60 leading-[1.6]">Total time explored</p>
        </div>
        
        <button className="flex items-center gap-2 rounded-full border border-white/10 bg-[#161a2b] px-3 py-1.5 text-[13px] font-medium text-white/60 transition-colors hover:text-white hover:bg-white/5">
          This month
          <ChevronDown className="h-3 w-3 text-white/60" />
        </button>
      </div>

      <div className="mt-8 flex-1 relative h-[220px] w-full">
        {/* Y Axis Labels */}
        <div className="absolute inset-y-0 left-0 flex flex-col justify-between text-[11px] text-white/30 pb-[28px]">
          <span>8h</span>
          <span>6h</span>
          <span>4h</span>
          <span>2h</span>
          <span>0h</span>
        </div>

        {/* Chart Area */}
        <div className="absolute inset-0 ml-8 pr-8 pb-[28px]">
          {/* Horizontal Grid Lines */}
          <div className="absolute inset-0 flex flex-col justify-between">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="w-full border-t border-white/5" />
            ))}
          </div>
          
          {/* SVG Line Chart */}
          <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(217, 70, 239, 0.2)" />
                <stop offset="100%" stopColor="rgba(217, 70, 239, 0)" />
              </linearGradient>
            </defs>
            <path 
              d="M0,77.5 C10,70 15,55 25,55 S40,73.75 50,73.75 S75,43.75 85,43.75 S95,62.5 100,62.5" 
              fill="none" 
              stroke="#d946ef" 
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
            <path 
              d="M0,77.5 C10,70 15,55 25,55 S40,73.75 50,73.75 S75,43.75 85,43.75 S95,62.5 100,62.5 L100,100 L0,100 Z" 
              fill="url(#chartGradient)" 
            />
            <circle cx="85" cy="43.75" r="2.5" fill="#0A0D18" stroke="#d946ef" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          </svg>

          {/* Tooltip on the highest point */}
          <div className="absolute top-[30%] left-[85%] -translate-x-1/2 -translate-y-full rounded-md bg-[#1e2338] px-2 py-1 text-[11px] font-medium text-white shadow-lg border border-white/10">
            5h 30m
          </div>
        </div>

        {/* X Axis Labels */}
        <div className="absolute bottom-0 left-8 right-8 flex justify-between text-[11px] text-white/50 px-2">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>
      </div>
    </div>
  );
}
