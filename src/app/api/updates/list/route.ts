import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

/**
 * List all updates
 * 
 * Returns a list of all sparse updates with metadata.
 */

const updatesDir = path.join(process.cwd(), "swl-overshare/updates");

function extractMeta(content: string, filename: string) {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) {
    return null;
  }

  const frontmatter = frontmatterMatch[1];
  const dateMatch = frontmatter.match(/date:\s*["']?([^"'\n]+)["']?/);
  const categoryMatch = frontmatter.match(/category:\s*["']?([^"'\n]+)["']?/);
  const keywordsMatch = frontmatter.match(/keywords:\s*\[([^\]]+)\]/);

  return {
    filename,
    date: dateMatch ? dateMatch[1] : null,
    category: categoryMatch ? categoryMatch[1] : null,
    keywords: keywordsMatch
      ? keywordsMatch[1]
          .split(",")
          .map((k) => k.trim().replace(/['"]/g, ""))
      : [],
  };
}

export async function GET() {
  if (!fs.existsSync(updatesDir)) {
    return NextResponse.json({ updates: [] });
  }

  const files = fs
    .readdirSync(updatesDir)
    .filter((f) => f.endsWith(".md"))
    .sort()
    .reverse();

  const updates = files
    .map((file) => {
      const filePath = path.join(updatesDir, file);
      const content = fs.readFileSync(filePath, "utf8");
      return extractMeta(content, file);
    })
    .filter((meta) => meta !== null);

  return NextResponse.json({
    updates,
    count: updates.length,
  });
}
