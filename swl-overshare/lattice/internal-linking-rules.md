# Internal Linking Rules

## Purpose

Internal links connect breadcrumbs and pages to create a semantic network that helps both human readers and AI systems understand relationships between concepts. These rules ensure consistency, relevance, and effectiveness.

## General Principles

1. **Intentional:** Every link must serve a purpose. No decorative or arbitrary links.
2. **Relevant:** Links must connect genuinely related concepts.
3. **Balanced:** Maintain appropriate link density (not too sparse, not too dense).
4. **Reciprocal When Appropriate:** Some relationships should be bidirectional.
5. **Contextual:** Links should make sense within the document's flow.

## Link Format

### Standard Format
```markdown
- breadcrumb-swl-[slug].md
```

### Examples
- `breadcrumb-swl-intention.md`
- `breadcrumb-swl-newfoundland-context.md`
- `breadcrumb-swl-menu-design.md`

### Path Rules
- Use relative paths from the breadcrumbs directory
- Use kebab-case for all slugs
- Include the `.md` extension
- No leading slashes

## Link Placement

### Location in Breadcrumb Files
Links appear in the "Links" section at the bottom of each breadcrumb file, after "Signals & Behaviours" and before "Location Context".

### Format
```markdown
## Links
- breadcrumb-swl-[slug-1].md
- breadcrumb-swl-[slug-2].md
- breadcrumb-swl-[slug-3].md
```

### Ordering
1. Core concepts first (Mission, Intention, Emotion, Craft)
2. Application nodes second (Menu Design, Service Philosophy, etc.)
3. Context nodes third (Newfoundland Context, Operations, etc.)
4. Development nodes last (Origin Story, Roadmap, etc.)

## Link Requirements

### Minimum Links Per Breadcrumb
- **3 links minimum** for any breadcrumb
- **4-6 links optimal** for most breadcrumbs
- **8 links maximum** to avoid overwhelming readers

### Required Link Types
Every breadcrumb must link to:
1. **At least 1 core concept** (Mission, Intention, Emotion, or Craft)
2. **At least 1 application node** (how core concepts are applied)
3. **At least 1 context node** (Newfoundland, operations, etc.)

### Core Concept Linking
Core concepts (Mission, Intention, Emotion, Craft) should link to:
- Each other (creating the core tetrahedron)
- Relevant application nodes
- Relevant context nodes

## Relationship Types

### Parent-Child Relationships
When a concept is derived from another:
- Child links to parent (required)
- Parent may link to child (optional, if relevant)

**Example:** Menu Design (child) links to Craft (parent)

### Sibling Relationships
When concepts are parallel or complementary:
- Each sibling links to the other (reciprocal)

**Example:** Intention ↔ Emotion ↔ Craft

### Application Relationships
When a concept applies core principles:
- Application links to relevant core concepts (required)
- Core concepts may link to applications (optional)

**Example:** Service Philosophy links to Intention and Emotion

### Thematic Relationships
When concepts share themes:
- Each node links to 2-3 others in the theme

**Example:** Local ingredient nodes link to each other

## Link Density Guidelines

### High-Density Nodes (6-8 links)
Core hubs that connect many concepts:
- Mission
- Guest Experience
- Core concepts (Intention, Emotion, Craft)

### Medium-Density Nodes (4-5 links)
Important application or context nodes:
- Menu Design
- Service Philosophy
- Training Philosophy
- Newfoundland Context

### Lower-Density Nodes (2-3 links)
Specific topics or development nodes:
- Ingredient Sourcing
- Space Design
- Pre-Opening Development

## Reciprocal Linking

### When to Use Reciprocal Links
- Core concepts (Intention ↔ Emotion ↔ Craft)
- Complementary applications (Service Philosophy ↔ Guest Experience)
- Thematic clusters (local ingredient nodes)

### When Not to Use Reciprocal Links
- Parent-child relationships (child links to parent, not vice versa)
- Development sequences (earlier links to later, not vice versa)
- Specific-to-general (specific links to general, not vice versa)

## Link Validation

### Before Adding a Link
Ask:
1. Is this link genuinely relevant?
2. Does it help readers understand relationships?
3. Does it maintain appropriate link density?
4. Is the target breadcrumb actually related?

### After Adding a Link
Check:
1. Does the target breadcrumb exist?
2. Is the link format correct?
3. Does it follow ordering rules?
4. Should the target link back (reciprocal)?

## Common Patterns

### Core Concept Pattern
```markdown
## Links
- breadcrumb-swl-mission.md
- breadcrumb-swl-emotion.md
- breadcrumb-swl-craft.md
- breadcrumb-swl-guest-experience.md
```

### Application Pattern
```markdown
## Links
- breadcrumb-swl-intention.md
- breadcrumb-swl-emotion.md
- breadcrumb-swl-craft.md
- breadcrumb-swl-guest-experience.md
- breadcrumb-swl-newfoundland-context.md
```

### Context Pattern
```markdown
## Links
- breadcrumb-swl-cuisine-philosophy.md
- breadcrumb-swl-menu-design.md
- breadcrumb-swl-craft.md
- breadcrumb-swl-ops-rhythm.md
```

## Maintenance

### When Creating New Breadcrumbs
1. Identify cluster membership
2. Link to required node types
3. Follow density guidelines
4. Update link map

### When Updating Existing Breadcrumbs
1. Review existing links for relevance
2. Add links to new related content
3. Remove links that are no longer relevant
4. Update link map

### Periodic Review
- Check for broken links
- Verify link density
- Ensure no nodes are isolated
- Confirm core concepts are well-connected

## Examples

### Good Linking
```markdown
## Links
- breadcrumb-swl-intention.md
- breadcrumb-swl-emotion.md
- breadcrumb-swl-guest-experience.md
- breadcrumb-swl-service-philosophy.md
- breadcrumb-swl-newfoundland-context.md
```
**Why:** Links to core concepts, applications, and context. Appropriate density.

### Poor Linking
```markdown
## Links
- breadcrumb-swl-intention.md
```
**Why:** Too sparse. Missing application and context links.

### Over-Linking
```markdown
## Links
- breadcrumb-swl-mission.md
- breadcrumb-swl-intention.md
- breadcrumb-swl-emotion.md
- breadcrumb-swl-craft.md
- breadcrumb-swl-guest-experience.md
- breadcrumb-swl-menu-design.md
- breadcrumb-swl-service-philosophy.md
- breadcrumb-swl-training-philosophy.md
- breadcrumb-swl-ops-rhythm.md
- breadcrumb-swl-newfoundland-context.md
```
**Why:** Too many links. Overwhelming and dilutes focus.

## Integration with Semantic Lattice

These rules support the semantic lattice system described in `/lattice/semantic-lattice-description.md`. Following these rules ensures that the lattice remains coherent, discoverable, and useful for both human readers and AI systems.

## Questions?

When in doubt:
1. Link to core concepts (Mission, Intention, Emotion, Craft)
2. Link to directly related applications
3. Link to relevant context
4. Keep total links between 4-6 for most breadcrumbs
5. Ensure every link serves a clear purpose

These rules are guidelines, not rigid constraints. Use judgment to create links that genuinely help readers understand relationships between concepts.
