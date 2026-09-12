import { useMemo } from 'react';
import useJobFilters, { filterJobs } from '../../hooks/useJobFilters.js';
import useJobSearch from '../../hooks/useJobSearch.js';
import useServiceCareJobs from '../../hooks/useServiceCareJobs.js';
import useServiceCareCategories from '../../hooks/useServiceCareCategories.js';
import DashboardTopBanner from '../../components/dashboard/DashboardTopBanner.jsx';
import DashboardJobListings from '../../components/dashboard/DashboardJobListings.jsx';
import { salaryQueryFromRange, toApiEmploymentType } from '../../lib/mappers.js';

export default function FindJobsPage() {
  const search = useJobSearch();
  const filters = useJobFilters();
  const { categories } = useServiceCareCategories();

  const selectedCategory = useMemo(() => {
    const slug = search.applied.category || filters.applied.category;
    if (!slug) return null;
    return categories.find((c) => c.slug === slug);
  }, [categories, search.applied.category, filters.applied.category]);

  const queryParams = useMemo(() => {
    const q = (filters.applied.keyword || search.applied.keyword || '').trim();
    const type = filters.applied.jobType || '';
    const model = filters.applied.workModel || '';
    const location = (filters.applied.location || search.applied.location || '').trim();

    return {
      q: q || undefined,
      category: selectedCategory?.slug || search.applied.category || undefined,
      type: type ? toApiEmploymentType(type) : undefined,
      workplace:
        model === 'Remote'
          ? 'remote'
          : model === 'On-site'
            ? 'onsite'
            : model === 'Hybrid'
              ? 'hybrid'
              : undefined,
      location: location || undefined,
      salary: salaryQueryFromRange(filters.applied.salaryRange),
      limit: 60,
    };
  }, [
    filters.applied.keyword,
    search.applied.keyword,
    selectedCategory,
    search.applied.category,
    filters.applied.jobType,
    filters.applied.workModel,
    filters.applied.location,
    search.applied.location,
    filters.applied.salaryRange,
  ]);

  const { jobs: apiJobs, loading, error } = useServiceCareJobs(queryParams);

  const filteredJobs = useMemo(() => {
    if (loading || error) return [];
    return filterJobs(apiJobs, {
      jobTypes: filters.applied.jobTypes,
      workModels: filters.applied.workModels,
      experience: filters.applied.experience,
      jobType: filters.applied.jobTypes.length ? '' : filters.applied.jobType,
      workModel: filters.applied.workModels.length ? '' : filters.applied.workModel,
      keyword: '',
      category: '',
      location: '',
      salaryRange: '',
    });
  }, [apiJobs, filters.applied, loading, error]);

  return (
    <>
      <DashboardTopBanner
        eyebrow="IT Jobs Jobline Dashboard"
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
