import { useEffect, useState } from 'react';
import { getPublicJobs, getServiceCareCategories, normalizeJob } from '../lib/jobs.js';

export default function useServiceCareJobs(query = {}) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const queryKey = JSON.stringify(query);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        setLoading(true);
        const parsedQuery = JSON.parse(queryKey);

        const [rawJobs, categories] = await Promise.all([
          getPublicJobs(parsedQuery),
          getServiceCareCategories(),
        ]);

        if (active) {
          const normalized = (rawJobs || []).map((job) => normalizeJob(job, categories));
          setJobs(normalized);
          setError(null);
        }
      } catch (err) {
        if (active) {
          setError(err.message || 'Failed to load jobs');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [queryKey]);

  return { jobs, loading, error };
}
