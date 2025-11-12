export type ReactionRecord = {
  id: string;
  message_id: string;
  user_id: string;
  emoji: string;
};

export type ChatMessageRecord = {
  id: string;
  content: string | null;
  image_url?: string | null;
  gif_url?: string | null;
  user_id: string;
  channel_id?: string | null;
  parent_id?: string | null;
  created_at: string;
  emotion_label?: string | null;
  emotion_confidence?: number | null;
  users?: {
    full_name?: string | null;
    avatar_url?: string | null;
  } | null;
  reactions?: ReactionRecord[];
};
