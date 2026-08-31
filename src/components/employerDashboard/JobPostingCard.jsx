import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users } from 'lucide-react';
import Card from '../common/Card.jsx';
import Button from '../common/Button.jsx';
import JobPostingStatusBadge from './JobPostingStatusBadge.jsx';

export default function JobPostingCard({
  posting,
  onClose,
  onDelete,
  showActions = true,
}) {
  const [confirmingClose, setConfirmingClose] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const handleClose = () => {
    onClose?.(posting.id);
    setConfirmingClose(false);
  };

  const handleDelete = () => {
    onDelete?.(posting.id);
    setConfirmingDelete(false);
  };

  return (
    <Card hover={false} className="p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-lg font-bold text-brand-white">{posting.title}</h3>
            <JobPostingStatusBadge status={posting.status} />
          </div>
          <p className="mt-1 text-sm text-brand-muted">{posting.company}</p>
          <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-brand-muted">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-brand-accent" />
              {posting.location}
            </span>
            <span>{posting.jobType}</span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-brand-accent" />
              Posted {new Date(posting.postedDate).toLocaleDateString()}
            </span>
            <Link
              to={`/employer-dashboard/job-postings/${posting.id}/applicants`}
              className="inline-flex items-center gap-1 font-semibold text-brand-accent hover:text-brand-accentHover"
            >
              <Users className="h-3.5 w-3.5" />
              {posting.applicantCount} applicant{posting.applicantCount !== 1 ? 's' : ''}
            </Link>
          </div>
        </div>

        {showActions ? (
          <div className="relative shrink-0">
            {confirmingClose || confirmingDelete ? (
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  className="px-3 py-2 text-xs"
                  onClick={() => {
                    setConfirmingClose(false);
                    setConfirmingDelete(false);
                  }}
                >
                  Cancel
                </Button>
                {confirmingClose ? (
                  <Button variant="accent" className="px-3 py-2 text-xs" onClick={handleClose}>
                    Confirm Close
                  </Button>
                ) : null}
                {confirmingDelete ? (
                  <Button variant="accent" className="px-3 py-2 text-xs" onClick={handleDelete}>
                    Confirm Delete
                  </Button>
                ) : null}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                <Button
                  to={`/employer-dashboard/post-a-job?edit=${posting.id}`}
                  variant="outline"
                  className="px-3 py-2 text-xs"
                >
                  Edit
                </Button>
                <Button
                  to={`/employer-dashboard/job-postings/${posting.id}/applicants`}
                  variant="outline"
                  className="px-3 py-2 text-xs"
                >
                  View Applicants
                </Button>
                {posting.status === 'Active' ? (
                  <Button
                    variant="outline"
                    className="px-3 py-2 text-xs"
                    onClick={() => setConfirmingClose(true)}
                  >
                    Close
                  </Button>
                ) : null}
                <Button
                  variant="outline"
                  className="px-3 py-2 text-xs text-red-400 border-red-400/30 hover:bg-red-400/10"
                  onClick={() => setConfirmingDelete(true)}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </Card>
  );
}
