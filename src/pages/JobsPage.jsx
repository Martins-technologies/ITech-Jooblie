import { useMemo } from 'react';
import { mockJobs } from '../data/mockJobs.js';
import useJobFilters, { filterJobs } from '../hooks/useJobFilters.js';
import useJobSearch from '../hooks/useJobSearch.js';
import JobsHero from '../components/sections/jobs/JobsHero.jsx';
import JobListings from '../components/sections/jobs/JobListings.jsx';
import JobCategories from '../components/sections/jobs/JobCategories.jsx';
import WhyUseSection from '../components/sections/jobs/WhyUseSection.jsx';

export default function JobsPage() {
  const search = useJobSearch();
  const filters = useJobFilters();

  const filteredJobs = useMemo(
    () =>
      filterJobs(mockJobs, {
        ...filters.applied,
        keyword: filters.applied.keyword || search.applied.keyword,
        category: search.applied.category,
        location: filters.applied.location || search.applied.location,
      }),
    [filters.applied, search.applied],
  );

  const hasActiveSearch = Boolean(
    search.applied.keyword || search.applied.category || search.applied.location,
  );

  return (
    <div className="bg-brand-bg">
      <JobsHero search={search} />
      <JobListings jobs={filteredJobs} filters={filters} hasActiveSearch={hasActiveSearch} />
      <JobCategories />
      <WhyUseSection />
    </div>
  );
}
