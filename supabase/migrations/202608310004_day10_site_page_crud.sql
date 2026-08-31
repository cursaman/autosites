-- 10일차: 사이트 페이지 CRUD

create table if not exists public.pages (
  id uuid primary key default gen_random_uuid(),
  site_id uuid not null,
  owner_id uuid not null,
  title text not null check (char_length(title) between 1 and 100),
  slug text not null check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  page_type text not null default 'custom' check (page_type in ('home', 'about', 'service', 'contact', 'custom')),
  content jsonb not null default '{}'::jsonb,
  sort_order integer not null default 0 check (sort_order >= 0),
  is_visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint pages_site_owner_fk foreign key (site_id, owner_id) references public.sites(id, owner_id) on delete cascade,
  constraint pages_site_slug_unique unique (site_id, slug)
);

create index if not exists pages_site_sort_idx on public.pages(site_id, sort_order);
alter table public.pages enable row level security;

create policy "pages_select_own" on public.pages for select to authenticated using ((select auth.uid()) = owner_id);
create policy "pages_insert_own" on public.pages for insert to authenticated with check ((select auth.uid()) = owner_id);
create policy "pages_update_own" on public.pages for update to authenticated using ((select auth.uid()) = owner_id) with check ((select auth.uid()) = owner_id);
create policy "pages_delete_own" on public.pages for delete to authenticated using ((select auth.uid()) = owner_id);
