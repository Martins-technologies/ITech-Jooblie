import { useEffect, useState } from 'react';
import { getPublicCategories } from '../lib/jobs.js';

export default function useServiceCareCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        setLoading(true);
        const data = await getPublicCategories();
        if (active) {
          setCategories(data || []);
          setError(null);
        }
      } catch (err) {
        if (active) setError(err.message || 'Failed to load categories');
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, []);

  return { categories, loading, error };
}
