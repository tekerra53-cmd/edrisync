import { supabase } from '../lib/supabase';

export async function sendNewsletterTest(subject: string, content: string, headerImageUrl?: string) {
  if (!supabase) throw new Error('Email sending is not connected yet.');
  const { error } = await supabase.functions.invoke('send-newsletter-test', { body: { subject, content, headerImageUrl } });
  if (error) throw error;
}

export async function sendNewsletterCampaign(subject: string, content: string, headerImageUrl?: string) {
  if (!supabase) throw new Error('Email sending is not connected yet.');
  const { data, error } = await supabase.functions.invoke('send-newsletter-campaign', { body: { subject, content, headerImageUrl, confirm: true } });
  if (error) throw error;
  return data as { accepted: number; failed: number; status: string };
}
