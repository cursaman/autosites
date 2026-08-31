-- 8일차: 사업정보 입력과 임시저장

alter table public.sites
  add constraint sites_id_owner_id_unique unique (id, owner_id);

create table if not exists public.business_profiles (
  site_id uuid primary key,
  owner_id uuid not null,
  business_name text not null check (char_length(business_name) between 2 and 100),
  industry text not null,
  purpose text not null,
  target_customer text not null,
  core_service text not null,
  desired_action text,
  contact_email text,
  phone text,
  address text,
  reference_sites text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint business_profiles_site_owner_fk
    foreign key (site_id, owner_id) references public.sites(id, owner_id) on delete cascade
);

create index if not exists business_profiles_owner_id_idx on public.business_profiles(owner_id);
alter table public.business_profiles enable row level security;

create policy "business_profiles_select_own" on public.business_profiles for select to authenticated using ((select auth.uid()) = owner_id);
create policy "business_profiles_insert_own" on public.business_profiles for insert to authenticated with check ((select auth.uid()) = owner_id);
create policy "business_profiles_update_own" on public.business_profiles for update to authenticated using ((select auth.uid()) = owner_id) with check ((select auth.uid()) = owner_id);
create policy "business_profiles_delete_own" on public.business_profiles for delete to authenticated using ((select auth.uid()) = owner_id);
