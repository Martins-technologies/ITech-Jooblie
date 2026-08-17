import { Link, NavLink } from 'react-router-dom';

const variants = {
  primary:
    'bg-brand-accent text-brand-white border border-transparent hover:bg-brand-accentHover',
  gradient:
    'bg-brand-gradient text-brand-white border border-transparent hover:opacity-90',
  outline:
    'bg-transparent text-brand-white border border-brand-accent hover:bg-brand-accent/10',
  ghost: 'bg-transparent text-brand-accent border border-transparent hover:text-brand-accentHover',
  accent:
    'bg-accent-orange text-brand-white border border-transparent hover:bg-accent-orangeHover',
};

/**
 * Shared button. Pass `to` for a React Router <Link>, `href` for a plain <a>.
 */
export default function Button({
  variant = 'primary',
  icon: Icon,
  to,
  href,
  nav = false,
  children,
  type = 'button',
  className = '',
  ...props
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-brand-accent ${variants[variant]} ${className}`;

  const content = (
    <>
      {Icon ? <Icon className="h-4 w-4 shrink-0" aria-hidden="true" /> : null}
      {children}
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {content}
      </a>
    );
  }

  if (to && nav) {
    return (
      <NavLink
        to={to}
        className={({ isActive }) =>
          `${classes} ${isActive ? 'ring-2 ring-brand-accent ring-offset-2 ring-offset-brand-bg' : ''}`
        }
        {...props}
      >
        {content}
      </NavLink>
    );
  }

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
