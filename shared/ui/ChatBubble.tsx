import type { ReactNode } from "react";
import Avatar from "./Avatar";

type ChatBubbleProps = {
  author: string;
  message: ReactNode;
  timestamp?: string;
  align?: "left" | "right";
  avatarSrc?: string;
};

export function ChatBubble({
  author,
  message,
  timestamp,
  align = "left",
  avatarSrc,
}: ChatBubbleProps) {
  const isRight = align === "right";

  return (
    <div
      className={`flex w-full items-start gap-3 ${isRight ? "flex-row-reverse text-right" : "text-left"}`}
      style={{
        fontFamily: "Geist, 'Eurostile', 'Space Grotesk', system-ui, sans-serif",
      }}
    >
      <Avatar
        src={avatarSrc}
        initials={author
          .split(" ")
          .map((token) => token[0])
          .join("")
          .slice(0, 2)
          .toUpperCase()}
        size={40}
      />
      <div className="max-w-xl space-y-1">
        <div className="text-xs uppercase tracking-[0.3em] text-white/50">
          {author}
        </div>
        <div
          className={`rounded-2xl border border-white/10 bg-neutral-900/70 px-4 py-3 text-sm text-white shadow-lg backdrop-blur-xl ${isRight ? "rounded-tr-sm" : "rounded-tl-sm"}`}
        >
          {message}
        </div>
        {timestamp && (
          <div className="text-xs text-white/40">{timestamp}</div>
        )}
      </div>
    </div>
  );
}

export default ChatBubble;
