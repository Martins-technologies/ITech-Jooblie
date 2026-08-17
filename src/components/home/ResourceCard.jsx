import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../common/Card.jsx';

export default function ResourceCard({ title, description, icon: Icon, to }) {
  return (
    <Card className="flex h-full flex-col p-6">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-accent/10">
        <Icon className="h-6 w-6 text-brand-accent" aria-hidden="true" />
      </div>
      <h3 className="mb-2 font-semibold text-brand-white">{title}</h3>
      <p className="mb-6 flex-1 text-sm leading-relaxed text-brand-muted">{description}</p>
      <Link
        to={to}
        className="inline-flex items-center gap-1 text-sm font-semibold text-brand-accent hover:text-brand-accentHover"
      >
        Read More
        <ArrowRight className="h-4 w-4" />
      </Link>
    </Card>
  );
}
