import { supabase } from '../lib/supabase';

export type NewsletterSubscriber = {
  id: string;
  email: string;
  status: 'subscribed' | 'unsubscribed';
  source: string;
  subscribed_at: string;
};

export async function subscribeToUpdates(email: string) {
  if (!supabase) throw new Error('Subscriptions are not connected yet. Please try again later.');
  const { error } = await supabase.rpc('subscribe_to_updates', { subscriber_email: email });
  if (error) throw error;
}

export async function getNewsletterSubscribers(): Promise<NewsletterSubscriber[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('newsletter_subscribers')
    .select('id, email, status, source, subscribed_at')
    .order('subscribed_at', { ascending: false });
  if (error) throw error;
  return (data || []) as NewsletterSubscriber[];
}
