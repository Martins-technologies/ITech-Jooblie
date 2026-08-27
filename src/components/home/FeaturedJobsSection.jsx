import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import useServiceCareJobs from '../../hooks/useServiceCareJobs.js';
import SectionHeading from '../common/SectionHeading.jsx';
import JobCard from './JobCard.jsx';

export default function FeaturedJobsSection() {
  const { jobs, loading, error } = useServiceCareJobs({ limit: 8 });
  const featured = jobs.slice(0, 4);

  return (
    <div>
      <SectionHeading
        title="Featured"
        accent="Tech Opportunities"
        align="left"
        className="mb-8"
      />

      {loading && (
        <p className="py-6 text-center text-sm text-brand-muted">Loading jobs...</p>
      )}

      {error && (
        <p className="py-6 text-center text-sm text-red-400">{error}</p>
      )}

      {!loading && !error && featured.length === 0 && (
        <p className="py-6 text-center text-sm text-brand-muted">
          No active jobs are available right now.
        </p>
      )}

      {!loading && !error && featured.length > 0 && (
        <div className="space-y-3">
          {featured.map((job) => (
            <JobCard
              key={job.id}
              title={job.title}
              company={job.company}
              location={job.location}
              type={job.jobType}
              icon={job.icon}
              to={job.to}
            />
          ))}
        </div>
      )}

      <div className="mt-6 text-center">
        <Link
          to="/jobs"
          className="inline-flex items-center gap-1 text-sm font-semibold text-brand-accent hover:text-brand-accentHover"
        >
          View All Jobs
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

