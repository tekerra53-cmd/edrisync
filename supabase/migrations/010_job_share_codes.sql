alter table public.jobs
  add column if not exists share_code text;

update public.jobs
set share_code = lpad((50000 + (abs(hashtext(id::text)) % 50000))::text, 5, '0')
where share_code is null;

create unique index if not exists jobs_share_code_unique_idx
  on public.jobs (share_code);
