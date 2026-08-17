import { Link } from 'react-router-dom';
import { images } from '../../data/images.js';

const sizeStyles = {
  sm: 'h-9',
  md: 'h-11',
  lg: 'h-[3.25rem]',
};

/** Site wordmark from public/logo.png — used in the navbar, footer, and sign-in panel. */
export default function Logo({ size = 'md', className = '' }) {
  const height = sizeStyles[size] || sizeStyles.md;

  return (
    <Link
      to="/"
      aria-label="iTech Jobline home"
      className={`inline-flex shrink-0 items-center focus-visible:ring-2 focus-visible:ring-brand-accent ${className}`}
    >
      <img src={images.logo} alt="iTech Jobline" className={`${height} w-auto`} />
    </Link>
  );
}
