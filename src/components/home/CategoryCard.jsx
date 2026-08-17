import { Link } from 'react-router-dom';
import Card from '../common/Card.jsx';

/** Reused for homepage categories and Employers hiring-category cards. */
export default function CategoryCard({ title, description, count, icon: Icon, to }) {
  return (
    <Card as={Link} to={to} className="group relative flex h-full items-start gap-4 p-6">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-accent/10">
        <Icon className="h-6 w-6 text-brand-accent" aria-hidden="true" />
      </div>
      <div className="min-w-0 flex-1 pr-5">
        <h3 className="text-base font-semibold text-brand-white">{title}</h3>
        {count ? (
          <p className="mt-0.5 text-sm font-medium text-brand-accent">{count}</p>
        ) : (
          <p className="mt-0.5 text-sm leading-relaxed text-brand-muted">{description}</p>
        )}
      </div>
      <span
        className="absolute bottom-5 right-5 text-brand-accent transition-transform duration-200 group-hover:translate-x-1"
        aria-hidden="true"
      >
        ›
      </span>
    </Card>
  );
}
