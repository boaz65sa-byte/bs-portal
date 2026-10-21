import { createClient } from '@supabase/supabase-js';
export const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);
// Local-only flag for screenshots: shows the dashboard without login, writes disabled.
export const ADMIN_PREVIEW = import.meta.env.VITE_ADMIN_PREVIEW === '1';
