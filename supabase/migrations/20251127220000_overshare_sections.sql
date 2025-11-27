create extension if not exists vector;

create table if not exists public.overshare_sections (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text,
  category text,
  summary text,
  frontmatter jsonb default '{}'::jsonb,
  body text not null,
  embedding vector(1536) not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists overshare_sections_slug_idx
  on public.overshare_sections (slug);

create index if not exists overshare_sections_category_idx
  on public.overshare_sections (category);

do $$
begin
  if not exists (
    select 1
    from pg_indexes
    where schemaname = 'public'
      and indexname = 'overshare_sections_embedding_idx'
  ) then
    create index overshare_sections_embedding_idx
      on public.overshare_sections
      using ivfflat (embedding vector_l2_ops)
      with (lists = 100);
  end if;
end$$;

alter table public.overshare_sections enable row level security;

drop policy if exists "service role manages overshare sections" on public.overshare_sections;
create policy "service role manages overshare sections"
on public.overshare_sections
for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');

create or replace function public.match_overshare_sections(
  query_embedding vector(1536),
  match_count int default 6,
  filter_category text default null
)
returns table (
  slug text,
  title text,
  category text,
  summary text,
  frontmatter jsonb,
  body text,
  similarity double precision
)
language sql
stable
as $$
  select
    os.slug,
    os.title,
    os.category,
    os.summary,
    os.frontmatter,
    os.body,
    1 / (1 + (os.embedding <-> query_embedding)) as similarity
  from public.overshare_sections os
  where filter_category is null or os.category = filter_category
  order by os.embedding <-> query_embedding
  limit greatest(match_count, 1);
$$;

