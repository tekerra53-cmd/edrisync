alter table public.job_applications
  alter column applicant_name drop not null,
  alter column applicant_email drop not null;

create or replace function public.copy_job_screening_to_admin_inbox()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  vacancy_title text;
  screening_question text;
begin
  select title, pre_application_question
    into vacancy_title, screening_question
    from public.jobs
   where id = new.job_id;

  insert into public.consultation_requests (
    name, organisation, email, service_area, challenge, contact_method
  ) values (
    'Job screening response',
    coalesce(vacancy_title, 'Vacancy'),
    'screening-response@edrisync.local',
    'Job screening',
    concat_ws(E'\n\n', screening_question, new.screening_answer),
    'email'
  );
  return new;
end;
$$;

drop trigger if exists job_screening_to_admin_inbox on public.job_applications;
create trigger job_screening_to_admin_inbox
after insert on public.job_applications
for each row execute function public.copy_job_screening_to_admin_inbox();
