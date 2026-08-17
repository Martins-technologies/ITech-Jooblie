import { Link } from 'react-router-dom';

const variants = {
  primary:
    'bg-brand-accent text-brand-white border border-transparent hover:bg-brand-accentHover',
  outline:
    'bg-transparent text-brand-white border border-brand-accent hover:bg-brand-accent/10',
  ghost: 'bg-transparent text-brand-accent border border-transparent hover:text-brand-accentHover',
};

/**
 * Shared button. Pass `to` to render a React Router <Link>; otherwise a <button>.
 */
export default function Button({
  variant = 'primary',
  icon: Icon,
  to,
  children,
  type = 'button',
  className = '',
  ...props
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${variants[variant]} ${className}`;

  const content = (
    <>
      {Icon ? <Icon className="h-4 w-4 shrink-0" aria-hidden="true" /> : null}
      {children}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {content}
    </button>
  );
}
