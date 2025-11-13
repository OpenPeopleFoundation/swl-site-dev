import { type ReactNode } from "react";

interface HoloPanelProps {
  children?: ReactNode;
  padding?: number | string;
}

export function HoloPanel({ children, padding = 24 }: HoloPanelProps) {
  return (
    <div
      style={{
        backdropFilter: "blur(20px)",
        background: "rgba(255, 255, 255, 0.03)",
        border: "1px solid rgba(0, 243, 255, 0.2)",
        borderRadius: "14px",
        padding,
        boxShadow: "0 0 40px rgba(0,243,255,0.06)",
      }}
    >
      {children}
    </div>
  );
}
