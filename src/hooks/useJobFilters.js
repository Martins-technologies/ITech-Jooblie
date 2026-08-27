import { useState, useEffect } from 'react';

/**
 * Client-side job filtering. Swap the body of `filterJobs` for an API call later.
 */
export function filterJobs(jobs, applied = {}) {
  const keyword = (applied.keyword || '').trim().toLowerCase();
  const category = applied.category || '';
  const location = (applied.location || '').trim().toLowerCase();
  const jobTypes = applied.jobTypes || [];
  const workModels = applied.workModels || [];
  const experience = applied.experience || '';
  const salaryRange = applied.salaryRange || '';
  const jobTypeSelect = applied.jobType || '';
  const workModelSelect = applied.workModel || '';

  return jobs.filter((job) => {
    if (keyword) {
      const haystack = [
        job.title,
        job.company,
        job.location,
        job.workModel,
        job.jobType,
        ...(job.skills || []),
        ...(job.keywords || []),
      ]
        .join(' ')
        .toLowerCase();
      if (!haystack.includes(keyword)) return false;
    }

    if (category && job.category !== category) return false;
    if (location && !job.location.toLowerCase().includes(location)) return false;

    const types = [...jobTypes];
    if (jobTypeSelect) types.push(jobTypeSelect);
    if (types.length && !types.includes(job.jobType)) return false;

    const models = [...workModels];
    if (workModelSelect) models.push(workModelSelect);
    if (models.length && !models.includes(job.workModel)) return false;

    if (experience && job.experience !== experience) return false;

    if (salaryRange) {
      const [min, max] = salaryRange.split('-').map(Number);
      if (job.salaryMax < min || job.salaryMin > max) return false;
    }

    return true;
  });
}

export function sortJobs(jobs, sortBy) {
  const next = [...jobs];
  if (sortBy === 'oldest') {
    next.sort((a, b) => new Date(a.postedAt) - new Date(b.postedAt));
  } else if (sortBy === 'salary-high') {
    next.sort((a, b) => b.salaryMax - a.salaryMax);
  } else if (sortBy === 'salary-low') {
    next.sort((a, b) => a.salaryMin - b.salaryMin);
  } else if (sortBy === 'title') {
    next.sort((a, b) => a.title.localeCompare(b.title));
  } else {
    next.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));
  }
  return next;
}

const emptyDraft = {
  keyword: '',
  jobType: '',
  jobTypes: [],
  experience: '',
  workModel: '',
  workModels: [],
  salaryRange: '',
  location: '',
};

export default function useJobFilters(initial = {}) {
  const [draft, setDraft] = useState({ ...emptyDraft, ...initial });
  const [applied, setApplied] = useState({ ...emptyDraft, ...initial });

  // Debounce effect for typing inputs (keyword, location)
  useEffect(() => {
    const timer = setTimeout(() => {
      setApplied((current) => ({
        ...current,
        keyword: draft.keyword,
        location: draft.location,
      }));
    }, 400);

    return () => clearTimeout(timer);
  }, [draft.keyword, draft.location]);

  const update = (field) => (event) => {
    const val = event.target.value;
    setDraft((current) => ({ ...current, [field]: val }));

    // Apply immediately if not a debounced typing field
    if (field !== 'keyword' && field !== 'location') {
      setApplied((current) => ({ ...current, [field]: val }));
    }
  };

  const toggleList = (field, value) => {
    setDraft((current) => {
      const list = current[field] || [];
      const next = list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
      const updated = { ...current, [field]: next };
      setApplied((currentApplied) => ({ ...currentApplied, [field]: next }));
      return updated;
    });
  };

  const applyFilters = (event) => {
    event?.preventDefault();
    setApplied(draft);
  };

  const clearAll = () => {
    setDraft(emptyDraft);
    setApplied(emptyDraft);
  };

  const patchApplied = (patch) => {
    setDraft((current) => ({ ...current, ...patch }));
    setApplied((current) => ({ ...current, ...patch }));
  };

  return { draft, applied, update, toggleList, applyFilters, clearAll, patchApplied };
}

