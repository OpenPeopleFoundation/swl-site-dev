-- Agent task tracking
create table if not exists codex_tasks (
  id bigint generated always as identity primary key,
  agent text not null,
  task_text text not null,
  status text default 'pending',  -- pending | started | done | error
  created_at timestamptz default now()
);

-- Agent output registry
create table if not exists codex_outputs (
  id bigint generated always as identity primary key,
  agent text not null,
  task_id bigint references codex_tasks(id),
  output_type text,
  payload text,
  created_at timestamptz default now()
);

-- Overseer decisions
create table if not exists codex_overseer_log (
  id bigint generated always as identity primary key,
  decision text,
  details text,
  created_at timestamptz default now()
);
