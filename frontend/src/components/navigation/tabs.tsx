"use client";

import {
  createContext,
  useContext,
  forwardRef,
  useRef,
  useId,
  type HTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
  type KeyboardEvent
} from "react";
import { cn } from "@/lib/cn";

export interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: ReactNode;
  className?: string;
}

const TabsContext = createContext<{
  value: string;
  onValueChange: (value: string) => void;
  baseId: string;
} | null>(null);

function useTabs() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within a Tabs provider");
  }
  return context;
}

export function Tabs({ value, onValueChange, children, className }: TabsProps) {
  const baseId = useId();
  return (
    <TabsContext.Provider value={{ value, onValueChange, baseId }}>
      <div className={cn("flex flex-col w-full", className)}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export type TabListProps = HTMLAttributes<HTMLDivElement>;

export const TabList = forwardRef<HTMLDivElement, TabListProps>(
  ({ className, children, ...props }, ref) => {
    const listRef = useRef<HTMLDivElement | null>(null);

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
      const list = listRef.current;
      if (!list) return;

      const tabs = Array.from(list.querySelectorAll('[role="tab"]:not([aria-disabled="true"])')) as HTMLButtonElement[];
      if (tabs.length === 0) return;

      const currentIndex = tabs.findIndex(tab => tab === document.activeElement);
      if (currentIndex === -1) return;

      let nextIndex = currentIndex;

      if (e.key === "ArrowRight") {
        nextIndex = (currentIndex + 1) % tabs.length;
        e.preventDefault();
      } else if (e.key === "ArrowLeft") {
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        e.preventDefault();
      } else if (e.key === "Home") {
        nextIndex = 0;
        e.preventDefault();
      } else if (e.key === "End") {
        nextIndex = tabs.length - 1;
        e.preventDefault();
      }

      if (nextIndex !== currentIndex) {
        tabs[nextIndex].focus();
      }
    };

    return (
      <div
        ref={(node) => {
          listRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        role="tablist"
        onKeyDown={handleKeyDown}
        className={cn(
          "flex items-center gap-6 border-b border-[var(--border)] overflow-x-auto no-scrollbar",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TabList.displayName = "TabList";

export interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export const Tab = forwardRef<HTMLButtonElement, TabProps>(
  ({ className, value, disabled, ...props }, ref) => {
    const { value: selectedValue, onValueChange, baseId } = useTabs();
    const isSelected = selectedValue === value;
    const tabId = `${baseId}-tab-${value}`;
    const panelId = `${baseId}-panel-${value}`;

    return (
      <button
        ref={ref}
        id={tabId}
        type="button"
        role="tab"
        aria-selected={isSelected}
        aria-disabled={disabled}
        aria-controls={panelId}
        disabled={disabled}
        tabIndex={isSelected ? 0 : -1}
        onClick={() => {
          if (!disabled) onValueChange(value);
        }}
        className={cn(
          "relative flex items-center justify-center px-1 py-3 text-body-sm font-medium transition-colors whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--primary)] rounded-sm",
          isSelected
            ? "text-[var(--primary)]"
            : "text-foreground-muted hover:text-foreground",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        {...props}
      >
        {props.children}
        {isSelected && (
          <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-[var(--primary)] rounded-t-full" />
        )}
      </button>
    );
  }
);
Tab.displayName = "Tab";

export interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(
  ({ className, value, children, ...props }, ref) => {
    const { value: selectedValue, baseId } = useTabs();
    const isSelected = selectedValue === value;
    const tabId = `${baseId}-tab-${value}`;
    const panelId = `${baseId}-panel-${value}`;

    if (!isSelected) {
      return null;
    }

    return (
      <div
        ref={ref}
        id={panelId}
        role="tabpanel"
        aria-labelledby={tabId}
        tabIndex={0}
        className={cn("pt-6 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--primary)] rounded-md", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TabPanel.displayName = "TabPanel";
