-- PostgREST/Supabase parameterises database queries. These constraints provide
-- defence in depth and prevent malformed or oversized public-form data.
alter table public.consultation_requests
  add constraint consultation_requests_name_length check (char_length(name) between 1 and 100),
  add constraint consultation_requests_organisation_length check (char_length(organisation) between 1 and 160),
  add constraint consultation_requests_email_valid check (email ~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$' and char_length(email) <= 254),
  add constraint consultation_requests_phone_length check (phone is null or char_length(phone) <= 40),
  add constraint consultation_requests_challenge_length check (char_length(challenge) between 1 and 2000),
  add constraint consultation_requests_service_area_valid check (service_area in ('cybersecurity', 'grc', 'microsoft', 'digital-transformation', 'general'));

create or replace function public.limit_consultation_requests()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if (select count(*) from public.consultation_requests where email = lower(new.email) and created_at > now() - interval '1 hour') >= 4 then
    raise exception 'Too many consultation requests. Please try again later.' using errcode = '22023';
  end if;
  new.name := btrim(regexp_replace(new.name, '[[:cntrl:]]', ' ', 'g'));
  new.organisation := btrim(regexp_replace(new.organisation, '[[:cntrl:]]', ' ', 'g'));
  new.challenge := btrim(regexp_replace(new.challenge, '[[:cntrl:]]', ' ', 'g'));
  new.email := lower(btrim(new.email));
  return new;
end;
$$;

drop trigger if exists consultation_requests_guard on public.consultation_requests;
create trigger consultation_requests_guard before insert on public.consultation_requests
for each row execute function public.limit_consultation_requests();

-- In Supabase Authentication, set JWT expiry to 30–60 minutes, enable CAPTCHA
-- for sign-in, and configure only approved redirect URLs.
