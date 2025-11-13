"use client";

import { useState } from "react";
import BootSequence from "@/components/boot/BootSequence";
import AgentDashboard from "@/components/dashboard/AgentDashboard";
import AgentOrbitMap from "@/components/orbit/AgentOrbitMap";
import CortexTerminal from "@/components/terminal/CortexTerminal";

export default function ConsolePage() {
  const [booted, setBooted] = useState(false);

  return (
    <div style={{ background: "black", minHeight: "100vh", color: "white" }}>
      {!booted && <BootSequence onFinish={() => setBooted(true)} />}

      {booted && (
        <div style={{ padding: 40, display: "grid", gap: 32 }}>
          <h1 style={{ fontSize: 32 }}>CortexOS Console</h1>

          <section>
            <h2 style={{ marginBottom: 12, fontSize: 20 }}>Agent Orbit Map</h2>
            <AgentOrbitMap />
          </section>

          <section
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1fr)",
              gap: 24,
            }}
          >
            <div>
              <h2 style={{ marginBottom: 12, fontSize: 20 }}>Agent Activity</h2>
              <AgentDashboard />
            </div>
            <div>
              <h2 style={{ marginBottom: 12, fontSize: 20 }}>CortexOS Terminal</h2>
              <CortexTerminal />
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
