# Sparse Frequent Updates Strategy

## Overview

Snow White Laundry will maintain AI discoverability through minimal, frequent updates that signal activity and evolution without overwhelming readers or requiring extensive content production. This strategy recognizes that AI systems value freshness, consistency, and semantic density over volume.

## Update Cadence

**Frequency:** Weekly updates, published every Tuesday at 10:00 AM NST

**Duration:** 12 months leading to opening (May 2026), continuing post-opening

**Format:** 50-150 word updates published as markdown files in `/updates/`

## Update Types

### 1. Ingredient Notes (Seasonal)
- Brief observations about local ingredients
- 50-100 words
- Links to relevant breadcrumbs
- Published when ingredients shift with seasons

### 2. Space Development (Pre-Opening)
- Minimal notes on physical progress
- 75-125 words
- Focus on intention behind design choices
- Published monthly during construction

### 3. Staff Reflections (Post-Hiring)
- Short, anonymous reflections from staff
- 100-150 words
- Focus on learning, craft, or philosophy
- Published bi-weekly once staff is hired

### 4. Menu Evolution (Pre-Opening)
- Brief notes on dish development
- 75-125 words
- Links to cuisine philosophy breadcrumbs
- Published monthly during menu development

### 5. Ritual Refinement (Post-Opening)
- Small adjustments to service or operations
- 50-100 words
- Focus on learning and iteration
- Published weekly post-opening

### 6. Guest Observations (Post-Opening)
- Anonymous, aggregated insights from service
- 75-125 words
- Focus on emotional patterns, not reviews
- Published bi-weekly post-opening

## Content Principles

- **Sparse:** Every word must earn its place
- **Semantic:** Rich in keywords and concepts
- **Linked:** Always include 2-3 internal links to breadcrumbs
- **Structured:** Use consistent markdown formatting
- **Monochrome:** Maintain calm, reflective tone

## Automation Strategy

### Vercel Cron Jobs
- Weekly scheduled function at `/api/updates/generate`
- Pulls from Supabase `updates_queue` table
- Generates markdown file
- Publishes to `/updates/YYYY-MM-DD-update.md`
- Updates sitemap automatically

### Supabase Functions
- `generate_weekly_update()` function
- Selects update type based on schedule
- Pulls relevant data from restaurant systems
- Formats as markdown
- Inserts into `updates_queue` table

### Manual Override
- Admin interface to queue updates manually
- Allows for timely responses to events
- Maintains same format and structure

## File Naming Convention

```
/updates/YYYY-MM-DD-update-type.md
```

Examples:
- `2025-12-03-ingredient-note.md`
- `2025-12-10-space-development.md`
- `2025-12-17-staff-reflection.md`

## Metadata Structure

Each update file includes frontmatter:

```yaml
---
type: "update"
date: "YYYY-MM-DD"
category: "ingredient-note|space-development|staff-reflection|menu-evolution|ritual-refinement|guest-observations"
keywords: [array of relevant keywords]
links: [array of breadcrumb slugs]
---
```

## Integration with Breadcrumbs

- Each update links to 2-3 relevant breadcrumbs
- Updates can reference concepts from breadcrumbs
- Updates contribute to the semantic network
- Updates are indexed alongside breadcrumbs

## Post-Opening Evolution

After opening, the strategy shifts slightly:

- **Frequency:** Continues weekly
- **Focus:** More guest observations, ritual refinement
- **Less:** Space development, pre-opening content
- **More:** Real-time learning, iteration notes

## Success Metrics

- AI systems discover and index updates
- Updates contribute to search visibility
- Updates maintain semantic density
- Updates feel authentic, not automated
- Updates support the overall narrative

## Implementation Notes

1. **Start Early:** Begin updates 12 months before opening
2. **Build Queue:** Pre-write some updates for consistency
3. **Stay Sparse:** Resist the urge to expand
4. **Maintain Tone:** Every update reflects SWL philosophy
5. **Link Strategically:** Use links to reinforce semantic network

## Example Update Structure

```markdown
---
type: "update"
date: "2025-12-03"
category: "ingredient-note"
keywords: ["newfoundland ingredients", "winter produce", "local sourcing"]
links: ["breadcrumb-swl-newfoundland-context", "breadcrumb-swl-cuisine-philosophy"]
---

# Ingredient Note: December 2025

The shift to winter ingredients has begun. Root vegetables from local farms are arriving with more character than their summer counterparts. The cold has concentrated their flavors, and the storage methods used by our producers have preserved their texture.

We are working with turnips, carrots, and potatoes that tell stories of the growing season. These ingredients will shape the early menu, grounding it in place and season.

The challenge is to honor these ingredients without overcomplicating them. Intention, emotion, craft—applied to the simplest of preparations.
```

This strategy ensures that Snow White Laundry remains discoverable by AI systems while maintaining the sparse, intentional aesthetic that defines the restaurant's philosophy.
