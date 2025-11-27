import type { SupabaseClient } from "@supabase/supabase-js";

import { getOpenAIClient } from "@/lib/owner/openai";
import { getSupabaseAdmin } from "@/lib/shared/supabase";

const EMBEDDING_MODEL =
  process.env.OPENAI_EMBEDDING_MODEL?.trim() || "text-embedding-3-small";
const DEFAULT_MATCH_COUNT = Number.parseInt(process.env.OVERSHARE_MATCH_COUNT ?? "6", 10);

type RetrieveOptions = {
  matchCount?: number;
  intentHint?: string | null;
};

export type OvershareMatch = {
  slug: string;
  title: string | null;
  category: string | null;
  summary: string | null;
  frontmatter: Record<string, unknown> | null;
  body: string;
  similarity: number;
};

const retrievalCache = new Map<string, Promise<OvershareMatch[]>>();

type MatchRow = {
  slug: string;
  title: string | null;
  category: string | null;
  summary: string | null;
  frontmatter: Record<string, unknown> | null;
  body: string | null;
  similarity: number | null;
};

export async function retrieveOvershareSections(
  query: string,
  options: RetrieveOptions = {},
) {
  const key = buildCacheKey(query, options);
  if (!retrievalCache.has(key)) {
    retrievalCache.set(key, executeRetrieval(query, options).catch((error) => {
      retrievalCache.delete(key);
      throw error;
    }));
  }
  return retrievalCache.get(key)!;
}

async function executeRetrieval(query: string, options: RetrieveOptions) {
  const normalizedQuery = query.trim() || "Snow White Laundry guest inquiry";
  const openai = getOpenAIClient();
  const supabase = getSupabaseAdmin();

  const embeddingInput = options.intentHint
    ? `${options.intentHint.trim()}\n\n${normalizedQuery}`
    : normalizedQuery;

  const embeddingResponse = await openai.embeddings.create({
    model: EMBEDDING_MODEL,
    input: embeddingInput,
  });

  const queryEmbedding = embeddingResponse.data[0]?.embedding;
  if (!queryEmbedding) {
    throw new Error("Embedding response did not include data.");
  }

  const matchCount = sanitizeMatchCount(options.matchCount);
  const { data, error } = await callMatchFunction(supabase, {
    query_embedding: queryEmbedding,
    match_count: matchCount,
    filter_category: options.intentHint ?? null,
  });

  if (error) {
    console.error("[laundry-line][rag] match function failed", error);
    return [];
  }

  const matches = (data ?? []).map((row: MatchRow) => ({
    slug: row.slug,
    title: row.title,
    category: row.category,
    summary: row.summary,
    frontmatter: row.frontmatter,
    body: row.body ?? "",
    similarity: row.similarity ?? 0,
  }));

  console.info("[laundry-line][rag] matches", {
    queryLength: normalizedQuery.length,
    matchCount: matches.length,
    bestSimilarity: matches[0]?.similarity ?? 0,
  });

  return matches;
}

function buildCacheKey(query: string, options: RetrieveOptions) {
  return JSON.stringify({
    query: query.trim(),
    count: sanitizeMatchCount(options.matchCount),
    hint: options.intentHint ?? null,
  });
}

function sanitizeMatchCount(count?: number) {
  const value = Number.isFinite(count) ? Number(count) : DEFAULT_MATCH_COUNT;
  return Math.max(1, Math.min(12, value));
}

function callMatchFunction(
  supabase: SupabaseClient,
  args: {
    query_embedding: number[];
    match_count: number;
    filter_category: string | null;
  },
) {
  return supabase.rpc("match_overshare_sections", args);
}

