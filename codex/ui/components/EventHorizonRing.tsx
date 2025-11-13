const pulseKeyframes = `@keyframes eventHorizonPulse {
  0% { transform: scale(0.96); opacity: 0.6; }
  50% { transform: scale(1.02); opacity: 1; }
  100% { transform: scale(0.96); opacity: 0.6; }
}`;

function injectKeyframes() {
  if (typeof document === "undefined") return;
  if (document.getElementById("event-horizon-pulse")) return;
  const style = document.createElement("style");
  style.id = "event-horizon-pulse";
  style.innerHTML = pulseKeyframes;
  document.head.appendChild(style);
}

export function EventHorizonRing({ size = 200 }: { size?: number }) {
  if (typeof window !== "undefined") {
    injectKeyframes();
  }

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        border: "1px solid rgba(155,77,255,0.3)",
        boxShadow: "0 0 90px rgba(155,77,255,0.4)",
        filter: "blur(1px)",
        animation: "eventHorizonPulse 6s ease-in-out infinite",
      }}
    />
  );
}
