import { useEffect, useState } from 'react';
import { getPublicJobs, getPublicCategories, normalizeJob } from '../lib/jobs.js';

export default function useServiceCareJobs(query = {}) {
  const [jobs, setJobs] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const queryKey = JSON.stringify(query);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        setLoading(true);
        const parsedQuery = JSON.parse(queryKey);
        const [result, categories] = await Promise.all([
          getPublicJobs(parsedQuery),
          getPublicCategories(),
        ]);
        if (!active) return;
        const items = result?.items || [];
        setJobs(items.map((job) => normalizeJob(job, categories)));
        setPagination(result?.pagination || { page: 1, limit: items.length, total: items.length, pages: 1 });
        setError(null);
      } catch (err) {
        if (active) {
          setError(err.message || 'Failed to load jobs');
        }
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [queryKey]);

  return { jobs, pagination, loading, error };
}
