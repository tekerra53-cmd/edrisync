-- Stores newsletter opt-ins without exposing the subscriber list publicly.
create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  status text not null default 'subscribed' check (status in ('subscribed', 'unsubscribed')),
  source text not null default 'website_footer',
  subscribed_at timestamptz not null default now(),
  unsubscribed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint newsletter_subscribers_email_valid check (email ~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$' and char_length(email) <= 254)
);

create index if not exists newsletter_subscribers_status_idx
  on public.newsletter_subscribers (status, subscribed_at desc);

alter table public.newsletter_subscribers enable row level security;

drop policy if exists "MFA admins can read newsletter subscribers" on public.newsletter_subscribers;
create policy "MFA admins can read newsletter subscribers"
  on public.newsletter_subscribers for select
  using (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
    and coalesce(auth.jwt() ->> 'aal', 'aal1') = 'aal2'
  );

-- The public website calls this RPC. It validates and normalizes the email,
-- but never allows a visitor to read the subscription list.
create or replace function public.subscribe_to_updates(subscriber_email text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  normalized_email text := lower(btrim(subscriber_email));
begin
  if normalized_email is null
    or char_length(normalized_email) > 254
    or normalized_email !~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$' then
    raise exception 'Enter a valid email address.' using errcode = '22023';
  end if;

  insert into public.newsletter_subscribers (email, status, source, subscribed_at, unsubscribed_at, updated_at)
  values (normalized_email, 'subscribed', 'website_footer', now(), null, now())
  on conflict (email) do update
    set status = 'subscribed',
        subscribed_at = case when public.newsletter_subscribers.status = 'unsubscribed' then now() else public.newsletter_subscribers.subscribed_at end,
        unsubscribed_at = null,
        updated_at = now();
end;
$$;

revoke all on function public.subscribe_to_updates(text) from public;
grant execute on function public.subscribe_to_updates(text) to anon, authenticated;
