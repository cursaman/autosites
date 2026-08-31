-- 7일차: 사용자별 데이터 격리를 위한 기본 테이블과 RLS 정책

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.sites (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null check (char_length(name) between 1 and 100),
  status text not null default 'draft' check (status in ('draft', 'preview', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists sites_owner_id_updated_at_idx
  on public.sites(owner_id, updated_at desc);

alter table public.profiles enable row level security;
alter table public.sites enable row level security;

create policy "profiles_select_own"
  on public.profiles for select
  to authenticated
  using ((select auth.uid()) = id);

create policy "profiles_update_own"
  on public.profiles for update
  to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

create policy "sites_select_own"
  on public.sites for select
  to authenticated
  using ((select auth.uid()) = owner_id);

create policy "sites_insert_own"
  on public.sites for insert
  to authenticated
  with check ((select auth.uid()) = owner_id);

create policy "sites_update_own"
  on public.sites for update
  to authenticated
  using ((select auth.uid()) = owner_id)
  with check ((select auth.uid()) = owner_id);

create policy "sites_delete_own"
  on public.sites for delete
  to authenticated
  using ((select auth.uid()) = owner_id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1)));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
