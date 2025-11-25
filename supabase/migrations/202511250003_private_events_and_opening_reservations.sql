-- Private Events and Opening Reservations schema
-- These tables support the private dining/events pipeline and opening week reservations
-- Note: pgcrypto already exists in extensions schema on Supabase

-- Private Events table (private dining experiences pipeline)
create table if not exists public.private_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  customer_id integer, -- FK to customers added later when customers table exists
  guest_name text not null,
  guest_email text,
  organization text,
  event_type text default 'Private Experience',
  party_size integer,
  preferred_date date,
  start_time time,
  end_time time,
  menu_style text,
  budget_range text,
  special_requests text,
  status text not null default 'inquiry',
  proposal_text text,
  proposal_pdf_url text,
  contract_signed boolean default false,
  deposit_amount numeric(10,2),
  deposit_paid boolean default false,
  photos jsonb default '[]'::jsonb,
  reflection_prompt_sent boolean default false,
  notes_internal text,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

comment on table public.private_events is 'Private dining experience requests and pipeline tracking';

create index if not exists private_events_status_idx
  on public.private_events (status);

create index if not exists private_events_preferred_date_idx
  on public.private_events (preferred_date);

create index if not exists private_events_guest_email_idx
  on public.private_events (guest_email);

create index if not exists private_events_customer_idx
  on public.private_events (customer_id);

create index if not exists private_events_user_idx
  on public.private_events (user_id);

-- Updated_at trigger for private_events
create or replace function public.set_private_events_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_private_events_updated on public.private_events;
create trigger trg_private_events_updated
before update on public.private_events
for each row
execute procedure public.set_private_events_updated_at();

-- Opening Reservations table (opening week / early access reservations)
create table if not exists public.opening_reservations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  customer_id integer, -- FK to customers added later when customers table exists
  email text not null,
  preferred_date date,
  party_size integer,
  notes text,
  status text not null default 'pending',
  confirmed_at timestamptz,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

comment on table public.opening_reservations is 'Early access / opening week reservation requests';

create index if not exists opening_reservations_email_idx
  on public.opening_reservations (email);

create index if not exists opening_reservations_status_idx
  on public.opening_reservations (status);

create index if not exists opening_reservations_preferred_date_idx
  on public.opening_reservations (preferred_date);

create index if not exists opening_reservations_customer_idx
  on public.opening_reservations (customer_id);

-- RLS policies for private_events
alter table public.private_events enable row level security;

drop policy if exists "Service role can manage private_events" on public.private_events;
create policy "Service role can manage private_events"
on public.private_events
for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');

drop policy if exists "Users can view own events" on public.private_events;
create policy "Users can view own events"
on public.private_events
for select
using (auth.uid() = user_id);

-- RLS policies for opening_reservations
alter table public.opening_reservations enable row level security;

drop policy if exists "Service role can manage opening_reservations" on public.opening_reservations;
create policy "Service role can manage opening_reservations"
on public.opening_reservations
for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');

drop policy if exists "Users can view own reservations" on public.opening_reservations;
create policy "Users can view own reservations"
on public.opening_reservations
for select
using (auth.uid() = user_id);

-- Seed some sample data for development
insert into public.private_events (id, guest_name, guest_email, event_type, party_size, preferred_date, menu_style, status, notes_internal)
values
  (
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'Sample Guest',
    'guest@example.com',
    'Private Dinner',
    8,
    current_date + interval '14 days',
    'Tasting Menu',
    'inquiry',
    'Sample event for development testing'
  )
on conflict (id) do nothing;
