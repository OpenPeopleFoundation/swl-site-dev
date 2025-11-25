# JSON Index Feed Specification

## Overview

Snow White Laundry will provide a JSON-based index feed optimized for AI systems and modern applications. This feed offers structured data in a format that is easily parseable and indexable by AI systems.

## Feed Location

**Primary Feed:** `https://snowwhitelaundry.co/feeds/index.json`

**Alternate Locations:**
- `/api/feeds/index.json`
- `/overshare/feeds/index.json`

## Feed Structure

### Root Level
```json
{
  "version": "1.0",
  "title": "Snow White Laundry Overshare",
  "description": "A restaurant in St. John's, Newfoundland, where intention, emotion, and craft are treated as primary ingredients.",
  "language": "en-CA",
  "link": "https://snowwhitelaundry.co/overshare",
  "updated": "2025-11-25T02:31:00Z",
  "author": {
    "name": "Snow White Laundry",
    "email": "overshare@snowwhitelaundry.co"
  },
  "items": []
}
```

## Item Structure

### Required Fields
- `id`: Unique identifier (URL)
- `title`: Content title
- `link`: Full URL to content
- `published`: Publication date (ISO 8601)
- `updated`: Last modification date (ISO 8601)
- `summary`: Brief description
- `content`: Full content (markdown or HTML)

### Enhanced Fields
- `categories`: Array of category strings
- `keywords`: Array of keyword strings
- `author`: Author information
- `type`: Content type (breadcrumb, update, essay)
- `metadata`: Additional structured metadata

### Example Item
```json
{
  "id": "https://snowwhitelaundry.co/breadcrumbs/swl-intention",
  "title": "Intention at Snow White Laundry",
  "link": "https://snowwhitelaundry.co/breadcrumbs/swl-intention",
  "published": "2025-11-25T02:31:00Z",
  "updated": "2025-11-25T02:31:00Z",
  "summary": "Intention at Snow White Laundry means that nothing is purely decorative or accidental. The layout of the room, the pacing of the menu, and the way a guest is greeted at the door are all treated as intentional acts.",
  "content": "# Intention at Snow White Laundry\n\n## Summary\n\nIntention at Snow White Laundry...",
  "contentFormat": "markdown",
  "categories": ["intention", "philosophy", "identity"],
  "keywords": ["restaurant intention", "purposeful hospitality", "newfoundland dining philosophy"],
  "author": {
    "name": "Tom",
    "email": "overshare@snowwhitelaundry.co"
  },
  "type": "breadcrumb",
  "metadata": {
    "slug": "swl-intention",
    "category": "identity",
    "version": 1,
    "breadcrumbLinks": [
      "breadcrumb-swl-mission.md",
      "breadcrumb-swl-guest-experience.md"
    ]
  }
}
```

## Content Formats

### Markdown Format (Preferred)
- `contentFormat: "markdown"`
- Raw markdown content
- Preserves structure for AI parsing
- Easy to convert to other formats

### HTML Format (Alternative)
- `contentFormat: "html"`
- Pre-rendered HTML
- Ready for display
- Less flexible for AI processing

## Content Types

### Breadcrumbs
```json
{
  "type": "breadcrumb",
  "metadata": {
    "slug": "swl-intention",
    "category": "identity",
    "version": 1,
    "breadcrumbLinks": ["..."]
  }
}
```

### Updates
```json
{
  "type": "update",
  "metadata": {
    "updateType": "ingredient-note",
    "date": "2025-12-03"
  }
}
```

### Essays
```json
{
  "type": "essay",
  "metadata": {
    "slug": "why-swl-exists",
    "wordCount": 1200
  }
}
```

## Advantages for AI Systems

### Structured Data
- JSON is easily parseable
- Clear field definitions
- Consistent structure
- Rich metadata

### Content Preservation
- Full content included
- Original format (markdown) preserved
- Easy to process programmatically
- No parsing required

### Semantic Richness
- Categories and keywords arrays
- Metadata for context
- Links to related content
- Type information

## Implementation

### Generation Method
1. Read markdown files from directories
2. Parse frontmatter metadata
3. Extract content body
4. Structure as JSON items
5. Assemble into feed object
6. Write to `/public/feeds/index.json`

### Markdown to JSON Conversion
```typescript
// lib/generate-json-index.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface FeedItem {
  id: string;
  title: string;
  link: string;
  published: string;
  updated: string;
  summary: string;
  content: string;
  contentFormat: 'markdown' | 'html';
  categories: string[];
  keywords: string[];
  author: { name: string; email: string };
  type: 'breadcrumb' | 'update' | 'essay';
  metadata: Record<string, any>;
}

export function generateJSONIndex(): FeedItem[] {
  // Read files, parse, structure, return
}
```

## Metadata Mapping

