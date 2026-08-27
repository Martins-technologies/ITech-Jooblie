const SESSION_KEY = 'servicecare.session';

export function readSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to read auth session from storage', err);
    return null;
  }
}

export function writeSession(session) {
  try {
    if (!session) {
      localStorage.removeItem(SESSION_KEY);
    } else {
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    }
  } catch (err) {
    console.error('Failed to write auth session to storage', err);
  }
}

export function clearSession() {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch (err) {
    console.error('Failed to clear auth session from storage', err);
  }
}
