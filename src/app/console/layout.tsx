import type { ReactNode } from "react";

export default function ConsoleLayout({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        background: "radial-gradient(circle at center, #020205 0%, #000000 80%)",
        minHeight: "100vh",
        padding: "40px",
        color: "white",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div
        style={{
          border: "1px solid rgba(0,243,255,0.15)",
          borderRadius: 18,
          padding: 30,
          backdropFilter: "blur(14px)",
          background: "rgba(255,255,255,0.03)",
          boxShadow: "0 0 60px rgba(0,243,255,0.1)",
        }}
      >
        {children}
      </div>
    </div>
  );
}
