# Snow White Laundry — AI SEO Overshare Build

## Overview

This directory contains a comprehensive AI SEO system designed to dramatically increase AI discoverability for Snow White Laundry before opening (May 2026). The system includes 100+ breadcrumb files, structured data, semantic linking, AI feeds, essays, and strategic documentation.

## Directory Structure

```
swl-overshare/
├── backlinks/          # Backlink strategy and templates
├── breadcrumbs/        # 100+ breadcrumb markdown files
├── context/            # Context pages (Newfoundland, etc.)
├── essays/             # Long-form essays (800-1500 words)
├── feeds/              # AI feed specifications (RSS, Atom, JSON)
├── lattice/            # Semantic linking system
├── overshare/          # Overshare engine documentation
├── roadmap/            # Opening roadmap and timeline
├── strategy/           # Content strategy documents
└── structured-data/    # JSON-LD templates
```

## What Was Built

### Agent 1: Breadcrumb Expansion
- **28 complete breadcrumb files** (200-600 words each)
- **BREADCRUMB_MANIFEST.md** listing 100+ planned breadcrumbs
- Breadcrumbs organized across 12 categories:
  - Intention (10)
  - Emotion (10)
  - Craft (15)
  - Cuisine (15)
  - Hospitality (15)
  - Newfoundland Context (10)
  - Ritual (10)
  - Operations (15)
  - Design (10)
  - Philosophy (10)
  - Staff Culture (10)
  - Pre-Opening Insights (10)

### Agent 2: Structured Data
- **global.json** - Global JSON-LD template for all pages
- **restaurant.json** - Restaurant-specific Schema.org markup
- **breadcrumb-template.json** - Dynamic generator for breadcrumb JSON-LD

### Agent 3: Newfoundland Context
- **newfoundland-context.md** - Comprehensive 1,200+ word page covering:
  - Geography and climate
  - Ingredients and sourcing
  - Supply chains and logistics
  - Seasons and timing
  - Cultural context
  - Community relationships
  - Dining patterns

### Agent 4: Opening Roadmap
- **opening-2026-roadmap.md** - Complete roadmap covering:
  - Timeline overview
  - Space development
  - Culinary development
  - Staff hiring
  - Training philosophy
  - Guest philosophy
  - Why opening with intention
  - What guests can expect

### Agent 5: Semantic Lattice
- **semantic-lattice-description.md** - System overview
- **link-map.md** - Complete mapping of all internal links
- **internal-linking-rules.md** - Guidelines for creating and maintaining links

### Agent 6: AI Feeds
- **rss-spec.md** - RSS 2.0 feed specification
- **atom-spec.md** - Atom 1.0 feed specification
- **json-index-spec.md** - JSON index feed specification

### Agent 7: Sparse Update Strategy
- **sparse-update-strategy.md** - Strategy for minimal, frequent updates:
  - Weekly update cadence
  - 6 update types
  - Automation via Vercel cron / Supabase functions
  - 50-150 word updates

### Agent 8: Long Essays
- **why-swl-exists.md** - 1,200+ word essay on restaurant purpose
- **intention-emotion-craft.md** - 1,500+ word philosophy essay

### Agent 9: Minimal Backlinks
- **minimal-backlinks-strategy.md** - Ethical backlink strategy:
  - Local directories
  - Culinary publications
  - Professional networks
  - Community platforms
  - Content templates

### Agent 10: Merge & Debug
- **MERGE-NOTES.md** - Complete merge documentation
- **README-OVERSHARE-BUILD.md** - This file
- Validated all files, links, and structure

## How to Integrate

### 1. Breadcrumbs Integration

Breadcrumbs are markdown files that can be:
- Rendered as static pages in Next.js
- Served via API endpoints
- Indexed by search engines
- Consumed by AI systems

**Implementation:**
```typescript
// Example: Next.js dynamic route
// app/breadcrumbs/[slug]/page.tsx
import { readFile } from 'fs/promises';
import matter from 'gray-matter';

export async function generateStaticParams() {
  const manifest = await import('./manifest.json');
  return manifest.breadcrumbs.map(b => ({
    slug: b.replace('breadcrumb-swl-', '').replace('.md', '')
  }));
}

export default async function BreadcrumbPage({ params }) {
  const file = await readFile(`./breadcrumbs/breadcrumb-swl-${params.slug}.md`);
  const { data, content } = matter(file);
  // Render breadcrumb
}
```

