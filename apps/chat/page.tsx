"use client";

import { startTransition, useCallback, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Card } from "@/shared/ui/Card";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

type Message = {
  id: string;
  content: string;
  users: {
    full_name?: string | null;
  } | null;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [content, setContent] = useState("");

  const loadMessages = useCallback(async () => {
    const { data } = await supabase
      .from("messages")
      .select("id, content, users(full_name)")
      .order("created_at", { ascending: true });

    startTransition(() => {
      setMessages((data as Message[]) ?? []);
    });
  }, []);

  useEffect(() => {
    void loadMessages();

    const channel = supabase
      .channel("chat")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "messages" },
        (payload) =>
          startTransition(() => {
            setMessages((prev) => [...prev, payload.new as Message]);
          }),
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [loadMessages]);

  async function sendMessage() {
    if (!content.trim()) return;

    await supabase
      .from("messages")
      .insert({
        content,
        user_id: "<YOUR-USER-ID>",
        channel_id: "<DEFAULT-CHANNEL-ID>",
      });
    setContent("");
  }

  return (
    <div className="space-y-4 p-6 text-white">
      <Card>
        <div className="flex h-96 flex-col gap-2 overflow-y-auto text-sm text-white/80">
          {messages.map((message) => (
            <div key={message.id}>
              <b>{message.users?.full_name ?? "Unknown"}</b>: {message.content}
            </div>
          ))}
        </div>
        <div className="mt-3 flex">
          <input
            className="flex-1 rounded border border-white/10 bg-transparent px-3 py-2 text-sm text-white outline-none"
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
          <button
            onClick={sendMessage}
            className="ml-2 rounded border border-white/10 px-4 py-2 text-sm text-white hover:bg-white/10"
          >
            Send
          </button>
        </div>
      </Card>
    </div>
  );
}
