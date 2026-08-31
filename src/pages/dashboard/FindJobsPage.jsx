import { useMemo } from 'react';
import useJobFilters, { filterJobs } from '../../hooks/useJobFilters.js';
import useJobSearch from '../../hooks/useJobSearch.js';
import useServiceCareJobs from '../../hooks/useServiceCareJobs.js';
import useServiceCareCategories from '../../hooks/useServiceCareCategories.js';
import DashboardTopBanner from '../../components/dashboard/DashboardTopBanner.jsx';
import DashboardJobListings from '../../components/dashboard/DashboardJobListings.jsx';

const slugify = (text) =>
  (text || '')
    .toLowerCase()
    .replace(/ & /g, '-')
    .replace(/[^a-z0-9]+/g, '-');

export default function FindJobsPage() {
  const search = useJobSearch();
  const filters = useJobFilters();
  const { categories } = useServiceCareCategories();

  const selectedCategory = useMemo(() => {
    if (!search.applied.category) return null;
    return categories.find((c) => slugify(c.name) === search.applied.category);
  }, [categories, search.applied.category]);

  const queryParams = useMemo(() => {
    const q = (filters.applied.keyword || search.applied.keyword || '').trim();
    const type = filters.applied.jobType || '';
    const model = filters.applied.workModel || '';

    return {
      q: q || undefined,
      category_id: selectedCategory ? selectedCategory.id : undefined,
      employment_type: type ? type.toLowerCase() : undefined,
      is_remote: model === 'Remote' ? true : undefined,
      limit: 100,
    };
  }, [
    filters.applied.keyword,
    search.applied.keyword,
    selectedCategory,
    filters.applied.jobType,
    filters.applied.workModel,
  ]);

  const { jobs: apiJobs, loading, error } = useServiceCareJobs(queryParams);

  const filteredJobs = useMemo(() => {
    if (loading || error) return [];
    return filterJobs(apiJobs, {
      ...filters.applied,
      keyword: '',
      category: '',
      location: filters.applied.location || search.applied.location,
    });
  }, [apiJobs, filters.applied, search.applied.location, loading, error]);

  return (
    <>
      <DashboardTopBanner
        eyebrow="Newcomer Jobline Dashboard"
        title="Find Jobs"
        subtitle="Search and apply to IT roles across Canada."
      />
      <DashboardJobListings
        jobs={filteredJobs}
        filters={filters}
        search={search}
        loading={loading}
        error={error}
      />
    </>
  );
}
