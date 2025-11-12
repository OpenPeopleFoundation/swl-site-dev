# Snow White Laundry — Staff Cortex

Internal-only Next.js 15 dashboard that powers staff access to scheduling, menu building, inventory tracking, and Cortex reflections for [Snow White Laundry](https://ai.snowwhitelaundry.co). The app ships with the dark neon-blue visual language that mirrors the guest site and is designed to deploy to its own Vercel project `swl-site-staff`.

## Stack

- Next.js 15 (App Router, React Compiler enabled)
- TypeScript + Tailwind CSS v4
- Framer Motion for UI motion states
- Supabase (Postgres 15+) with Service Role access

## Getting started

```bash
npm install
cp .env.example .env.local
# fill in Supabase keys + site mode flag
npm run dev
```

Navigate to `http://localhost:3000/gate` to log in with a staff email/password stored in the `staff_access` table. Successful auth sets the `swl_staff` cookie and unlocks `/` and `/staff/*` routes via the Next.js proxy guard (`src/proxy.ts`).

## Environment variables

| Name | Description |
| --- | --- |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Service Role API key used by the gate API route |
| `NEXT_PUBLIC_SITE_MODE` | Static flag used for telemetry/analytics (defaults to `staff`) |

## Supabase schema

```sql
create extension if not exists pgcrypto;
create table if not exists staff_access (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  password_hash text not null,
  must_reset boolean default false,
  role text default 'staff',
  created_at timestamptz default now()
);

insert into staff_access (email, password_hash, role)
values
  ('tom@openpeople.ai', crypt('opendeck', gen_salt('bf'))),
  ('ken@snowwhitelaundry.co', crypt('chefpass', gen_salt('bf')))
on conflict (email) do nothing;
```

## Key directories

```
src/app/
├── page.tsx            # Staff dashboard launcher
├── gate/page.tsx       # Auth gate
├── api/gate/route.ts   # Supabase-backed login endpoint
└── staff/              # Module surfaces (schedule, menu, inventory, reflection)
src/proxy.ts            # Cookie guard for / and /staff/*
src/components/staff/   # Shared Cortex UI components
```

## Deployment

1. Initialize a new git repository and push to `openpeople/swl-site-staff`.
2. `vercel link` → select `swl-site-staff`.
3. Configure the three environment variables above in Vercel (production + preview).
4. `vercel --prod` to ship the dashboard.

The production domain should remain `ai.snowwhitelaundry.co`. Ensure the Supabase service role key is treated as sensitive and never exposed to the browser—only the `/api/gate` route uses it server-side.
# swl-site-dev
