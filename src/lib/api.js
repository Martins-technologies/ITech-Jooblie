/**
 * Custom fetch wrapper for iTech Jobline backend communications.
 */
export async function api(path, init = {}, token = null) {
  const baseUrl = (import.meta.env.VITE_API_URL || 'http://localhost:4000/api').replace(/\/$/, '');
  const url = `${baseUrl}/${path.replace(/^\//, '')}`;

  const headers = new Headers(init.headers || {});
  headers.set('X-Site-Slug', import.meta.env.VITE_SITE_SLUG || 'it-jobline');

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  let finalBody = init.body;
  if (init.body && typeof init.body === 'object' && !(init.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
    finalBody = JSON.stringify(init.body);
  }

  const response = await fetch(url, {
    ...init,
    body: finalBody,
    headers,
  });

  if (!response.ok) {
    let errorMessage = `API error: ${response.status} ${response.statusText}`;
    try {
      const errBody = await response.json();
      if (errBody && errBody.message) {
        errorMessage = errBody.message;
      }
    } catch {
      // ignore
    }
    throw new Error(errorMessage);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}