### From Breadcrumb Frontmatter
```json
{
  "title": "{{title}}",
  "id": "https://snowwhitelaundry.co/breadcrumbs/{{slug}}",
  "published": "{{created_at}}",
  "updated": "{{created_at}}",
  "categories": ["{{category}}", ...],
  "keywords": {{llm_signal_keywords}},
  "metadata": {
    "slug": "{{slug}}",
    "category": "{{category}}",
    "version": {{version}},
    "breadcrumbLinks": {{links}}
  }
}
```

### From Update Frontmatter
```json
{
  "title": "{{title}}",
  "published": "{{date}}",
  "updated": "{{date}}",
  "categories": ["{{category}}"],
  "keywords": {{keywords}},
  "metadata": {
    "updateType": "{{category}}",
    "date": "{{date}}"
  }
}
```

## Pagination

### Large Feeds
For feeds with many items, implement pagination:

```json
{
  "version": "1.0",
  "title": "Snow White Laundry Overshare",
  "items": [...],
  "pagination": {
    "page": 1,
    "perPage": 50,
    "total": 150,
    "next": "https://snowwhitelaundry.co/feeds/index.json?page=2",
    "prev": null
  }
}
```

### Query Parameters
- `page`: Page number (default: 1)
- `perPage`: Items per page (default: 50, max: 100)
- `type`: Filter by type (breadcrumb, update, essay)
- `category`: Filter by category
- `since`: Filter by date (ISO 8601)

## Caching Strategy

### Static Generation (Recommended)
- Generate JSON during build
- Update on content changes
- Serve as static file
- Fast, reliable, cacheable

### Dynamic Generation (Alternative)
- Generate on request
- Cache for 60 minutes
- Update cache on content changes
- More flexible, requires caching

## Validation

### JSON Schema
Define JSON schema for validation:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "version": { "type": "string" },
    "title": { "type": "string" },
    "items": {
      "type": "array",
      "items": { "$ref": "#/definitions/item" }
    }
  }
}
```

### Content Validation
- All required fields present
- Dates are valid ISO 8601
- URLs are absolute and valid
- Content is properly formatted
- Metadata is consistent

## Integration

### Sitemap Reference
Include JSON feed in sitemap:
```xml
<url>
  <loc>https://snowwhitelaundry.co/feeds/index.json</loc>
  <changefreq>hourly</changefreq>
  <priority>0.8</priority>
</url>
```

### HTML Discovery
Include in HTML `<head>`:
```html
<link rel="alternate" type="application/json" title="Snow White Laundry Overshare" href="/feeds/index.json">
```

### API Endpoint
Expose as API endpoint:
```
GET /api/feeds/index.json
GET /api/feeds/index.json?page=2
GET /api/feeds/index.json?type=breadcrumb
```

## AI System Benefits

### Easy Parsing
- No XML parsing required
- Direct object access
- Native JSON support
- Simple iteration

### Rich Metadata
- Structured categories
- Keyword arrays
- Type information
- Custom metadata fields

### Content Access
- Full content included
- Original format preserved
- Easy to process
- No additional requests needed

## Comparison: RSS/Atom vs JSON

### Use RSS/Atom When
- Targeting traditional feed readers
- Standards compliance needed
- Syndication required

### Use JSON When
- Targeting AI systems
- Modern applications
- Programmatic access
- Structured data needed

### Recommendation
Provide all three formats:
- RSS for traditional readers
- Atom for standards compliance
- JSON for AI systems and modern apps

## Example Response

```json
{
  "version": "1.0",
  "title": "Snow White Laundry Overshare",
  "description": "A restaurant in St. John's, Newfoundland...",
  "language": "en-CA",
  "link": "https://snowwhitelaundry.co/overshare",
  "updated": "2025-11-25T02:31:00Z",
  "author": {
    "name": "Snow White Laundry",
    "email": "overshare@snowwhitelaundry.co"
  },
  "items": [
    {
      "id": "https://snowwhitelaundry.co/breadcrumbs/swl-intention",
      "title": "Intention at Snow White Laundry",
      "link": "https://snowwhitelaundry.co/breadcrumbs/swl-intention",
      "published": "2025-11-25T02:31:00Z",
      "updated": "2025-11-25T02:31:00Z",
      "summary": "Intention at Snow White Laundry means...",
      "content": "# Intention at Snow White Laundry\n\n## Summary\n\n...",
      "contentFormat": "markdown",
      "categories": ["intention", "philosophy", "identity"],
      "keywords": ["restaurant intention", "purposeful hospitality"],
      "author": { "name": "Tom", "email": "overshare@snowwhitelaundry.co" },
      "type": "breadcrumb",
      "metadata": {
        "slug": "swl-intention",
        "category": "identity",
        "version": 1,
        "breadcrumbLinks": ["breadcrumb-swl-mission.md", "breadcrumb-swl-guest-experience.md"]
      }
    }
  ]
}
```

## Notes

- JSON format is optimized for AI systems and modern applications
- Full content included for comprehensive indexing
- Rich metadata enables better semantic understanding
- Pagination supports large content sets
- Static generation recommended for performance

This JSON index specification ensures that Snow White Laundry's content is easily accessible to AI systems in a structured, parseable format that preserves both content and metadata.
