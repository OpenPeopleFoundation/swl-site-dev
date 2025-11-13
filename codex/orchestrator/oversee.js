import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const queue = path.join(__dirname, "..", "queue");
const outDir = path.join(__dirname, "..", "overseer", "output");
const logs = path.join(__dirname, "..", "overseer", "logs");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function mergePatches() {
  ensureDir(queue);
  ensureDir(outDir);
  ensureDir(logs);

  const files = fs.readdirSync(queue).filter((f) => f.endsWith(".patch"));

  if (files.length === 0) {
    console.log("Queue empty; nothing to merge.");
    return;
  }

  let merged = "";

  for (const file of files) {
    const patchPath = path.join(queue, file);
    const content = fs.readFileSync(patchPath, "utf-8");

    if (content.includes("MODIFY_EXISTING_FILE")) {
      const logFile = path.join(logs, `reject_${Date.now()}.md`);
      fs.writeFileSync(logFile, `Rejected unsafe patch:\n${file}\n`);
      fs.unlinkSync(patchPath);
      console.log(`Rejected ${file} due to unsafe marker.`);
      continue;
    }

    merged += `${content}\n`;
    fs.unlinkSync(patchPath);
    console.log(`Merged ${file}`);
  }

  if (merged.trim()) {
    const outFile = path.join(outDir, `merged_${Date.now()}.patch`);
    fs.writeFileSync(outFile, merged);
    console.log(`Wrote ${outFile}`);
  } else {
    console.log("No valid patches to merge.");
  }
}

mergePatches();
