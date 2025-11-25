-- POS schema bootstrap

create table if not exists public.pos_menu_categories (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  color text,
  display_order integer default 0,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.pos_modifier_groups (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  description text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.pos_modifiers (
  id uuid primary key default gen_random_uuid(),
  group_id uuid references public.pos_modifier_groups(id) on delete cascade,
  label text not null,
  default_applied boolean default false,
  extra_cost numeric(10,2) default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.pos_menu_items (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.pos_menu_categories(id) on delete set null,
  group_id uuid references public.pos_modifier_groups(id) on delete set null,
  name text not null,
  description text,
  price numeric(10,2) not null,
  tags text[] default '{}',
  available boolean default true,
  display_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.pos_tables (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  zone text not null,
  seats integer not null default 2,
  can_combine boolean default false,
  status text not null default 'open',
  is_active boolean default true,
  display_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.pos_sessions (
  id uuid primary key default gen_random_uuid(),
  table_id uuid references public.pos_tables(id) on delete set null,
  reservation_id integer references public.reservations(id) on delete set null,
  started_by uuid references public.staff(id) on delete set null,
  status text not null default 'open',
  party_size integer,
  opened_at timestamptz default now(),
  closed_at timestamptz,
  notes text
);

create table if not exists public.pos_checks (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references public.pos_sessions(id) on delete cascade,
  status text not null default 'open',
  subtotal numeric(10,2) default 0,
  tax numeric(10,2) default 0,
  service numeric(10,2) default 0,
  total numeric(10,2) default 0,
  comp_total numeric(10,2) default 0,
  receipt_note text,
  created_at timestamptz default now(),
  closed_at timestamptz,
  closed_by uuid references public.staff(id) on delete set null
);

create table if not exists public.pos_check_lines (
  id uuid primary key default gen_random_uuid(),
  check_id uuid references public.pos_checks(id) on delete cascade,
  menu_item_id uuid references public.pos_menu_items(id) on delete set null,
  seat_label text,
  qty integer not null default 1,
  price numeric(10,2) not null,
  display_name text not null,
  modifier_ids uuid[] default '{}',
  modifier_notes text,
  comp boolean default false,
  split_mode text default 'none',
  transfer_to text,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create table if not exists public.pos_payments (
  id uuid primary key default gen_random_uuid(),
  check_id uuid references public.pos_checks(id) on delete cascade,
  amount numeric(10,2) not null,
  tip_amount numeric(10,2) default 0,
  method text not null,
  status text not null default 'pending',
  processor text,
  processor_charge_id text,
  device_id uuid references public.device_connections(id) on delete set null,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now(),
  processed_at timestamptz
);

create table if not exists public.pos_device_sessions (
  id uuid primary key default gen_random_uuid(),
  device_id uuid references public.device_connections(id) on delete cascade,
  staff_id uuid references public.staff(id) on delete set null,
  started_at timestamptz default now(),
  ended_at timestamptz,
  trust_level text default 'pending',
  notes text
);

create index if not exists pos_tables_zone_idx on public.pos_tables(zone);
create index if not exists pos_menu_items_category_idx on public.pos_menu_items(category_id);
create index if not exists pos_sessions_table_idx on public.pos_sessions(table_id) where status <> 'closed';
create index if not exists pos_checks_session_idx on public.pos_checks(session_id);
create index if not exists pos_check_lines_check_idx on public.pos_check_lines(check_id);
create index if not exists pos_payments_check_idx on public.pos_payments(check_id);

-- seed minimal data for local dev
insert into public.pos_menu_categories (id, label, color, display_order)
values
  ('11111111-aaaa-aaaa-aaaa-111111111111', 'Snacks', '#00FF9C', 1),
  ('22222222-bbbb-bbbb-bbbb-222222222222', 'Plates', '#8A7CFF', 2),
  ('33333333-cccc-cccc-cccc-333333333333', 'Desserts', '#FF82E0', 3),
  ('44444444-dddd-dddd-dddd-444444444444', 'Pairings', '#42D9FF', 4)
on conflict (id) do update set label = excluded.label;

insert into public.pos_modifier_groups (id, label)
values
  ('aaaa1111-0000-0000-0000-000000000000', 'Shiso Adjustments'),
  ('bbbb2222-0000-0000-0000-000000000000', 'Oyster Notes'),
  ('cccc3333-0000-0000-0000-000000000000', 'Duck Fire'),
  ('dddd4444-0000-0000-0000-000000000000', 'Chip Tweaks')
on conflict (id) do update set label = excluded.label;

insert into public.pos_modifiers (id, group_id, label, default_applied)
values
  ('aaaa1111-1111-1111-1111-111111111111', 'aaaa1111-0000-0000-0000-000000000000', 'Zero-proof version', false),
  ('aaaa1111-2222-2222-2222-222222222222', 'aaaa1111-0000-0000-0000-000000000000', 'Less sweet', false),
  ('bbbb2222-1111-1111-1111-111111111111', 'bbbb2222-0000-0000-0000-000000000000', 'Remove allium', false),
  ('bbbb2222-2222-2222-2222-222222222222', 'bbbb2222-0000-0000-0000-000000000000', 'Extra caviar', false),
  ('cccc3333-1111-1111-1111-111111111111', 'cccc3333-0000-0000-0000-000000000000', 'Cook medium rare', true),
  ('cccc3333-2222-2222-2222-222222222222', 'cccc3333-0000-0000-0000-000000000000', 'Sauce on side', false),
  ('dddd4444-1111-1111-1111-111111111111', 'dddd4444-0000-0000-0000-000000000000', 'No sesame', false),
  ('dddd4444-2222-2222-2222-222222222222', 'dddd4444-0000-0000-0000-000000000000', 'Extra crisp', false)
on conflict (id) do update set label = excluded.label;

insert into public.pos_menu_items (id, category_id, group_id, name, price, tags, display_order)
values
  ('99999999-aaaa-aaaa-aaaa-111111111111', '11111111-aaaa-aaaa-aaaa-111111111111', 'aaaa1111-0000-0000-0000-000000000000', 'Shiso Spritz', 18, array['bev'], 1),
  ('99999999-bbbb-bbbb-bbbb-222222222222', '11111111-aaaa-aaaa-aaaa-111111111111', 'dddd4444-0000-0000-0000-000000000000', 'Sea Lettuce Chip', 12, array['veg'], 2),
  ('99999999-cccc-cccc-cccc-333333333333', '11111111-aaaa-aaaa-aaaa-111111111111', null, 'Coal Pearls', 15, '{}', 3),
  ('88888888-aaaa-aaaa-aaaa-111111111111', '22222222-bbbb-bbbb-bbbb-222222222222', 'bbbb2222-0000-0000-0000-000000000000', 'Charred Oyster', 28, '{}', 1),
  ('88888888-bbbb-bbbb-bbbb-222222222222', '22222222-bbbb-bbbb-bbbb-222222222222', null, 'Ember Beet', 24, '{}', 2),
  ('88888888-cccc-cccc-cccc-333333333333', '22222222-bbbb-bbbb-bbbb-222222222222', null, 'River Trout', 34, '{}', 3),
  ('88888888-dddd-dddd-dddd-444444444444', '22222222-bbbb-bbbb-bbbb-222222222222', 'cccc3333-0000-0000-0000-000000000000', 'Aged Duck', 42, '{}', 4),
  ('77777777-aaaa-aaaa-aaaa-111111111111', '33333333-cccc-cccc-cccc-333333333333', null, 'Black Sesame Cloud', 16, '{}', 1),
  ('77777777-bbbb-bbbb-bbbb-222222222222', '33333333-cccc-cccc-cccc-333333333333', null, 'Frozen Yuzu Leaf', 14, '{}', 2),
  ('66666666-aaaa-aaaa-aaaa-111111111111', '44444444-dddd-dddd-dddd-444444444444', null, 'Wine Pairing', 68, '{}', 1),
  ('66666666-bbbb-bbbb-bbbb-222222222222', '44444444-dddd-dddd-dddd-444444444444', null, 'NA Pairing', 48, '{}', 2)
on conflict (id) do update set name = excluded.name, price = excluded.price;

insert into public.pos_tables (id, label, zone, seats, can_combine, display_order)
select gen_random_uuid(), concat('Dining ', lpad((idx)::text, 2, '0')), 'dining', 2, true, idx
from generate_series(1, 12) as idx
on conflict do nothing;

insert into public.pos_tables (id, label, zone, seats, can_combine, display_order)
select gen_random_uuid(), concat('Chef ', idx::text), 'chef', 1, false, 200 + idx
from generate_series(1, 4) as idx
on conflict do nothing;

insert into public.pos_tables (id, label, zone, seats, can_combine, display_order)
select gen_random_uuid(), concat('Bar ', idx::text), 'bar', 1, false, 300 + idx
from generate_series(1, 6) as idx
on conflict do nothing;

