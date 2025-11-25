"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Landing() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0a0a0f] text-white">
      {/* Background layers */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#1a1a2e_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,#0d1117_0%,transparent_40%)]" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[url('/stars.svg')] opacity-20"
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-16 sm:px-12 sm:py-24">
        {/* Header */}
        <header className="mb-20 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 text-xs uppercase tracking-[0.5em] text-cyan-400/60"
          >
            St. John&apos;s, Newfoundland
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-['Eurostile',_sans-serif] text-5xl font-light tracking-wide text-white sm:text-6xl md:text-7xl"
          >
            Snow White Laundry
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 max-w-2xl mx-auto text-lg leading-relaxed text-white/70"
          >
            An experience shaped with intention, emotion, and craft.
          </motion.p>
        </header>

        {/* Ethos Sections */}
        <div className="space-y-16 mb-24">
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 sm:p-12 backdrop-blur-sm"
          >
            <h2 className="text-2xl font-light mb-4 text-white/90">Intention</h2>
            <p className="text-white/60 leading-relaxed">
              Every detail is considered. Every moment is designed. We create experiences that honor
              the craft of hospitality, where each interaction is meaningful and each dish tells a story.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 sm:p-12 backdrop-blur-sm"
          >
            <h2 className="text-2xl font-light mb-4 text-white/90">Emotion</h2>
            <p className="text-white/60 leading-relaxed">
              Dining is an emotional journey. We curate spaces, flavors, and moments that resonate
              deeply—creating memories that linger long after the last course.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 sm:p-12 backdrop-blur-sm"
          >
            <h2 className="text-2xl font-light mb-4 text-white/90">Craft</h2>
            <p className="text-white/60 leading-relaxed">
              Mastery in the kitchen, precision in service, artistry in presentation. We honor traditional
              techniques while embracing innovation, always in pursuit of excellence.
            </p>
          </motion.section>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center space-y-6"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/customer/events"
              className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-8 py-4 text-sm uppercase tracking-[0.2em] text-cyan-400 transition-all hover:border-cyan-400/50 hover:bg-cyan-400/20"
            >
              Reserve Private Experience
            </Link>
            <Link
              href="/gate"
              className="rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm uppercase tracking-[0.2em] text-white/70 transition-all hover:border-white/40 hover:bg-white/10"
            >
              Sign In
            </Link>
          </div>
        </motion.div>

        {/* Footer */}
        <footer className="mt-32 border-t border-white/10 pt-8">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-white/30">
            <p>Snow White Laundry</p>
            <p className="text-white/20">
              Powered by{" "}
              <a
                href="https://openpeople.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white/60 transition-colors"
              >
                Open People
              </a>
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
