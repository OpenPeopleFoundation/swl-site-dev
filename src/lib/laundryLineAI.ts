"use server";

import type { LaundryLineConversationMessage } from "@/types/laundry-line";
import { getOpenAIClient } from "@/lib/owner/openai";
import { retrieveOvershareSections } from "@/lib/overshareRag";

const LAUNDRY_LINE_MODEL =
  process.env.OPENAI_LAUNDRY_LINE_MODEL ??
  process.env.OPENAI_GPT5_MODEL ??
  "gpt-4.1-mini";

const SYSTEM_PROMPT = `You are Laundry Line, the digital front-of-house for Snow White Laundry, a small, high-attention dining room in St. John's, Newfoundland opening Spring 2026 at 281 Water Street.

You speak as a calm, knowledgeable front-of-house staff member, never as a chatbot or software. You only rely on the Snow White Laundry living manual provided in your context. If a detail is not in the manual, say so honestly and offer to take their email for follow up or keep the answer at the level of intention and philosophy.

Your responsibilities:
1. Help guests plan a future visit or express interest in the Prelude phase.
2. Help guests ask about private events or buyouts.
3. Explain how the restaurant thinks about intention, emotion, and craft.

You refer to the restaurant as "we" and guests as "you". Avoid technical jargon. Never mention AI or model details.`;

const CONTEXT_MATCH_COUNT = Number.parseInt(
  process.env.LAUDRY_LINE_CONTEXT_MATCHES ?? "6",
  10,
);

async function getLaundryLineContext(
  history: LaundryLineConversationMessage[],
  intentHint: string | null,
) {
  try {
    const latestGuestEntry = [...history]
      .reverse()
      .find((message) => message.sender === "guest");

    const query = latestGuestEntry?.content?.trim() || "Snow White Laundry guest inquiry";

    const matches = await retrieveOvershareSections(query, {
      matchCount: CONTEXT_MATCH_COUNT,
      intentHint,
    });

    if (!matches.length) {
      return FALLBACK_MANUAL_CONTEXT;
    }

    return matches
      .map((match, index) => {
        const metaLines = formatFrontmatter(match.frontmatter ?? {});
        const metaBlock = metaLines.length ? `${metaLines.join(" · ")}\n` : "";
        return `### [${index + 1}] ${match.title ?? match.slug} (${match.category ?? "general"})
Slug: ${match.slug}
Similarity: ${match.similarity.toFixed(3)}
${metaBlock}${match.body}`;
      })
      .join("\n\n---\n\n");
  } catch (error) {
    console.error("Laundry Line context failed to load", error);
    return FALLBACK_MANUAL_CONTEXT;
  }
}

const FALLBACK_MANUAL_CONTEXT = `
Snow White Laundry · Living Manual (excerpt)
--------------------------------------------
- Location: 281 Water Street, St. John's, Newfoundland & Labrador.
- Opening timeline: Prelude experiences in late 2025, full opening Spring 2026.
- Room philosophy: We keep the dining room small so each table is fully seen. The energy is calm, precise, and unscripted.
- Menu: Seasonal tasting menus that follow North Atlantic waters and producers. If something isn't finalized we say so and offer to take a note for the guest.
- Private events: We can host intimate buyouts and private tastings once the room opens. Guests can share dates, party size, and intent so we can follow up quietly.
- Communication tone: Direct, kind, and grounded in intention / emotion / craft.
`;

function buildConversationPrompt(history: LaundryLineConversationMessage[]) {
  if (!history.length) return "Guest: Hello";
  return history
    .map((message) => {
      const speaker = message.sender === "assistant" ? "Laundry Line" : "Guest";
      return `${speaker}: ${message.content}`;
    })
    .join("\n");
}

function buildFallbackReply() {
  return "The Laundry Line is taking a short pause—could you try again in a moment? If it persists, email us and we’ll follow up personally.";
}

function formatFrontmatter(frontmatter: Record<string, unknown>) {
  const preferredKeys = [
    "type",
    "category",
    "tone",
    "llm_signal_keywords",
    "tags",
    "created_at",
    "created_by",
  ];

  return Object.entries(frontmatter)
    .filter(([key]) => preferredKeys.includes(key) || key.startsWith("linked_"))
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${key}: ${value.map((item) => String(item)).join(", ")}`;
      }
      return `${key}: ${String(value)}`;
    });
}

export async function generateLaundryLineReply(
  history: LaundryLineConversationMessage[],
  intentHint?: string | null,
): Promise<string> {
  let openai;
  try {
    openai = getOpenAIClient();
  } catch (error) {
    console.error("Laundry Line OpenAI client unavailable", error);
    return buildFallbackReply();
  }

  try {
    const context = await getLaundryLineContext(history, intentHint?.trim() || null);
    const trimmedHistory = history.slice(-12);
    const conversation = buildConversationPrompt(trimmedHistory);

    const response = await openai.responses.create({
      model: LAUNDRY_LINE_MODEL,
      input: [
        {
          role: "system",
          content: [
            {
              type: "input_text",
              text: `${SYSTEM_PROMPT}

Snow White Laundry living manual excerpts:
${context}`,
            },
          ],
        },
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: `${conversation}

Respond as Laundry Line to the latest guest entry only.`,
            },
          ],
        },
      ],
    });

    const output = response.output_text;
    const reply =
      (Array.isArray(output) ? output.join("\n").trim() : output?.trim()) ??
      buildFallbackReply();
    return reply.length ? reply : buildFallbackReply();
  } catch (error) {
    console.error("Laundry Line AI reply failed", error);
    return buildFallbackReply();
  }
}


