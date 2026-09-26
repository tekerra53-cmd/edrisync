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
```

This creates:

- `site_settings`: editable public site content, currently the hero section
- `managed_content`: editable case studies and insights collections
- `site-media`: a public Storage bucket for images uploaded from the admin dashboard
- `consultation_requests`: public consultation form submissions and admin statuses
- RLS policies for public reads/submissions and admin-only management
- the admin account directory, activity history, and newsletter subscriber list

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
- `/admin/contacts`: review consultation requests and update their status
- `/admin/subscribers`: view people who subscribed through the website
- `/admin/users`: review approved dashboard accounts and MFA status
- `/admin/activity`: review sign-ins, sign-outs, and recorded changes

The public site reads saved hero, case-study, and insight content on load. Until a collection is published from the dashboard, the current built-in content remains as a fallback. The consultation form inserts into the same database, so requests are visible in the dashboard from any device.

## Production notes

The anon insert policy is intentionally limited to the consultation request table. Add CAPTCHA/rate limiting before a public launch, and consider moving high-volume form intake behind an Edge Function for abuse protection.
