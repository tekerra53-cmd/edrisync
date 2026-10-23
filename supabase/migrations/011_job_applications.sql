create table if not exists public.job_applications (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references public.jobs(id) on delete cascade,
  applicant_name text not null check (char_length(applicant_name) between 2 and 120),
  applicant_email text not null check (char_length(applicant_email) between 5 and 254),
  applicant_phone text,
  screening_answer text,
  status text not null default 'new' check (status in ('new', 'reviewing', 'closed')),
  created_at timestamptz not null default now()
);

create index if not exists job_applications_job_created_idx
  on public.job_applications(job_id, created_at desc);

alter table public.job_applications enable row level security;

create policy "Public can submit job applications"
  on public.job_applications for insert
  with check (true);

create policy "Admins with MFA can manage job applications"
  on public.job_applications for all
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin' and coalesce(auth.jwt() ->> 'aal', 'aal1') = 'aal2')
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin' and coalesce(auth.jwt() ->> 'aal', 'aal1') = 'aal2');
