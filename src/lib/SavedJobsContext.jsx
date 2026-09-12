/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useAuth } from './auth/AuthContext.jsx';
import { getSeekerDashboard, saveJob, unsaveJob } from './jobs.js';

const SavedJobsContext = createContext(null);

export function SavedJobsProvider({ children }) {
  const { token, isAuthenticated, user } = useAuth();
  const [savedIds, setSavedIds] = useState(new Set());
  const [loading, setLoading] = useState(false);

  const loadSavedJobs = useCallback(async () => {
    if (!isAuthenticated || !token || user?.role === 'employer') {
      setSavedIds(new Set());
      return;
    }
    setLoading(true);
    try {
      const data = await getSeekerDashboard(token);
      const ids = new Set((data.savedJobIds || []).map((id) => String(id)));
      (data.savedJobs || []).forEach((item) => {
        if (item.job_id) ids.add(String(item.job_id));
      });
      setSavedIds(ids);
    } catch {
      setSavedIds(new Set());
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, token, user?.role]);

  useEffect(() => {
    loadSavedJobs();
  }, [loadSavedJobs]);

  const toggleSaved = useCallback(
    async (jobId) => {
      if (!isAuthenticated || !token) {
        throw new Error('Please sign in to save jobs.');
      }
      const idStr = String(jobId);
      const isSaved = savedIds.has(idStr);

      setSavedIds((current) => {
        const next = new Set(current);
        if (isSaved) next.delete(idStr);
        else next.add(idStr);
        return next;
      });

      try {
        if (isSaved) {
          await unsaveJob(idStr, token);
        } else {
          await saveJob(idStr, token);
        }
      } catch (err) {
        setSavedIds((current) => {
          const next = new Set(current);
          if (isSaved) next.add(idStr);
          else next.delete(idStr);
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
    reloadSavedJobs: loadSavedJobs,
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
