import { useEffect, useId, useState } from 'react';
import { Link } from 'react-router-dom';
import { BadgeCheck, Briefcase, MapPin } from 'lucide-react';
import Card from '../../common/Card.jsx';
import Button from '../../common/Button.jsx';
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

export default function JobCard({ job }) {
  const [applyOpen, setApplyOpen] = useState(false);

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
          <div className="flex flex-wrap gap-2">
            <Button to={`/jobs/${job.id}`} variant="outline" className="px-4 py-2">
              View Details
            </Button>
            <Button variant="accent" className="px-4 py-2" onClick={() => setApplyOpen(true)}>
              Apply Now
            </Button>
          </div>
        </div>
      </Card>

      {applyOpen ? (
        <ApplyModal job={job} onClose={() => setApplyOpen(false)} />
      ) : null}
    </>
  );
}

function ApplyModal({ job, onClose }) {
  const titleId = useId();

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      role="presentation"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-md rounded-2xl border border-brand-border/50 bg-brand-card p-6 shadow-card"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id={titleId} className="text-xl font-bold text-brand-white">
          Apply to {job.title}
        </h2>
        <p className="mt-2 text-sm text-brand-muted">
          The full application flow is coming in a future module. This placeholder keeps the
          Apply Now action wired so a real form can drop in later.
        </p>
        <p className="mt-3 text-sm text-brand-white">{job.company}</p>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button variant="accent" onClick={onClose}>
            Got it
          </Button>
        </div>
      </div>
    </div>
  );
}
