import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inbox = path.join(__dirname, "..", "inbox");
const agentsPath = path.join(__dirname, "..", "agents");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function readAgentTriggers(agentFolder) {
  try {
    const file = path.join(agentFolder, "agent.md");
    const content = fs.readFileSync(file, "utf-8");
    const triggersSection = content.split("Automatic Triggers")[1];
    if (!triggersSection) return [];
    return triggersSection
      .split("##")[0]
      .split(/\s+/)
      .map((t) => t.toLowerCase().replace(/[^a-z0-9]/g, ""))
      .filter(Boolean);
  } catch {
    return [];
  }
}

function routeTask(taskContent) {
  const agents = fs.readdirSync(agentsPath, { withFileTypes: true }).filter((dirent) => dirent.isDirectory());
  let bestAgent = null;
  let bestScore = 0;

  for (const agentDir of agents) {
    const agentFolder = path.join(agentsPath, agentDir.name);
    const triggers = readAgentTriggers(agentFolder);
    let score = 0;

    for (const word of taskContent.toLowerCase().split(/\s+/)) {
      const normalized = word.replace(/[^a-z0-9]/g, "");
      if (normalized && triggers.includes(normalized)) {
        score += 1;
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestAgent = agentDir.name;
    }
  }

  return bestAgent || "functionality_agent";
}

function createTaskFile(agent, content) {
  const tasksDir = path.join(agentsPath, agent, "tasks");
  ensureDir(tasksDir);
  const timestamp = Date.now();
  const filePath = path.join(tasksDir, `task_${timestamp}.md`);
  const body = `# Task\n${content.trim()}\n\n# Routed To\n${agent}\n\n# Expected Output\nPATCH\n\n# Notes\nCreated automatically by the dispatcher.\n`;
  fs.writeFileSync(filePath, body, "utf-8");
}

function dispatchTasks() {
  ensureDir(inbox);
  ensureDir(agentsPath);

  const files = fs
    .readdirSync(inbox)
    .filter((file) => file.endsWith(".txt"))
    .sort();

  if (files.length === 0) {
    console.log("No tasks to dispatch.");
    return;
  }

  for (const file of files) {
    const filePath = path.join(inbox, file);
    const content = fs.readFileSync(filePath, "utf-8");
    const agent = routeTask(content);
    createTaskFile(agent, content);
    fs.unlinkSync(filePath);
    console.log(`Dispatched ${file} to ${agent}`);
  }
}

dispatchTasks();
