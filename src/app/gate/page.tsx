"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { LoginPanel } from "@/components/LoginPanel";
import { useIdleWarp } from "@/hooks/useIdleWarp";

export default function GatePage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-black text-white">
          <p className="text-white/60">Opening gate…</p>
        </main>
      }
    >
      <Gate />
    </Suspense>
  );
}

function Gate() {
  const searchParams = useSearchParams();
  const nextPath = useMemo(() => searchParams.get("next") ?? undefined, [searchParams]);
  const { awake, wakeSignal } = useIdleWarp(15000);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black text-white">
      <WarpBackdrop awake={awake} />
      <AnimatePresence>
        {awake && (
          <motion.div
            key="login-panel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 flex w-full items-center justify-center px-4 py-12"
          >
            <LoginPanel nextPath={nextPath} wakeSignal={wakeSignal} />
          </motion.div>
        )}
      </AnimatePresence>
      {!awake && (
        <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 text-center text-white/60">
          <p className="text-xs uppercase tracking-[0.5em]">Snow White Laundry</p>
          <p className="text-sm text-white/50">Move the cursor or press any key to wake the gate.</p>
        </div>
      )}
    </main>
  );
}

function WarpBackdrop({ awake }: { awake: boolean }) {
  return (
    <>
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(45,104,255,0.25),transparent_55%)]"
        animate={{
          opacity: awake ? 0.8 : 0.4,
          scale: awake ? 1.1 : 1,
        }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[url('/stars.svg')] opacity-40"
        animate={{
          scale: awake ? 1.2 : 1,
          filter: awake ? "blur(0px)" : "blur(2px)",
          backgroundPositionY: awake ? "40%" : "0%",
        }}
        transition={{ duration: 1.2, ease: [0.12, 0.9, 0.39, 1] }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-transparent to-black"
        animate={{ opacity: awake ? 0.3 : 0.6 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
    </>
  );
}
