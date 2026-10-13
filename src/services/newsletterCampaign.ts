import { supabase } from '../lib/supabase';

export async function sendNewsletterTest(subject: string, content: string) {
  if (!supabase) throw new Error('Email sending is not connected yet.');
  const { error } = await supabase.functions.invoke('send-newsletter-test', { body: { subject, content } });
  if (error) throw error;
}
