-- Campaign audit trail and individual unsubscribe tokens for newsletter sending.
alter table public.newsletter_subscribers
  add column if not exists unsubscribe_token uuid default gen_random_uuid();

update public.newsletter_subscribers
set unsubscribe_token = gen_random_uuid()
where unsubscribe_token is null;

alter table public.newsletter_subscribers
  alter column unsubscribe_token set not null;

create unique index if not exists newsletter_subscribers_unsubscribe_token_idx
  on public.newsletter_subscribers (unsubscribe_token);

create table if not exists public.newsletter_campaigns (
  id uuid primary key default gen_random_uuid(),
  subject text not null check (char_length(subject) between 1 and 200),
  content text not null check (char_length(content) between 1 and 5000),
  status text not null default 'sending' check (status in ('sending', 'completed', 'partial', 'failed')),
  recipient_count integer not null default 0 check (recipient_count >= 0),
  accepted_count integer not null default 0 check (accepted_count >= 0),
  failed_count integer not null default 0 check (failed_count >= 0),
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

create table if not exists public.newsletter_deliveries (
  id bigint generated always as identity primary key,
  campaign_id uuid not null references public.newsletter_campaigns(id) on delete cascade,
  subscriber_id uuid not null references public.newsletter_subscribers(id) on delete cascade,
  provider_message_id text,
  status text not null default 'pending' check (status in ('pending', 'accepted', 'failed')),
  error_message text,
  created_at timestamptz not null default now(),
  unique (campaign_id, subscriber_id)
);

create index if not exists newsletter_deliveries_campaign_idx
  on public.newsletter_deliveries (campaign_id, status);

alter table public.newsletter_campaigns enable row level security;
alter table public.newsletter_deliveries enable row level security;

drop policy if exists "MFA admins can read newsletter campaigns" on public.newsletter_campaigns;
create policy "MFA admins can read newsletter campaigns"
  on public.newsletter_campaigns for select
  using (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
    and coalesce(auth.jwt() ->> 'aal', 'aal1') = 'aal2'
  );

drop policy if exists "MFA admins can read newsletter deliveries" on public.newsletter_deliveries;
create policy "MFA admins can read newsletter deliveries"
  on public.newsletter_deliveries for select
  using (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
    and coalesce(auth.jwt() ->> 'aal', 'aal1') = 'aal2'
  );
