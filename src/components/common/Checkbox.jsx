export default function Checkbox({
  id,
  label,
  checked,
  onChange,
  className = '',
}) {
  return (
    <label
      htmlFor={id}
      className={`flex cursor-pointer items-center gap-2.5 text-sm text-brand-muted ${className}`}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 shrink-0 cursor-pointer rounded border-brand-border/60 bg-brand-bg text-brand-accent accent-brand-accent focus-visible:ring-2 focus-visible:ring-brand-accent"
      />
      <span>{label}</span>
    </label>
  );
}
