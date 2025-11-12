import { GlassPanel } from "@/components/glass-panel";

const inventory = [
  {
    item: "Detergent S pods",
    level: 32,
    eta: "12 hrs",
    note: "Reorder submitted",
  },
  {
    item: "Luxury linen sets",
    level: 68,
    eta: "2 days",
    note: "Stable",
  },
  {
    item: "Machine kits",
    level: 44,
    eta: "18 hrs",
    note: "Need tension belts",
  },
  {
    item: "Fragrance capsules",
    level: 78,
    eta: "4 days",
    note: "Plenty",
  },
];

const maintenance = [
  { asset: "Washer 12", status: "Offline", action: "Fill valve swap 19:00" },
  { asset: "Dryer 5", status: "Watch", action: "Bearing vibration trending" },
  { asset: "Folding arm", status: "Healthy", action: "Auto-cal passed" },
];

export default function InventoryPage() {
  return (
    <div className="flex w-full flex-col items-center gap-6 text-white">
      <GlassPanel title="Inventory Orbit">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-white/70">
            Monitor supplies, machine kits, and maintenance pulses from a single
            observatory view.
          </p>
          <button className="rounded-full border border-accent/40 px-6 py-2 text-sm text-white hover:border-accent">
            Export Snapshot
          </button>
        </div>
      </GlassPanel>

      <GlassPanel title="Chemistry + Linen Levels" delay={0.1}>
        <div className="mt-4 grid gap-4">
          {inventory.map((item) => (
            <article
              key={item.item}
              className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 sm:grid-cols-4"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                  Item
                </p>
                <p className="text-lg font-light text-white">{item.item}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                  Level
                </p>
                <p
                  className={`text-lg font-semibold ${
                    item.level < 40 ? "text-[#FF5E7A]" : "text-white"
                  }`}
                >
                  {item.level}%
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                  Refill ETA
                </p>
                <p className="text-white/80">{item.eta}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                  Notes
                </p>
                <p className="text-white/70">{item.note}</p>
              </div>
            </article>
          ))}
        </div>
      </GlassPanel>

      <div className="grid w-full max-w-5xl gap-6 lg:grid-cols-2">
        <GlassPanel title="Maintenance Signals" delay={0.15}>
          <ul className="space-y-3 text-sm text-white/80">
            {maintenance.map((asset) => (
              <li
                key={asset.asset}
                className="rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <div className="flex items-center justify-between">
                  <p className="text-white text-lg">{asset.asset}</p>
                  <span className="text-xs uppercase tracking-[0.3em] text-accent">
                    {asset.status}
                  </span>
                </div>
                <p>{asset.action}</p>
              </li>
            ))}
          </ul>
        </GlassPanel>

        <GlassPanel title="Alerts" delay={0.2}>
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#120f2b] to-[#05030c] p-6 text-sm text-white/80 shadow-inner">
            <p>
              Detergent pods projected to under 20% by 04:00. Confirm reroute or
              accept rush delivery slot.
            </p>
            <div className="mt-4 flex gap-2">
              <button className="rounded-full bg-accent px-4 py-2 text-sm text-white">
                Accept Rush
              </button>
              <button className="rounded-full border border-white/20 px-4 py-2 text-sm">
                Reroute
              </button>
            </div>
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}
