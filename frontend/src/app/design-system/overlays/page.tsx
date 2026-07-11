"use client";

import { useState, useRef } from "react";
import { AppShell, PageHeader, SectionHeader } from "@/components/navigation";
import { Button, IconButton, Modal, Drawer, DropdownMenu, DropdownMenuItem, Tooltip } from "@/components/ui";

const Icons = {
  More: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>,
  Copy: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>,
  Archive: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="5" x="2" y="4" rx="1"/><path d="M4 9v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9"/><path d="M10 13h4"/></svg>,
  Trash: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>,
  Info: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
};

export default function OverlaysPreviewPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSize, setModalSize] = useState<"sm" | "md" | "lg">("md");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerSide, setDrawerSide] = useState<"left" | "right" | "bottom">("right");

  const focusRef = useRef<HTMLButtonElement>(null);

  const openModal = (size: "sm" | "md" | "lg") => {
    setModalSize(size);
    setModalOpen(true);
  };

  const openDrawer = (side: "left" | "right" | "bottom") => {
    setDrawerSide(side);
    setDrawerOpen(true);
  };

  return (
    <AppShell>
      <div className="flex flex-col gap-10 p-4 md:p-8 lg:p-10 max-w-6xl mx-auto w-full">
        <PageHeader
          eyebrow="Internal VibeSync Design-System preview"
          title="Overlay Foundations"
          description="A preview of the Modal, Drawer, Dropdown Menu, and Tooltip contextual interfaces."
        />

        <div className="flex flex-col gap-6">
          <SectionHeader headingLevel={2} title="Modal Component" />
          <div className="flex flex-wrap gap-4">
            <Button onClick={() => openModal("sm")}>Small Modal</Button>
            <Button onClick={() => openModal("md")}>Medium Modal</Button>
            <Button onClick={() => openModal("lg")}>Large Modal</Button>
            <Button onClick={() => setModalOpen(true)}>Modal with Initial Focus</Button>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <SectionHeader headingLevel={2} title="Drawer Component" />
          <div className="flex flex-wrap gap-4">
            <Button onClick={() => openDrawer("left")}>Left Drawer</Button>
            <Button onClick={() => openDrawer("right")}>Right Drawer</Button>
            <Button onClick={() => openDrawer("bottom")}>Bottom Drawer</Button>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <SectionHeader headingLevel={2} title="Dropdown Menu" />
          <div className="flex flex-wrap gap-8 items-start">
            <DropdownMenu
              align="start"
              side="bottom"
              trigger={<Button variant="outline">Start Aligned</Button>}
            >
              <DropdownMenuItem icon={Icons.Copy}>Duplicate</DropdownMenuItem>
              <DropdownMenuItem icon={Icons.Archive}>Archive</DropdownMenuItem>
              <DropdownMenuItem icon={Icons.Trash} disabled>Remove (Disabled)</DropdownMenuItem>
              <DropdownMenuItem icon={Icons.Trash} danger>Remove</DropdownMenuItem>
            </DropdownMenu>

            <DropdownMenu
              align="end"
              side="top"
              trigger={<Button variant="outline">End Aligned (Top)</Button>}
            >
              <DropdownMenuItem inset>Option 1</DropdownMenuItem>
              <DropdownMenuItem inset>Option 2</DropdownMenuItem>
              <DropdownMenuItem inset>Option 3</DropdownMenuItem>
            </DropdownMenu>

            <DropdownMenu
              trigger={
                <IconButton label="More options" variant="ghost">
                  {Icons.More}
                </IconButton>
              }
            >
              <DropdownMenuItem icon={Icons.Copy}>Duplicate</DropdownMenuItem>
              <DropdownMenuItem icon={Icons.Archive}>Archive</DropdownMenuItem>
              <DropdownMenuItem icon={Icons.Trash} danger>Remove</DropdownMenuItem>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <SectionHeader headingLevel={2} title="Tooltip Component" />
          <div className="flex flex-wrap gap-12 pt-8">
            <Tooltip content="Tooltip on the top" side="top">
              <Button variant="outline">Top Tooltip</Button>
            </Tooltip>

            <Tooltip content="Tooltip on the right" side="right">
              <Button variant="outline">Right Tooltip</Button>
            </Tooltip>

            <Tooltip content="Tooltip on the bottom" side="bottom">
              <Button variant="outline">Bottom Tooltip</Button>
            </Tooltip>

            <Tooltip content="Tooltip on the left" side="left">
              <Button variant="outline">Left Tooltip</Button>
            </Tooltip>

            <Tooltip content="Focus over me using Tab" side="top">
              <IconButton label="Info" variant="ghost">
                {Icons.Info}
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </div>

      <Modal
        open={modalOpen}
        onOpenChange={setModalOpen}
        size={modalSize}
        title="Example Modal Dialog"
        description="This is a demonstration of the modal foundation. It traps focus correctly."
        initialFocusRef={focusRef}
        footer={
          <>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button ref={focusRef} variant="primary" onClick={() => setModalOpen(false)}>Confirm Action</Button>
          </>
        }
      >
        <div className="space-y-4 text-foreground-muted">
          <p>
            Modals provide contextual overlays to interrupt the user workflow for critical confirmations or detailed configurations without losing the underlying context.
          </p>
          <p>
            You can use the <strong>Tab</strong> key to navigate through focusable elements. It should stay trapped inside this dialog until you press <strong>Escape</strong> or close it.
          </p>
        </div>
      </Modal>

      <Drawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        side={drawerSide}
        title={`${drawerSide.charAt(0).toUpperCase() + drawerSide.slice(1)} Drawer Panel`}
        description="Drawers slide in from the edge of the viewport. Often used for mobile navigation or configuration."
        footer={
          <Button className="w-full" variant="primary" onClick={() => setDrawerOpen(false)}>Apply Changes</Button>
        }
      >
        <div className="space-y-4 text-foreground-muted">
          <p>
            Scroll down to test internal scrolling. The body scroll is locked behind the scenes.
          </p>
          <div className="h-[120dvh] border-2 border-dashed border-[var(--border)] rounded-md flex flex-col items-center justify-between p-4">
            <span>Top of content</span>
            <span>Middle of content</span>
            <span>Bottom of content</span>
          </div>
        </div>
      </Drawer>

    </AppShell>
  );
}
