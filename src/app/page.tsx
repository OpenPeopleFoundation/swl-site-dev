"use client";

import { useEffect, useState } from "react";
import BootSequence from "@/components/boot/BootSequence";

export default function Landing() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 4500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {!ready && <BootSequence />}
      {ready && (
        <div
          style={{
            minHeight: "100vh",
            background: "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#00F3FF",
            fontSize: 28,
          }}
        >
          Welcome to Open People.
        </div>
      )}
    </div>
  );
}
