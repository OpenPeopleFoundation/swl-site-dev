# Deployment Guide: AI SEO Overshare System

## Overview

This guide covers deploying the complete AI SEO Overshare Expansion System for Snow White Laundry.

## Prerequisites

- Next.js application deployed on Vercel
- Environment variable `NEXT_PUBLIC_SITE_URL` set (e.g., `https://snowwhitelaundry.co`)
- File system access to `swl-overshare/` directory

## Deployment Steps

### 1. Verify File Structure

Ensure all directories exist:
```bash
swl-overshare/
├── breadcrumbs/     # 28+ breadcrumb files
├── updates/         # Will be created automatically
├── structured-data/ # JSON-LD templates
├── feeds/           # Feed specifications
├── strategy/        # Content strategy
└── ...
```

### 2. Deploy Code Changes

The following files have been added/modified:

**New Files:**
- `src/app/overshare/index.json/route.ts` - JSON feed
- `src/app/api/updates/generate/route.ts` - Update generator
- `src/app/api/updates/list/route.ts` - Update list
- `vercel.json` - Cron configuration
- `scripts/generate-breadcrumbs.mjs` - Breadcrumb generation script

**Modified Files:**
- `src/app/overshare/feed.xml/route.ts` - Enhanced with full content
- `src/app/sitemap.ts` - Includes feeds and updates

### 3. Configure Vercel Cron

The `vercel.json` file configures automatic weekly updates:

```json
{
  "crons": [
    {
      "path": "/api/updates/generate",
      "schedule": "0 10 * * 2"
    }
  ]
}
```

**Schedule:** Every Tuesday at 10:00 AM NST (UTC-3:30)

**Manual Trigger:** You can also trigger updates manually:
```bash
curl -X GET https://your-domain.com/api/updates/generate
```

### 4. Verify Feeds

After deployment, verify feeds are accessible:

- RSS: `https://your-domain.com/overshare/feed.xml`
- Atom: `https://your-domain.com/overshare/atom.xml`
- JSON: `https://your-domain.com/overshare/index.json`

### 5. Test Update Generation

Test the update system:

```bash
# Generate update manually
curl -X GET https://your-domain.com/api/updates/generate

# List all updates
curl https://your-domain.com/api/updates/list
```

### 6. Verify Sitemap

Check that sitemap includes feeds and updates:

```bash
curl https://your-domain.com/sitemap.xml
```

Should include:
- All breadcrumb URLs
- Feed URLs (feed.xml, atom.xml, index.json)
- Update URLs (when updates exist)

## Post-Deployment Checklist

### Immediate
- [ ] Verify all feeds return valid XML/JSON
- [ ] Test update generation API
- [ ] Verify sitemap includes feeds
- [ ] Check feed content includes full breadcrumb text
- [ ] Verify RSS includes `content:encoded` with HTML

### Short-term
- [ ] Monitor feed consumption (Google Search Console)
- [ ] Test cron job execution (wait for Tuesday)
- [ ] Verify updates directory is created automatically
- [ ] Check feed caching (should cache for 10 minutes)

### Long-term
- [ ] Generate remaining breadcrumbs (112 identified)
- [ ] Create `/updates/[slug]` page for displaying updates
- [ ] Add JSON-LD structured data to pages
- [ ] Set up monitoring/analytics for feed usage

## Environment Variables

Required:
```env
NEXT_PUBLIC_SITE_URL=https://snowwhitelaundry.co
```

Optional (for enhanced features):
```env
# Add if you want custom update templates
UPDATE_TEMPLATE_PATH=/path/to/templates
```

## Feed Discovery

Feeds are automatically discoverable via:

1. **Sitemap** - All feeds listed in sitemap.xml
2. **HTML Head** - Add to layout.tsx:
```html
<link rel="alternate" type="application/rss+xml" href="/overshare/feed.xml" />
<link rel="alternate" type="application/atom+xml" href="/overshare/atom.xml" />
<link rel="alternate" type="application/json" href="/overshare/index.json" />
```

## Monitoring

### Feed Analytics

Monitor feed consumption:
- Google Search Console - Check sitemap submission
- Server logs - Track feed requests
- Vercel Analytics - Monitor API route usage

### Update Generation

Monitor update generation:
- Vercel Cron logs - Check execution logs
- API route logs - Verify successful generation
- File system - Confirm updates directory populated

## Troubleshooting

### Feeds Not Generating

1. Check file system access to `swl-overshare/breadcrumbs/`
2. Verify breadcrumb files exist and are readable
3. Check server logs for errors
4. Verify `remark` and `remark-html` packages installed

### Updates Not Generating

1. Check Vercel cron configuration
2. Verify API route is accessible
3. Check file system write permissions
4. Review API route logs for errors

### Sitemap Missing Feeds

1. Verify sitemap.ts includes feed URLs
2. Check build logs for errors
3. Verify BASE_URL environment variable set
4. Check sitemap generation during build

## Next Steps

1. **Generate Breadcrumbs** - Use `scripts/generate-breadcrumbs.mjs` to identify what needs generation
2. **Create Update Pages** - Build `/updates/[slug]` page to display updates
3. **Add Structured Data** - Inject JSON-LD into breadcrumb and update pages
4. **Monitor & Optimize** - Track feed consumption and optimize based on usage

## Support

For issues or questions:
1. Check `IMPLEMENTATION-STATUS.md` for current status
2. Review `ACCURACY-REVIEW.md` for validation results
3. Consult `README-OVERSHARE-BUILD.md` for system overview

## Notes

- Feeds are cached for 10 minutes, stale-while-revalidate for 24 hours
- Updates are generated weekly via cron (Tuesdays at 10 AM NST)
- All feeds include full content for AI ingestion
- Sitemap automatically includes new breadcrumbs and updates
- Breadcrumb generation script identifies 112 breadcrumbs to create
