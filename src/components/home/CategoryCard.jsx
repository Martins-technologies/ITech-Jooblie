import { Link } from 'react-router-dom';
import Card from '../common/Card.jsx';

/** Reused for homepage categories and Employers hiring-category cards. */
export default function CategoryCard({ title, description, count, icon: Icon, to }) {
  return (
    <Card as={Link} to={to} className="group relative flex h-full flex-row items-start gap-3 p-5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-accent/10">
        <Icon className="h-5 w-5 text-brand-accent" aria-hidden="true" />
      </div>
      <div className="min-w-0 flex-1 pr-4">
        <h3 className="text-sm font-semibold leading-snug text-brand-white">{title}</h3>
        {count ? (
          <p className="mt-0.5 text-sm font-medium text-brand-accent">{count}</p>
        ) : (
          <p className="mt-0.5 text-xs leading-snug text-brand-muted">{description}</p>
        )}
      </div>
      <span
        className="absolute bottom-4 right-4 text-brand-accent transition-transform duration-200 group-hover:translate-x-1"
        aria-hidden="true"
      >
        ›
      </span>
    </Card>
  );
}
