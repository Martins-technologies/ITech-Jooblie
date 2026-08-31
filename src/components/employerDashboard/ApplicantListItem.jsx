import { useState } from 'react';
import { Calendar, FileText } from 'lucide-react';
import Card from '../common/Card.jsx';
import Button from '../common/Button.jsx';
import ApplicantStageBadge from './ApplicantStageBadge.jsx';

export default function ApplicantListItem({
  applicant,
  jobTitle,
  onAdvance,
  onReject,
  onViewProfile,
}) {
  const [confirmingReject, setConfirmingReject] = useState(false);

  const handleReject = () => {
    onReject?.(applicant.id);
    setConfirmingReject(false);
  };

  return (
    <Card hover={false} className="p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onViewProfile?.(applicant)}
              className="text-lg font-bold text-brand-white hover:text-brand-accent focus-visible:ring-2 focus-visible:ring-brand-accent"
            >
              {applicant.name}
            </button>
            <ApplicantStageBadge stage={applicant.stage} />
          </div>
          {jobTitle ? (
            <p className="mt-1 text-sm text-brand-muted">Applied for: {jobTitle}</p>
          ) : null}
          <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-brand-muted">
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-brand-accent" />
              Applied {new Date(applicant.appliedDate).toLocaleDateString()}
            </span>
            {applicant.resumeFilename ? (
              <span className="inline-flex items-center gap-1">
                <FileText className="h-3.5 w-3.5 text-brand-accent" />
                {applicant.resumeFilename}
              </span>
            ) : null}
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap gap-2">
          {confirmingReject ? (
            <>
              <Button
                variant="outline"
                className="px-3 py-2 text-xs"
                onClick={() => setConfirmingReject(false)}
              >
                Cancel
              </Button>
              <Button variant="accent" className="px-3 py-2 text-xs" onClick={handleReject}>
                Confirm Reject
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                className="px-3 py-2 text-xs"
                onClick={() => onViewProfile?.(applicant)}
              >
                View Profile
              </Button>
              {applicant.stage !== 'Rejected' && applicant.stage !== 'Offer' ? (
                <Button
                  variant="outline"
                  className="px-3 py-2 text-xs"
                  onClick={() => onAdvance?.(applicant.id)}
                >
                  Advance Stage
                </Button>
              ) : null}
              {applicant.stage !== 'Rejected' ? (
                <Button
                  variant="outline"
                  className="px-3 py-2 text-xs text-red-400 border-red-400/30 hover:bg-red-400/10"
                  onClick={() => setConfirmingReject(true)}
                >
                  Reject
                </Button>
              ) : null}
            </>
          )}
        </div>
      </div>
    </Card>
  );
}
