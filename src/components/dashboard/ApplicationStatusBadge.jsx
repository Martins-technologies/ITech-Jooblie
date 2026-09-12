const statusStyles = {
  Applied: 'border-brand-accent/40 bg-brand-accent/10 text-brand-accent',
  'In Review': 'border-accent-orange/40 bg-accent-orange/10 text-accent-orange',
  Interview: 'border-status-success/40 bg-status-success/15 text-status-success',
  Offer: 'border-status-success/50 bg-status-success/20 text-status-success',
  Withdrawn: 'border-white/20 bg-white/5 text-brand-muted',
  'Not Selected': 'border-white/20 bg-white/5 text-brand-muted',
};

export default function ApplicationStatusBadge({ status }) {
  const style = statusStyles[status] || statusStyles.Applied;

  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${style}`}>
      {status}
    </span>
  );
}
