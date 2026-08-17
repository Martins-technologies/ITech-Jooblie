import { useEffect, useMemo, useState } from 'react';
import { Filter, X } from 'lucide-react';
import { SIMULATED_TOTAL_JOBS } from '../../../data/mockJobs.js';
import { sortJobs } from '../../../hooks/useJobFilters.js';
import JobFilterSidebar from './JobFilterSidebar.jsx';
import JobResultsHeader from './JobResultsHeader.jsx';
import JobCard from './JobCard.jsx';
import Pagination from './Pagination.jsx';

export default function JobListings({ jobs, filters, hasActiveSearch }) {
  const [sortBy, setSortBy] = useState('recent');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const sorted = useMemo(() => sortJobs(jobs, sortBy), [jobs, sortBy]);
  const filtersActive = hasActiveSearch || hasSidebarFilters(filters.applied);
  const displayTotal = filtersActive ? sorted.length : SIMULATED_TOTAL_JOBS;
  const totalPages = Math.max(1, Math.ceil(displayTotal / perPage));
  const currentPage = Math.min(page, totalPages);

  const pageJobs = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    if (filtersActive) {
      return sorted.slice(start, start + perPage);
    }
    return Array.from({ length: Math.min(perPage, sorted.length) }, (_, index) => {
      const source = sorted[index % sorted.length];
      return source;
    });
  }, [sorted, currentPage, perPage, filtersActive]);

  useEffect(() => {
    setPage(1);
  }, [jobs, sortBy, perPage]);

  const from = displayTotal === 0 ? 0 : (currentPage - 1) * perPage + 1;
  const to = Math.min(currentPage * perPage, displayTotal);

  return (
    <section id="job-listings" className="scroll-mt-24 bg-brand-bg py-8">
      <div className="container-page">
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

            {pageJobs.length ? (
              <div className="space-y-4">
                {pageJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
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

function hasSidebarFilters(applied) {
  return Boolean(
    applied.keyword ||
      applied.jobType ||
      applied.experience ||
      applied.workModel ||
      applied.salaryRange ||
      applied.location ||
      applied.jobTypes?.length ||
      applied.workModels?.length,
  );
}
