import chokidar from "chokidar";
import { exec } from "node:child_process";

const watcher = chokidar.watch("codex/agents/*/output", {
  ignoreInitial: true,
});

watcher.on("add", () => {
  exec("node codex/orchestrator/oversee.js", (err, stdout, stderr) => {
    if (stdout) process.stdout.write(stdout);
    if (stderr) process.stderr.write(stderr);
    if (err) {
      console.error("Overseer run failed", err);
    }
  });
});
