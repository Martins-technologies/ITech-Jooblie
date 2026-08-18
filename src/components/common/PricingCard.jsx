import { Check, Star } from 'lucide-react';
import Card from './Card.jsx';
import Button from './Button.jsx';

export default function PricingCard({
  name,
  description,
  price,
  features = [],
  highlighted = false,
  ctaLabel = 'Get Started',
  onCta,
}) {
  return (
    <Card
      hover={!highlighted}
      className={`relative flex h-full flex-col overflow-hidden p-6 ${
        highlighted ? 'border-brand-accent shadow-card' : ''
      }`}
    >
      {highlighted ? (
        <p className="absolute inset-x-0 top-0 bg-brand-gradient py-1.5 text-center text-xs font-bold uppercase tracking-wide text-brand-white">
          Most Popular
        </p>
      ) : null}

      <div className={`text-center ${highlighted ? 'pt-6' : ''}`}>
        <h3 className="text-2xl font-bold text-brand-white">{name}</h3>
        <p className="mt-2 text-sm text-brand-muted">{description}</p>
        <p className="mt-5">
          <span className="text-4xl font-extrabold text-brand-white">${price}</span>
          <span className="text-sm text-brand-muted">/month</span>
        </p>
      </div>

      <div className="my-6 h-px bg-brand-border/40" />

      <ul className="flex-1 space-y-3">
        {features.map((feature) => (
          <li key={feature.label} className="flex items-start gap-2.5 text-sm text-brand-white">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" aria-hidden="true" />
            <span className="flex-1">{feature.label}</span>
            {feature.starred ? (
              <Star className="h-4 w-4 shrink-0 fill-brand-accent text-brand-accent" aria-label="Featured" />
            ) : null}
          </li>
        ))}
      </ul>

      <Button
        type="button"
        variant={highlighted ? 'gradient' : 'outline'}
        className="mt-8 w-full"
        onClick={onCta}
      >
        {ctaLabel}
      </Button>
    </Card>
  );
}
