import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};
const batchSize = 100;
const campaignRecipientLimit = 1000;

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character] || character));
}

function getJwtClaims(token: string) {
  try {
    const payload = token.split('.')[1]?.replace(/-/g, '+').replace(/_/g, '/');
    return payload ? JSON.parse(atob(payload)) : null;
  } catch { return null; }
}

function newsletterHtml(subject: string, content: string, unsubscribeUrl: string, headerImageUrl?: string) {
  const headerImage = headerImageUrl ? `<img src="${escapeHtml(headerImageUrl)}" alt="" style="display:block;width:100%;max-width:640px;height:auto;margin:0 0 24px;border-radius:12px">` : '';
  return `<main style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;color:#000741">${headerImage}<p style="font-size:12px;color:#64748b">Edrisync update</p><h1>${escapeHtml(subject)}</h1><div style="font-size:16px;line-height:1.65">${escapeHtml(content).replace(/\n/g, '<br>')}</div><hr style="border:0;border-top:1px solid #e2e8f0;margin:32px 0 16px"><p style="font-size:12px;line-height:1.5;color:#64748b">You received this because you subscribed to Edrisync updates. <a href="${unsubscribeUrl}">Unsubscribe</a>.</p></main>`;
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (request.method !== 'POST') return Response.json({ error: 'Method not allowed.' }, { status: 405, headers: corsHeaders });

  const authorization = request.headers.get('Authorization');
  const token = authorization?.replace(/^Bearer\s+/i, '');
  if (!token) return Response.json({ error: 'Sign in before sending a campaign.' }, { status: 401, headers: corsHeaders });

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!serviceRoleKey) return Response.json({ error: 'Newsletter sending is not configured on the server.' }, { status: 503, headers: corsHeaders });

  const userClient = createClient(supabaseUrl, supabaseAnonKey, { global: { headers: { Authorization: authorization } } });
  const { data: { user }, error: userError } = await userClient.auth.getUser();
  const claims = getJwtClaims(token);
  if (userError || !user || user.app_metadata?.role !== 'admin' || claims?.aal !== 'aal2') {
    return Response.json({ error: 'Administrator access with MFA is required.' }, { status: 403, headers: corsHeaders });
  }

  const { subject, content, headerImageUrl, confirm } = await request.json().catch(() => ({}));
  const cleanSubject = typeof subject === 'string' ? subject.trim() : '';
  const cleanContent = typeof content === 'string' ? content.trim() : '';
  const cleanHeaderImageUrl = typeof headerImageUrl === 'string' ? headerImageUrl.trim() : '';
  if (confirm !== true) return Response.json({ error: 'Confirm the send before starting a campaign.' }, { status: 400, headers: corsHeaders });
  if (!cleanSubject || !cleanContent || cleanSubject.length > 200 || cleanContent.length > 5000) {
    return Response.json({ error: 'Add a subject and message within the allowed length.' }, { status: 400, headers: corsHeaders });
  }
  if (cleanHeaderImageUrl && !/^https:\/\//.test(cleanHeaderImageUrl)) return Response.json({ error: 'The newsletter image must use a secure URL.' }, { status: 400, headers: corsHeaders });

  const resendKey = Deno.env.get('RESEND_API_KEY');
  const from = Deno.env.get('RESEND_FROM_EMAIL');
  if (!resendKey || !from) return Response.json({ error: 'Set RESEND_API_KEY and RESEND_FROM_EMAIL before sending a campaign.' }, { status: 503, headers: corsHeaders });

  const adminClient = createClient(supabaseUrl, serviceRoleKey);
  const { data: subscribers, error: subscriberError } = await adminClient
    .from('newsletter_subscribers')
    .select('id, email, unsubscribe_token')
    .eq('status', 'subscribed')
    .order('subscribed_at', { ascending: true })
    .limit(campaignRecipientLimit + 1);
  if (subscriberError) return Response.json({ error: 'Could not load subscribers.' }, { status: 500, headers: corsHeaders });
  if (!subscribers?.length) return Response.json({ error: 'There are no active subscribers to email.' }, { status: 400, headers: corsHeaders });
  if (subscribers.length > campaignRecipientLimit) return Response.json({ error: `This campaign has more than ${campaignRecipientLimit} subscribers. Send in smaller managed batches.` }, { status: 400, headers: corsHeaders });

  const { data: campaign, error: campaignError } = await adminClient
    .from('newsletter_campaigns')
    .insert({ subject: cleanSubject, content: cleanContent, header_image_url: cleanHeaderImageUrl || null, recipient_count: subscribers.length, created_by: user.id })
    .select('id')
    .single();
  if (campaignError || !campaign) return Response.json({ error: 'Could not create the campaign record.' }, { status: 500, headers: corsHeaders });

  const deliveryRows = subscribers.map((subscriber) => ({ campaign_id: campaign.id, subscriber_id: subscriber.id }));
  const { error: deliveryError } = await adminClient.from('newsletter_deliveries').insert(deliveryRows);
  if (deliveryError) return Response.json({ error: 'Could not prepare campaign deliveries.' }, { status: 500, headers: corsHeaders });

  let accepted = 0;
  let failed = 0;
  const unsubscribeBase = `${supabaseUrl}/functions/v1/newsletter-unsubscribe?token=`;
  for (let start = 0; start < subscribers.length; start += batchSize) {
    const batch = subscribers.slice(start, start + batchSize);
    const response = await fetch('https://api.resend.com/emails/batch', {
      method: 'POST',
      headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json', 'Idempotency-Key': `newsletter/${campaign.id}/${start}` },
      body: JSON.stringify(batch.map((subscriber) => {
        const unsubscribeUrl = `${unsubscribeBase}${encodeURIComponent(subscriber.unsubscribe_token)}`;
        return {
          from,
          to: [subscriber.email],
          subject: cleanSubject,
          html: newsletterHtml(cleanSubject, cleanContent, unsubscribeUrl, cleanHeaderImageUrl || undefined),
          text: `${cleanSubject}\n\n${cleanContent}\n\nUnsubscribe: ${unsubscribeUrl}`,
          headers: { 'List-Unsubscribe': `<${unsubscribeUrl}>`, 'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click' },
        };
      })),
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      failed += batch.length;
      await adminClient.from('newsletter_deliveries').update({ status: 'failed', error_message: payload?.message || 'Resend rejected this batch.' }).eq('campaign_id', campaign.id).in('subscriber_id', batch.map((subscriber) => subscriber.id));
      continue;
    }
    const providerIds = Array.isArray(payload?.data) ? payload.data : [];
    accepted += batch.length;
    await Promise.all(batch.map((subscriber, index) => adminClient.from('newsletter_deliveries').update({ status: 'accepted', provider_message_id: providerIds[index]?.id || null }).eq('campaign_id', campaign.id).eq('subscriber_id', subscriber.id)));
  }

  const status = failed === 0 ? 'completed' : accepted === 0 ? 'failed' : 'partial';
  await adminClient.from('newsletter_campaigns').update({ status, accepted_count: accepted, failed_count: failed, completed_at: new Date().toISOString() }).eq('id', campaign.id);
  return Response.json({ ok: true, campaignId: campaign.id, accepted, failed, status }, { headers: corsHeaders });
});
