-- Admin account directory and immutable activity history.
-- Never expose auth.users directly to the browser: the RPC below returns only
-- approved dashboard accounts and is guarded by the same admin + MFA check.

create table if not exists public.admin_activity_log (
  id bigint generated always as identity primary key,
  actor_id uuid,
  actor_email text,
  action text not null,
  entity_type text,
  entity_id text,
  summary text not null,
  metadata jsonb not null default '{}'::jsonb,
  occurred_at timestamptz not null default now(),
  constraint admin_activity_log_action_length check (char_length(action) between 1 and 80),
  constraint admin_activity_log_summary_length check (char_length(summary) between 1 and 500)
);

create index if not exists admin_activity_log_occurred_at_idx
  on public.admin_activity_log (occurred_at desc);

alter table public.admin_activity_log enable row level security;

drop policy if exists "MFA admins can read activity" on public.admin_activity_log;
create policy "MFA admins can read activity"
  on public.admin_activity_log for select
  using (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
    and coalesce(auth.jwt() ->> 'aal', 'aal1') = 'aal2'
  );

create or replace function public.is_mfa_admin()
returns boolean
language sql
stable
as $$
  select (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
    and coalesce(auth.jwt() ->> 'aal', 'aal1') = 'aal2';
$$;

create or replace function public.get_admin_accounts()
returns table (
  id uuid,
  email text,
  display_name text,
  role text,
  provider text,
  created_at timestamptz,
  last_sign_in_at timestamptz,
  email_confirmed_at timestamptz,
  mfa_enrolled boolean
)
language plpgsql
security definer
set search_path = public, auth
as $$
begin
  if not public.is_mfa_admin() then
    raise exception 'Administrator access with MFA is required' using errcode = '42501';
  end if;

  return query
  select
    u.id,
    u.email,
    coalesce(u.raw_user_meta_data ->> 'full_name', u.raw_user_meta_data ->> 'name', ''),
    coalesce(u.raw_app_meta_data ->> 'role', 'viewer'),
    coalesce(u.raw_app_meta_data ->> 'provider', u.raw_app_meta_data ->> 'providers' ->> 0, 'email'),
    u.created_at,
    u.last_sign_in_at,
    u.email_confirmed_at,
    exists (
      select 1 from auth.mfa_factors f
      where f.user_id = u.id and f.status = 'verified'
    )
  from auth.users u
  where u.raw_app_meta_data ->> 'role' = 'admin'
  order by u.created_at desc;
end;
$$;

create or replace function public.record_admin_activity(event_action text)
returns void
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  current_email text := auth.jwt() ->> 'email';
begin
  if not public.is_mfa_admin() then
    raise exception 'Administrator access with MFA is required' using errcode = '42501';
  end if;

  if event_action not in ('sign_in', 'sign_out') then
    raise exception 'Unsupported activity event' using errcode = '22023';
  end if;

  insert into public.admin_activity_log (actor_id, actor_email, action, entity_type, summary, metadata)
  values (
    auth.uid(),
    current_email,
    event_action,
    'admin_session',
    case when event_action = 'sign_in' then 'Signed in to the admin dashboard' else 'Signed out of the admin dashboard' end,
    jsonb_build_object('mfa_verified', true)
  );
end;
$$;

create or replace function public.audit_admin_change()
returns trigger
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  change_action text := lower(TG_OP);
  item_id text := coalesce(to_jsonb(new) ->> 'id', to_jsonb(old) ->> 'id', to_jsonb(new) ->> 'key', to_jsonb(old) ->> 'key', 'record');
  item_label text := case
    when TG_TABLE_NAME = 'managed_content' then coalesce(to_jsonb(new) ->> 'key', to_jsonb(old) ->> 'key', 'managed content')
    when TG_TABLE_NAME = 'site_settings' then coalesce(to_jsonb(new) ->> 'key', to_jsonb(old) ->> 'key', 'site setting')
    when TG_TABLE_NAME = 'consultation_requests' then coalesce(to_jsonb(new) ->> 'name', to_jsonb(old) ->> 'name', 'consultation request')
    else TG_TABLE_NAME
  end;
begin
  -- Public form inserts are intentionally excluded: this is an admin audit log.
  if not public.is_mfa_admin() then
    if TG_OP = 'DELETE' then return old; end if;
    return new;
  end if;

  insert into public.admin_activity_log (actor_id, actor_email, action, entity_type, entity_id, summary, metadata)
  values (
    auth.uid(),
    auth.jwt() ->> 'email',
    change_action,
    TG_TABLE_NAME,
    item_id,
    initcap(change_action) || ' ' || item_label,
    case
      when TG_TABLE_NAME = 'consultation_requests' and TG_OP = 'UPDATE' then jsonb_build_object('previous_status', to_jsonb(old) ->> 'status', 'new_status', to_jsonb(new) ->> 'status')
      else '{}'::jsonb
    end
  );

  if TG_OP = 'DELETE' then return old; end if;
  return new;
end;
$$;

drop trigger if exists audit_site_settings_changes on public.site_settings;
create trigger audit_site_settings_changes
after insert or update or delete on public.site_settings
for each row execute function public.audit_admin_change();

drop trigger if exists audit_managed_content_changes on public.managed_content;
create trigger audit_managed_content_changes
after insert or update or delete on public.managed_content
for each row execute function public.audit_admin_change();

drop trigger if exists audit_consultation_request_changes on public.consultation_requests;
create trigger audit_consultation_request_changes
after update on public.consultation_requests
for each row execute function public.audit_admin_change();

revoke all on function public.get_admin_accounts() from public;
revoke all on function public.record_admin_activity(text) from public;
grant execute on function public.get_admin_accounts() to authenticated;
grant execute on function public.record_admin_activity(text) to authenticated;
