/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../api.js';
import { readSession, writeSession, clearSession } from './session.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => readSession());
  const [loading, setLoading] = useState(true);

  const signOut = useCallback(() => {
    setSession(null);
    clearSession();
  }, []);

  const refresh = useCallback(async () => {
    if (!session?.refreshToken) return;
    try {
      const res = await api('/v1/auth/refresh', {
        method: 'POST',
        body: { refresh_token: session.refreshToken },
      });
      const nextSession = {
        ...session,
        accessToken: res.session.access_token,
        refreshToken: res.session.refresh_token,
        expiresAt: res.session.expires_at,
        user: res.user || session.user,
      };
      setSession(nextSession);
      writeSession(nextSession);
      return nextSession;
    } catch (err) {
      console.error('Session refresh failed, logging out', err);
      signOut();
      throw err;
    }
  }, [session, signOut]);

  const signIn = useCallback(async (email, password) => {
    const res = await api('/v1/auth/login', {
      method: 'POST',
      body: { email, password },
    });
    const nextSession = {
      accessToken: res.session.access_token,
      refreshToken: res.session.refresh_token,
      expiresAt: res.session.expires_at,
      user: res.user,
      profile: res.user,
    };
    setSession(nextSession);
    writeSession(nextSession);
    return res;
  }, []);

  const signUp = useCallback(async (email, password, fullName, role) => {
    const res = await api('/v1/auth/register', {
      method: 'POST',
      body: { email, password, full_name: fullName, role },
    });
    if (res && res.session) {
      const nextSession = {
        accessToken: res.session.access_token,
        refreshToken: res.session.refresh_token,
        expiresAt: res.session.expires_at,
        user: res.user,
        profile: res.user,
      };
      setSession(nextSession);
      writeSession(nextSession);
    }
    return res;
  }, []);

  // Fetch /v1/auth/me on mount or token changes
  useEffect(() => {
    async function initSession() {
      if (!session?.accessToken) {
        setLoading(false);
        return;
      }
      try {
        const profile = await api('/v1/auth/me', {}, session.accessToken);
        setSession((current) => {
          if (!current) return null;
          const next = {
            ...current,
            profile,
            user: { ...current.user, ...profile },
          };
          writeSession(next);
          return next;
        });
      } catch (err) {
        console.error('Auth verification failed', err);
        // Try refreshing if token expired
        if (session.refreshToken) {
          try {
            await refresh();
          } catch {
            signOut();
          }
        } else {
          signOut();
        }
      } finally {
        setLoading(false);
      }
    }

    initSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    session,
    isAuthenticated: !!session?.accessToken,
    user: session?.user || null,
    profile: session?.profile || null,
    token: session?.accessToken || null,
    loading,
    signIn,
    signUp,
    signOut,
    refresh,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
