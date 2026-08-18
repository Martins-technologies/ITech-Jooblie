import { Link } from 'react-router-dom';
import Card from '../common/Card.jsx';

export default function ResourceCard({ title, description, icon: Icon, to }) {
  return (
    <Card className="flex h-full flex-col p-6">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-accent/10">
          <Icon className="h-6 w-6 text-brand-accent" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-brand-white">{title}</h3>
          <p className="mt-0.5 text-sm leading-relaxed text-brand-muted">{description}</p>
        </div>
      </div>
      <Link
        to={to}
        className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-brand-accent hover:text-brand-accentHover"
      >
        Read More
        <span aria-hidden="true">›</span>
      </Link>
    </Card>
  );
}
