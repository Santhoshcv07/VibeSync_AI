"use client";

import { useState } from "react";
import {
  AppShell,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarSection,
  SidebarNav,
  SidebarNavItem,
  Topbar,
  MobileNav,
  MobileNavItem,
  PageHeader,
  SectionHeader,
  Tabs,
  TabList,
  Tab,
  TabPanel
} from "@/components/navigation";
import { Button } from "@/components/ui";

const Icons = {
  Home: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
  ),
  Compass: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
  ),
  Library: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 6 4 14"/><path d="M12 6v14"/><path d="M8 8v12"/><path d="M4 4v16"/></svg>
  ),
  History: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>
  ),
  Settings: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
  ),
  Logo: (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
  ),
  Menu: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
  )
};

export default function NavigationPreviewPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [activeNav, setActiveNav] = useState("overview");

  return (
    <AppShell
      sidebar={
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-3">
              {Icons.Logo}
              <span className="font-display font-bold text-title-md tracking-tight">VibeSync</span>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarSection>
              <SidebarNav>
                <SidebarNavItem
                  href="#"
                  label="Overview"
                  icon={Icons.Home}
                  active={activeNav === "overview"}
                  onClick={() => setActiveNav("overview")}
                />
                <SidebarNavItem
                  href="#"
                  label="Discover"
                  icon={Icons.Compass}
                  active={activeNav === "discover"}
                  onClick={() => setActiveNav("discover")}
                />
              </SidebarNav>
            </SidebarSection>

            <SidebarSection title="Your Collection">
              <SidebarNav>
                <SidebarNavItem
                  href="#"
                  label="Library"
                  icon={Icons.Library}
                  active={activeNav === "library"}
                  onClick={() => setActiveNav("library")}
                />
                <SidebarNavItem
                  href="#"
                  label="History"
                  icon={Icons.History}
                  active={activeNav === "history"}
                  onClick={() => setActiveNav("history")}
                />
                <SidebarNavItem
                  href="#"
                  label="Disabled Link"
                  icon={Icons.Settings}
                  disabled
                />
              </SidebarNav>
            </SidebarSection>
          </SidebarContent>

          <SidebarFooter>
            <SidebarNav>
              <SidebarNavItem
                href="#"
                label="Settings"
                icon={Icons.Settings}
                active={activeNav === "settings"}
                onClick={() => setActiveNav("settings")}
              />
            </SidebarNav>
          </SidebarFooter>
        </Sidebar>
      }
      topbar={
        <Topbar
          start={
            <>
              <button className="lg:hidden p-2 -ml-2 text-foreground-muted" aria-label="Open menu">
                {Icons.Menu}
              </button>
              <span className="font-display font-semibold lg:hidden">Navigation Preview</span>
            </>
          }
          end={
            <Button size="sm" variant="outline">Sign Out</Button>
          }
        />
      }
      mobileNav={
        <MobileNav>
          <MobileNavItem
            href="#"
            label="Overview"
            icon={Icons.Home}
            active={activeNav === "overview"}
            onClick={() => setActiveNav("overview")}
          />
          <MobileNavItem
            href="#"
            label="Discover"
            icon={Icons.Compass}
            active={activeNav === "discover"}
            onClick={() => setActiveNav("discover")}
          />
          <MobileNavItem
            href="#"
            label="Library"
            icon={Icons.Library}
            active={activeNav === "library"}
            onClick={() => setActiveNav("library")}
          />
          <MobileNavItem
            href="#"
            label="Settings"
            icon={Icons.Settings}
            active={activeNav === "settings"}
            onClick={() => setActiveNav("settings")}
          />
        </MobileNav>
      }
    >
      <div className="flex flex-col gap-10 p-4 md:p-8 lg:p-10 max-w-6xl mx-auto w-full">

        <PageHeader
          eyebrow="Internal VibeSync Design-System"
          title="Navigation Foundations"
          description="A preview of the layout shell, sidebar, topbar, mobile nav, page headers, and tabs working together natively."
          actions={
            <>
              <Button variant="outline">Cancel</Button>
              <Button variant="primary">Create Action</Button>
            </>
          }
        />

        <div className="flex flex-col gap-6">
          <SectionHeader
            headingLevel={2}
            title="Interactive Tabs Example"
            description="Use keyboard arrows, Home, and End to navigate when focused."
            action={<Button size="sm" variant="ghost">View All</Button>}
          />

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabList>
              <Tab value="overview">Overview</Tab>
              <Tab value="activity">Activity</Tab>
              <Tab value="preferences">Preferences</Tab>
              <Tab value="disabled" disabled>Disabled</Tab>
            </TabList>

            <TabPanel value="overview">
              <div className="h-40 border border-dashed border-[var(--border)] rounded-md flex items-center justify-center text-foreground-muted">
                Overview Panel Content
              </div>
            </TabPanel>

            <TabPanel value="activity">
              <div className="h-40 border border-dashed border-[var(--border)] rounded-md flex items-center justify-center text-foreground-muted">
                Activity Panel Content
              </div>
            </TabPanel>

            <TabPanel value="preferences">
              <div className="h-40 border border-dashed border-[var(--border)] rounded-md flex items-center justify-center text-foreground-muted">
                Preferences Panel Content
              </div>
            </TabPanel>
          </Tabs>
        </div>

        <div className="flex flex-col gap-6">
          <SectionHeader
            headingLevel={3}
            title="Heading Level 3 Example"
            description="Use this for smaller sub-sections inside the layout hierarchy."
          />
          <div className="h-64 border border-[var(--border)] bg-[var(--surface)] rounded-[var(--radius-lg)] flex flex-col items-center justify-center gap-4 text-center p-6">
            <span className="text-body text-foreground-muted">
              Scroll down to see the mobile navigation behavior (if viewport is small enough).
            </span>
          </div>
          <div className="h-64 border border-[var(--border)] bg-[var(--surface)] rounded-[var(--radius-lg)]" />
        </div>

      </div>
    </AppShell>
  );
}
