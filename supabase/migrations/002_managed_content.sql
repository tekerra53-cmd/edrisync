create table if not exists public.managed_content (
  key text primary key,
  value jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.managed_content enable row level security;

drop policy if exists "Public can read managed content" on public.managed_content;
create policy "Public can read managed content"
  on public.managed_content for select
  using (true);

drop policy if exists "Admins can manage managed content" on public.managed_content;
create policy "Admins can manage managed content"
  on public.managed_content for all
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
