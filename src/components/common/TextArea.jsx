const fieldClass =
  'w-full rounded-lg border bg-brand-bg px-4 py-2.5 text-sm text-brand-white outline-none placeholder:text-brand-muted focus-visible:ring-2 focus-visible:ring-brand-accent';

export default function TextArea({ label, error, id, className = '', ...props }) {
  return (
    <label className="block" htmlFor={id}>
      <span className="mb-2 block text-sm font-medium text-brand-white">{label}</span>
      <textarea
        id={id}
        className={`${fieldClass} min-h-[140px] resize-y ${error ? 'border-red-400' : 'border-brand-border/40'} ${className}`}
        {...props}
      />
      {error ? <span className="mt-1 block text-xs text-red-400">{error}</span> : null}
    </label>
  );
}
