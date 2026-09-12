import { useMemo, useState } from 'react';
import DashboardTopBanner from '../../components/dashboard/DashboardTopBanner.jsx';
import ApplicationListItem from '../../components/dashboard/ApplicationListItem.jsx';
import Button from '../../components/common/Button.jsx';
import Card from '../../components/common/Card.jsx';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';
import InlineNotice from '../../components/common/InlineNotice.jsx';
import { useDashboardData } from '../../context/DashboardDataContext.jsx';

const statusOptions = ['All', 'Applied', 'In Review', 'Interview', 'Offer', 'Not Selected', 'Withdrawn'];

export default function MyApplicationsPage() {
  const { applications, withdrawApplication, loading, error } = useDashboardData();
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [actionError, setActionError] = useState('');

  const filtered = useMemo(() => {
    let list = [...applications];
    if (statusFilter !== 'All') {
      list = list.filter((app) => app.status === statusFilter);
    }
    list.sort((a, b) => {
      const dateA = new Date(a.dateApplied);
      const dateB = new Date(b.dateApplied);
      return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
    });
    return list;
  }, [applications, statusFilter, sortBy]);

  const handleWithdraw = async (id) => {
    setActionError('');
    try {
      await withdrawApplication(id);
    } catch (err) {
      setActionError(err.message);
    }
  };

  if (loading) {
    return <LoadingSpinner className="min-h-[40vh]" label="Loading applications..." />;
  }

  return (
    <>
      <DashboardTopBanner
        eyebrow="IT Jobs Jobline Dashboard"
        title="My Applications"
        subtitle="Track the status of every job you've applied to."
      />
      <InlineNotice tone="error" className="mb-6">
        {error || actionError}
      </InlineNotice>

      {applications.length > 0 ? (
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <label className="flex items-center gap-2 text-sm text-brand-muted">
            Filter by status
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="rounded-lg border border-white/10 bg-brand-card px-3 py-2 text-sm text-brand-white focus-visible:ring-2 focus-visible:ring-brand-accent"
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2 text-sm text-brand-muted">
            Sort by
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="rounded-lg border border-white/10 bg-brand-card px-3 py-2 text-sm text-brand-white focus-visible:ring-2 focus-visible:ring-brand-accent"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
          </label>
        </div>
      ) : null}

      {filtered.length ? (
        <div className="space-y-4">
          {filtered.map((application) => (
            <ApplicationListItem
              key={application.id}
              application={application}
              onWithdraw={handleWithdraw}
            />
          ))}
        </div>
      ) : (
        <Card hover={false} className="p-8 text-center">
          <p className="text-brand-muted">
            {applications.length
              ? 'No applications match this filter.'
              : "You haven't applied to any jobs yet. Start browsing to find your next opportunity."}
          </p>
          <Button to="/dashboard/find-jobs" variant="accent" className="mt-4">
            Browse Jobs
          </Button>
        </Card>
      )}
    </>
  );
}
