/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from './api.js';
import { useAuth } from './auth/AuthContext.jsx';

const SavedJobsContext = createContext(null);

export function SavedJobsProvider({ children }) {
  const { token, isAuthenticated } = useAuth();
  const [savedIds, setSavedIds] = useState(new Set());
  const [loading, setLoading] = useState(false);

  // Load saved jobs on mount / authentication status change
  useEffect(() => {
    async function loadSavedJobs() {
      if (!isAuthenticated || !token) {
        setSavedIds(new Set());
        return;
      }
      setLoading(true);
      try {
        const data = await api('/v1/me/saved-jobs', {}, token);
        // data shape: [{ job_id }]
        const ids = new Set(data.map((item) => String(item.job_id)));
        setSavedIds(ids);
      } catch (err) {
        console.error('Failed to load saved jobs', err);
      } finally {
        setLoading(false);
      }
    }
    loadSavedJobs();
  }, [isAuthenticated, token]);

  const toggleSaved = useCallback(
    async (jobId) => {
      if (!isAuthenticated || !token) {
        throw new Error('User must be signed in to save jobs');
      }

      const idStr = String(jobId);
      const isSaved = savedIds.has(idStr);

      // Optimistic update
      setSavedIds((current) => {
        const next = new Set(current);
        if (isSaved) {
          next.delete(idStr);
        } else {
          next.add(idStr);
        }
        return next;
      });

      try {
        if (isSaved) {
          // DELETE request to unsave
          await api(`/v1/me/saved-jobs/${idStr}`, { method: 'DELETE' }, token);
        } else {
          // POST request to save
          await api(`/v1/me/saved-jobs/${idStr}`, { method: 'POST', body: {} }, token);
        }
      } catch (err) {
        console.error('Failed to toggle saved job status on server, rolling back', err);
        // Rollback on failure
        setSavedIds((current) => {
          const next = new Set(current);
          if (isSaved) {
            next.add(idStr); // Re-add if it was removed
          } else {
            next.delete(idStr); // Re-remove if it was added
          }
          return next;
        });
        throw err;
      }
    },
    [isAuthenticated, token, savedIds],
  );

  const value = {
    savedIds,
    loading,
    isSaved: (jobId) => savedIds.has(String(jobId)),
    toggleSaved,
  };

  return <SavedJobsContext.Provider value={value}>{children}</SavedJobsContext.Provider>;
}

export function useSavedJobs() {
  const context = useContext(SavedJobsContext);
  if (!context) {
    throw new Error('useSavedJobs must be used within a SavedJobsProvider');
  }
  return context;
}
