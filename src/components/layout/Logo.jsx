import { Link } from 'react-router-dom';
import MapleLeafIcon from '../common/MapleLeafIcon.jsx';

/** Two-line brand lockup used in the navbar and footer. */
export default function Logo({ className = '' }) {
  return (
    <Link
      to="/"
      aria-label="iTech Jobline home"
      className={`inline-flex items-center gap-2.5 ${className}`}
    >
      <MapleLeafIcon
        variant="outline"
        className="h-9 w-9 shrink-0 text-brand-accent"
      />
      <span className="flex flex-col leading-tight">
        <span className="text-base font-extrabold tracking-wide">
          <span className="text-brand-white">iTech</span>
          <span className="text-brand-accent"> Jobline</span>
        </span>
        <span className="text-[11px] font-medium text-brand-muted">
          Canada&apos;s Tech Job Board
        </span>
      </span>
    </Link>
  );
}
