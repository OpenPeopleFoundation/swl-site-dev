"use client";

import { useState } from "react";

type ChatInputProps = {
  onSend: (text: string) => Promise<void>;
  disabled?: boolean;
};

export default function ChatInput({ onSend, disabled = false }: ChatInputProps) {
  const [text, setText] = useState("");
  const [isSending, setIsSending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!text.trim() || disabled || isSending) return;
    setIsSending(true);
    try {
      await onSend(text.trim());
      setText("");
    } finally {
      setIsSending(false);
    }
  }

  const isBlocked = disabled || isSending;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 border-t border-white/10 bg-neutral-900/70 px-3 py-3 backdrop-blur-xl"
    >
      <input
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder={
          disabled ? "Sign in to chat with the team…" : "Message Cortex…"
        }
        disabled={isBlocked}
        className="flex-1 rounded-full bg-neutral-800/80 px-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none disabled:opacity-60"
      />
      <button
        type="submit"
        disabled={isBlocked || !text.trim()}
        className="rounded-full bg-[#007aff] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#379eff] disabled:cursor-not-allowed disabled:bg-neutral-700"
      >
        Send
      </button>
    </form>
  );
}
