import { type ReactNode } from "react";

interface DeepSpaceBackgroundProps {
  children?: ReactNode;
}

export function DeepSpaceBackground({ children }: DeepSpaceBackgroundProps) {
  return (
    <div
      style={{
        background: "radial-gradient(circle at center, #0C0F17, #000000 70%)",
        minHeight: "100vh",
        overflow: "hidden",
        position: "relative",
        color: "#EAFBFF",
        fontFamily: "'Inter', 'Space Grotesk', sans-serif",
      }}
    >
      {children}
    </div>
  );
}
