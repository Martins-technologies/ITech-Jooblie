import { Link } from 'react-router-dom';
import { images } from '../../data/images.js';

/** Brand mark used in the navbar and footer. */
export default function Logo({ className = '' }) {
  return (
    <Link
      to="/"
      aria-label="iTech Jobline home"
      className={`inline-flex items-center ${className}`}
    >
      <img
        src={images.logo}
        alt="iTech Jobline"
        className="h-10 w-auto object-contain object-left md:h-11"
      />
    </Link>
  );
}
