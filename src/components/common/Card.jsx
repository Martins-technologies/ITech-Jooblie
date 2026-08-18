/**
 * Dark navy card with subtle border and optional hover lift.
 * Set `as` to a component (e.g. Link) when the whole card should be clickable.
 */
export default function Card({
  children,
  className = '',
  hover = true,
  as: Component = 'div',
  ...props
}) {
  const hoverClasses = hover
    ? 'transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-accent hover:shadow-card'
    : '';

  return (
    <Component
      className={`rounded-xl border border-brand-border/40 bg-brand-card ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
