-- ADDITIVE ONLY. Not applied to production; run only after Boaz approves.
-- Stores admin-editable texts/order/visibility per language. projects table is untouched.
create table if not exists public.site_content (
  key text primary key,            -- 'hero' | 'app:<apps.json id>' | 'project:<projects.id>'
  value jsonb not null default '{}'::jsonb,  -- e.g. {"name":{"he":..,"en":..,"ar":..,"ru":..},"desc":{...},"order":3,"hidden":false}
  updated_at timestamptz not null default now()
);
alter table public.site_content enable row level security;
create policy "site_content public read" on public.site_content for select using (true);
create policy "site_content admin write" on public.site_content for all to authenticated
  using ((auth.jwt() ->> 'email') = 'boaz65sa@gmail.com')
  with check ((auth.jwt() ->> 'email') = 'boaz65sa@gmail.com');
