import { supabase } from '../lib/supabase';

export type JobStatus = 'draft' | 'published' | 'closed';
export type EmploymentType = 'Full-time' | 'Part-time' | 'Contract' | 'Internship';

export type Job = {
  id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  employment_type: EmploymentType;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  application_email: string;
  application_url: string | null;
  application_instructions: string | null;
  status: JobStatus;
  posted_at: string;
  created_at: string;
  updated_at: string;
};

export type JobInput = Omit<Job, 'id' | 'created_at' | 'updated_at'> & { id?: string };

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
