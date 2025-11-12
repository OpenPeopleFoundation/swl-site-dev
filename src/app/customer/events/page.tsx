import { redirect } from "next/navigation";
import { listEventsForGuest } from "@/apps/events/lib/queries";
import { getSessionFromCookies } from "@/lib/session";

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

export default async function CustomerEventsPage() {
  const session = await getSessionFromCookies();
  if (!session) {
    redirect("/gate?next=/customer/events");
  }

  const events = await listEventsForGuest(session.email);

  return (
    <div className="space-y-8">
      <header className="space-y-2 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-white/40">
          Snow White Laundry
        </p>
        <h1 className="text-3xl font-light">Your Private Rituals</h1>
        <p className="text-sm text-white/60">
          {events.length > 0
            ? "Track proposals, deposits, and night-of details in one place."
            : "Request received. As soon as we schedule a date, you’ll see it here."}
        </p>
      </header>

      <section className="space-y-4">
        {events.map((event) => (
          <article
            key={event.id}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white shadow-[0_30px_90px_rgba(0,0,0,0.55)]"
          >
            <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
              <h2 className="text-2xl font-light">{event.event_type}</h2>
              <span className="text-sm uppercase tracking-[0.4em] text-white/50">
                {event.status.replace(/_/g, " ")}
              </span>
            </div>
            <dl className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <dt className="text-xs uppercase tracking-[0.3em] text-white/40">
                  Date
                </dt>
                <dd className="text-lg">{formatDate(event.preferred_date)}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.3em] text-white/40">
                  Party Size
                </dt>
                <dd className="text-lg">{event.party_size ?? "TBD"}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.3em] text-white/40">
                  Menu
                </dt>
                <dd className="text-lg">{event.menu_style ?? "Chef’s call"}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.3em] text-white/40">
                  Budget
                </dt>
                <dd className="text-lg">
                  {event.budget_range ?? "Custom proposal"}
                </dd>
              </div>
            </dl>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <h3 className="text-sm uppercase tracking-[0.3em] text-white/50">
                  Proposal
                </h3>
                <p className="mt-2 text-sm text-white/70">
                  {event.proposal_pdf_url ? (
                    <a
                      href={event.proposal_pdf_url}
                      className="text-white underline-offset-2 hover:underline"
                    >
                      Download latest proposal
                    </a>
                  ) : (
                    "We’re drafting your menu and ambiance story now."
                  )}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <h3 className="text-sm uppercase tracking-[0.3em] text-white/50">
                  Deposit
                </h3>
                <p className="mt-2 text-sm text-white/70">
                  {event.deposit_paid
                    ? "Deposit received. The night is yours."
                    : "We’ll send a Stripe link as soon as the contract is ready."}
                </p>
              </div>
            </div>
            {event.special_requests && (
              <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-4">
                <h3 className="text-sm uppercase tracking-[0.3em] text-white/50">
                  Vision Notes
                </h3>
                <p className="mt-2 text-sm text-white/70">
                  {event.special_requests}
                </p>
              </div>
            )}
          </article>
        ))}

        {events.length === 0 && (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center text-white/70">
            <p>
              No events are linked to <strong>{session.email}</strong> yet.
            </p>
            <p className="mt-2 text-sm">
              Submit an inquiry at snowwhitelaundry.co/events or reach out to
              cortex@snowwhitelaundry.co and we’ll connect your profile.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
