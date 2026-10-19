create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 2 and 140),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  department text not null default 'Technology',
  location text not null default 'Remote',
  employment_type text not null default 'Full-time' check (employment_type in ('Full-time', 'Part-time', 'Contract', 'Internship')),
  summary text not null check (char_length(summary) between 20 and 1200),
  responsibilities text[] not null default '{}',
  requirements text[] not null default '{}',
  application_email text not null default 'info@edrisync.com',
  application_url text,
  application_instructions text,
  status text not null default 'draft' check (status in ('draft', 'published', 'closed')),
  posted_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists jobs_public_listing_idx
  on public.jobs (status, posted_at desc);

alter table public.jobs enable row level security;

drop policy if exists "Public can read published jobs" on public.jobs;
create policy "Public can read published jobs"
  on public.jobs for select
  using (status = 'published');

drop policy if exists "Admins with MFA can manage jobs" on public.jobs;
create policy "Admins with MFA can manage jobs"
  on public.jobs for all
  using (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
    and coalesce(auth.jwt() ->> 'aal', 'aal1') = 'aal2'
  )
  with check (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
    and coalesce(auth.jwt() ->> 'aal', 'aal1') = 'aal2'
  );

insert into public.jobs (
  title, slug, department, location, employment_type, summary,
  responsibilities, requirements, application_email, application_instructions, status
)
values
  (
    'Cloud Solutions Engineer',
    'cloud-solutions-engineer',
    'Technology',
    'Lagos / Hybrid',
    'Full-time',
    'Design and deliver secure, scalable cloud environments that help our clients make technology a practical growth advantage.',
    array['Design Azure and Microsoft 365 environments for client teams.', 'Lead technical discovery, migration planning, and implementation.', 'Document solutions clearly and support customers after go-live.'],
    array['Experience delivering Microsoft Azure or Microsoft 365 solutions.', 'Comfortable translating business needs into practical technical choices.', 'Clear written communication and a collaborative client mindset.'],
    'info@edrisync.com',
    'Email your CV and a short note explaining the work you are proudest of. Use the role title as the email subject.',
    'published'
  ),
  (
    'Cybersecurity Consultant',
    'cybersecurity-consultant',
    'Cybersecurity',
    'Remote',
    'Full-time',
    'Help organisations understand their risks, strengthen their controls, and build security practices that work in the real world.',
    array['Conduct security reviews, risk assessments, and remediation planning.', 'Support governance, compliance, and client security awareness work.', 'Turn technical findings into clear, useful recommendations for stakeholders.'],
    array['Practical experience in cybersecurity, risk, or compliance.', 'Familiarity with security frameworks such as ISO 27001 or NIST.', 'Strong analytical thinking and confident client communication.'],
    'info@edrisync.com',
    'Email your CV and a short note explaining the work you are proudest of. Use the role title as the email subject.',
    'published'
  )
on conflict (slug) do nothing;

drop trigger if exists audit_job_changes on public.jobs;
create trigger audit_job_changes
after insert or update or delete on public.jobs
for each row execute function public.audit_admin_change();
