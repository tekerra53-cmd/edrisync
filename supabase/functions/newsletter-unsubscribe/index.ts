import { createClient } from 'npm:@supabase/supabase-js@2';

const headers = { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' };

function page(title: string, message: string, status = 200) {
  return new Response(`<!doctype html><title>${title}</title><main style="font-family:Arial,sans-serif;max-width:600px;margin:64px auto;padding:0 24px;color:#000741"><h1>${title}</h1><p style="line-height:1.6;color:#475569">${message}</p></main>`, { status, headers });
}

Deno.serve(async (request) => {
  if (!['GET', 'POST'].includes(request.method)) return page('Method not allowed', 'Use the unsubscribe link in your email.', 405);
  const token = new URL(request.url).searchParams.get('token');
  if (!token || !/^[0-9a-f-]{36}$/i.test(token)) return page('Invalid unsubscribe link', 'This link is incomplete or has expired.', 400);

  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  if (!serviceRoleKey || !supabaseUrl) return page('Service unavailable', 'Please try again later.', 503);
  const adminClient = createClient(supabaseUrl, serviceRoleKey);
  const { data, error } = await adminClient
    .from('newsletter_subscribers')
    .update({ status: 'unsubscribed', unsubscribed_at: new Date().toISOString(), updated_at: new Date().toISOString() })
    .eq('unsubscribe_token', token)
    .select('id')
    .maybeSingle();
  if (error) return page('Service unavailable', 'Please try again later.', 503);
  if (!data) return page('Unsubscribe link not found', 'This address may already have been removed.', 404);
  return page('You are unsubscribed', 'You will no longer receive Edrisync newsletter updates.');
});
