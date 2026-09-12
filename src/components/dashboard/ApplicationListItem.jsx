import { useState } from 'react';
import { Calendar, MapPin } from 'lucide-react';
import Card from '../common/Card.jsx';
import Button from '../common/Button.jsx';
import ApplicationStatusBadge from './ApplicationStatusBadge.jsx';

export default function ApplicationListItem({ application, onWithdraw }) {
  const [confirming, setConfirming] = useState(false);

  const handleWithdraw = () => {
    onWithdraw(application.id);
    setConfirming(false);
  };

  return (
    <Card hover={false} className="p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-lg font-bold text-brand-white">{application.title}</h3>
            <ApplicationStatusBadge status={application.status} />
          </div>
          <p className="mt-1 text-sm text-brand-muted">{application.company}</p>
          <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-brand-muted">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-brand-accent" />
              {application.location}
            </span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-brand-accent" />
              Applied {new Date(application.dateApplied).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="shrink-0">
          {confirming ? (
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" className="px-3 py-2 text-xs" onClick={() => setConfirming(false)}>
                Cancel
              </Button>
              <Button variant="accent" className="px-3 py-2 text-xs" onClick={handleWithdraw}>
                Confirm Withdraw
              </Button>
            </div>
          ) : (
            <Button variant="outline" className="px-3 py-2 text-xs" onClick={() => setConfirming(true)}>
              Withdraw Application
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
