import { spawn } from "child_process";
import fs from "fs";

export async function bootCodex() {
  console.log("[CORTEXOS] Boot sequence begin…");

  ensureFolders();
  runWatchers();
  warmAgents();

  console.log("[CORTEXOS] Deep-space substrate online.");
}

function ensureFolders() {
  const dirs = [
    "codex/inbox",
    "codex/queue",
    "codex/overseer/logs",
    "codex/overseer/output",
  ];

  for (const dir of dirs) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }
}

function runWatchers() {
  const watcher = spawn("node", ["codex/orchestrator/watch.js"], {
    stdio: "pipe",
  });

  watcher.stdout.on("data", (data) => {
    process.stdout.write(`[WATCHER] ${data}`);
  });

  watcher.stderr.on("data", (data) => {
    process.stderr.write(`[WATCHER:ERR] ${data}`);
  });
}

function warmAgents() {
  console.log("[AGENT NET] Warming agent runtime…");
}
