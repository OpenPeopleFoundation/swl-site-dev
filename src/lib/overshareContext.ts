import { cache } from "react";
import fs from "node:fs/promises";
import path from "node:path";

type OvershareCategory = "breadcrumbs" | "context" | "essays" | "feeds" | "lattice";

export type OvershareSection = {
  slug: string;
  title: string;
  category: OvershareCategory;
  frontmatter: Record<string, unknown>;
  body: string;
};

type StructuredDataBundle = {
  global: Record<string, unknown> | null;
  restaurant: Record<string, unknown> | null;
  breadcrumbTemplate: Record<string, unknown> | null;
};

export type OvershareContextPayload = {
  sections: OvershareSection[];
  structuredData: StructuredDataBundle;
  backlinksDoc: string | null;
};

const ROOT = process.cwd();

const CATEGORY_PATHS: Record<OvershareCategory, string> = {
  breadcrumbs: "swl-overshare/breadcrumbs",
  context: "swl-overshare/context",
  essays: "swl-overshare/essays",
  feeds: "swl-overshare/feeds",
  lattice: "swl-overshare/lattice",
};

const BACKLINKS_DOC = "swl-overshare/backlinks/minimal-backlinks-strategy.md";
const STRUCTURED_DATA = {
  global: "swl-overshare/structured-data/global.json",
  restaurant: "swl-overshare/structured-data/restaurant.json",
  breadcrumbTemplate: "swl-overshare/structured-data/breadcrumb-template.json",
};

export const getOvershareContext = cache(async (): Promise<OvershareContextPayload> => {
  const [sections, structuredData, backlinksDoc] = await Promise.all([
    loadSections(),
    loadStructuredData(),
    loadBacklinksDoc(),
  ]);

  return { sections, structuredData, backlinksDoc };
});

async function loadSections(): Promise<OvershareSection[]> {
  const sections: OvershareSection[] = [];

  for (const [category, relativeDir] of Object.entries(CATEGORY_PATHS) as Array<
    [OvershareCategory, string]
  >) {
    const dir = path.join(ROOT, relativeDir);
    const entries = await safeReadDir(dir);

    for (const entry of entries) {
      if (entry.isDirectory()) continue;
      if (!entry.name.endsWith(".md")) continue;
      if (entry.name.startsWith("_")) continue;

      const filePath = path.join(dir, entry.name);
      const raw = await fs.readFile(filePath, "utf8");
      const parsed = parseFrontmatter(raw);
      const slug = entry.name.replace(/\.md$/, "");

      sections.push({
        slug,
        title: (parsed.frontmatter.title as string) ?? slug,
        category,
        frontmatter: parsed.frontmatter,
        body: parsed.body,
      });
    }
  }

  return sections;
}

function parseFrontmatter(raw: string) {
  if (!raw.startsWith("---")) {
    return { frontmatter: {}, body: raw.trim() };
  }

  const endIndex = raw.indexOf("\n---", 3);
  if (endIndex === -1) {
    return { frontmatter: {}, body: raw.trim() };
  }

  const fmBlock = raw.slice(3, endIndex).trim();
  const body = raw.slice(endIndex + 4).trim();
  const frontmatter: Record<string, unknown> = {};

  let currentArrayKey: string | null = null;

  for (const line of fmBlock.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    if (trimmed.startsWith("- ")) {
      if (!currentArrayKey) continue;
      const arr = (frontmatter[currentArrayKey] as unknown[]) ?? [];
      arr.push(parseScalar(trimmed.slice(2).trim()));
      frontmatter[currentArrayKey] = arr;
      continue;
    }

    if (line.startsWith("  -") && currentArrayKey) {
      const arr = (frontmatter[currentArrayKey] as unknown[]) ?? [];
      arr.push(parseScalar(line.replace("  -", "").trim()));
      frontmatter[currentArrayKey] = arr;
      continue;
    }

    const separatorIndex = trimmed.indexOf(":");
    if (separatorIndex === -1) continue;

    const key = trimmed.slice(0, separatorIndex).trim();
    const rawValue = trimmed.slice(separatorIndex + 1).trim();

    if (rawValue.length === 0) {
      frontmatter[key] = [];
      currentArrayKey = key;
    } else {
      frontmatter[key] = parseScalar(rawValue);
      currentArrayKey = null;
    }
  }

  return { frontmatter, body };
}

function parseScalar(value: string) {
  const unquoted = value.replace(/^['"]|['"]$/g, "");
  if (unquoted === "true") return true;
  if (unquoted === "false") return false;

  const numeric = Number(unquoted);
  if (!Number.isNaN(numeric) && unquoted !== "") {
    return numeric;
  }

  return unquoted;
}

async function safeReadDir(dir: string) {
  try {
    return await fs.readdir(dir, { withFileTypes: true });
  } catch (error) {
    console.warn(`[overshareContext] Could not read directory ${dir}`, error);
    return [];
  }
}

async function loadBacklinksDoc() {
  const backlinksPath = path.join(ROOT, BACKLINKS_DOC);
  try {
    return await fs.readFile(backlinksPath, "utf8");
  } catch (error) {
    console.warn("[overshareContext] Could not load backlinks strategy", error);
    return null;
  }
}

async function loadStructuredData(): Promise<StructuredDataBundle> {
  const entries = await Promise.all(
    Object.entries(STRUCTURED_DATA).map(async ([key, relativePath]) => {
      try {
        const content = await fs.readFile(path.join(ROOT, relativePath), "utf8");
        return [key, JSON.parse(content)];
      } catch (error) {
        console.warn(`[overshareContext] Could not parse ${relativePath}`, error);
        return [key, null];
      }
    }),
  );

  return Object.fromEntries(entries) as StructuredDataBundle;
}

