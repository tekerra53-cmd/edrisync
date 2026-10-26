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
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  if (sessionError || !session?.access_token) throw new Error('Your session has expired. Sign in again before sending a test email.');

  // Calling this endpoint directly lets us use the actual HTTP response. This
  // avoids presenting an SDK-level generic error after a confirmed 2xx send.
  const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-newsletter-test`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${session.access_token}`,
      apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ subject, content, headerImageUrl }),
  });
  const payload = await response.json().catch(() => null);
  if (!response.ok) throw new Error(typeof payload?.error === 'string' ? payload.error : `The email test request failed (${response.status}).`);
  if (payload?.ok !== true) throw new Error('The email test did not return a confirmation. Please try again.');
}

export async function sendNewsletterCampaign(subject: string, content: string, headerImageUrl?: string) {
  if (!supabase) throw new Error('Email sending is not connected yet.');
  const { data, error } = await supabase.functions.invoke('send-newsletter-campaign', { body: { subject, content, headerImageUrl, confirm: true } });
  if (error) throw new Error(await getFunctionErrorMessage(error));
  return data as { accepted: number; failed: number; status: string };
}
