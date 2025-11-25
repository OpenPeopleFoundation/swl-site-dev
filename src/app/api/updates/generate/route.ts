import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

/**
 * Generate Weekly Sparse Update
 * 
 * This endpoint generates a sparse update (50-150 words) based on
 * the sparse update strategy. Can be called via Vercel cron or manually.
 * 
 * Cron schedule: Every Tuesday at 10:00 AM NST
 */

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://snowwhitelaundry.ai";
const updatesDir = path.join(process.cwd(), "swl-overshare/updates");

type UpdateType =
  | "ingredient-note"
  | "space-development"
  | "staff-reflection"
  | "menu-evolution"
  | "ritual-refinement"
  | "guest-observations";

type UpdateCategory = {
  type: UpdateType;
  weight: number; // Probability weight
  minWords: number;
  maxWords: number;
};

const updateCategories: UpdateCategory[] = [
  {
    type: "ingredient-note",
    weight: 2,
    minWords: 50,
    maxWords: 100,
  },
  {
    type: "space-development",
    weight: 1,
    minWords: 75,
    maxWords: 125,
  },
  {
    type: "staff-reflection",
    weight: 2,
    minWords: 100,
    maxWords: 150,
  },
  {
    type: "menu-evolution",
    weight: 1,
    minWords: 75,
    maxWords: 125,
  },
  {
    type: "ritual-refinement",
    weight: 2,
    minWords: 50,
    maxWords: 100,
  },
  {
    type: "guest-observations",
    weight: 1,
    minWords: 75,
    maxWords: 125,
  },
];

function selectUpdateType(): UpdateType {
  const totalWeight = updateCategories.reduce((sum, cat) => sum + cat.weight, 0);
  let random = Math.random() * totalWeight;
  
  for (const category of updateCategories) {
    random -= category.weight;
    if (random <= 0) {
      return category.type;
    }
  }
  
  return updateCategories[0].type;
}

function generateUpdateContent(type: UpdateType): string {
  const now = new Date();
  const dateStr = now.toISOString().split("T")[0];
  
  const templates: Record<UpdateType, string> = {
    "ingredient-note": `# Ingredient Note: ${now.toLocaleDateString("en-CA", { month: "long", year: "numeric" })}

The shift to seasonal ingredients continues. Local producers are bringing ingredients that reflect the current season and weather patterns. These ingredients shape our menu development, grounding it in place and time.

We are working with ingredients that tell stories of the growing season and the methods used by our producers. These relationships inform not just what we serve, but how we think about flavor, texture, and composition.

The challenge is to honor these ingredients without overcomplicating them. Intention, emotion, craft—applied to the simplest of preparations.`,

    "space-development": `# Space Development: ${now.toLocaleDateString("en-CA", { month: "long", year: "numeric" })}

The physical space continues to evolve. Each element is considered in terms of guest experience, emotional resonance, and operational clarity. Nothing is decorative; everything serves a purpose.

Recent work has focused on [specific area]. The intention behind these choices reflects our philosophy: calm, reflective, intentional. The space must support both the guest experience and the staff's ability to execute at a high level.

As we approach opening, these details accumulate into a coherent whole. The space becomes more itself over time.`,

    "staff-reflection": `# Staff Reflection: ${now.toLocaleDateString("en-CA", { month: "long", year: "numeric" })}

Training continues, with a focus on philosophy as much as technique. Staff are learning not just what to do, but why it matters. They are developing the ability to explain reasoning, to make autonomous choices that align with our values.

The process of teaching and learning creates its own rhythm. Questions lead to deeper understanding. Practice leads to refinement. The restaurant functions as a teaching institution, investing in people, not just positions.

This investment pays dividends in consistency, autonomy, and the quality of guest experience.`,

    "menu-evolution": `# Menu Evolution: ${now.toLocaleDateString("en-CA", { month: "long", year: "numeric" })}

Dish development continues through iteration and refinement. Each dish must justify its place in terms of flavor, technique, and emotional impact. Nothing is included simply because it is expected.

The menu structure reflects our philosophy: intention, emotion, craft. Courses are paced to create an emotional arc. Flavors are balanced to create moments of surprise and recognition. Techniques honor ingredients, not showcase skill.

As ingredients shift with seasons, the menu adapts. This adaptation is not compromise, but craft—working with what is available to create something that could not exist elsewhere.`,

    "ritual-refinement": `# Ritual Refinement: ${now.toLocaleDateString("en-CA", { month: "long", year: "numeric" })}

Small adjustments to service and operations continue. These refinements are based on observation, reflection, and learning. They are documented so they can be taught consistently.

Rituals are not rigid procedures, but intentional practices that reinforce our values. They create predictable, comforting patterns for both guests and staff. They become part of the restaurant's identity.

Each refinement makes the experience more coherent, more intentional, more itself.`,

    "guest-observations": `# Guest Observations: ${now.toLocaleDateString("en-CA", { month: "long", year: "numeric" })}

Post-service reflection reveals patterns. Guests describe the experience using emotional language: calm, seen, held, energized. These observations inform our understanding of what works and what can be improved.

The emotional arc of service—from curiosity and comfort toward quiet satisfaction—requires constant attention. Each service is an opportunity to refine this arc, to make it more intentional, more effective.

These observations are not just feedback, but data. They inform decisions about pacing, service, menu, and atmosphere.`,

  };

  return templates[type] || templates["ingredient-note"];
}

