import { SUPABASE_ANON_KEY, SUPABASE_URL } from './config.js';

export async function uploadResumeToStorage({ accessToken, userId, file }) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error('Resume upload is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
  }
  if (!file || file.type !== 'application/pdf') {
    throw new Error('Please upload a PDF resume (max 5 MB).');
  }
  if (file.size > 5 * 1024 * 1024) {
    throw new Error('Resume must be 5 MB or smaller.');
  }

  const safeName = file.name.replace(/[^\w.\-]+/g, '_');
  const path = `${userId}/${Date.now()}-${safeName}`;
  const response = await fetch(`${SUPABASE_URL}/storage/v1/object/resumes/${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      apikey: SUPABASE_ANON_KEY,
      'Content-Type': 'application/pdf',
      'x-upsert': 'true',
    },
    body: file,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || 'Failed to upload resume to storage.');
  }

  return { path, originalName: file.name, sizeBytes: file.size };
}

export async function refreshSupabaseSession(refreshToken) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !refreshToken) {
    throw new Error('Session refresh is not available.');
  }
  const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=refresh_token`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_ANON_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload?.error_description || payload?.msg || 'Unable to refresh session.');
  }
  return payload;
}
