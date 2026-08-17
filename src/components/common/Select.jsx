const fieldClass =
  'w-full rounded-lg border bg-brand-bg px-4 py-2.5 text-sm text-brand-white outline-none focus-visible:ring-2 focus-visible:ring-brand-accent';

export default function Select({
  label,
  error,
  id,
  options = [],
  className = '',
  ...props
}) {
  return (
    <label className="block" htmlFor={id}>
      <span className="mb-2 block text-sm font-medium text-brand-white">{label}</span>
      <select
        id={id}
        className={`${fieldClass} ${error ? 'border-red-400' : 'border-brand-border/40'} ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value || option.label} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? <span className="mt-1 block text-xs text-red-400">{error}</span> : null}
    </label>
  );
}
