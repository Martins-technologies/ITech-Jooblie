import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../common/Card.jsx';

/** Reused for homepage categories and Employers hiring-category cards. */
export default function CategoryCard({ title, description, count, icon: Icon, to }) {
  return (
    <Card as={Link} to={to} className="group relative flex h-full flex-row items-start gap-3 p-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-accent/10">
        <Icon className="h-4 w-4 text-brand-accent" aria-hidden="true" />
      </div>
      <div className="min-w-0 flex-1 pr-5">
        <h3 className="text-[15px] font-semibold leading-snug text-brand-white">{title}</h3>
        {count ? (
          <p className="mt-0.5 text-[13px] font-medium text-brand-accent">{count}</p>
        ) : (
          <p className="mt-0.5 text-[13px] leading-snug text-brand-muted">{description}</p>
        )}
      </div>
      <ArrowRight
        className="absolute bottom-3 right-3 h-3.5 w-3.5 text-brand-accent/70 transition-transform duration-200 group-hover:translate-x-1"
        aria-hidden="true"
      />
    </Card>
  );
}
