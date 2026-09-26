import { supabase } from '../lib/supabase';

export type AdminAccount = {
  id: string;
  email: string;
  display_name: string;
  role: string;
  provider: string;
  created_at: string;
  last_sign_in_at: string | null;
  email_confirmed_at: string | null;
  mfa_enrolled: boolean;
};

export type AdminActivity = {
  id: number;
  actor_email: string | null;
  action: string;
  entity_type: string | null;
  entity_id: string | null;
  summary: string;
  metadata: Record<string, unknown>;
  occurred_at: string;
};

export async function getAdminAccounts(): Promise<AdminAccount[]> {
  if (!supabase) return [];
  const { data, error } = await supabase.rpc('get_admin_accounts');
  if (error) throw error;
  return (data || []) as AdminAccount[];
}

export async function getAdminActivity(): Promise<AdminActivity[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('admin_activity_log')
    .select('id, actor_email, action, entity_type, entity_id, summary, metadata, occurred_at')
    .order('occurred_at', { ascending: false })
    .limit(150);
  if (error) throw error;
  return (data || []) as AdminActivity[];
}

export async function recordSessionActivity(event: 'sign_in' | 'sign_out') {
  if (!supabase) return;
  const { error } = await supabase.rpc('record_admin_activity', { event_action: event });
  if (error) throw error;
}
