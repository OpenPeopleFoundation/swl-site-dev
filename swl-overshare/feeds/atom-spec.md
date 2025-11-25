# Atom Feed Specification

## Overview

Snow White Laundry will provide an Atom feed as an alternative to RSS, offering enhanced metadata and better support for content syndication. Atom 1.0 provides more structured metadata that can benefit AI systems.

## Feed Location

**Primary Feed:** `https://snowwhitelaundry.co/feeds/atom.xml`

**Alternate Locations:**
- `/api/feeds/atom`
- `/overshare/feeds/atom.xml`

## Feed Structure

### Feed Level
```xml
<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom"
      xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <title>Snow White Laundry Overshare</title>
  <subtitle>A restaurant in St. John's, Newfoundland, where intention, emotion, and craft are treated as primary ingredients.</subtitle>
  <link href="https://snowwhitelaundry.co/overshare" rel="alternate"/>
  <link href="https://snowwhitelaundry.co/feeds/atom.xml" rel="self"/>
  <id>https://snowwhitelaundry.co/overshare</id>
  <updated>{{ISO_8601_DATE}}</updated>
  <author>
    <name>Snow White Laundry</name>
    <email>overshare@snowwhitelaundry.co</email>
  </author>
  <rights>Copyright © 2026 Snow White Laundry</rights>
  <!-- Entries -->
</feed>
```

## Entry Structure

### Required Fields
- `<title>`: Content title
- `<id>`: Unique, permanent identifier (URL)
- `<updated>`: Last modification date (ISO 8601)
- `<author>`: Content creator
- `<link>`: Link to content (rel="alternate")
- `<summary>`: Brief description
- `<content>`: Full content

### Enhanced Fields
- `<category>`: Multiple categories with schemes
- `<published>`: Original publication date
- `<rights>`: Copyright information
- `<contributor>`: Additional contributors

### Example Entry
```xml
<entry>
  <title>Intention at Snow White Laundry</title>
  <id>https://snowwhitelaundry.co/breadcrumbs/swl-intention</id>
  <updated>2025-11-25T02:31:00Z</updated>
  <published>2025-11-25T02:31:00Z</published>
  <link href="https://snowwhitelaundry.co/breadcrumbs/swl-intention" rel="alternate"/>
  <author>
    <name>Tom</name>
    <email>overshare@snowwhitelaundry.co</email>
  </author>
  <summary>Intention at Snow White Laundry means that nothing is purely decorative or accidental. The layout of the room, the pacing of the menu, and the way a guest is greeted at the door are all treated as intentional acts.</summary>
  <content type="html">
    <!-- Full HTML content -->
  </content>
  <category term="intention" scheme="https://snowwhitelaundry.co/categories"/>
  <category term="philosophy" scheme="https://snowwhitelaundry.co/categories"/>
  <category term="identity" scheme="https://snowwhitelaundry.co/categories"/>
  <rights>Copyright © 2026 Snow White Laundry</rights>
</entry>
```

## Advantages Over RSS

### Better Metadata
- Structured author information
- Separate published/updated dates
- Category schemes for organization
- More precise date formatting (ISO 8601)

### Content Handling
- Explicit content type specification
- Better support for HTML/XHTML content
- Clearer distinction between summary and content

### Standards Compliance
- W3C standard (not just de facto)
- Better internationalization support
- More extensible structure

## Content Types Included

### Breadcrumbs
- All breadcrumb files
- Full content in `<content>` element
- Categorized with scheme

### Updates
- Weekly sparse updates
- Categorized by update type
- Timestamped for freshness

### Essays
- Long-form essays
- Full content included
- Categorized as "essay"

## Update Frequency

- **Breadcrumbs:** As published (irregular)
- **Updates:** Weekly (Tuesdays)
- **Essays:** As completed (irregular)
- **Feed Refresh:** Every 60 minutes

## Implementation

### Generation Method
Similar to RSS, but using Atom XML structure:

