import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BadgeCheck, Bookmark, Briefcase, CheckCircle, MapPin } from 'lucide-react';
import Card from '../../common/Card.jsx';
import Button from '../../common/Button.jsx';
import ValidationAlert from '../../common/ValidationAlert.jsx';
import CompanyLogoBadge from './CompanyLogoBadge.jsx';

const pillClass = {
  'Full-Time': 'border-status-fulltime/60 text-status-fulltime',
  Hybrid: 'border-status-success/70 text-status-success',
  Remote: 'border-status-success/70 text-status-success',
  'On-site': 'border-brand-accent/60 text-brand-accent',
  'Part-Time': 'border-brand-accent/60 text-brand-accent',
  Contract: 'border-brand-accent/60 text-brand-accent',
  Internship: 'border-brand-accent/60 text-brand-accent',
};

export default function JobCard({
  job,
  isApplied = false,
  isSaved = false,
  onApply,
  onToggleSave,
}) {
  const navigate = useNavigate();
  const [applyFeedback, setApplyFeedback] = useState(null);

  const handleApply = async () => {
    setApplyFeedback(null);
    if (onApply) {
      const result = await onApply(job);
      if (result && result.success === false) {
        setApplyFeedback(result);
      }
      return;
    }
    navigate(`/jobs/${job.id}`);
  };

  return (
    <>
      <Card hover={false} className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center">
        <CompanyLogoBadge company={job.company} />

        <div className="min-w-0 flex-1">
          <Link
            to={`/jobs/${job.id}`}
            className="text-lg font-bold text-brand-accent hover:underline focus-visible:ring-2 focus-visible:ring-brand-accent"
          >
            {job.title}
          </Link>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-brand-white">
            {job.company}
            {job.verified ? (
              <BadgeCheck className="h-4 w-4 text-brand-accent" aria-label="Verified employer" />
            ) : null}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-brand-muted">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-brand-accent" />
              {job.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Briefcase className="h-3.5 w-3.5 text-brand-accent" />
              {job.jobType}
            </span>
          </div>
          <p className="mt-2 text-xs text-brand-muted">{job.postedLabel}</p>
        </div>

        <div className="flex flex-col gap-3 lg:items-end">
          <p className="font-bold text-status-success">{job.salaryLabel}</p>
          <div className="flex flex-wrap justify-end gap-2">
            <span
              className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                pillClass[job.jobType] || pillClass['Full-Time']
              }`}
            >
              {job.jobType}
            </span>
            {job.workModel !== 'On-site' ? (
              <span
                className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                  pillClass[job.workModel]
                }`}
              >
                {job.workModel}
              </span>
            ) : null}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {onToggleSave ? (
              <button
                type="button"
                onClick={() => onToggleSave(job)}
                className={`rounded-lg border p-2 transition-colors focus-visible:ring-2 focus-visible:ring-brand-accent ${
                  isSaved
                    ? 'border-brand-accent bg-brand-accent/10 text-brand-accent'
                    : 'border-white/10 text-brand-muted hover:text-brand-white'
                }`}
                aria-label={isSaved ? 'Remove from saved jobs' : 'Save job'}
                aria-pressed={isSaved}
              >
                <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
              </button>
            ) : null}
            <Button to={`/jobs/${job.id}`} variant="outline" className="px-4 py-2">
              View Details
            </Button>
            {isApplied ? (
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-status-success/40 bg-status-success/10 px-4 py-2 text-sm font-semibold text-status-success">
                <CheckCircle className="h-4 w-4" />
                Applied
              </span>
            ) : (
              <Button variant="accent" className="px-4 py-2" onClick={handleApply}>
                Apply Now
              </Button>
            )}
          </div>
          {applyFeedback ? (
            <ValidationAlert
              className="mt-2 w-full lg:max-w-md lg:ml-auto"
              message={applyFeedback.error}
              hints={applyFeedback.hints}
              actionHref={applyFeedback.profileHref}
              actionLabel={applyFeedback.profileHref ? 'Go to My Profile' : undefined}
            />
          ) : null}
        </div>
      </Card>

    </>
  );
}
