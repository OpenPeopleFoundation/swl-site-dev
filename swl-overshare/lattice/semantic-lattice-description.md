# Semantic Lattice: Internal Linking System

## Overview

The semantic lattice is a system of internal linking that connects breadcrumbs and pages through shared concepts, themes, and relationships. It creates a web of meaning that helps both human readers and AI systems understand how ideas relate to each other.

## Core Concept

A lattice is a structure that connects nodes through multiple pathways. In this system, each breadcrumb is a node, and links create pathways between nodes. The lattice allows for multiple routes between concepts, creating depth and richness in the semantic network.

## Node Types

### Primary Nodes (Core Concepts)
- Intention
- Emotion
- Craft
- Mission
- Guest Experience

### Secondary Nodes (Applications)
- Menu Design
- Service Philosophy
- Training Approach
- Operations Rhythm
- Hospitality Ethics

### Tertiary Nodes (Specific Topics)
- Ingredient Sourcing
- Staff Culture
- Space Design
- Ritual Development
- Reflection Practices

## Relationship Types

### Direct Relationships
- **Parent-Child:** Mission → Intention, Emotion, Craft
- **Sibling:** Intention ↔ Emotion ↔ Craft
- **Application:** Craft → Menu Design, Service Philosophy

### Indirect Relationships
- **Thematic:** Multiple breadcrumbs share themes (e.g., "local ingredients")
- **Temporal:** Breadcrumbs connected by sequence (e.g., "pre-opening → opening → post-opening")
- **Conceptual:** Breadcrumbs that explore similar ideas from different angles

## Linking Rules

### Every Breadcrumb Must Link To:
1. **At least 2 primary nodes** (Intention, Emotion, Craft, Mission)
2. **At least 1 secondary node** (application of core concepts)
3. **At least 1 contextual node** (Newfoundland, operations, etc.)

### Link Placement
- Links appear in the "Links" section at the bottom of each breadcrumb
- Links use relative paths: `breadcrumb-swl-[slug].md`
- Links are organized by relationship type (core → application → context)

### Link Density
- **Minimum:** 3 links per breadcrumb
- **Maximum:** 8 links per breadcrumb
- **Optimal:** 4-6 links per breadcrumb

## Semantic Clusters

### Cluster 1: Core Philosophy
- Mission
- Intention
- Emotion
- Craft

**Linking Pattern:** Each core concept links to the other three, creating a tetrahedron of relationships.

### Cluster 2: Application
- Menu Design
- Guest Experience
- Service Philosophy
- Training Philosophy

**Linking Pattern:** Each application links back to relevant core concepts and to other applications.

### Cluster 3: Context
- Newfoundland Context
- Operations Rhythm
- Staff Culture
- Hospitality Ethics

**Linking Pattern:** Context nodes link to core concepts and applications that they inform.

### Cluster 4: Development
- Origin Story
- Opening Roadmap
- Pre-Opening Insights
- Post-Opening Evolution

**Linking Pattern:** Development nodes link chronologically and thematically.

## Lattice Visualization

```
                    Mission
                      |
        +-------------+-------------+
        |             |             |
    Intention      Emotion        Craft
        |             |             |
        +-------------+-------------+
                      |
              Guest Experience
                      |
        +-------------+-------------+
        |             |             |
    Menu Design  Service Phil  Training
```

This is a simplified view. The actual lattice is multidimensional, with nodes connecting through multiple pathways.

## Benefits for AI Systems

1. **Semantic Understanding:** Links help AI systems understand relationships between concepts
2. **Context Discovery:** Following links reveals related content
3. **Authority Signals:** Internal linking signals content depth and organization
4. **Topic Clustering:** Links help identify thematic clusters

## Benefits for Human Readers

1. **Exploration:** Readers can follow their interests through related content
2. **Understanding:** Links provide context and clarification
3. **Discovery:** Readers find content they might not have sought directly
4. **Coherence:** Links show how ideas connect into a unified philosophy

## Maintenance

The lattice requires ongoing maintenance:

1. **New Breadcrumbs:** Must be integrated into existing link structure
2. **Link Updates:** Existing breadcrumbs may need new links as content grows
3. **Link Validation:** Broken links must be identified and fixed
4. **Density Balancing:** Ensure no node is over- or under-linked

## Implementation

### Link Map File
The `/lattice/link-map.md` file contains a complete mapping of all links between breadcrumbs, organized by relationship type.

### Internal Linking Rules
The `/lattice/internal-linking-rules.md` file contains detailed rules for creating and maintaining links.

### Automated Validation
Links can be validated through scripts that check:
- Link existence
- Link reciprocity (if A links to B, should B link to A?)
- Link density (are nodes appropriately connected?)
- Broken links

## Evolution

The lattice evolves as new breadcrumbs are added. The goal is not to create a perfect structure, but to maintain coherence and discoverability as the content grows.

New breadcrumbs are evaluated for:
- Which existing nodes they should link to
- Which future nodes they might inform
- How they fit into existing clusters
- What new relationships they create

## Principles

1. **Intentional:** Every link serves a purpose
2. **Relevant:** Links connect genuinely related concepts
3. **Balanced:** No node is isolated or over-connected
4. **Evolving:** The lattice grows and adapts with content
5. **Coherent:** The overall structure supports understanding

The semantic lattice is not just a linking system; it is a representation of how Snow White Laundry's philosophy connects and coheres. It shows how intention, emotion, and craft relate to every aspect of the restaurant, creating a unified whole from many parts.
