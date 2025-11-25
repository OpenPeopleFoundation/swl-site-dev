# Monitoring Guide: AI SEO Overshare System

## Overview

This guide covers monitoring feed consumption, AI indexing, and system health for the Snow White Laundry AI SEO Overshare system.

## Monitoring Endpoints

### Feed Monitoring
**Endpoint:** `GET /api/monitoring/feeds`

Returns current system status:
- Breadcrumb count
- Update count
- Feed URLs
- Sitemap URL
- Recommendations

**Example Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-11-25T12:00:00Z",
  "content": {
    "breadcrumbs": 35,
    "updates": 5,
    "total": 40
  },
  "feeds": {
    "rss": "https://snowwhitelaundry.co/overshare/feed.xml",
    "atom": "https://snowwhitelaundry.co/overshare/atom.xml",
    "json": "https://snowwhitelaundry.co/overshare/index.json"
  },
  "sitemap": "https://snowwhitelaundry.co/sitemap.xml"
}
```

### Validation Monitoring
**Endpoint:** `GET /api/monitoring/validation`

Validates content structure and checks for issues:
- Missing frontmatter fields
- Broken internal links
- Missing sections
- Format issues

**Example Response:**
```json
{
  "status": "valid",
  "validation": {
    "issues": [],
    "warnings": ["breadcrumb-swl-example.md: Missing category"],
    "summary": {
      "totalIssues": 0,
      "totalWarnings": 1
    }
  }
}
```

## External Monitoring

### Google Search Console

1. **Submit Sitemap**
   - URL: `https://snowwhitelaundry.co/sitemap.xml`
   - Submit in Google Search Console
   - Monitor indexing status

2. **Monitor Feed Consumption**
   - Check "Coverage" report
   - Monitor "Sitemaps" section
   - Track indexing of breadcrumbs and updates

3. **Rich Results Test**
   - Test breadcrumb pages: `https://search.google.com/test/rich-results`
   - Verify JSON-LD structured data
   - Check for errors or warnings

### Bing Webmaster Tools

1. **Submit Sitemap**
   - URL: `https://snowwhitelaundry.co/sitemap.xml`
   - Submit in Bing Webmaster Tools
   - Monitor indexing status

### Feed Validators

1. **RSS Feed**
   - Validator: https://validator.w3.org/feed/
   - URL: `https://snowwhitelaundry.co/overshare/feed.xml`
   - Check for XML errors

2. **Atom Feed**
   - Validator: https://validator.w3.org/feed/
   - URL: `https://snowwhitelaundry.co/overshare/atom.xml`
   - Check for XML errors

### AI System Monitoring

1. **Perplexity**
   - Search for "Snow White Laundry" or specific breadcrumb topics
   - Check if content appears in sources
   - Monitor citation frequency

2. **OpenAI Search**
   - Test queries related to restaurant topics
   - Check if breadcrumbs appear in results
   - Monitor relevance and ranking

3. **Bing AI**
   - Test queries related to Newfoundland dining
   - Check if content appears in sources
   - Monitor citation quality

## Monitoring Checklist

### Daily
- [ ] Check feed monitoring endpoint
- [ ] Verify feeds are accessible
- [ ] Check for update generation errors

### Weekly
- [ ] Review validation monitoring endpoint
- [ ] Check Google Search Console for indexing
- [ ] Review feed consumption metrics
- [ ] Test feed validators

### Monthly
- [ ] Review AI system citations
- [ ] Analyze search performance
- [ ] Review content coverage
- [ ] Check for broken links

## Metrics to Track

### Content Metrics
- Total breadcrumbs
- Total updates
- Content freshness (last update date)
- Link density (average links per breadcrumb)

### Feed Metrics
- Feed requests per day
- Feed validation status
- Feed error rate
- Feed cache hit rate

### Indexing Metrics
- Pages indexed (Google Search Console)
- Indexing errors
- Rich results status
- Sitemap submission status

### AI Metrics
- Citations in AI systems
- Query relevance
- Source attribution
- Content discovery rate

## Automated Monitoring

### Vercel Analytics
- Monitor API route usage
- Track feed request patterns
- Identify peak usage times
- Monitor error rates

### Uptime Monitoring
Set up uptime monitoring for:
- Feed endpoints (`/overshare/feed.xml`, `/overshare/atom.xml`, `/overshare/index.json`)
- Update API (`/api/updates/generate`)
- Monitoring endpoints (`/api/monitoring/feeds`, `/api/monitoring/validation`)

### Error Tracking
Monitor for:
- Feed generation errors
- Update generation failures
- JSON-LD validation errors
- Broken link errors

## Alerts

Set up alerts for:
1. **Feed Generation Failures** - If feeds fail to generate
2. **Update Generation Failures** - If weekly updates fail
3. **High Error Rates** - If validation shows many issues
4. **Indexing Problems** - If Google Search Console shows errors
5. **Broken Links** - If many broken links detected

## Troubleshooting

### Feeds Not Accessible
1. Check file system permissions
2. Verify breadcrumb directory exists
3. Check server logs for errors
4. Verify BASE_URL environment variable

### Updates Not Generating
1. Check Vercel cron logs
2. Verify API route is accessible
3. Check file system write permissions
4. Review update generation logs

### Validation Issues
1. Review validation endpoint output
2. Fix missing frontmatter fields
3. Repair broken links
4. Add missing sections

### Indexing Problems
1. Submit sitemap to search engines
2. Check for crawl errors
3. Verify robots.txt allows crawling
4. Review structured data validation

## Best Practices

1. **Regular Monitoring** - Check monitoring endpoints weekly
2. **Proactive Validation** - Run validation before deployments
3. **Content Quality** - Maintain high content standards
4. **Link Integrity** - Regularly check for broken links
5. **Feed Health** - Monitor feed validation status
6. **Indexing Status** - Track search engine indexing
7. **AI Citations** - Monitor AI system usage

## Tools

- **Google Search Console** - Search engine monitoring
- **Bing Webmaster Tools** - Bing indexing monitoring
- **W3C Feed Validator** - Feed validation
- **Rich Results Test** - Structured data validation
- **Vercel Analytics** - Performance monitoring
- **Uptime Robot** - Uptime monitoring
- **Sentry** - Error tracking (optional)

## Notes

- Monitoring endpoints are lightweight and can be called frequently
- Validation endpoint samples files for performance
- External monitoring requires manual setup
- AI system monitoring requires manual testing
- Regular monitoring ensures system health and discoverability
