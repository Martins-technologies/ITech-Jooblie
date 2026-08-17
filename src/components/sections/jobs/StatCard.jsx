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
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand-accent/40 bg-brand-accent/10 text-brand-accent">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <div className="min-w-0 flex-1 pr-4">
        {value ? (
          <p className="text-2xl font-bold leading-none text-brand-accent">{value}</p>
        ) : null}
        <h3 className={`font-semibold text-brand-white ${value ? 'mt-1' : ''}`}>{label}</h3>
        <p className="mt-0.5 text-sm leading-snug text-brand-muted">{description}</p>
      </div>
      {showChevron ? (
        <ChevronRight
          className="absolute right-4 top-4 h-4 w-4 text-brand-accent"
          aria-hidden="true"
        />
      ) : null}
    </>
  );

  if (to) {
    return (
      <Card
        as={Link}
        to={to}
        className="relative flex items-start gap-3 p-4 focus-visible:ring-2 focus-visible:ring-brand-accent"
      >
        {content}
      </Card>
    );
  }

  return <Card className="relative flex items-start gap-3 p-4">{content}</Card>;
}
