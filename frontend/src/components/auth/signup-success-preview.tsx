"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useEffect, useRef } from "react";

export interface SignupSuccessPreviewProps {
  onReset: () => void;
}

export function SignupSuccessPreview({ onReset }: SignupSuccessPreviewProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (headingRef.current) {
      headingRef.current.focus();
    }
  }, []);

  return (
    <Card className="w-full p-8 text-center flex flex-col items-center animate-fade-in bg-[var(--surface-elevated)] border-[var(--border)]">
      <Badge variant="info" className="mb-6 tracking-widest font-bold">LOCAL PROTOTYPE</Badge>
      
      <div className="w-16 h-16 bg-[rgba(52,211,153,0.1)] text-[var(--success)] rounded-full flex items-center justify-center mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      </div>

      <h2 
        ref={headingRef}
        tabIndex={-1}
        className="text-heading-3 font-display font-semibold text-foreground mb-4 focus:outline-none"
      >
        Prototype preview complete
      </h2>
      
      <p className="text-body text-foreground-muted mb-8 max-w-sm mx-auto">
        Your signup details passed local validation. No account was created and no information was sent or stored.
      </p>

      <div className="flex flex-col gap-3 w-full">
        <Button asChild variant="primary" fullWidth className="font-semibold">
<Link href="/login">
            Continue to Login
          </Link>
</Button>
        <Button variant="outline" fullWidth onClick={onReset}>
          Return to Form
        </Button>
      </div>
    </Card>
  );
}
