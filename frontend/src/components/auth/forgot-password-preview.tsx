"use client";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

export interface ForgotPasswordPreviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ForgotPasswordPreview({ open, onOpenChange }: ForgotPasswordPreviewProps) {
  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="Password reset is coming later"
      description="This is a frontend prototype. No reset email will be sent, and no account information will be requested or stored."
      footer={
        <Button variant="primary" onClick={() => onOpenChange(false)} className="w-full sm:w-auto font-semibold">
          Got it
        </Button>
      }
    />
  );
}
