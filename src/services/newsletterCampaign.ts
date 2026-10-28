import { supabase } from '../lib/supabase';

async function callNewsletterFunction<T>(name: string, body: Record<string, unknown>) {
  if (!supabase) throw new Error('Email sending is not connected yet.');
  // A saved browser session can outlive its access token. Refresh it before
  // sending so Edge Functions never receive a stale Authorization header.
  const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession();
  const session = refreshData.session;
  if (refreshError || !session?.access_token) throw new Error('Your session has expired. Sign out, sign in again, and complete MFA before sending an email.');

  const { error: userError } = await supabase.auth.getUser(session.access_token);
  if (userError) throw new Error('Your sign-in could not be verified. Sign out, sign in again, and complete MFA before sending an email.');

  const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/${name}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${session.access_token}`,
      apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const payload = await response.json().catch(() => null);
  if (!response.ok) throw new Error(typeof payload?.error === 'string' ? payload.error : `The email request failed (${response.status}).`);
  return payload as T;
}

export async function sendNewsletterTest(subject: string, content: string, headerImageUrl?: string) {
  const payload = await callNewsletterFunction<{ ok?: boolean }>('send-newsletter-test', { subject, content, headerImageUrl });
  if (payload?.ok !== true) throw new Error('The email test did not return a confirmation. Please try again.');
}

export async function sendNewsletterCampaign(subject: string, content: string, headerImageUrl?: string) {
  return callNewsletterFunction<{ accepted: number; failed: number; status: string }>('send-newsletter-campaign', { subject, content, headerImageUrl, confirm: true });
}
