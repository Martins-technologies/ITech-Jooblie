import { Link } from 'react-router-dom';
import Card from '../../common/Card.jsx';

export default function CategoryCard({ id, title, count, description, icon: Icon }) {
  return (
    <Card
      as={Link}
      to={`/jobs?category=${id}`}
      className="group relative flex h-full items-start gap-4 p-5 focus-visible:ring-2 focus-visible:ring-brand-accent"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-brand-accent/40 bg-brand-accent/10 text-brand-accent">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <div className="min-w-0 flex-1 pr-5">
        <h3 className="font-semibold text-brand-white">{title}</h3>
        <p className="mt-0.5 text-sm font-bold text-brand-accent">{count}</p>
        <p className="mt-0.5 text-sm leading-relaxed text-brand-muted">{description}</p>
      </div>
      <span
        className="absolute bottom-5 right-5 text-brand-accent transition-transform group-hover:translate-x-1"
        aria-hidden="true"
      >
        ›
      </span>
    </Card>
  );
}
