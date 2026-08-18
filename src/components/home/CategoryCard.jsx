import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../common/Card.jsx';

/** Reused for homepage categories and Employers hiring-category cards. */
export default function CategoryCard({ title, description, count, icon: Icon, to }) {
  return (
    <Card as={Link} to={to} className="group relative flex h-full flex-col p-4">
      <div className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brand-accent/40 bg-brand-accent/10">
          <Icon className="h-4 w-4 text-brand-accent" aria-hidden="true" />
        </div>
        <h3 className="min-w-0 text-[15px] font-semibold leading-snug text-brand-white">
          {title}
        </h3>
      </div>
      {count ? (
        <p className="mt-2 text-[13px] font-medium text-brand-accent">{count}</p>
      ) : (
        <p className="mt-2 pb-4 text-[13px] leading-snug text-brand-muted">{description}</p>
      )}
      <ArrowRight
        className="absolute bottom-3 right-3 h-3.5 w-3.5 text-brand-accent/70 transition-transform duration-200 group-hover:translate-x-1"
        aria-hidden="true"
      />
    </Card>
  );
}
