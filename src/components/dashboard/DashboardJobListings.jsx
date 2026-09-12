import { useEffect, useMemo, useState } from 'react';
import { Filter, X } from 'lucide-react';
import { sortJobs } from '../../hooks/useJobFilters.js';
import { useDashboardData } from '../../context/DashboardDataContext.jsx';
import useServiceCareCategories from '../../hooks/useServiceCareCategories.js';
import JobFilterSidebar from '../sections/jobs/JobFilterSidebar.jsx';
import JobResultsHeader from '../sections/jobs/JobResultsHeader.jsx';
import JobCard from '../sections/jobs/JobCard.jsx';
import Pagination from '../sections/jobs/Pagination.jsx';
import JobSearchBar from '../sections/jobs/JobSearchBar.jsx';
import LoadingSpinner from '../common/LoadingSpinner.jsx';
import ValidationAlert from '../common/ValidationAlert.jsx';
import { validateJobApplicationReadiness } from '../../lib/formValidation.js';

export default function DashboardJobListings({ jobs, filters, search, loading, error }) {
  const { isJobApplied, isJobSaved, applyToJob, toggleSaveJob, error: actionError, notice, profile, resumes } =
    useDashboardData();
  const { categories } = useServiceCareCategories();
  const searchCategoryOptions = useMemo(
    () => [
      { value: '', label: 'Any category' },
      ...categories.map((item) => ({ value: item.slug, label: item.name })),
    ],
    [categories],
  );
  const [sortBy, setSortBy] = useState('recent');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const applyReadiness = useMemo(
    () => validateJobApplicationReadiness({ profile, resumes }),
    [profile, resumes],
  );

  const sorted = useMemo(() => sortJobs(jobs, sortBy), [jobs, sortBy]);
  const displayTotal = sorted.length;
  const totalPages = Math.max(1, Math.ceil(displayTotal / perPage));
  const currentPage = Math.min(page, totalPages);

  const pageJobs = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return sorted.slice(start, start + perPage);
  }, [sorted, currentPage, perPage]);

  useEffect(() => {
    setPage(1);
  }, [jobs, sortBy, perPage]);

  const from = displayTotal === 0 ? 0 : (currentPage - 1) * perPage + 1;
  const to = Math.min(currentPage * perPage, displayTotal);

  return (
    <section>
      <div className="mb-6">
        <JobSearchBar
          draft={search.draft}
          onChange={search.update}
          onSubmit={search.submitSearch}
          categoryOptions={searchCategoryOptions}
        />
      </div>
      {applyReadiness.ok ? null : (
        <ValidationAlert
          className="mb-4"
          title="Resume required to apply"
          message={applyReadiness.message}
          hints={applyReadiness.hints}
          actionHref={applyReadiness.profileHref}
          actionLabel="Upload resume on My Profile"
        />
      )}
      {actionError ? (
        <ValidationAlert
          className="mb-4"
          message={actionError}
          actionHref={/resume/i.test(actionError) ? '/dashboard/profile' : undefined}
          actionLabel={/resume/i.test(actionError) ? 'Go to My Profile' : undefined}
        />
      ) : null}
      {notice ? <p className="mb-4 rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm text-emerald-400">{notice}</p> : null}

      <div className="mb-4 lg:hidden">
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg border border-brand-border/50 px-4 py-2 text-sm font-semibold text-brand-white focus-visible:ring-2 focus-visible:ring-brand-accent"
        >
          <Filter className="h-4 w-4 text-brand-accent" />
          Filters
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <aside className="hidden lg:col-span-3 lg:block">
          <JobFilterSidebar filters={filters} />
        </aside>

        <div className="lg:col-span-9">
          <JobResultsHeader
            from={from}
            to={to}
            total={displayTotal}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          {loading ? (
            <div className="rounded-xl border border-brand-border/40 bg-brand-card p-8">
              <LoadingSpinner label="Loading jobs..." />
            </div>
          ) : error ? (
            <p className="rounded-xl border border-red-400/40 bg-brand-card p-8 text-center text-red-400">
              {error}
            </p>
          ) : pageJobs.length ? (
            <div className="space-y-4">
              {pageJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  isApplied={isJobApplied(job.id)}
                  isSaved={isJobSaved(job.id)}
                  onApply={() => applyToJob(job)}
                  onToggleSave={() => toggleSaveJob(job)}
                />
              ))}
            </div>
          ) : (
            <p className="rounded-xl border border-brand-border/40 bg-brand-card p-8 text-center text-brand-muted">
              No jobs match these filters. Try clearing filters or searching a different keyword.
            </p>
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setPage}
            perPage={perPage}
            onPerPageChange={setPerPage}
          />
        </div>
      </div>

      {drawerOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close filters"
            className="absolute inset-0 bg-black/70"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-[min(100%,22rem)] overflow-y-auto bg-brand-bg p-4 shadow-card">
            <div className="mb-3 flex justify-end">
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="rounded-full p-2 text-brand-white focus-visible:ring-2 focus-visible:ring-brand-accent"
                aria-label="Close filter drawer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <JobFilterSidebar
              filters={{
                ...filters,
                applyFilters: (event) => {
                  filters.applyFilters(event);
                  setDrawerOpen(false);
                },
              }}
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
