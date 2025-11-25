import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

/**
 * Validation Monitoring Endpoint
 * 
 * Validates feed formats and checks for common issues.
 */

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://snowwhitelaundry.co";

export async function GET() {
  const breadcrumbDir = path.join(process.cwd(), "swl-overshare/breadcrumbs");
  const issues: string[] = [];
  const warnings: string[] = [];

  // Check breadcrumb files
  try {
    const files = fs
      .readdirSync(breadcrumbDir)
      .filter((f) => f.endsWith(".md") && f.startsWith("breadcrumb-swl-") && !f.startsWith("_"));

    // Sample a few files for validation
    const sampleFiles = files.slice(0, 5);
    
    for (const file of sampleFiles) {
      const filePath = path.join(breadcrumbDir, file);
      const content = fs.readFileSync(filePath, "utf8");

      // Check for required frontmatter
      if (!content.includes("type: \"breadcrumb\"")) {
        warnings.push(`${file}: Missing type field`);
      }
      if (!content.match(/title:\s*["']?[^"'\n]+["']?/)) {
        issues.push(`${file}: Missing title`);
      }
      if (!content.match(/slug:\s*["']?[^"'\n]+["']?/)) {
        issues.push(`${file}: Missing slug`);
      }
      if (!content.match(/category:\s*["']?[^"'\n]+["']?/)) {
        warnings.push(`${file}: Missing category`);
      }
      if (!content.match(/## Summary/)) {
        warnings.push(`${file}: Missing Summary section`);
      }
      if (!content.match(/## Links/)) {
        warnings.push(`${file}: Missing Links section`);
      }

      // Check for broken links
      const linksMatch = content.match(/## Links\s*\n((?:- breadcrumb-[^\n]+\n?)+)/);
      if (linksMatch) {
        const links = linksMatch[1].match(/- breadcrumb-[^\n]+/g) || [];
        for (const link of links) {
          const linkFile = link.replace(/^-\s*/, "").trim();
          const linkPath = path.join(breadcrumbDir, linkFile);
          if (!fs.existsSync(linkPath)) {
            warnings.push(`${file}: Broken link to ${linkFile}`);
          }
        }
      }
    }
  } catch (error) {
    issues.push(`Error reading breadcrumb directory: ${error instanceof Error ? error.message : String(error)}`);
  }

  return NextResponse.json({
    status: issues.length === 0 ? "valid" : "issues_found",
    timestamp: new Date().toISOString(),
    validation: {
      issues,
      warnings,
      summary: {
        totalIssues: issues.length,
        totalWarnings: warnings.length,
      },
    },
    recommendations: {
      issues: issues.length > 0 ? "Fix critical issues before deployment" : "No critical issues found",
      warnings: warnings.length > 0 ? "Review warnings for potential improvements" : "No warnings",
    },
  });
}
