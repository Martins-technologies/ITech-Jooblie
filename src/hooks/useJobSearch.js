import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function readParams(searchParams) {
  return {
    keyword: searchParams.get('keyword') || searchParams.get('q') || '',
    category: searchParams.get('category') || '',
    location: searchParams.get('location') || '',
  };
}

/**
 * Hero search state synced with `/jobs` query params.
 * Replace `applySearch` later with an API fetch; the URL contract can stay the same.
 */
export default function useJobSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const applied = useMemo(() => readParams(searchParams), [searchParams]);
  const [draft, setDraft] = useState(applied);

  useEffect(() => {
    setDraft(applied);
  }, [applied]);

  const update = (field) => (event) => {
    setDraft((current) => ({ ...current, [field]: event.target.value }));
  };

  const setField = (field, value) => {
    setDraft((current) => ({ ...current, [field]: value }));
  };

  const applySearch = (next = draft, extra = {}) => {
    const payload = { ...next, ...extra };
    const params = new URLSearchParams();
    if (payload.keyword) params.set('keyword', payload.keyword);
    if (payload.category) params.set('category', payload.category);
    if (payload.location) params.set('location', payload.location);
    setSearchParams(params);
    document.getElementById('job-listings')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const submitSearch = (event) => {
    event?.preventDefault();
    applySearch(draft);
  };

  const searchFromKeyword = (keyword) => {
    const next = { ...draft, keyword };
    setDraft(next);
    applySearch(next);
  };

  const searchFromCategory = (category) => {
    const next = { ...draft, category };
    setDraft(next);
    applySearch(next);
  };

  return {
    draft,
    applied,
    update,
    setField,
    submitSearch,
    applySearch,
    searchFromKeyword,
    searchFromCategory,
  };
}
