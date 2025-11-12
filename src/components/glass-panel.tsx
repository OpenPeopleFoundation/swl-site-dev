"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type GlassPanelProps = {
  title: string;
  children?: ReactNode;
  className?: string;
  delay?: number;
};

export function GlassPanel({
  title,
  children,
  className = "",
  delay = 0,
}: GlassPanelProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20, rotateX: 2 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.9, delay, ease: "easeOut" }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 0 45px rgba(42,99,255,0.35)",
        borderColor: "rgba(42,99,255,0.6)",
      }}
      className={`panel-outline glass-surface animate-float border border-white/10 bg-white/5 backdrop-blur-xl p-8 text-white/80 ${className}`}
    >
      <h2 className="text-xl font-light tracking-[0.25em] text-accent mb-4 uppercase">
        {title}
      </h2>
      <div className="text-sm text-white/70">{children}</div>
    </motion.section>
  );
}

export default GlassPanel;
