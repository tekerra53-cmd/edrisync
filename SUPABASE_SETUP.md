# Supabase setup

The site uses Supabase for persistent public content and consultation requests.

## 1. Create the project

Create a Supabase project, then copy the project URL and anon key into a local `.env` file:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Use `.env.example` as the template. Never put a service-role key in the frontend.

## 2. Create the schema

In Supabase SQL Editor, run:

```text
supabase/migrations/001_initial_schema.sql
supabase/migrations/002_managed_content.sql
supabase/migrations/003_site_media_storage.sql
supabase/migrations/004_security_hardening.sql
supabase/migrations/005_require_mfa_for_admin.sql
supabase/migrations/006_admin_accounts_and_activity_log.sql
supabase/migrations/007_newsletter_subscribers.sql
supabase/migrations/008_jobs.sql
supabase/migrations/009_job_pre_application_question.sql
supabase/migrations/009_newsletter_campaigns.sql
supabase/migrations/010_job_share_codes.sql
supabase/migrations/011_job_applications.sql
supabase/migrations/012_screening_responses_without_contact_details.sql
supabase/migrations/013_newsletter_campaign_header_image.sql
```

This creates:

- `site_settings`: editable public site content, currently the hero section
- `managed_content`: editable case studies and insights collections
- `site-media`: a public Storage bucket for images uploaded from the admin dashboard
- `consultation_requests`: public consultation form submissions and admin statuses
- RLS policies for public reads/submissions and admin-only management
- the admin account directory, activity history, and newsletter subscriber list
- `jobs`: persistent vacancies, requirements, application methods, and publishing status
- public pre-application screening responses, recorded without requiring contact details
- newsletter campaign and delivery records, plus private unsubscribe tokens

## 3. Configure Google sign-in and MFA

In Supabase Dashboard, open **Authentication → Providers → Google**, enable it,
and add the Google OAuth client ID and secret. In Google Cloud, add your local
URL (for example `http://localhost:5173`) and production domain as authorised
JavaScript origins, and add `https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback`
as the authorised redirect URI. In Supabase **Authentication → URL Configuration**,
add `http://localhost:5173/admin` and your production `/admin` URL to the redirect
allow list.

## 4. Create the admin user

Create a user in Supabase Dashboard under Authentication > Users. Then set its `app_metadata` to include the admin role. Run this in SQL Editor, replacing the user id:

```sql
update auth.users
set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role":"admin"}'::jsonb
where id = 'USER_UUID_HERE';
```

Sign out and back in with Google after changing metadata so the JWT contains the
new role. On the first approved sign-in, the dashboard asks the user to enroll a
TOTP authenticator (Google Authenticator, Authy, or 1Password). Run migration
`005_require_mfa_for_admin.sql` after the dashboard code is deployed.

## 5. Admin routes

- `/admin`: edit the hero eyebrow, title, description, and overlay color
- `/admin/case-studies`: add, edit, delete, and publish case studies
- `/admin/insights`: add, edit, delete, and publish insight articles
- `/admin/jobs`: create, edit, publish, close, and delete vacancies
- `/admin/contacts`: review consultation requests and update their status
- `/admin/subscribers`: view people who subscribed through the website
- `/admin/updates`: compose a newsletter and send a test to your own inbox

## 5. Enable newsletter campaigns

1. In Resend, add and verify a sending domain that you own. A dedicated
   subdomain such as `updates.edrisync.com` is recommended for newsletters.
2. Create a Resend API key restricted to that domain and store it only in
   Supabase Edge Function secrets. Never put this key in the website `.env`.
3. In **Supabase Dashboard → Edge Functions → Secrets**, add:

   ```text
   RESEND_API_KEY=re_...
   RESEND_FROM_EMAIL=Edrisync <updates@updates.edrisync.com>
   ```

   Use an address at the exact domain or subdomain you verified in Resend.
4. Run migrations `009_newsletter_campaigns.sql` and `013_newsletter_campaign_header_image.sql` in the Supabase SQL Editor.
5. Deploy the functions (replace the project ref with your Supabase project):

   ```bash
   supabase functions deploy send-newsletter-test --project-ref YOUR_PROJECT_REF
   supabase functions deploy send-newsletter-campaign --project-ref YOUR_PROJECT_REF
   supabase functions deploy newsletter-unsubscribe --no-verify-jwt --project-ref YOUR_PROJECT_REF
   ```

The campaign function accepts only a signed-in MFA administrator, sends to
active subscribers only in batches of 100, records accepted/failed sends, and
adds a per-subscriber unsubscribe link. The first version supports up to 1,000
recipients in one campaign.
- `/admin/users`: review approved dashboard accounts and MFA status
- `/admin/activity`: review sign-ins, sign-outs, and recorded changes

The public site reads saved hero, case-study, and insight content on load. Until a collection is published from the dashboard, the current built-in content remains as a fallback. The consultation form inserts into the same database, so requests are visible in the dashboard from any device.

## Production notes

The anon insert policy is intentionally limited to the consultation request table. Add CAPTCHA/rate limiting before a public launch, and consider moving high-volume form intake behind an Edge Function for abuse protection.

## 6. Test newsletter emails before DNS is available

The admin dashboard can send a test newsletter only to the currently signed-in administrator. In Supabase Dashboard, add an Edge Function named `send-newsletter-test` using `supabase/functions/send-newsletter-test/index.ts`, then set the `RESEND_API_KEY` secret there. Do not add the key to the frontend or GitHub.

Without DNS verification, leave `RESEND_FROM_EMAIL` unset and Resend uses its test sender. After your domain is verified, set `RESEND_FROM_EMAIL` to a branded value such as `Edrisync <updates@edrisync.com>` and enable production sends.

The **Send to all subscribers** action on `/admin/updates` is deliberately disabled and labelled "Verify sending domain to activate." To turn it on later, verify the domain's DNS records, set `RESEND_FROM_EMAIL`, then set `massSendingEnabled = true` in `src/components/AdminDashboard.tsx`. The `send-newsletter-test` edge function only ever sends to the signed-in administrator, so mass sending also needs a new audience-reading edge function before it is safe to enable.
