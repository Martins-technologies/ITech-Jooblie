import JobCard from '../sections/jobs/JobCard.jsx';
import { useDashboardData } from '../../context/DashboardDataContext.jsx';

export default function RecommendedJobsSection({ jobs }) {
  const { isJobApplied, isJobSaved, applyToJob, toggleSaveJob } = useDashboardData();

  return (
    <section>
      <div className="mb-4">
        <h2 className="text-xl font-bold text-brand-white">Recommended Jobs</h2>
        <p className="text-sm text-brand-muted">Jobs selected for you.</p>
      </div>
      <div className="grid gap-4">
        {jobs.map((job) => (
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
    </section>
  );
}
