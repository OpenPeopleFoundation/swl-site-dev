import { GlassPanel } from "@/components/glass-panel";

const reflections = [
  {
    title: "Route 4B micro-delay",
    owner: "Tom",
    time: "17:40",
    summary:
      "Reload stop added 8 minutes; automation text fired correctly. Need faster manifest share.",
  },
  {
    title: "Foam injector recalibration",
    owner: "Ranya",
    time: "16:20",
    summary:
      "Pressure sensor drifted 2%. Reset with manual override. Capture trending metrics nightly.",
  },
  {
    title: "Menu allergen visibility",
    owner: "Ken",
    time: "15:05",
    summary:
      "Guests need immediate allergen callouts. Request surfaced to Menu Builder backlog.",
  },
];

const prompts = [
  "What slowed the floor down this block?",
  "Who needs backup before 22:00?",
  "Which menu items should be paused tonight?",
];

export default function ReflectionPage() {
  return (
    <div className="flex w-full flex-col items-center gap-6 text-white">
      <GlassPanel title="Reflection Orbit">
        <p className="text-white/70">
          Capture the qualitative read on ops so tomorrow starts sharper.
        </p>
      </GlassPanel>

      <div className="grid w-full max-w-5xl gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="flex flex-col gap-6">
          {reflections.map((reflection, index) => (
            <GlassPanel
              key={reflection.title}
              title={reflection.title}
              delay={0.1 + index * 0.05}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                  {reflection.owner}
                </p>
                <span className="text-sm text-white/60">{reflection.time}</span>
              </div>
              <p className="mt-3 text-white/75">{reflection.summary}</p>
            </GlassPanel>
          ))}
        </div>

        <div className="flex flex-col gap-6">
          <GlassPanel title="Tonight's Prompts" delay={0.25}>
            <ul className="space-y-3 text-sm text-white/80">
              {prompts.map((prompt) => (
                <li
                  key={prompt}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  {prompt}
                </li>
              ))}
            </ul>
          </GlassPanel>

          <GlassPanel title="Record Reflection" delay={0.3}>
            <p className="text-white/70">
              Spin up a quick cortex entry to document anomalies, gratitude, or
              resourcing needs.
            </p>
            <button className="mt-4 w-full rounded-full bg-accent px-4 py-2 text-sm text-white">
              Start Recording
            </button>
          </GlassPanel>
        </div>
      </div>
    </div>
  );
}
