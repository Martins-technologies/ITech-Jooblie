const fieldClass =
  'w-full rounded-lg border bg-brand-bg px-4 py-2.5 text-sm text-brand-white outline-none placeholder:text-brand-muted focus-visible:ring-2 focus-visible:ring-brand-accent';

export default function Input({
  label,
  error,
  id,
  className = '',
  icon: Icon,
  required = false,
  ...props
}) {
  return (
    <label className="block" htmlFor={id}>
      <span className="mb-2 block text-sm font-medium text-brand-white">
        {label}
        {required ? (
          <span className="ml-0.5 text-red-400" aria-hidden="true">
            *
          </span>
        ) : null}
      </span>
      <span className="relative block">
        {Icon ? (
          <Icon
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-muted"
            aria-hidden="true"
          />
        ) : null}
        <input
          id={id}
          aria-required={required || undefined}
          aria-invalid={error ? true : undefined}
          className={`${fieldClass} ${Icon ? 'pl-10' : ''} ${
            error ? 'border-red-400' : 'border-brand-border/40'
          } ${className}`}
          {...props}
        />
      </span>
      {error ? <span className="mt-1 block text-xs text-red-400">{error}</span> : null}
    </label>
  );
}
