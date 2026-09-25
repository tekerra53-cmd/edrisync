import { supabase } from '../lib/supabase';

export type CaseStudy = {
  title: string;
  category: string;
  desc: string;
  image?: string;
  tags: string[];
  year: string;
  accent: string;
  visual?: boolean;
};

export type InsightPost = {
  featured?: boolean;
  category: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  image: string;
  accent: string;
};

export async function getManagedContent<T>(key: string, fallback: T): Promise<T> {
  if (!supabase) return fallback;
  const { data, error } = await supabase.from('managed_content').select('value').eq('key', key).maybeSingle();
  if (error || !data?.value) return fallback;
  return data.value as T;
}

export async function saveManagedContent<T>(key: string, value: T) {
  if (!supabase) throw new Error('Supabase is not configured.');
  const { error } = await supabase.from('managed_content').upsert({
    key,
    value,
    updated_at: new Date().toISOString(),
  });
  if (error) throw error;
}
