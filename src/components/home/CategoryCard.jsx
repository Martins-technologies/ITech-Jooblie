import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../common/Card.jsx';

/** Reused for the hero category row and the career-paths grid. */
export default function CategoryCard({ title, description, icon: Icon, to }) {
  return (
    <Card
      as={Link}
      to={to}
      className="group relative flex h-full flex-col p-6"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-accent/10">
        <Icon className="h-6 w-6 text-brand-accent" aria-hidden="true" />
      </div>
      <h3 className="mb-2 text-base font-semibold text-brand-white">{title}</h3>
      <p className="mb-8 text-sm leading-relaxed text-brand-muted">{description}</p>
      <ArrowRight className="absolute bottom-5 right-5 h-4 w-4 text-brand-accent transition-transform duration-200 group-hover:translate-x-1" />
    </Card>
  );
}
