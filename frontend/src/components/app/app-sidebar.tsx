import { VibeSyncBrand } from "@/components/marketing/vibesync-brand";
import { AppNavigation, primaryNavigation, secondaryNavigation } from "./app-navigation";
import { Switch } from "@/components/ui/switch";

export function AppSidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-64 border-r border-[#37195c] bg-[#080312] shrink-0 h-screen sticky top-0">
      <div className="h-16 flex flex-col justify-center px-6 shrink-0 mt-4">
        <VibeSyncBrand />
        <p className="text-[10px] text-white/50 tracking-wide mt-1 pl-1">
          Your mood. Your universe.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-3 flex flex-col gap-8">
        <div>
          <AppNavigation items={primaryNavigation} aria-label="Primary application navigation" />
        </div>
      </div>

      <div className="px-3 pb-6 shrink-0 flex flex-col gap-1">
        <AppNavigation items={secondaryNavigation} aria-label="Secondary application navigation" />
        
        <div className="flex items-center gap-3 px-3 py-2 mt-2 text-foreground-muted hover:bg-[var(--surface-floating)] hover:text-foreground rounded-md transition-colors cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-foreground-subtle"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
          <Switch id="dark-mode-toggle" defaultChecked={true} label="Dark Mode" className="ml-auto" />
        </div>
      </div>
    </aside>
  );
}
