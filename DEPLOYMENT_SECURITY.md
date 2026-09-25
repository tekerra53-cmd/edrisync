# Production security checklist

The static files in `public/_headers` and `public/_redirects` are recognised by
Cloudflare Pages and Netlify. Deploy the site through HTTPS only and keep the
HSTS header enabled after confirming every subdomain supports HTTPS.

## Supabase

- In **Authentication → Settings**, set the JWT expiry to 30–60 minutes and
  enable CAPTCHA protection for password sign-in.
- In **URL configuration**, allow only the production domain and explicit local
  development URLs as redirect URLs.
- In **API settings**, restrict CORS/allowed origins to `https://edrisync.com`
  (and `https://www.edrisync.com` only if it is used). Do not use `*`.
- Apply migration `004_security_hardening.sql`. It caps form fields, normalises
  text, and limits a single email address to four requests per hour. For IP- or
  organisation-wide limits, place the form behind a Worker/edge function with
  a rate-limit store and a bot challenge; a browser cannot securely enforce
  rate limits or CORS.

## Secrets and injection protection

Only publish the Supabase URL and anon key in Vite environment variables.
Never expose a service-role key. Keep RLS enabled. The frontend uses Supabase's
query builder (parameterised PostgREST requests), never SQL string building;
the database constraints are an additional guard. React escapes displayed text
by default, and this project does not use `dangerouslySetInnerHTML` for CMS or
form content.
