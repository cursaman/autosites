-- 9일차: 홈페이지 유형과 핵심 목적

alter table public.sites
  add column homepage_type text,
  add column website_goal text;

alter table public.sites
  add constraint sites_homepage_type_check
    check (homepage_type is null or homepage_type in ('corporate', 'service', 'store', 'portfolio')),
  add constraint sites_website_goal_check
    check (website_goal is null or website_goal in ('inquiry', 'reservation', 'branding', 'sales'));
