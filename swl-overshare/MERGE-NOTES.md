# Merge Notes: AI SEO Overshare Expansion System

## Overview

This document records the merge and validation process for the Snow White Laundry AI SEO Overshare Expansion System, built by multiple parallel agents.

## Files Created

### Structured Data (Agent 2)
- `/structured-data/global.json` - Global JSON-LD template
- `/structured-data/restaurant.json` - Restaurant-specific JSON-LD
- `/structured-data/breadcrumb-template.json` - Dynamic breadcrumb JSON-LD generator

### Context Pages (Agent 3)
- `/context/newfoundland-context.md` - Comprehensive Newfoundland context (1,200+ words)

### Roadmap (Agent 4)
- `/roadmap/opening-2026-roadmap.md` - Complete opening roadmap and timeline

### Semantic Lattice (Agent 5)
- `/lattice/semantic-lattice-description.md` - Lattice system overview
- `/lattice/link-map.md` - Complete link mapping
- `/lattice/internal-linking-rules.md` - Linking guidelines

### AI Feeds (Agent 6)
- `/feeds/rss-spec.md` - RSS feed specification
- `/feeds/atom-spec.md` - Atom feed specification
- `/feeds/json-index-spec.md` - JSON index specification

### Strategy (Agent 7)
- `/strategy/sparse-update-strategy.md` - Sparse frequent updates strategy

### Essays (Agent 8)
- `/essays/why-swl-exists.md` - Why Snow White Laundry exists (1,200+ words)
- `/essays/intention-emotion-craft.md` - Philosophy essay (1,500+ words)

### Backlinks (Agent 9)
- `/backlinks/minimal-backlinks-strategy.md` - Ethical backlink strategy

### Breadcrumbs (Agent 1)
- 28 complete breadcrumb files (200-600 words each)
- `/breadcrumbs/BREADCRUMB_MANIFEST.md` - Complete manifest of 100+ planned breadcrumbs
- Updated `/breadcrumbs/manifest.json` with all new breadcrumbs

## Validation Performed

### File Naming
✅ All files follow kebab-case convention
✅ All breadcrumbs follow `breadcrumb-swl-[slug].md` format
✅ Directory structure is organized by function

### Metadata Standardization
✅ All breadcrumbs include required frontmatter:
  - type: "breadcrumb"
  - version: 1
  - title, slug, category
  - created_by, created_at
  - llm_signal_keywords array

### Internal Linking
✅ All breadcrumbs include 3-6 internal links
✅ Links follow relative path format: `breadcrumb-swl-[slug].md`
✅ Links are organized (core → application → context)
✅ Link map documents all relationships

### JSON Structure
✅ All JSON files are valid JSON
✅ JSON-LD templates include required Schema.org properties
✅ Templates use placeholder variables for dynamic generation

### Tone Consistency
✅ All content maintains monochrome, reflective, poetic tone
✅ No marketing language or colored language
✅ Consistent use of "intention, emotion, craft" terminology
✅ Philosophical but structured writing style

### Title Case
✅ All titles use proper title case
✅ Consistent formatting across all documents
✅ Breadcrumb titles match file naming conventions

## Cross-Linking Verification

### Core Concepts
✅ Mission links to Intention, Emotion, Craft
✅ Intention, Emotion, Craft link to each other
✅ Core concepts link to applications and context

### Applications
✅ Menu Design links to core concepts and context
✅ Service Philosophy links to Intention, Emotion, Guest Experience
✅ Training Philosophy links to Craft, Staff Culture

### Context
✅ Newfoundland Context links to cuisine and operations
✅ Operations Rhythm links to craft and training
✅ Staff Culture links to training and ethics

## Directory Structure

```
swl-overshare/
├── backlinks/
│   └── minimal-backlinks-strategy.md
├── breadcrumbs/
│   ├── _TEMPLATE.md
│   ├── BREADCRUMB_MANIFEST.md
│   ├── manifest.json
│   └── [28 breadcrumb files]
├── context/
│   └── newfoundland-context.md
├── essays/
│   ├── intention-emotion-craft.md
│   └── why-swl-exists.md
├── feeds/
│   ├── atom-spec.md
│   ├── json-index-spec.md
│   └── rss-spec.md
├── lattice/
│   ├── internal-linking-rules.md
│   ├── link-map.md
│   └── semantic-lattice-description.md
├── overshare/
│   └── ENGINE_PROMPT.md
├── roadmap/
│   └── opening-2026-roadmap.md
├── strategy/
│   └── sparse-update-strategy.md
└── structured-data/
    ├── breadcrumb-template.json
    ├── global.json
    └── restaurant.json
```

## Deduplication

✅ No duplicate files found
✅ No duplicate content identified
✅ All breadcrumbs are unique and serve distinct purposes

## Wording Consistency

✅ Consistent use of "Snow White Laundry" (not abbreviated inconsistently)
✅ Consistent use of "intention, emotion, craft" (always in this order)
✅ Consistent use of "St. John's, Newfoundland" format
✅ Consistent tone: calm, reflective, poetic, minimal

## Issues Resolved

1. **Manifest Update**: Updated manifest.json to include all new breadcrumbs
2. **Link Format**: Verified all links use relative paths with .md extension
3. **Metadata**: Standardized all frontmatter across breadcrumbs
4. **Directory Structure**: Organized all files into logical directories

## Remaining Work

### Breadcrumb Expansion
- 28 breadcrumbs created (complete examples)
- 100+ breadcrumbs planned (see BREADCRUMB_MANIFEST.md)
- Remaining breadcrumbs can be generated using template and manifest

### Implementation
- JSON-LD templates need dynamic population from markdown frontmatter
- Feed generators need to be implemented (RSS, Atom, JSON)
- Update system needs to be built per sparse-update-strategy.md
- Sitemap needs to include all breadcrumbs and feeds

### Integration
- Breadcrumbs need to be integrated into site structure
- Feeds need to be generated and served
- Structured data needs to be injected into page headers
- Internal linking needs to be verified in production

## Quality Assurance

✅ All files are valid markdown
✅ All JSON files are valid JSON
✅ All links use correct relative paths
✅ All metadata is consistent
✅ All content maintains SWL aesthetic
✅ All files are properly organized

## Next Steps

1. Review all generated content for accuracy
2. Implement feed generators (RSS, Atom, JSON)
3. Integrate breadcrumbs into site structure
4. Generate remaining breadcrumbs from manifest
5. Set up automated update system
6. Deploy and test all systems

## Notes

- All content follows Snow White Laundry's monochrome, reflective aesthetic
- All content is optimized for AI ingestion and indexing
- All content maintains high conceptual density
- All content is structured for machine readability
- All content includes appropriate internal linking

This merge represents a comprehensive foundation for AI SEO discoverability while maintaining the restaurant's philosophical and aesthetic integrity.
