import { supabase } from '../lib/supabase';

export type JobStatus = 'draft' | 'published' | 'closed';
export type EmploymentType = 'Full-time' | 'Part-time' | 'Contract' | 'Internship';

export type Job = {
  id: string;
  title: string;
  slug: string;
  share_code: string | null;
  department: string;
  location: string;
  employment_type: EmploymentType;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  application_email: string;
  application_url: string | null;
  application_instructions: string | null;
  pre_application_question: string | null;
  status: JobStatus;
  posted_at: string;
  created_at: string;
  updated_at: string;
};

export type JobInput = Omit<Job, 'id' | 'created_at' | 'updated_at'> & { id?: string };

export type JobApplicationInput = { job_id: string; applicant_name?: string; applicant_email?: string; applicant_phone?: string; screening_answer?: string };

export async function submitJobApplication(application: JobApplicationInput) {
  if (!supabase) throw new Error('Applications are not configured yet.');
  const { error } = await supabase.from('job_applications').insert(application);
  if (error) throw error;
}

export async function getPublishedJobs(): Promise<Job[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('status', 'published')
    .order('posted_at', { ascending: false });
  if (error) throw error;
  return (data || []) as Job[];
}

export async function getPublishedJobBySlug(slug: string): Promise<Job | null> {
  if (!supabase) return null;
  const { data, error } = await supabase.from('jobs').select('*').eq('status', 'published').eq('slug', slug).maybeSingle();
  if (error) throw error;
  return data as Job | null;
}

export async function getAdminJobs(): Promise<Job[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .order('updated_at', { ascending: false });
  if (error) throw error;
  return (data || []) as Job[];
}

export async function saveJob(job: JobInput): Promise<Job> {
  if (!supabase) throw new Error('Supabase is not configured.');
  const payload = { ...job, updated_at: new Date().toISOString() };
  const { data, error } = await supabase.from('jobs').upsert(payload).select().single();
  if (error) throw error;
  return data as Job;
}

export async function deleteJob(id: string) {
  if (!supabase) throw new Error('Supabase is not configured.');
  const { error } = await supabase.from('jobs').delete().eq('id', id);
  if (error) throw error;
}
