#!/usr/bin/env node

/**
 * Generate breadcrumbs from manifest
 * 
 * This script reads BREADCRUMB_MANIFEST.md and generates
 * breadcrumb files for entries that don't exist yet.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const breadcrumbDir = path.join(__dirname, '..', 'swl-overshare', 'breadcrumbs');
const manifestPath = path.join(breadcrumbDir, 'BREADCRUMB_MANIFEST.md');
const templatePath = path.join(breadcrumbDir, '_TEMPLATE.md');

// Read manifest
const manifest = fs.readFileSync(manifestPath, 'utf8');
const template = fs.readFileSync(templatePath, 'utf8');

// Extract breadcrumb entries from manifest
const breadcrumbMatches = manifest.matchAll(/^\d+\.\s+(?:✅\s+)?breadcrumb-swl-([\w-]+)\.md/gm);
const existingFiles = new Set(
  fs.readdirSync(breadcrumbDir)
    .filter(f => f.startsWith('breadcrumb-swl-') && f.endsWith('.md'))
    .map(f => f.replace('.md', '').replace('breadcrumb-swl-', ''))
);

const toGenerate = [];
for (const match of breadcrumbMatches) {
  const slug = match[1];
  if (!existingFiles.has(slug)) {
    toGenerate.push(slug);
  }
}

console.log(`Found ${toGenerate.length} breadcrumbs to generate`);

// Generate breadcrumbs (this is a stub - actual generation would require AI/content)
// For now, we'll create a list of what needs to be generated
const outputPath = path.join(__dirname, '..', 'swl-overshare', 'breadcrumbs', 'TO_GENERATE.md');
fs.writeFileSync(outputPath, `# Breadcrumbs To Generate

Total: ${toGenerate.length}

${toGenerate.map((slug, i) => `${i + 1}. breadcrumb-swl-${slug}.md`).join('\n')}

## Generation Instructions

Each breadcrumb should:
- Follow the template format
- Be 200-600 words
- Include appropriate links (3-6)
- Maintain monochrome, reflective tone
- Include relevant keywords

Use the template at _TEMPLATE.md and existing breadcrumbs as examples.
`);

console.log(`Created ${outputPath}`);
console.log(`\nTo generate breadcrumbs, use the list in TO_GENERATE.md`);
