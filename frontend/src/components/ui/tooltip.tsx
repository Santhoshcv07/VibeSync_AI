"use client";

import React, {
  useState,
  useRef,
  useEffect,
  cloneElement,
  useId,
  type ReactElement,
  type ReactNode,
  type FocusEvent,
  type MouseEvent
} from "react";
import { Portal } from "./portal";
import { cn } from "@/lib/cn";

export interface TooltipProps {
  content: ReactNode;
  children: ReactElement;
  side?: "top" | "right" | "bottom" | "left";
  delay?: number;
  className?: string;
}

export const Tooltip = ({
  content,
  children,
  side = "top",
  delay = 300,
  className
}: TooltipProps) => {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0, height: 0 });
  const triggerRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const id = useId();

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
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        clearTimeout(timeoutRef.current);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const show = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setOpen(true);
    }, delay);
  };

  const hide = () => {
    clearTimeout(timeoutRef.current);
    setOpen(false);
  };

  const handlePointerEnter = (e: MouseEvent) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const props = children.props as any;
    if (props.onPointerEnter) props.onPointerEnter(e);
    if (!e.defaultPrevented) show();
  };

  const handlePointerLeave = (e: MouseEvent) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const props = children.props as any;
    if (props.onPointerLeave) props.onPointerLeave(e);
    if (!e.defaultPrevented) hide();
  };

  const handleFocus = (e: FocusEvent) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const props = children.props as any;
    if (props.onFocus) props.onFocus(e);
    if (!e.defaultPrevented) show();
  };

  const handleBlur = (e: FocusEvent) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const props = children.props as any;
    if (props.onBlur) props.onBlur(e);
    if (!e.defaultPrevented) hide();
  };

  const handleRef = React.useCallback((node: HTMLElement) => {
    triggerRef.current = node;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const originalRef = (children as unknown as { ref?: React.Ref<HTMLElement> }).ref || (children.props as any).ref;
    if (originalRef) {
      if (typeof originalRef === "function") {
        originalRef(node);
      } else if (originalRef && typeof originalRef === "object" && "current" in originalRef) {
        Object.assign(originalRef, { current: node });
      }
    }
  }, [children]);

  // eslint-disable-next-line react-hooks/refs, @typescript-eslint/no-explicit-any
  const clonedTrigger = cloneElement(children as ReactElement<any>, {
    ref: handleRef,
    onPointerEnter: handlePointerEnter,
    onPointerLeave: handlePointerLeave,
    onFocus: handleFocus,
    onBlur: handleBlur,
    "aria-describedby": open ? id : undefined,
  });

  const getStyles = () => {
    const style: React.CSSProperties = {
      position: "absolute",
    };

    if (side === "top") {
      style.bottom = `${window.innerHeight - coords.top + 8}px`;
      style.left = `${coords.left + coords.width / 2}px`;
      style.transform = "translateX(-50%)";
    } else if (side === "bottom") {
      style.top = `${coords.top + coords.height + 8}px`;
      style.left = `${coords.left + coords.width / 2}px`;
      style.transform = "translateX(-50%)";
    } else if (side === "left") {
      style.right = `${window.innerWidth - coords.left + 8}px`;
      style.top = `${coords.top + coords.height / 2}px`;
      style.transform = "translateY(-50%)";
    } else if (side === "right") {
      style.left = `${coords.left + coords.width + 8}px`;
      style.top = `${coords.top + coords.height / 2}px`;
      style.transform = "translateY(-50%)";
    }

    return style;
  };

  return (
    <>
      {clonedTrigger}
      {open && (
        <Portal>
          <div
            id={id}
            role="tooltip"
            style={getStyles()}
            className={cn(
              "z-50 max-w-xs rounded-[var(--radius-sm)] bg-foreground px-3 py-1.5 text-body-sm font-medium text-background shadow-md animate-overlay-fade pointer-events-none",
              className
            )}
          >
            {content}
          </div>
        </Portal>
      )}
    </>
  );
};
