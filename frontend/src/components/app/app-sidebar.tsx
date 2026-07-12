import { VibeSyncBrand } from "@/components/marketing/vibesync-brand";
import { AppNavigation, primaryNavigation, secondaryNavigation } from "./app-navigation";
import { Badge } from "@/components/ui/badge";
import { BackendHealthStatus } from "./backend-health-status";

export function AppSidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-64 border-r border-[var(--border)] bg-[var(--surface)] shrink-0 h-screen sticky top-0">
      <div className="h-16 flex items-center px-6 shrink-0">
        <VibeSyncBrand />
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-6">
        <div>
          <AppNavigation items={primaryNavigation} aria-label="Primary application navigation" />
        </div>

        <div>
          <AppNavigation items={secondaryNavigation} aria-label="Secondary application navigation" />
        </div>
      </div>

      <div className="p-4 border-t border-[var(--border)] shrink-0 bg-[var(--surface-elevated)]">
        <div className="mb-3">
          <Badge variant="info" className="w-fit">Prototype workspace</Badge>
          <div className="sr-only">
            Authentication and personalized account data will be connected in a later phase.
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-caption text-foreground-subtle">
            Built around your mood and your time.
          </p>
          <BackendHealthStatus />
        </div>
      </div>
    </aside>
  );
}
