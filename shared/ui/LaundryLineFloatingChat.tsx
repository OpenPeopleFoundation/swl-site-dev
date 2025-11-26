"use client";

import { LaundryLineChatModal, useLaundryLineChat } from "@/components/LaundryLineChat";

export function LaundryLineFloatingChat() {
  const controller = useLaundryLineChat("floating-laundry-line");

  return (
    <>
      <button
        type="button"
        onClick={controller.open}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-3 rounded-[22px] border border-white/20 bg-black/65 px-5 py-3 text-[0.6rem] uppercase tracking-[0.45em] text-white/80 shadow-[0_25px_80px_rgba(0,0,0,0.65)] backdrop-blur-xl transition hover:border-white/60 hover:text-white md:bottom-8 md:right-8"
      >
        <span className="h-2 w-2 rounded-full bg-white/80 shadow-[0_0_12px_rgba(255,255,255,0.7)]" />
        Laundry Line
      </button>
      <LaundryLineChatModal controller={controller} />
    </>
  );
}

export default LaundryLineFloatingChat;

