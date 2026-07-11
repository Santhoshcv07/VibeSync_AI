"use client";

import React, {
  forwardRef,
  useState,
  useRef,
  useEffect,
  cloneElement,
  type ReactElement,
  type ReactNode,
  type ButtonHTMLAttributes,
  type KeyboardEvent
} from "react";
import { Portal } from "./portal";
import { cn } from "@/lib/cn";
import { getFocusableElements } from "@/lib/overlay";

export interface DropdownMenuProps {
  trigger: ReactElement;
  children: ReactNode;
  align?: "start" | "end";
  side?: "top" | "bottom";
  label?: string;
  className?: string;
}

export const DropdownMenu = ({
  trigger,
  children,
  align = "end",
  side = "bottom",
  label,
  className
}: DropdownMenuProps) => {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0, height: 0 });
  const triggerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const updateCoords = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setCoords({
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
      width: rect.width,
      height: rect.height,
    });
  };

  useEffect(() => {
    if (open) {
      updateCoords();
      window.addEventListener("resize", updateCoords);
      window.addEventListener("scroll", updateCoords, true);
    }
    return () => {
      window.removeEventListener("resize", updateCoords);
      window.removeEventListener("scroll", updateCoords, true);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node) &&
          triggerRef.current && !triggerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      } else if (e.key === "Tab") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (open && menuRef.current) {
      const focusables = getFocusableElements(menuRef.current);
      if (focusables.length > 0) {
        focusables[0].focus();
      } else {
        menuRef.current.focus();
      }
    }
  }, [open]);

  const handleTriggerClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const props = trigger.props as any;
    if (props.onClick) {
      props.onClick(e);
      if (e.defaultPrevented) return;
    }
    setOpen((prev) => !prev);
  };

  const handleTriggerKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const props = trigger.props as any;
    if (props.onKeyDown) {
      props.onKeyDown(e);
      if (e.defaultPrevented) return;
    }
    if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      setOpen(true);
    }
  };

  const handleRef = React.useCallback((node: HTMLElement) => {
    triggerRef.current = node;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const originalRef = (trigger as unknown as { ref?: React.Ref<HTMLElement> }).ref || (trigger.props as any).ref;
    if (originalRef) {
      if (typeof originalRef === "function") {
        originalRef(node);
      } else if (originalRef && typeof originalRef === "object" && "current" in originalRef) {
        Object.assign(originalRef, { current: node });
      }
    }
  }, [trigger]);

  // eslint-disable-next-line react-hooks/refs, @typescript-eslint/no-explicit-any
  const clonedTrigger = cloneElement(trigger as ReactElement<any>, {
    ref: handleRef,
    onClick: handleTriggerClick,
    onKeyDown: handleTriggerKeyDown,
    "aria-haspopup": "menu",
    "aria-expanded": open,
  });

  const getMenuStyles = () => {
    const style: React.CSSProperties = {
      position: "absolute",
    };

    // Calculate vertical position
    if (side === "top") {
      style.bottom = `${window.innerHeight - coords.top + 8}px`; // 8px gap
    } else {
      style.top = `${coords.top + coords.height + 8}px`;
    }

    // Calculate horizontal position
    if (align === "start") {
      style.left = `${coords.left}px`;
    } else {
      style.right = `${window.innerWidth - coords.left - coords.width}px`;
    }

    return style;
  };

  const handleMenuKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!menuRef.current) return;

    const focusables = getFocusableElements(menuRef.current);
    if (focusables.length === 0) return;

    const currentIndex = focusables.findIndex(el => el === document.activeElement);

    let nextIndex = currentIndex;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      nextIndex = currentIndex < focusables.length - 1 ? currentIndex + 1 : 0;
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      nextIndex = currentIndex > 0 ? currentIndex - 1 : focusables.length - 1;
    } else if (e.key === "Home") {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      nextIndex = focusables.length - 1;
    }

    if (nextIndex !== currentIndex && focusables[nextIndex]) {
      focusables[nextIndex].focus();
    }
  };

  return (
    <>
      {clonedTrigger}
      {open && (
        <Portal>
          <div
            ref={menuRef}
            role="menu"
            aria-label={label}
            tabIndex={-1}
            style={getMenuStyles()}
            onKeyDown={handleMenuKeyDown}
            className={cn(
              "z-50 min-w-[12rem] overflow-hidden rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-elevated)] p-1 shadow-md animate-modal-scale outline-none",
              className
            )}
            onClick={(e) => {
              const target = e.target as HTMLElement;
              const item = target.closest('[role="menuitem"]');
              if (item && !item.hasAttribute("disabled") && !item.hasAttribute("aria-disabled")) {
                setOpen(false);
                triggerRef.current?.focus();
              }
            }}
          >
            {children}
          </div>
        </Portal>
      )}
    </>
  );
};

export interface DropdownMenuItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  inset?: boolean;
  danger?: boolean;
  icon?: ReactNode;
}

export const DropdownMenuItem = forwardRef<HTMLButtonElement, DropdownMenuItemProps>(
  ({ className, inset, danger, icon, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        role="menuitem"
        type="button"
        disabled={disabled}
        aria-disabled={disabled}
        className={cn(
          "relative flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-body-sm outline-none transition-colors",
          "focus:bg-[var(--surface-floating)] focus:text-foreground hover:bg-[var(--surface-floating)] hover:text-foreground",
          inset && "pl-8",
          danger ? "text-[var(--danger)] focus:text-[var(--danger)]" : "text-foreground",
          disabled && "opacity-50 pointer-events-none cursor-not-allowed",
          className
        )}
        {...props}
      >
        {icon && (
          <span className="shrink-0 flex items-center justify-center w-4 h-4">
            {icon}
          </span>
        )}
        <span className="flex-1 text-left truncate">{children}</span>
      </button>
    );
  }
);
DropdownMenuItem.displayName = "DropdownMenuItem";
