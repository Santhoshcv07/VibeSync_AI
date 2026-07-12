import type { ProfileContentBalance as ProfileContentBalanceType } from "./profile.data";
import { cn } from "@/lib/cn";

export interface ProfileContentBalanceProps {
  value: ProfileContentBalanceType;
  onChange: (value: ProfileContentBalanceType) => void;
}

export function ProfileContentBalance({ value, onChange }: ProfileContentBalanceProps) {
  const total = value.music + value.video + value.visuals + value.books;
  const isBalanced = total === 100;

  const handleSliderChange = (key: keyof ProfileContentBalanceType, newValue: number) => {
    onChange({
      ...value,
      [key]: newValue,
    });
  };

  const categories: { key: keyof ProfileContentBalanceType; label: string; color: string }[] = [
    { key: "music", label: "Music", color: "bg-blue-500" },
    { key: "video", label: "Video", color: "bg-rose-500" },
    { key: "visuals", label: "Visuals", color: "bg-purple-500" },
    { key: "books", label: "Books", color: "bg-amber-500" },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h3 className="text-base font-semibold text-zinc-200">Content balance</h3>
        <p className="text-sm text-zinc-400">
          Preview how strongly each entertainment format may influence a future Vibe.
        </p>
      </div>

      <div className="space-y-6 p-5 rounded-lg border border-zinc-800 bg-zinc-900/50">
        {categories.map(({ key, label, color }) => (
          <div key={key} className="space-y-3">
            <div className="flex justify-between items-center">
              <label htmlFor={`balance-${key}`} className="text-sm font-medium text-zinc-300">
                {label}
              </label>
              <span className="text-sm font-medium text-zinc-400">{value[key]}%</span>
            </div>
            <div className="relative flex items-center w-full h-4">
              <input
                id={`balance-${key}`}
                type="range"
                min="0"
                max="100"
                step="5"
                value={value[key]}
                onChange={(e) => handleSliderChange(key, parseInt(e.target.value, 10))}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={value[key]}
                aria-valuetext={`${value[key]} percent`}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-950"
                style={{
                  background: `linear-gradient(to right, var(--tw-gradient-stops))`,
                  // Note: Customizing the track fill in a standard cross-browser way using inline styles is tricky with native inputs.
                  // We rely on standard Tailwind utilities and basic appearance-none for a clean accessible slider.
                }}
              />
              {/* Overlay active track visually */}
              <div 
                className={cn("absolute left-0 h-2 rounded-l-lg pointer-events-none", color)}
                style={{ width: `${value[key]}%` }}
                aria-hidden="true"
              />
            </div>
          </div>
        ))}

        <div className="pt-4 mt-2 border-t border-zinc-800/50">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-zinc-300">
              Current balance total: <span className={cn(isBalanced ? "text-indigo-400" : "text-zinc-200")}>{total}%</span>
            </span>
          </div>
          <p className={cn("text-xs", isBalanced ? "text-indigo-400" : "text-zinc-500")}>
            {isBalanced
              ? "Balanced total"
              : "This local preview does not need to total 100%, but a balanced mix is easier to understand."}
          </p>
        </div>
      </div>
    </div>
  );
}
