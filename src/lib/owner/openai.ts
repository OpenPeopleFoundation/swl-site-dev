import OpenAI from "openai";

let openAIClient: OpenAI | null = null;

export function getOpenAIClient() {
  if (openAIClient) return openAIClient;

  let apiKey =
    process.env.OPENAI_API_KEY ??
    process.env.XAI_API_KEY ??
    process.env.NEXT_PUBLIC_OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("Set OPENAI_API_KEY (or XAI_API_KEY) in your environment.");
  }

  apiKey = apiKey.trim().replace(/^["']|["']$/g, "");

  if (!apiKey.length) {
    throw new Error("API key is empty after trimming. Check your env config.");
  }

  const baseURL =
    process.env.OPENAI_BASE_URL?.trim() ||
    process.env.XAI_BASE_URL?.trim() ||
    undefined;

  openAIClient = new OpenAI({
    apiKey,
    ...(baseURL ? { baseURL } : {}),
  });

  return openAIClient;
}
