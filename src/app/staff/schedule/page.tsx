import { GlassPanel } from "@/components/glass-panel";

const routeBoard = [
  {
    zone: "Route 4B",
    window: "17:10 → 19:05",
    lead: "Tom",
    status: "In transit",
    notes: "Reload stop at Precita; VIP linens prioritized.",
  },
  {
    zone: "Route 7A",
    window: "18:00 → 20:45",
    lead: "Ivy",
    status: "Staging",
    notes: "Waiting on dryer 12 cycle — add 10 minute buffer.",
  },
  {
    zone: "Route 2C",
    window: "16:40 → 18:30",
    lead: "Andre",
    status: "Completed",
    notes: "All hand-offs signed; upload manifests.",
  },
];

const resets = [
  {
    team: "Night switch",
    due: "21:30",
    action: "Badge reset + compressor check",
  },
  {
    team: "Route 3C",
    due: "05:00",
    action: "Early-load confirm for linen surge",
  },
  {
    team: "Dock staff",
    due: "07:30",
    action: "Inventory recount on detergents",
  },
];

export default function SchedulePage() {
  return (
    <div className="flex w-full flex-col items-center gap-6 text-white">
      <GlassPanel title="Orbit Schedule">
        <p className="text-white/70">
          Dispatch telemetry for tonight&apos;s loops — everything floats until
          you lock it in.
        </p>
      </GlassPanel>

      <div className="grid w-full max-w-5xl gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="flex flex-col gap-6">
          {routeBoard.map((route, index) => (
            <GlassPanel key={route.zone} title={route.zone} delay={0.1 + index * 0.05}>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-white/50">
                    Lead
                  </p>
                  <p className="text-2xl font-light text-white">{route.lead}</p>
                </div>
                <span className="rounded-full border border-accent/30 px-4 py-1 text-sm text-accent/90">
                  {route.status}
                </span>
              </div>
              <dl className="mt-4 grid gap-4 text-sm text-white/70 sm:grid-cols-2">
                <div>
                  <dt className="uppercase tracking-[0.3em] text-xs text-white/40">
                    Window
                  </dt>
                  <dd className="text-white text-base">{route.window}</dd>
                </div>
                <div>
                  <dt className="uppercase tracking-[0.3em] text-xs text-white/40">
                    Notes
                  </dt>
                  <dd>{route.notes}</dd>
                </div>
              </dl>
            </GlassPanel>
          ))}
        </div>

        <div className="flex flex-col gap-6">
          <GlassPanel title="Reset Queue" delay={0.2}>
            <ul className="space-y-4 text-sm text-white/75">
              {resets.map((reset) => (
                <li
                  key={reset.action}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/50">
                    <span>{reset.team}</span>
                    <span>{reset.due}</span>
                  </div>
                  <p className="mt-2 text-white">{reset.action}</p>
                </li>
              ))}
            </ul>
          </GlassPanel>

          <GlassPanel title="Next Check-In" delay={0.25}>
            <p className="text-4xl font-light text-white">18:30</p>
            <p className="text-white/60">
              Align dispatch with orbital weather before the next route release.
            </p>
          </GlassPanel>
        </div>
      </div>
    </div>
  );
}
