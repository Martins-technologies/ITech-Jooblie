import { ChevronRight } from 'lucide-react';
import Card from './Card.jsx';

export default function StepCard({
  icon: Icon,
  stepNumber,
  title,
  description,
  showConnector = false,
}) {
  return (
    <div className="relative flex h-full">
      <Card hover className="flex h-full w-full flex-col items-center p-6 text-center">
        <div className="relative">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-brand-accent/40 bg-brand-accent/15 text-brand-accent">
            <Icon className="h-6 w-6" aria-hidden="true" />
          </div>
          <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-brand-accent text-xs font-bold text-brand-white">
            {stepNumber}
          </span>
        </div>
        <h3 className="mt-5 font-semibold text-brand-white">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-brand-muted">{description}</p>
      </Card>
      {showConnector ? (
        <ChevronRight
          className="pointer-events-none absolute -right-4 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 text-brand-accent lg:block"
          aria-hidden="true"
        />
      ) : null}
    </div>
  );
}
