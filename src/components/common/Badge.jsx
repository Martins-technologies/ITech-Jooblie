/**
 * Pill badge used in the hero ("Canada's IT Job Destination") and similar callouts.
 */
export default function Badge({ icon: Icon, children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-brand-accent/50 bg-brand-card/70 px-3.5 py-1.5 text-sm text-brand-white ${className}`}
    >
      {Icon ? <Icon className="h-4 w-4 text-brand-accent" aria-hidden="true" /> : null}
      {children}
    </span>
  );
}
