const fieldClass =
  'w-full rounded-lg border bg-brand-bg px-4 py-2.5 text-sm text-brand-white outline-none placeholder:text-brand-muted focus-visible:ring-2 focus-visible:ring-brand-accent';

export default function Input({ label, error, id, className = '', ...props }) {
  return (
    <label className="block" htmlFor={id}>
      <span className="mb-2 block text-sm font-medium text-brand-white">{label}</span>
      <input
        id={id}
        className={`${fieldClass} ${error ? 'border-red-400' : 'border-brand-border/40'} ${className}`}
        {...props}
      />
      {error ? <span className="mt-1 block text-xs text-red-400">{error}</span> : null}
    </label>
  );
}
