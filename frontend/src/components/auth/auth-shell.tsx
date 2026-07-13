import { type ReactNode } from "react";
import { AuthBrandPanel } from "./auth-brand-panel";

export interface AuthShellProps {
  children: ReactNode;
}

export function AuthShell({ children }: AuthShellProps) {
  return (
    <div className="flex h-screen w-full bg-[#090314] relative overflow-hidden">
      {/* Cinematic Background */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-80"
        style={{ backgroundImage: "url('/assets/bg-mountain.jpg')" }}
      >
        {/* Deep gradient overlay to blend into the brand colors */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#090314] via-[#090314]/80 to-[#1e0a45]/40"></div>
      </div>

      <div className="relative z-10 flex w-full flex-col lg:flex-row h-screen overflow-hidden">
        <AuthBrandPanel />
        <div className="flex flex-1 flex-col justify-center p-4 sm:p-6 lg:p-4 xl:p-8 overflow-y-auto custom-scrollbar">
          <div className="relative z-10 w-full flex items-center justify-center min-h-fit">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
