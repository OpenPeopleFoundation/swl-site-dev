import { GlassPanel } from "@/components/glass-panel";

const specials = [
  {
    title: "Citrus Cloud",
    status: "Draft",
    allergens: "citrus, dairy",
    owner: "Ken",
  },
  {
    title: "Night Bloom Rinse",
    status: "Scheduled",
    allergens: "herbal",
    owner: "Aya",
  },
];

const automations = [
  {
    trigger: "VIP pickup scheduled",
    action: "Inject concierge reminder copy",
    status: "Active",
  },
  {
    trigger: "Menu item flagged for allergen",
    action: "Surface warning chip on guest site",
    status: "Testing",
  },
];

export default function MenuPage() {
  return (
    <div className="flex w-full flex-col items-center gap-6 text-white">
      <GlassPanel title="Menu Builder Orbit">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-white/70">
            Craft nightly specials and Cortex prompts before they descend to the
            guest site.
          </p>
          <button className="rounded-full border border-accent/40 px-6 py-2 text-sm text-white hover:border-accent">
            New Special
          </button>
        </div>
      </GlassPanel>

      <div className="grid w-full max-w-5xl gap-6 lg:grid-cols-[2fr_1fr]">
        <GlassPanel title="Active Drafts" delay={0.1}>
          <div className="space-y-4">
            {specials.map((special) => (
              <article
                key={special.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-2xl font-light text-white">
                      {special.title}
                    </h3>
                    <p className="text-sm text-white/60">
                      Allergens: {special.allergens}
                    </p>
                  </div>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/70">
                    {special.status}
                  </span>
                </div>
                <p className="mt-3 text-sm text-white/70">
                  Owner: {special.owner}
                </p>
              </article>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel title="Allergen Controls" delay={0.15}>
          <p className="text-sm text-white/70">
            Auto-surface allergen badges on guest panels when citrus or nuts are
            detected.
          </p>
          <label className="mt-4 flex items-center gap-3 text-sm text-white">
            <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-white/30 bg-transparent" />
            Auto-tag exposed items
          </label>
        </GlassPanel>
      </div>

      <div className="grid w-full max-w-5xl gap-6 lg:grid-cols-2">
        <GlassPanel title="Prompt Automations" delay={0.18}>
          <ul className="space-y-4 text-sm text-white/80">
            {automations.map((automation) => (
              <li
                key={automation.trigger}
                className="rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <p className="text-white">{automation.trigger}</p>
                <p className="text-white/60">{automation.action}</p>
                <span className="text-xs uppercase tracking-[0.3em] text-accent">
                  {automation.status}
                </span>
              </li>
            ))}
          </ul>
        </GlassPanel>

        <GlassPanel title="Guest Preview" delay={0.22}>
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0f1729] to-[#020409] p-6 text-sm text-white/80 shadow-inner">
            <p className="text-xs uppercase tracking-[0.3em] text-accent">
              Featured tonight
            </p>
            <h3 className="mt-2 text-2xl font-light text-white">
              Citrus Cloud
            </h3>
            <p className="text-white/70">
              Silk-press citrus rinse with frost foam finish.
            </p>
            <div className="mt-4 inline-flex rounded-full border border-accent/40 px-3 py-1 text-xs uppercase tracking-[0.3em] text-accent">
              Contains citrus
            </div>
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}
