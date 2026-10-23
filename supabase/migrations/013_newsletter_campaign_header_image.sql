alter table public.newsletter_campaigns
  add column if not exists header_image_url text;

alter table public.newsletter_campaigns
  drop constraint if exists newsletter_campaigns_header_image_url_check;

alter table public.newsletter_campaigns
  add constraint newsletter_campaigns_header_image_url_check
  check (header_image_url is null or header_image_url ~ '^https://');
