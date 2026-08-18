export default function SectionEyebrow({ label, className = '' }) {
  return (
    <p
      className={`inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-brand-accent ${className}`}
    >
      {label}
      <span className="h-px w-10 bg-brand-accent" aria-hidden="true" />
    </p>
  );
}
