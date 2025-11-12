import React from "react";

export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-neutral-900/50 backdrop-blur-xl border border-white/10 p-4 shadow-lg">
      {children}
    </div>
  );
}
