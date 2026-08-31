const statusStyles = {
  Active: 'border-status-success/40 bg-status-success/15 text-status-success',
  Draft: 'border-white/20 bg-white/5 text-brand-muted',
  Closed: 'border-brand-accent/40 bg-transparent text-brand-accent',
};

export default function JobPostingStatusBadge({ status }) {
  const style = statusStyles[status] || statusStyles.Draft;

  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${style}`}>
      {status}
    </span>
  );
}
