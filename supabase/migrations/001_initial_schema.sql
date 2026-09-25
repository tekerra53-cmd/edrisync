create extension if not exists pgcrypto;

create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.consultation_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  organisation text not null,
  email text not null,
  phone text,
  service_area text not null,
  challenge text not null,
  contact_method text not null default 'email' check (contact_method in ('email', 'phone')),
  status text not null default 'new' check (status in ('new', 'in_progress', 'closed')),
  created_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;
alter table public.consultation_requests enable row level security;

drop policy if exists "Public can read site settings" on public.site_settings;
create policy "Public can read site settings"
  on public.site_settings for select
  using (true);

drop policy if exists "Admins can manage site settings" on public.site_settings;
create policy "Admins can manage site settings"
  on public.site_settings for all
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Anyone can submit consultation requests" on public.consultation_requests;
create policy "Anyone can submit consultation requests"
  on public.consultation_requests for insert
  with check (true);

drop policy if exists "Admins can read consultation requests" on public.consultation_requests;
create policy "Admins can read consultation requests"
  on public.consultation_requests for select
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Admins can update consultation requests" on public.consultation_requests;
create policy "Admins can update consultation requests"
  on public.consultation_requests for update
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

insert into public.site_settings (key, value)
values (
  'hero',
  '{"eyebrow":"Innovative Solutions","title":"EdriSync","description":"We are a Cybersecurity, GRC, Microsoft Enablement, and Digital Transformation advisory and implementation firm, helping organizations position technology as a strategic business enabler rather than a point-solution vendor.","overlayColor":"#000741"}'::jsonb
)
on conflict (key) do nothing;

create index if not exists consultation_requests_created_at_idx
  on public.consultation_requests (created_at desc);
