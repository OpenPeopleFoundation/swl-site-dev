#!/usr/bin/env node
import "dotenv/config";

import { getOpenAIClient } from "@/lib/owner/openai";
import { getOvershareContext } from "@/lib/overshareContext";
import { getSupabaseAdmin } from "@/lib/shared/supabase";

const EMBEDDING_MODEL =
  process.env.OPENAI_EMBEDDING_MODEL?.trim() || "text-embedding-3-small";
const BATCH_SIZE = Number.parseInt(process.env.OVERSHARE_EMBED_BATCH ?? "8", 10);

type SectionPayload = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  frontmatter: Record<string, unknown>;
  body: string;
};

async function main() {
  const openai = getOpenAIClient();
  const supabase = getSupabaseAdmin();
  const { sections } = await getOvershareContext();

  if (!sections.length) {
    console.warn("[overshare-sync] No sections found. Did you populate swl-overshare?");
    return;
  }

  const payloads: SectionPayload[] = sections.map((section) => ({
    slug: section.slug,
    title: section.title || section.slug,
    category: section.category,
    summary: deriveSummary(section),
    frontmatter: section.frontmatter,
    body: section.body,
  }));

  let syncedCount = 0;
  for (const batch of chunk(payloads, Math.max(BATCH_SIZE, 1))) {
    const inputs = batch.map((section) => buildEmbeddingInput(section));
    const embeddings = await openai.embeddings.create({
      model: EMBEDDING_MODEL,
      input: inputs,
    });

    const rows = batch.map((section, index) => ({
      ...section,
      embedding: embeddings.data[index].embedding,
      updated_at: new Date().toISOString(),
    }));

    const { error } = await supabase.from("overshare_sections").upsert(rows);
    if (error) {
      console.error("[overshare-sync] Failed to upsert batch", error);
      throw error;
    }

    syncedCount += batch.length;
    console.info(`[overshare-sync] Upserted ${syncedCount}/${payloads.length} sections...`);
  }

  console.info(`[overshare-sync] Completed. Total sections synced: ${syncedCount}.`);
}

function buildEmbeddingInput(section: SectionPayload) {
  return `${section.title}\nCategory: ${section.category}\nSummary: ${section.summary}\n\n${section.body}`;
}

function deriveSummary(section: { body: string; frontmatter: Record<string, unknown> | undefined }) {
  const fmSummary = typeof section.frontmatter?.summary === "string" ? section.frontmatter.summary.trim() : "";
  if (fmSummary) return fmSummary;

  const firstParagraph = section.body.split(/\n{2,}/)[0]?.trim() ?? "";
  return firstParagraph.slice(0, 400);
}

function chunk<T>(input: T[], size: number) {
  const output: T[][] = [];
  for (let i = 0; i < input.length; i += size) {
    output.push(input.slice(i, i + size));
  }
  return output;
}

main().catch((error) => {
  console.error("[overshare-sync] Fatal error", error);
  process.exitCode = 1;
});