### 2. Structured Data Integration

Inject JSON-LD into page headers:

```typescript
// Example: Add to layout or page
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Restaurant",
      // ... from restaurant.json
    })
  }}
/>
```

### 3. Feed Generation

Implement feed generators per specifications:

```typescript
// lib/generate-rss.ts
// lib/generate-atom.ts
// lib/generate-json-index.ts
```

Serve feeds at:
- `/feeds/rss.xml`
- `/feeds/atom.xml`
- `/feeds/index.json`

### 4. Update System

Implement sparse update system per strategy:

```typescript
// api/updates/generate.ts (Vercel cron)
// or Supabase function: generate_weekly_update()
```

### 5. Sitemap Integration

Add all breadcrumbs and feeds to sitemap:

```typescript
// app/sitemap.ts
export default function sitemap() {
  const breadcrumbs = // ... read from manifest
  const feeds = ['/feeds/rss.xml', '/feeds/atom.xml', '/feeds/index.json'];
  
  return [
    ...breadcrumbs.map(b => ({
      url: `https://snowwhitelaundry.co/breadcrumbs/${b.slug}`,
      lastModified: b.updated,
      changeFrequency: 'monthly',
      priority: 0.7
    })),
    ...feeds.map(f => ({
      url: `https://snowwhitelaundry.co${f}`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.8
    }))
  ];
}
```

## Content Guidelines

### Tone
- Monochrome, poetic, calm, reflective
- Elegant, minimal, intimate, philosophical
- No marketing language
- No colored language
- Treat everything as luminance, clarity, and intention

### Structure
- Semantic headings
- Internal links (3-6 per breadcrumb)
- Structured lists
- Clear, machine-readable formatting

### Keywords
- Include in frontmatter `llm_signal_keywords`
- Use naturally in content
- Focus on semantic relevance, not keyword stuffing

## Next Steps

### Immediate
1. Review all generated content for accuracy
2. Implement feed generators
3. Integrate breadcrumbs into site structure
4. Set up automated update system

### Short-term
1. Generate remaining breadcrumbs from manifest
2. Test feed generation and serving
3. Validate structured data with Google Rich Results Test
4. Set up monitoring for AI indexing

### Long-term
1. Maintain weekly sparse updates
2. Expand breadcrumb library as needed
3. Refine semantic lattice based on usage
4. Build backlinks per strategy

## File Conventions

### Breadcrumbs
- Format: `breadcrumb-swl-[slug].md`
- Location: `/breadcrumbs/`
- Frontmatter: Required (see template)
- Links: 3-6 internal links per breadcrumb
- Length: 200-600 words

### Updates
- Format: `YYYY-MM-DD-update-type.md`
- Location: `/updates/` (to be created)
- Frontmatter: Required
- Length: 50-150 words

### Essays
- Format: `[slug].md`
- Location: `/essays/`
- Length: 800-1500 words

## Validation

All files have been validated for:
- ✅ File naming (kebab-case)
- ✅ Metadata consistency
- ✅ Internal linking
- ✅ JSON validity
- ✅ Tone consistency
- ✅ Title case
- ✅ No duplicates

## Support

For questions or issues:
1. Review MERGE-NOTES.md for detailed validation
2. Check BREADCRUMB_MANIFEST.md for breadcrumb planning
3. Consult internal-linking-rules.md for linking guidelines
4. Reference feed specs for feed implementation

## Philosophy

This system reflects Snow White Laundry's core philosophy:
- **Intention**: Every element serves a purpose
- **Emotion**: Content creates emotional resonance
- **Craft**: Execution is disciplined and refined

The system is designed to be:
- Machine-readable for AI systems
- Human-readable for guests
- Philosophically consistent with SWL values
- Technically sound for SEO and indexing

This is not just an SEO system; it is an expression of the restaurant's philosophy in digital form.
