import { supabase } from '../lib/supabase';

async function getFunctionErrorMessage(error: unknown) {
  const fallback = error instanceof Error ? error.message : 'Could not send the email.';
  const response = (error as { context?: Response } | null)?.context;
  if (!response) return fallback;

  const payload = await response.clone().json().catch(() => null);
  return typeof payload?.error === 'string' ? payload.error : fallback;
}

export async function sendNewsletterTest(subject: string, content: string, headerImageUrl?: string) {
  if (!supabase) throw new Error('Email sending is not connected yet.');
  const { error } = await supabase.functions.invoke('send-newsletter-test', { body: { subject, content, headerImageUrl } });
  if (error) throw new Error(await getFunctionErrorMessage(error));
}

export async function sendNewsletterCampaign(subject: string, content: string, headerImageUrl?: string) {
  if (!supabase) throw new Error('Email sending is not connected yet.');
  const { data, error } = await supabase.functions.invoke('send-newsletter-campaign', { body: { subject, content, headerImageUrl, confirm: true } });
  if (error) throw new Error(await getFunctionErrorMessage(error));
  return data as { accepted: number; failed: number; status: string };
}
