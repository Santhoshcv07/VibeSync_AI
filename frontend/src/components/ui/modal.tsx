"use client";

import {
  forwardRef,
  useEffect,
  useRef,
  useId,
  type ReactNode,
  type RefObject
} from "react";
import { Portal } from "./portal";
import { IconButton } from "./icon-button";
import { cn } from "@/lib/cn";
import { getFocusableElements, lockBodyScroll } from "@/lib/overlay";

export type ModalSize = "sm" | "md" | "lg";

export interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
  size?: ModalSize;
  closeLabel?: string;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  initialFocusRef?: RefObject<HTMLElement | null>;
  className?: string;
}

const XIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      open,
      onOpenChange,
      title,
      description,
      children,
      footer,
      size = "md",
      closeLabel = "Close dialog",
      closeOnOverlayClick = true,
      closeOnEscape = true,
      initialFocusRef,
      className,
    },
    ref
  ) => {
    const internalRef = useRef<HTMLDivElement>(null);
    const titleId = useId();
    const descId = useId();
    const previousFocusRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
      if (!open) return;

      const unlockScroll = lockBodyScroll();
      previousFocusRef.current = document.activeElement as HTMLElement;

      const container = internalRef.current;
      if (container) {
        if (initialFocusRef?.current) {
          initialFocusRef.current.focus();
        } else {
          const focusables = getFocusableElements(container);
          if (focusables.length > 0) {
            focusables[0].focus();
          } else {
            container.focus();
          }
        }
      }

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape" && closeOnEscape) {
          e.preventDefault();
          onOpenChange(false);
          return;
        }

        if (e.key === "Tab" && container) {
          const focusables = getFocusableElements(container);
          if (focusables.length === 0) {
            e.preventDefault();
            return;
          }

          const first = focusables[0];
          const last = focusables[focusables.length - 1];

          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        unlockScroll();
        if (previousFocusRef.current) {
          previousFocusRef.current.focus();
        }
      };
    }, [open, closeOnEscape, onOpenChange, initialFocusRef]);

    if (!open) return null;

    const sizeClasses = {
      sm: "max-w-md",
      md: "max-w-lg",
      lg: "max-w-2xl",
    };

    return (
      <Portal>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-overlay-fade p-4">
          <div
            className="absolute inset-0"
            aria-hidden="true"
            onClick={() => {
              if (closeOnOverlayClick) onOpenChange(false);
            }}
          />
          <div
            ref={(node) => {
              internalRef.current = node;
              if (typeof ref === 'function') ref(node);
              else if (ref) ref.current = node;
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={description ? descId : undefined}
            tabIndex={-1}
            className={cn(
              "relative flex w-full max-h-[90dvh] flex-col overflow-hidden bg-[var(--surface-elevated)] border border-[var(--border)] rounded-[var(--radius-lg)] shadow-xl animate-modal-scale",
              sizeClasses[size],
              className
            )}
          >
            <div className="flex items-center justify-between p-6 border-b border-[var(--border)] shrink-0 gap-4">
              <div className="flex flex-col gap-1 min-w-0">
                <h2 id={titleId} className="text-title-lg font-display font-semibold leading-tight text-foreground truncate">
                  {title}
                </h2>
                {description && (
                  <p id={descId} className="text-body-sm text-foreground-muted line-clamp-2">
                    {description}
                  </p>
                )}
              </div>
              <IconButton
                variant="ghost"
                size="sm"
                label={closeLabel}
                onClick={() => onOpenChange(false)}
                className="shrink-0 -mr-2"
              >
                {XIcon}
              </IconButton>
            </div>

            {children && (
              <div className="flex-1 overflow-y-auto p-6">
                {children}
              </div>
            )}

            {footer && (
              <div className="flex items-center justify-end gap-3 p-6 border-t border-[var(--border)] shrink-0 bg-[var(--surface)]">
                {footer}
              </div>
            )}
          </div>
        </div>
      </Portal>
    );
  }
);
Modal.displayName = "Modal";
