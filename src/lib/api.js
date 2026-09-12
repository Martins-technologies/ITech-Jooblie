import { API_BASE_URL, SITE_SLUG } from './config.js';
import { readSession, writeSession, clearSession } from './auth/session.js';

export class ApiError extends Error {
  constructor(message, { status, code, details, requestId } = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.details = details;
    this.requestId = requestId;
  }
}

function parseErrorBody(body, status, statusText) {
  const envelope = body?.error;
  if (envelope?.message) {
    return new ApiError(envelope.message, {
      status,
      code: envelope.code,
      details: envelope.details,
      requestId: envelope.requestId,
    });
  }
  if (body?.message) {
    return new ApiError(body.message, { status, code: body.code });
  }
  return new ApiError(`API error: ${status} ${statusText}`, { status });
}

export async function api(path, init = {}, token = null) {
  const url = `${API_BASE_URL}/${String(path).replace(/^\//, '')}`;
  const headers = new Headers(init.headers || {});
  headers.set('X-Site-Slug', SITE_SLUG);

  const accessToken = token ?? init.token ?? readSession()?.accessToken;
  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  let finalBody = init.body;
  if (init.body && typeof init.body === 'object' && !(init.body instanceof FormData) && !(init.body instanceof Blob)) {
    headers.set('Content-Type', 'application/json');
    finalBody = JSON.stringify(init.body);
  }

  const response = await fetch(url, {
    ...init,
    body: finalBody,
    headers,
  });

  if (response.status === 204) {
    return null;
  }

  const contentType = response.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');
  const payload = isJson ? await response.json().catch(() => null) : await response.text();

  if (!response.ok) {
    throw parseErrorBody(payload, response.status, response.statusText);
  }

  return payload;
}

export function persistAuthSession(res, extras = {}) {
  if (!res?.session?.access_token) return null;
  const nextSession = {
    accessToken: res.session.access_token,
    refreshToken: res.session.refresh_token,
    expiresAt: res.session.expires_at,
    tokenType: res.session.token_type,
    user: res.user || null,
    profile: extras.profile || null,
    company: res.company || null,
  };
  writeSession(nextSession);
  return nextSession;
}

export function dropAuthSession() {
  clearSession();
}
