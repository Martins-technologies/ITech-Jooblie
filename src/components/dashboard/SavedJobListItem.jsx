import JobCard from '../sections/jobs/JobCard.jsx';
import Button from '../common/Button.jsx';

export default function SavedJobListItem({ job, isApplied, isSaved, onApply, onToggleSave, onRemove }) {
  return (
    <div className="space-y-3">
      <JobCard
        job={job}
        isApplied={isApplied}
        isSaved={isSaved}
        onApply={onApply}
        onToggleSave={onToggleSave}
      />
      <div className="flex justify-end">
        <Button variant="outline" className="px-3 py-2 text-xs" onClick={() => onRemove(job.id)}>
          Remove from Saved
        </Button>
      </div>
    </div>
  );
}
