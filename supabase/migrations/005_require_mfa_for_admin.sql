-- Admin writes require both the approved app role and a verified MFA session.
-- Google OAuth alone is AAL1; after TOTP verification Supabase issues AAL2.
drop policy if exists "Admins can manage site settings" on public.site_settings;
create policy "Admins with MFA can manage site settings"
  on public.site_settings for all
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin' and coalesce(auth.jwt() ->> 'aal', 'aal1') = 'aal2')
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin' and coalesce(auth.jwt() ->> 'aal', 'aal1') = 'aal2');

drop policy if exists "Admins can manage managed content" on public.managed_content;
create policy "Admins with MFA can manage managed content"
  on public.managed_content for all
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin' and coalesce(auth.jwt() ->> 'aal', 'aal1') = 'aal2')
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin' and coalesce(auth.jwt() ->> 'aal', 'aal1') = 'aal2');

drop policy if exists "Admins can read consultation requests" on public.consultation_requests;
create policy "Admins with MFA can read consultation requests"
  on public.consultation_requests for select
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin' and coalesce(auth.jwt() ->> 'aal', 'aal1') = 'aal2');

drop policy if exists "Admins can update consultation requests" on public.consultation_requests;
create policy "Admins with MFA can update consultation requests"
  on public.consultation_requests for update
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin' and coalesce(auth.jwt() ->> 'aal', 'aal1') = 'aal2')
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin' and coalesce(auth.jwt() ->> 'aal', 'aal1') = 'aal2');

drop policy if exists "Admins can upload site media" on storage.objects;
create policy "Admins with MFA can upload site media"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'site-media' and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin' and coalesce(auth.jwt() ->> 'aal', 'aal1') = 'aal2');
