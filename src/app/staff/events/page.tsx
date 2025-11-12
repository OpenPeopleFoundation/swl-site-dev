import {
  listEventPipeline,
  listOpeningReservations,
  type OpeningReservation,
  type PrivateEvent,
} from "@/apps/events/lib/queries";
import { GlassPanel } from "@/components/glass-panel";

function formatDate(value?: string | null) {
  if (!value) return "TBD";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatStatus(status?: string | null) {
  if (!status) return "unknown";
  return status.replace(/_/g, " ").toUpperCase();
}

function statusTone(status?: string | null) {
  switch (status) {
    case "proposal_sent":
      return "border-blue-400/40 text-blue-200 bg-blue-500/10";
    case "deposit_paid":
    case "contract_signed":
      return "border-emerald-400/40 text-emerald-200 bg-emerald-500/10";
    case "completed":
      return "border-white/20 text-white/70 bg-white/5";
    case "inquiry":
    default:
      return "border-amber-400/40 text-amber-200 bg-amber-500/10";
  }
}

function deriveSummary(events: PrivateEvent[], openings: OpeningReservation[]) {
  const inquiryCount = events.filter((event) => event.status === "inquiry").length;
  const proposalCount = events.filter((event) => event.status === "proposal_sent").length;
  const depositCount = events.filter((event) => event.deposit_paid).length;
  return [
    { label: "Active Inquiries", value: inquiryCount },
    { label: "Proposals Out", value: proposalCount },
    { label: "Deposits Locked", value: depositCount },
    { label: "Opening Waitlist", value: openings.length },
  ];
}

export default async function StaffEventsPage() {
  const [events, openings] = await Promise.all([
    listEventPipeline(60),
    listOpeningReservations(),
  ]);

  const summary = deriveSummary(events, openings);
  const nearestOpening = openings[0];
  const earliestEvent = events
    .filter((event) => event.preferred_date)
    .sort(
      (a, b) =>
        new Date(a.preferred_date ?? 0).getTime() -
        new Date(b.preferred_date ?? 0).getTime(),
    )[0];

  return (
    <div className="flex w-full flex-col gap-6 text-white">
      <GlassPanel title="Event Control Room">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {summary.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/10 bg-black/30 p-4 text-center shadow-inner"
            >
              <p className="text-xs uppercase tracking-[0.4em] text-white/40">
                {item.label}
              </p>
              <p className="mt-2 text-3xl font-light text-white">{item.value}</p>
            </div>
          ))}
        </div>
      </GlassPanel>

      <div className="grid w-full gap-6 lg:grid-cols-[3fr_2fr]">
        <GlassPanel title="Private Event Pipeline" className="lg:row-span-2">
          {events.length === 0 ? (
            <p className="text-white/60">
              No private events logged yet. New inquiries will appear here
              instantly.
            </p>
          ) : (
            <div className="space-y-4">
              {events.map((event) => (
                <article
                  key={event.id}
                  className="rounded-3xl border border-white/10 bg-black/40 p-5 shadow-[0_15px_45px_rgba(0,0,0,0.35)]"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.4em] text-white/40">
                        {event.guest_name}
                      </p>
                      <h3 className="text-2xl font-light text-white">
                        {event.event_type ?? "Private Experience"}
                      </h3>
                    </div>
                    <span
                      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-[0.2em] ${statusTone(event.status)}`}
                    >
                      {formatStatus(event.status)}
                    </span>
                  </div>

                  <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-3">
                    <div>
                      <dt className="text-xs uppercase tracking-[0.3em] text-white/40">
                        Date
                      </dt>
                      <dd className="text-base text-white">
                        {formatDate(event.preferred_date)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-[0.3em] text-white/40">
                        Party
                      </dt>
                      <dd className="text-base text-white">
                        {event.party_size ?? "TBD"} guests
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-[0.3em] text-white/40">
                        Budget
                      </dt>
                      <dd className="text-base text-white">
                        {event.budget_range ?? "Custom"}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                        Menu
                      </p>
                      <p className="text-white">
                        {event.menu_style ?? "Chef to advise"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                        Contact
                      </p>
                      <p className="text-white">{event.guest_email ?? "—"}</p>
                    </div>
                  </div>

                  {event.special_requests && (
                    <p className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-white/80">
                      {event.special_requests}
                    </p>
                  )}
                </article>
              ))}
            </div>
          )}
        </GlassPanel>

        <GlassPanel title="Opening Week Waitlist">
          {openings.length === 0 ? (
            <p className="text-white/60">No opening reservations captured yet.</p>
          ) : (
            <ul className="space-y-4">
              {openings.map((reservation) => (
                <li
                  key={reservation.id}
                  className="rounded-2xl border border-white/10 bg-black/30 p-4"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-light text-white">
                        {reservation.email}
                      </p>
                      <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                        {reservation.status}
                      </p>
                    </div>
                    <div className="text-right text-sm text-white/80">
                      <p>{formatDate(reservation.preferred_date)}</p>
                      <p className="text-white/60">
                        {reservation.party_size} guests
                      </p>
                    </div>
                  </div>
                  {reservation.notes && (
                    <p className="mt-3 rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-white/80">
                      {reservation.notes}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </GlassPanel>

        <GlassPanel title="Signals & Next Actions">
          <ul className="space-y-3 text-sm text-white">
            <li className="rounded-2xl border border-white/10 bg-black/30 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                Next opening reservation
              </p>
              <p className="mt-1 text-lg text-white">
                {nearestOpening
                  ? `${formatDate(nearestOpening.preferred_date)} — ${
                      nearestOpening.party_size
                    } guests`
                  : "No pending selections"}
              </p>
            </li>
            <li className="rounded-2xl border border-white/10 bg-black/30 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                Earliest event on deck
              </p>
              <p className="mt-1 text-lg text-white">
                {earliestEvent
                  ? `${formatDate(earliestEvent.preferred_date)} — ${
                      earliestEvent.guest_name
                    }`
                  : "Awaiting scheduling"}
              </p>
            </li>
            <li className="rounded-2xl border border-white/10 bg-black/30 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                Quick reminder
              </p>
              <p className="mt-1 text-white/80">
                Update statuses once proposals go out so the concierge team
                receives the right automations.
              </p>
            </li>
          </ul>
        </GlassPanel>
      </div>
    </div>
  );
}
