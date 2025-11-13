"use client";

import { useEffect, useState, type CSSProperties } from "react";

const keyframes = `@keyframes bootSpin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@keyframes bootPulse {
  0% { transform: scale(0.9); opacity: 0.6; }
  50% { transform: scale(1); opacity: 1; }
  100% { transform: scale(0.9); opacity: 0.6; }
}`;

function injectKeyframes() {
  if (typeof document === "undefined") return;
  if (document.getElementById("boot-sequence-keyframes")) return;
  const style = document.createElement("style");
  style.id = "boot-sequence-keyframes";
  style.innerHTML = keyframes;
  document.head.appendChild(style);
}

const baseStyles = {
  container: {
    position: "fixed",
    inset: 0,
    background: "black",
    overflow: "hidden" as const,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  eventHorizon: {
    position: "absolute" as const,
    width: "200vw",
    height: "200vw",
    borderRadius: "50%",
    background: "radial-gradient(circle, #0C0F17 0%, #000000 70%, #000000 100%)",
    animation: "bootSpin 40s linear infinite",
    opacity: 0.5,
  },
  glowRing: {
    position: "absolute" as const,
    width: 700,
    height: 700,
    borderRadius: "50%",
    border: "2px solid rgba(0,243,255,0.15)",
    boxShadow: "0 0 120px rgba(0,243,255,0.3)",
    animation: "bootPulse 7s infinite ease-in-out",
  },
  panel: {
    position: "relative" as const,
    width: "80%",
    maxWidth: 600,
    padding: 30,
    borderRadius: 12,
    background: "rgba(255,255,255,0.03)",
    backdropFilter: "blur(14px)",
    border: "1px solid rgba(0,243,255,0.2)",
    boxShadow: "0 0 50px rgba(0,243,255,0.1)",
  },
  title: {
    color: "white",
    fontSize: 32,
    marginBottom: 20,
    fontFamily: "Eurostile, sans-serif",
    letterSpacing: 2,
  },
  logWindow: {
    fontFamily: "monospace",
    fontSize: 14,
    color: "#00F3FF",
    height: 220,
    overflow: "hidden" as const,
    marginBottom: 20,
  },
  logLine: {
    marginBottom: 4,
    whiteSpace: "pre-wrap" as const,
  },
  statusBar: {
    textAlign: "center" as const,
    color: "white",
    opacity: 0.7,
    letterSpacing: 3,
  },
} satisfies Record<string, CSSProperties>;

export default function BootSequence({ onFinish }: { onFinish?: () => void }) {
  const [logs, setLogs] = useState<string[]>([]);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    injectKeyframes();

    let isMounted = true;

    const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

    async function run() {
      const push = (msg: string) => {
        if (!isMounted) return;
        setLogs((prev) => [...prev, msg].slice(-12));
      };

      push("[CORTEXOS] Initializing deep-space substrate…");
      await delay(600);

      push("[SYSTEM] Establishing gravitational shell…");
      await delay(800);

      push("[VISUAL KERNEL] Loading event-horizon shaders…");
      await delay(600);

      push("[AGENT NET] Checking UI Agent… ONLINE");
      await delay(300);

      push("[AGENT NET] Checking Content Agent… ONLINE");
      await delay(300);

      push("[AGENT NET] Checking Schema Agent… ONLINE");
      await delay(300);

      push("[AGENT NET] Checking Functionality Agent… ONLINE");
      await delay(300);

      push("[AGENT NET] Checking Debugger Agent… ONLINE");
      await delay(600);

      push("[QUEUE] Idle");
      await delay(400);

      push("[OVERSEER] Standing by");
      await delay(400);

      if (!isMounted) return;
      setPhase(1);
      await delay(800);

      push("[BOOT] All systems nominal.");
      await delay(1000);

      if (!isMounted) return;
      setPhase(2);
      await delay(500);

      if (!isMounted) return;
      onFinish?.();
    }

    run();

    return () => {
      isMounted = false;
    };
  }, [onFinish]);

  return (
    <div style={baseStyles.container}>
      <div style={baseStyles.eventHorizon} />
      <div style={baseStyles.glowRing} />

      <div style={baseStyles.panel}>
        <h1 style={baseStyles.title}>
          CORTEX<span style={{ color: "#00F3FF" }}>OS</span>
        </h1>

        <div style={baseStyles.logWindow}>
          {logs.map((line, idx) => (
            <div key={idx} style={baseStyles.logLine}>
              {line}
            </div>
          ))}
        </div>

        <div style={baseStyles.statusBar}>
          {phase === 0 && "BOOTING"}
          {phase === 1 && "INITIALIZING INTERFACE"}
          {phase === 2 && "READY"}
        </div>
      </div>
    </div>
  );
}
