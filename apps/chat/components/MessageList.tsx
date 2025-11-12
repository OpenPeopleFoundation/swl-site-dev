"use client";

import { useEffect, useMemo, useRef } from "react";
import type { ChatMessageRecord } from "../types";
import { ChatMessage } from "./ChatMessage";

type MessageListProps = {
  messages: ChatMessageRecord[];
  currentUserId: string;
  isLoading?: boolean;
  typingUsers?: string[];
  onToggleReaction: (emoji: string, messageId: string) => void;
  onReply: (message: ChatMessageRecord) => void;
  onMediaSelect: (url: string) => void;
};

export function MessageList({
  messages,
  currentUserId,
  isLoading = false,
  typingUsers = [],
  onToggleReaction,
  onReply,
  onMediaSelect,
}: MessageListProps) {
  const endRef = useRef<HTMLDivElement | null>(null);
  const messageLookup = useMemo(() => {
    const map = new Map<string, ChatMessageRecord>();
    messages.forEach((message) => map.set(message.id, message));
    return map;
  }, [messages]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages.length]);

  return (
    <div className="scrollbar-hide flex-1 overflow-y-auto px-1">
      <div className="flex flex-col gap-4">
        {isLoading ? (
          <div className="space-y-3 text-sm text-white/50">
            <div className="h-3 w-24 animate-pulse rounded-full bg-white/10" />
            <div className="h-3 w-40 animate-pulse rounded-full bg-white/10" />
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                isSelf={message.user_id === currentUserId}
                currentUserId={currentUserId}
                onToggleReaction={onToggleReaction}
                onReply={onReply}
                onMediaSelect={onMediaSelect}
                parentMessage={
                  message.parent_id
                    ? messageLookup.get(message.parent_id) ?? null
                    : null
                }
              />
            ))}
            {typingUsers.length > 0 && (
              <div className="flex items-center gap-2 text-sm text-white/60">
                <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-white/60" />
                {typingUsers.join(", ")} typing…
              </div>
            )}
          </>
        )}
        <div ref={endRef} />
      </div>
    </div>
  );
}

export default MessageList;
