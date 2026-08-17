import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../../common/Card.jsx';

export default function StatCard({
  value,
  label,
  description,
  icon: Icon,
  to,
  showChevron = true,
}) {
  const content = (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-accent/40 bg-brand-accent/10 text-brand-accent">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        {showChevron ? (
          <ChevronRight className="h-4 w-4 text-brand-accent" aria-hidden="true" />
        ) : null}
      </div>
      {value ? (
        <p className="mt-4 text-2xl font-bold text-brand-accent md:text-3xl">{value}</p>
      ) : null}
      <h3 className={`font-semibold text-brand-white ${value ? 'mt-1' : 'mt-4'}`}>{label}</h3>
      <p className="mt-1 text-sm text-brand-muted">{description}</p>
    </>
  );

  if (to) {
    return (
      <Card as={Link} to={to} className="block p-5 focus-visible:ring-2 focus-visible:ring-brand-accent">
        {content}
      </Card>
    );
  }

  return <Card className="p-5">{content}</Card>;
}