1. Read markdown files
2. Extract frontmatter metadata
3. Convert markdown to HTML
4. Generate Atom XML structure
5. Write to `/public/feeds/atom.xml`

### Markdown to Atom Conversion
1. Parse frontmatter for metadata
2. Convert markdown body to HTML
3. Generate Atom entry structure
4. Assemble feed with entries
5. Output valid Atom XML

## Metadata Mapping

### From Breadcrumb Frontmatter
- `title` → `<title>`
- `slug` → `<id>` and `<link href>`
- `category` → `<category term>`
- `created_at` → `<published>` and `<updated>`
- `created_by` → `<author>`
- `llm_signal_keywords` → Additional `<category>` elements

### From Update Frontmatter
- `title` → `<title>`
- `date` → `<published>` and `<updated>`
- `category` → `<category term>`
- `keywords` → Additional `<category>` elements

## Category Schemes

### Scheme Structure
```
https://snowwhitelaundry.co/categories/{scheme}
```

### Schemes
- `philosophy`: Core concepts (intention, emotion, craft)
- `application`: How concepts are applied (menu, service, training)
- `context`: Place and operations (newfoundland, rhythm, culture)
- `development`: Timeline (origin, roadmap, pre-opening)
- `content-type`: Type of content (breadcrumb, update, essay)

### Example Categories
```xml
<category term="intention" scheme="https://snowwhitelaundry.co/categories/philosophy"/>
<category term="menu-design" scheme="https://snowwhitelaundry.co/categories/application"/>
<category term="newfoundland" scheme="https://snowwhitelaundry.co/categories/context"/>
<category term="breadcrumb" scheme="https://snowwhitelaundry.co/categories/content-type"/>
```

## AI Optimization

### Structured Metadata
- Clear author attribution
- Precise date information
- Categorized content with schemes
- Full content for indexing

### Discoverability
- Unique, permanent IDs (URLs)
- Rich summaries
- Multiple category tags
- Consistent terminology

### Standards Compliance
- Valid Atom 1.0 XML
- Proper namespaces
- Correct date formats (ISO 8601)
- Valid XML structure

## Validation

### Atom Validators
- W3C Feed Validation Service
- Atom-specific validators
- XML validation

### Content Validation
- All entries have required fields
- Dates are valid ISO 8601 format
- Links are absolute URLs
- Content is properly formatted HTML

## Integration

### Sitemap Reference
Include Atom feed in sitemap:
```xml
<url>
  <loc>https://snowwhitelaundry.co/feeds/atom.xml</loc>
  <changefreq>hourly</changefreq>
  <priority>0.8</priority>
</url>
```

### HTML Discovery
Include in HTML `<head>`:
```html
<link rel="alternate" type="application/atom+xml" title="Snow White Laundry Overshare" href="/feeds/atom.xml">
```

## Example Implementation (Next.js)

```typescript
// lib/generate-atom.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export function generateAtom() {
  const breadcrumbsDir = path.join(process.cwd(), 'swl-overshare/breadcrumbs');
  const updatesDir = path.join(process.cwd(), 'swl-overshare/updates');
  
  // Read and process files
  // Generate Atom XML
  // Write to public/feeds/atom.xml
}
```

## Comparison: RSS vs Atom

### Use RSS When
- Targeting traditional feed readers
- Simpler implementation needed
- Broader compatibility required

### Use Atom When
- Better metadata needed
- Standards compliance important
- More structured content required
- AI systems benefit from structure

### Recommendation
Provide both feeds. They serve similar purposes but different audiences. Atom's structured metadata may be more beneficial for AI systems, while RSS has broader reader support.

## Notes

- Atom provides more structured metadata than RSS
- Category schemes enable better organization
- ISO 8601 dates are more precise than RFC 822
- Full content in `<content>` enables AI indexing
- Valid Atom ensures compatibility with feed readers

This Atom specification ensures that Snow White Laundry's content is discoverable with enhanced metadata structure, benefiting both AI systems and feed readers that support Atom.
