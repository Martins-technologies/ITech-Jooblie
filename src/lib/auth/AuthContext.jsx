/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { api, persistAuthSession } from '../api.js';
import { apiRoleFromUi, uiRoleFromProfile } from '../mappers.js';
import { refreshSupabaseSession } from '../storage.js';
import { clearSession, readSession, writeSession } from './session.js';

const AuthContext = createContext(null);

function shapeUser(user, profile) {
  const role = uiRoleFromProfile(profile?.role);
  return {
    id: user?.id || profile?.id,
    email: user?.email || profile?.email,
    full_name: profile?.full_name || user?.email || '',
    username: user?.email || profile?.email || '',
    role,
    apiRole: profile?.role || null,
    status: profile?.status || null,
  };
}

function buildSession(authPayload, profile) {
  const user = shapeUser(authPayload?.user, profile);
  return {
    accessToken: authPayload.session.access_token,
    refreshToken: authPayload.session.refresh_token,
    expiresAt: authPayload.session.expires_at,
    tokenType: authPayload.session.token_type,
    user,
    profile: profile || null,
    company: authPayload.company || null,
  };
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => readSession());
  const [loading, setLoading] = useState(true);

  const signOut = useCallback(() => {
    setSession(null);
    clearSession();
  }, []);

  const applySession = useCallback((next) => {
    setSession(next);
    writeSession(next);
    return next;
  }, []);

  const refresh = useCallback(async () => {
    const current = readSession();
    if (!current?.refreshToken) {
      signOut();
      throw new Error('Your session is invalid or expired.');
    }
    const tokens = await refreshSupabaseSession(current.refreshToken);
    const accessToken = tokens.access_token;
    const me = await api('auth/me', {}, accessToken);
    const next = {
      accessToken,
      refreshToken: tokens.refresh_token || current.refreshToken,
      expiresAt: tokens.expires_at,
      tokenType: tokens.token_type || 'bearer',
      user: shapeUser(me.user, me.profile),
      profile: me.profile,
      company: current.company || null,
    };
    return applySession(next);
  }, [applySession, signOut]);

  const signIn = useCallback(async (email, password) => {
    const res = await api('auth/sign-in', {
      method: 'POST',
      body: { email, password },
    });
    const me = await api('auth/me', {}, res.session.access_token);
    const next = buildSession(res, me.profile);
    persistAuthSession(res, { profile: me.profile });
    return applySession(next);
  }, [applySession]);

  const signUp = useCallback(async (payload) => {
    const body = {
      email: payload.email,
      password: payload.password,
      name: payload.name,
      role: apiRoleFromUi(payload.role),
    };
    if (body.role === 'recruiter') {
      body.company_name = payload.company_name;
      body.company_website = payload.company_website;
      body.company_registration_number = payload.company_registration_number;
    }
    const res = await api('auth/sign-up', { method: 'POST', body });
    if (res.confirmationRequired || !res.session) {
      return { ...res, session: null };
    }
    const me = await api('auth/me', {}, res.session.access_token).catch(() => ({
      profile: {
        role: body.role,
        full_name: payload.name,
        email: payload.email,
      },
      user: res.user,
    }));
    const next = buildSession(res, me.profile);
    persistAuthSession(res, { profile: me.profile });
    return { ...res, session: applySession(next) };
  }, [applySession]);

  useEffect(() => {
    let active = true;
    async function initSession() {
      const current = readSession();
      if (!current?.accessToken) {
        if (active) setLoading(false);
        return;
      }
      try {
        const me = await api('auth/me', {}, current.accessToken);
        if (!active) return;
        applySession({
          ...current,
          profile: me.profile,
          user: shapeUser(me.user, me.profile),
        });
      } catch (err) {
        if (current.refreshToken) {
          try {
            await refresh();
          } catch {
            signOut();
          }
        } else {
          signOut();
        }
      } finally {
        if (active) setLoading(false);
      }
    }
    initSession();
    return () => {
      active = false;
    };
  }, [applySession, refresh, signOut]);

  const value = {
    session,
    isAuthenticated: Boolean(session?.accessToken),
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
