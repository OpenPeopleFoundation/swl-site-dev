import type { ReactNode } from "react";
import { OpenPeopleFooter } from "@/components/OpenPeopleFooter";

export default function CustomerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a0f] text-white">
      {/* Background layers */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#1a1a2e_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,#0d1117_0%,transparent_40%)]" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[url('/stars.svg')] opacity-20"
      />
      <main className="relative z-10 mx-auto w-full max-w-5xl px-6 py-16 sm:px-12 sm:py-24">
        {children}
        <OpenPeopleFooter />
      </main>
    </div>
  );
}
