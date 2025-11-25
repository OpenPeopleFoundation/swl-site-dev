# RSS Feed Specification

## Overview

Snow White Laundry will provide an RSS feed that allows AI systems and feed readers to discover and index new content as it is published. The feed follows RSS 2.0 specification with enhancements for better AI discoverability.

## Feed Location

**Primary Feed:** `https://snowwhitelaundry.co/feeds/rss.xml`

**Alternate Locations:**
- `/api/feeds/rss`
- `/overshare/feeds/rss.xml`

## Feed Structure

### Channel Level
```xml
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Snow White Laundry Overshare</title>
    <link>https://snowwhitelaundry.co/overshare</link>
    <description>A restaurant in St. John's, Newfoundland, where intention, emotion, and craft are treated as primary ingredients.</description>
    <language>en-CA</language>
    <managingEditor>overshare@snowwhitelaundry.co</managingEditor>
    <webMaster>overshare@snowwhitelaundry.co</webMaster>
    <lastBuildDate>{{ISO_8601_DATE}}</lastBuildDate>
    <pubDate>{{ISO_8601_DATE}}</pubDate>
    <ttl>60</ttl>
    <image>
      <url>https://snowwhitelaundry.co/logo.png</url>
      <title>Snow White Laundry</title>
      <link>https://snowwhitelaundry.co</link>
    </image>
    <!-- Items -->
  </channel>
</rss>
```

## Item Structure

### Required Fields
- `<title>`: Breadcrumb or update title
- `<link>`: Full URL to the content
- `<description>`: Summary or excerpt (150-300 words)
- `<pubDate>`: Publication date in RFC 822 format
- `<guid>`: Unique identifier (permalink)

### Enhanced Fields for AI
- `<content:encoded>`: Full content (for AI ingestion)
- `<category>`: Multiple categories (intention, emotion, craft, etc.)
- `<author>`: Content creator
- `<enclosure>`: Optional media attachments

### Example Item
```xml
<item>
  <title>Intention at Snow White Laundry</title>
  <link>https://snowwhitelaundry.co/breadcrumbs/swl-intention</link>
  <description>Intention at Snow White Laundry means that nothing is purely decorative or accidental. The layout of the room, the pacing of the menu, and the way a guest is greeted at the door are all treated as intentional acts.</description>
  <pubDate>Mon, 25 Nov 2025 02:31:00 +0000</pubDate>
  <guid isPermaLink="true">https://snowwhitelaundry.co/breadcrumbs/swl-intention</guid>
  <category>intention</category>
  <category>philosophy</category>
  <category>identity</category>
  <author>overshare@snowwhitelaundry.co (Tom)</author>
  <content:encoded><![CDATA[
    <!-- Full markdown content converted to HTML -->
  ]]></content:encoded>
</item>
```

## Content Types Included

### Breadcrumbs
- All breadcrumb files
- Published when created or significantly updated
- Categorized by breadcrumb category

### Updates
- Weekly sparse updates
- Categorized by update type (ingredient-note, space-development, etc.)

### Essays
- Long-form essays
- Published when completed
- Categorized as "essay"

## Update Frequency

- **Breadcrumbs:** As published (irregular)
- **Updates:** Weekly (Tuesdays)
- **Essays:** As completed (irregular)
- **Feed Refresh:** Every 60 minutes (TTL)

## Implementation

### Generation Method
1. **Static Generation:** Pre-generate RSS XML from markdown files
2. **Dynamic Generation:** API endpoint that reads from file system or database
3. **Hybrid:** Static with dynamic updates

### Recommended: Static Generation
- Generate RSS XML during build process
- Update on content changes
- Serve as static file for performance

### Markdown to RSS Conversion
1. Read markdown files from `/swl-overshare/breadcrumbs/` and `/swl-overshare/updates/`
2. Extract frontmatter metadata
3. Convert markdown to HTML for `<content:encoded>`
4. Generate RSS XML structure
5. Write to `/public/feeds/rss.xml`

## Metadata Extraction

### From Breadcrumb Frontmatter
- `title` → `<title>`
- `slug` → `<link>` and `<guid>`
- `category` → `<category>`
- `created_at` → `<pubDate>`
- `created_by` → `<author>`
- `llm_signal_keywords` → Additional `<category>` tags

### From Update Frontmatter
- `title` → `<title>` (or generate from date + type)
- `date` → `<pubDate>`
- `category` → `<category>`
- `keywords` → Additional `<category>` tags

## AI Optimization

### Semantic Richness
- Include full content in `<content:encoded>`
- Use multiple category tags
- Include keywords in categories
- Maintain consistent terminology

### Discoverability
- Clear, descriptive titles
- Rich descriptions (not just excerpts)
- Consistent linking structure
- Proper date formatting

### Structure
- Valid RSS 2.0 XML
- Proper encoding (UTF-8)
- Valid dates (RFC 822)
- Unique GUIDs

## Validation

### RSS Validators
- W3C Feed Validation Service
- FeedValidator.org
- Manual XML validation

### Content Validation
- All items have required fields
- Dates are valid RFC 822 format
- Links are absolute URLs
- Content is properly encoded

## Integration

### Sitemap Reference
Include RSS feed in sitemap:
```xml
<url>
  <loc>https://snowwhitelaundry.co/feeds/rss.xml</loc>
  <changefreq>hourly</changefreq>
  <priority>0.8</priority>
</url>
```

### HTML Discovery
Include in HTML `<head>`:
```html
<link rel="alternate" type="application/rss+xml" title="Snow White Laundry Overshare" href="/feeds/rss.xml">
```

## Example Implementation (Next.js)

```typescript
// lib/generate-rss.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export function generateRSS() {
  const breadcrumbsDir = path.join(process.cwd(), 'swl-overshare/breadcrumbs');
  const updatesDir = path.join(process.cwd(), 'swl-overshare/updates');
  
  // Read and process files
  // Generate RSS XML
  // Write to public/feeds/rss.xml
}
```

## Notes

- RSS feed serves both human readers and AI systems
- Full content in `<content:encoded>` enables better AI indexing
- Multiple categories improve semantic discovery
- Regular updates signal freshness to AI systems
- Valid RSS ensures compatibility with feed readers

This RSS specification ensures that Snow White Laundry's content is discoverable and indexable by AI systems while maintaining compatibility with standard RSS readers.