function generateFrontmatter(type: UpdateType, date: Date): string {
  const keywords: Record<UpdateType, string[]> = {
    "ingredient-note": ["newfoundland ingredients", "seasonal produce", "local sourcing"],
    "space-development": ["restaurant design", "space development", "pre-opening"],
    "staff-reflection": ["staff training", "restaurant culture", "hospitality philosophy"],
    "menu-evolution": ["menu development", "dish refinement", "culinary craft"],
    "ritual-refinement": ["service refinement", "operational improvement", "ritual development"],
    "guest-observations": ["guest experience", "service feedback", "hospitality refinement"],
  };

  return `---
type: "update"
date: "${date.toISOString().split("T")[0]}"
category: "${type}"
keywords: ${JSON.stringify(keywords[type])}
links:
  - breadcrumb-swl-intention.md
  - breadcrumb-swl-emotion.md
  - breadcrumb-swl-craft.md
---
`;
}

export async function GET() {
  // Ensure updates directory exists
  if (!fs.existsSync(updatesDir)) {
    fs.mkdirSync(updatesDir, { recursive: true });
  }

  const updateType = selectUpdateType();
  const now = new Date();
  const dateStr = now.toISOString().split("T")[0];
  const filename = `${dateStr}-${updateType}.md`;
  const filePath = path.join(updatesDir, filename);

  // Check if update already exists for today
  if (fs.existsSync(filePath)) {
    return NextResponse.json({
      message: "Update already exists for today",
      file: filename,
      path: filePath,
    });
  }

  // Generate update
  const frontmatter = generateFrontmatter(updateType, now);
  const content = generateUpdateContent(updateType);
  const fullContent = `${frontmatter}\n${content}`;

  // Write file
  fs.writeFileSync(filePath, fullContent, "utf8");

  return NextResponse.json({
    message: "Update generated successfully",
    type: updateType,
    file: filename,
    path: filePath,
    wordCount: content.split(/\s+/).length,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, content, date } = body;

    // Validate type
    const validTypes: UpdateType[] = [
      "ingredient-note",
      "space-development",
      "staff-reflection",
      "menu-evolution",
      "ritual-refinement",
      "guest-observations",
    ];

    if (type && !validTypes.includes(type)) {
      return NextResponse.json(
        { error: `Invalid type. Must be one of: ${validTypes.join(", ")}` },
        { status: 400 }
      );
    }

    // Use provided type or select randomly
    const updateType = (type as UpdateType) || selectUpdateType();
    const updateDate = date ? new Date(date) : new Date();
    const dateStr = updateDate.toISOString().split("T")[0];
    const filename = `${dateStr}-${updateType}.md`;
    const filePath = path.join(updatesDir, filename);

    // Ensure updates directory exists
    if (!fs.existsSync(updatesDir)) {
      fs.mkdirSync(updatesDir, { recursive: true });
    }

    // Generate or use provided content
    const updateContent = content || generateUpdateContent(updateType);
    const frontmatter = generateFrontmatter(updateType, updateDate);
    const fullContent = `${frontmatter}\n${updateContent}`;

    // Write file
    fs.writeFileSync(filePath, fullContent, "utf8");

    return NextResponse.json({
      message: "Update created successfully",
      type: updateType,
      file: filename,
      path: filePath,
      wordCount: updateContent.split(/\s+/).length,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create update", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
