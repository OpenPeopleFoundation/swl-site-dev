import fs from "fs";
import path from "path";

/**
 * JSON Index Feed for Overshare Breadcrumbs
 * 
 * Optimized for AI systems and modern applications.
 * Provides structured data in easily parseable format.
 */

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://snowwhitelaundry.ai";

type BreadcrumbItem = {
  id: string;
  title: string;
  link: string;
  published: string;
  updated: string;
  summary: string;
  content: string;
  contentFormat: "markdown";
  categories: string[];
  keywords: string[];
  author: {
    name: string;
    email: string;
  };
  type: "breadcrumb";
  metadata: {
    slug: string;
    category: string;
    version: number;
    breadcrumbLinks?: string[];
  };
};

function extractMeta(content: string, file: string): BreadcrumbItem {
  const slug = file.replace("breadcrumb-swl-", "").replace(".md", "");
  
  // Extract title
  const titleMatch = content.match(/title:\s*["']?([^"'\n]+)["']?/);
  const title = titleMatch ? titleMatch[1].trim() : slug.replace(/-/g, " ");

  // Extract summary
  const summaryMatch = content.match(/## Summary\s*\n([\s\S]*?)(?=\n##|$)/);
  const summary = summaryMatch
    ? summaryMatch[1].trim().slice(0, 300)
    : `Breadcrumb from the Snow White Laundry knowledge archive.`;

  // Extract full content (strip frontmatter)
  const contentMatch = content.match(/^---\n[\s\S]*?\n---\n([\s\S]*)$/);
  const fullContent = contentMatch ? contentMatch[1].trim() : content;

  // Extract dates
  const dateMatch = content.match(/created_at:\s*["']?([^"'\n]+)["']?/);
  const published = dateMatch ? new Date(dateMatch[1]).toISOString() : new Date().toISOString();
  const updated = published; // Use created_at as updated for now

  // Extract category
  const categoryMatch = content.match(/category:\s*["']?([^"'\n]+)["']?/);
  const category = categoryMatch ? categoryMatch[1].trim() : "uncategorized";

  // Extract keywords
  const keywordsMatch = content.match(/llm_signal_keywords:\s*\n((?:\s*-\s*[^\n]+\n?)+)/);
  const keywords: string[] = [];
  if (keywordsMatch) {
    const keywordLines = keywordsMatch[1].match(/-\s*([^\n]+)/g);
    if (keywordLines) {
      keywords.push(...keywordLines.map(k => k.replace(/^-\s*/, "").trim()));
    }
  }

  // Extract author
  const authorMatch = content.match(/created_by:\s*["']?([^"'\n]+)["']?/);
  const authorName = authorMatch ? authorMatch[1].trim() : "Snow White Laundry";

  // Extract version
  const versionMatch = content.match(/version:\s*(\d+)/);
  const version = versionMatch ? parseInt(versionMatch[1]) : 1;

  // Extract links
  const linksMatch = content.match(/## Links\s*\n((?:- breadcrumb-[^\n]+\n?)+)/);
  const breadcrumbLinks: string[] = [];
  if (linksMatch) {
    const linkLines = linksMatch[1].match(/- breadcrumb-[^\n]+/g);
    if (linkLines) {
      breadcrumbLinks.push(...linkLines.map(l => l.replace(/^-\s*/, "").trim()));
    }
  }

  const url = `${BASE_URL}/overshare/${slug}`;

  return {
    id: url,
    title,
    link: url,
    published,
    updated,
    summary,
    content: fullContent,
    contentFormat: "markdown",
    categories: [category],
    keywords,
    author: {
      name: authorName,
      email: "overshare@snowwhitelaundry.co",
    },
    type: "breadcrumb",
    metadata: {
      slug,
      category,
      version,
      breadcrumbLinks: breadcrumbLinks.length > 0 ? breadcrumbLinks : undefined,
    },
  };
}

export async function GET() {
  const breadcrumbDir = path.join(process.cwd(), "swl-overshare/breadcrumbs");
  
  let files: string[] = [];
  try {
    files = fs
      .readdirSync(breadcrumbDir)
      .filter((f) => f.endsWith(".md") && !f.startsWith("_") && f.startsWith("breadcrumb-swl-"));
  } catch {
    // Directory might not exist
  }

  const items: BreadcrumbItem[] = files
    .map((file) => {
      const filePath = path.join(breadcrumbDir, file);
      const content = fs.readFileSync(filePath, "utf8");
      return extractMeta(content, file);
    })
    .sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime());

  // Find most recent update
  const latestUpdate = items.length > 0 
    ? items[0].updated 
    : new Date().toISOString();

  const feed = {
    version: "1.0",
    title: "Snow White Laundry Overshare",
    description: "A restaurant in St. John's, Newfoundland, where intention, emotion, and craft are treated as primary ingredients.",
    language: "en-CA",
    link: `${BASE_URL}/overshare`,
    updated: latestUpdate,
    author: {
      name: "Snow White Laundry",
      email: "overshare@snowwhitelaundry.co",
    },
    items,
  };

  return Response.json(feed, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "s-maxage=600, stale-while-revalidate=86400",
    },
  });
}
