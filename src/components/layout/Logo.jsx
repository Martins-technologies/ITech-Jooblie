import { Link } from 'react-router-dom';

const sizeStyles = {
  sm: {
    box: 'min-w-[4.5rem] px-2.5 py-1.5',
    title: 'text-sm',
    subtitle: 'text-[8px] tracking-[0.28em]',
  },
  md: {
    box: 'min-w-[5.25rem] px-3 py-2',
    title: 'text-base',
    subtitle: 'text-[9px] tracking-[0.3em]',
  },
  lg: {
    box: 'min-w-[6rem] px-3.5 py-2.5',
    title: 'text-lg',
    subtitle: 'text-[10px] tracking-[0.32em]',
  },
};

/** Canonical stacked wordmark used in the navbar and footer. */
export default function Logo({ size = 'md', className = '' }) {
  const styles = sizeStyles[size] || sizeStyles.md;

  return (
    <Link
      to="/"
      aria-label="iTech Jobline home"
      className={`inline-flex flex-col items-center justify-center rounded-md border border-brand-accent/80 ${styles.box} ${className}`}
    >
      <span className={`font-bold leading-none text-brand-white ${styles.title}`}>iTech</span>
      <span className={`mt-1 font-semibold leading-none text-brand-accent ${styles.subtitle}`}>
        JOBLINE
      </span>
    </Link>
  );
}
