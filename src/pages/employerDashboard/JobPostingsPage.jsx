import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashboardTopBanner from '../../components/dashboard/DashboardTopBanner.jsx';
import JobPostingCard from '../../components/employerDashboard/JobPostingCard.jsx';
import JobPostingsFilterBar from '../../components/employerDashboard/JobPostingsFilterBar.jsx';
import Button from '../../components/common/Button.jsx';
import { useEmployerData } from '../../context/EmployerDataContext.jsx';

export default function JobPostingsPage() {
  const location = useLocation();
  const { jobPostings, closeJobPosting, deleteJobPosting } = useEmployerData();
  const [status, setStatus] = useState('All');
  const [search, setSearch] = useState('');
  const successMessage = location.state?.message;

  const filtered = useMemo(() => {
    return jobPostings.filter((posting) => {
      const matchesStatus = status === 'All' || posting.status === status;
      const matchesSearch =
        !search.trim() || posting.title.toLowerCase().includes(search.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [jobPostings, status, search]);

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex-1">
          <DashboardTopBanner
            eyebrow="Newcomer Jobline Dashboard"
            title="Job Postings"
            subtitle="Manage all your job postings in one place."
          />
        </div>
        <Button to="/employer-dashboard/post-a-job" variant="accent" className="shrink-0">
          Post a Job
        </Button>
      </div>

      {successMessage ? (
        <p className="mb-6 rounded-lg border border-brand-accent/40 bg-brand-accent/10 p-3 text-sm text-white">
          {successMessage}
        </p>
      ) : null}

      <div className="mb-6">
        <JobPostingsFilterBar
          status={status}
          search={search}
          onStatusChange={setStatus}
          onSearchChange={setSearch}
        />
      </div>

      {filtered.length > 0 ? (
        <div className="space-y-4">
          {filtered.map((posting) => (
            <JobPostingCard
              key={posting.id}
              posting={posting}
              onClose={closeJobPosting}
              onDelete={deleteJobPosting}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-brand-card/30 p-8 text-center">
          <h2 className="text-lg font-bold text-brand-white">
            {jobPostings.length === 0 ? 'No job postings yet' : 'No postings match your filters'}
          </h2>
          <p className="mt-2 text-sm text-brand-muted">
            {jobPostings.length === 0
              ? 'Create your first job posting to start attracting candidates.'
              : 'Try adjusting your search or status filter.'}
          </p>
          <Button to="/employer-dashboard/post-a-job" variant="accent" className="mt-6">
            Post a Job
          </Button>
        </div>
      )}
    </>
  );
}
