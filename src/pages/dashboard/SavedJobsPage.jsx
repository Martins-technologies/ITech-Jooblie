import DashboardTopBanner from '../../components/dashboard/DashboardTopBanner.jsx';
import SavedJobListItem from '../../components/dashboard/SavedJobListItem.jsx';
import Button from '../../components/common/Button.jsx';
import Card from '../../components/common/Card.jsx';
import { useDashboardData } from '../../context/DashboardDataContext.jsx';

export default function SavedJobsPage() {
  const { savedJobs, isJobApplied, isJobSaved, applyToJob, toggleSaveJob, removeSavedJob } =
    useDashboardData();

  return (
    <>
      <DashboardTopBanner
        eyebrow="Newcomer Jobline Dashboard"
        title="Saved Jobs"
        subtitle="Jobs you've bookmarked for later."
      />

      {savedJobs.length ? (
        <div className="space-y-6">
          {savedJobs.map((job) => (
            <SavedJobListItem
              key={job.id}
              job={job}
              isApplied={isJobApplied(job.id)}
              isSaved={isJobSaved(job.id)}
              onApply={() => applyToJob(job)}
              onToggleSave={() => toggleSaveJob(job)}
              onRemove={removeSavedJob}
            />
          ))}
        </div>
      ) : (
        <Card hover={false} className="p-8 text-center">
          <p className="text-brand-muted">
            You haven&apos;t saved any jobs yet. Browse listings and bookmark roles you like.
          </p>
          <Button to="/dashboard/find-jobs" variant="accent" className="mt-4">
            Find Jobs
          </Button>
        </Card>
      )}
    </>
  );
}
