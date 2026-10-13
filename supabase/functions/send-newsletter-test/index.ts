import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character] || character));
}

function getJwtClaims(token: string) {
  try {
    const payload = token.split('.')[1]?.replace(/-/g, '+').replace(/_/g, '/');
    return payload ? JSON.parse(atob(payload)) : null;
  } catch { return null; }
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (request.method !== 'POST') return Response.json({ error: 'Method not allowed.' }, { status: 405, headers: corsHeaders });

  const authorization = request.headers.get('Authorization');
  const token = authorization?.replace(/^Bearer\s+/i, '');
  if (!token) return Response.json({ error: 'Sign in before sending a test.' }, { status: 401, headers: corsHeaders });

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
  const supabase = createClient(supabaseUrl, supabaseAnonKey, { global: { headers: { Authorization: authorization } } });
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  const claims = getJwtClaims(token);
  if (userError || !user || user.app_metadata?.role !== 'admin' || claims?.aal !== 'aal2') {
    return Response.json({ error: 'Administrator access with MFA is required.' }, { status: 403, headers: corsHeaders });
  }

  const { subject, content } = await request.json().catch(() => ({}));
  const cleanSubject = typeof subject === 'string' ? subject.trim() : '';
  const cleanContent = typeof content === 'string' ? content.trim() : '';
  if (!cleanSubject || !cleanContent || cleanSubject.length > 200 || cleanContent.length > 5000) {
    return Response.json({ error: 'Add a subject and message within the allowed length.' }, { status: 400, headers: corsHeaders });
  }

  const apiKey = Deno.env.get('RESEND_API_KEY');
  if (!apiKey) return Response.json({ error: 'Email sending is not configured yet.' }, { status: 503, headers: corsHeaders });

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: Deno.env.get('RESEND_FROM_EMAIL') || 'Edrisync <onboarding@resend.dev>',
      to: [user.email],
      subject: `[Test] ${cleanSubject}`,
      html: `<main style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;color:#000741"><p style="font-size:12px;color:#64748b">Edrisync email test</p><h1>${escapeHtml(cleanSubject)}</h1><div style="font-size:16px;line-height:1.65">${escapeHtml(cleanContent).replace(/\n/g, '<br>')}</div></main>`,
    }),
  });

  if (!response.ok) {
    const details = await response.json().catch(() => ({}));
    return Response.json({ error: details?.message || 'Resend could not send the test email.' }, { status: 502, headers: corsHeaders });
  }

  return Response.json({ ok: true }, { headers: corsHeaders });
});
