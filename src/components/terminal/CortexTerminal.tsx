"use client";

import { useState, type FormEvent } from "react";

type Line = {
  id: number;
  text: string;
};

export default function CortexTerminal() {
  const [lines, setLines] = useState<Line[]>([
    { id: 1, text: "CORTEX-SHELL v1.0" },
    { id: 2, text: "Type 'help' to begin." },
  ]);
  const [input, setInput] = useState("");

  const appendLines = (texts: string[]) => {
    setLines((prev) => [
      ...prev,
      ...texts.map((text, idx) => ({
        id: prev.length + idx + 1,
        text,
      })),
    ]);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;

    appendLines([`> ${cmd}`]);

    switch (cmd) {
      case "help":
        appendLines([
          "commands:",
          "- agents      : list active agents",
          "- status      : show system status",
          "- clear       : clear the terminal",
          "- about       : about CortexOS",
          "- demo task   : simulate routing a task",
        ]);
        break;
      case "agents":
        appendLines([
          "active agents:",
          "- ui_agent",
          "- content_agent",
          "- schema_agent",
          "- functionality_agent",
          "- debugger_agent",
        ]);
        break;
      case "status":
        appendLines([
          "system status:",
          "- overseer: idle",
          "- queue: 0 pending items",
          "- supabase: connected (simulated)",
          "- filesystem: codex/ structure detected (simulated)",
        ]);
        break;
      case "clear":
        setLines([]);
        break;
      case "about":
        appendLines([
          "CortexOS: human-aligned agent coordination layer.",
          "Codex/Agents/Overseer designed to separate ideas, routing, and merging.",
        ]);
        break;
      case "demo":
      case "demo task":
        appendLines([
          "routing task: 'simplify booking flow'",
          "→ matched agent: functionality_agent",
          "→ task written to: codex/agents/functionality_agent/tasks/",
          "(simulation only)",
        ]);
        break;
      default:
        appendLines([`unknown command: ${cmd}`, "type 'help' for options."]);
    }

    setInput("");
  };

  return (
    <div
      style={{
        background: "rgba(0,0,0,0.85)",
        borderRadius: 12,
        border: "1px solid rgba(0,243,255,0.2)",
        fontFamily: "monospace",
        fontSize: 13,
        padding: 16,
        color: "#00F3FF",
        display: "flex",
        flexDirection: "column",
        height: 320,
      }}
    >
      <div style={{ flex: 1, overflowY: "auto", marginBottom: 8 }}>
        {lines.map((line) => (
          <div key={line.id}>{line.text}</div>
        ))}
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span>{">"}</span>
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          autoComplete="off"
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            color: "#FFFFFF",
            fontFamily: "monospace",
            fontSize: 13,
          }}
        />
      </form>
    </div>
  );
}
