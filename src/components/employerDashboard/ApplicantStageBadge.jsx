const stageStyles = {
  New: 'border-brand-accent/40 bg-brand-accent/10 text-brand-accent',
  Reviewed: 'border-accent-orange/40 bg-accent-orange/10 text-accent-orange',
  Shortlisted: 'border-accent-orange/50 bg-accent-orange/15 text-accent-orange',
  Interview: 'border-status-success/40 bg-status-success/15 text-status-success',
  Offer: 'border-status-success/50 bg-status-success/20 text-status-success',
  Hired: 'border-status-success/50 bg-status-success/20 text-status-success',
  Rejected: 'border-white/20 bg-white/5 text-brand-muted',
  Withdrawn: 'border-white/20 bg-white/5 text-brand-muted',
};

export default function ApplicantStageBadge({ stage }) {
  const style = stageStyles[stage] || stageStyles.New;

  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${style}`}>
      {stage}
    </span>
  );
}
