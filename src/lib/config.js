export const SITE_SLUG = (import.meta.env.VITE_SITE_SLUG || 'it-jobs').trim().toLowerCase();

export const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1').replace(
  /\/$/,
  '',
);

export const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL || '').replace(/\/$/, '');
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
