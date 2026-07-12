import type { ReactNode } from "react";
import { MarketingHeader } from "./marketing-header";
import { MarketingFooter } from "./marketing-footer";

export interface MarketingShellProps {
  children: ReactNode;
}

export function MarketingShell({ children }: MarketingShellProps) {
  return (
    <>
      <MarketingHeader />
      {/* 
        We rely on the outer layout (marketing/layout.tsx) 
        to render the <main id="marketing-main-content"> tag 
        and the skip link.
      */}
      {children}
      <MarketingFooter />
    </>
  );
}
