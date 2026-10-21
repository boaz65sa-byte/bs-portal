# bs-simple.com redesign (branches redesign-a / -b / -c)
All three share `redesign-core`: data layer (`src/site/useSite.js`), official badges (`src/site/Badges.jsx`), HE/EN/AR/RU (`src/i18n.js`), admin dashboard (`/#/admin`, `src/site/Admin.jsx`).
Each branch only changes `src/theme.js` (DEFAULT_THEME). Compare any design on any branch with `?theme=a|b|c`.

## Admin (`/#/admin`)
- Login = existing Supabase auth (email+password, password reset).
- Tabs: hero texts ×4 languages · store apps (name/description ×4, order, show/hide) · web apps (existing `projects` fields: names, URL, image upload, color, add, delete-with-confirm; plus name/description ×4, order, show/hide).
- Texts/order/visibility saved to new table `site_content` (key → jsonb). `projects` schema untouched.
- Until the migration is applied, the site falls back to texts in code; saving overrides shows "צריך להפעיל את המיגרציה".

## Migration (NOT applied — needs Boaz's approval)
`supabase/migrations/20261021120000_site_content.sql` — additive only: create table `site_content` + RLS (public read, write only for boaz65sa@gmail.com).

Local screenshot build of the dashboard without login: `VITE_ADMIN_PREVIEW=1 npm run build` (never set on Vercel).
