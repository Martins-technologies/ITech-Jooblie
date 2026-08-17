import { Check } from 'lucide-react';
import { pricingPlans } from '../../data/employersPage.js';
import SectionHeading from '../common/SectionHeading.jsx';
import Card from '../common/Card.jsx';
import Button from '../common/Button.jsx';

export default function EmployerPricingSection() {
  return (
    <section className="bg-brand-bg pb-8">
      <div className="container-page">
        <SectionHeading
          title="Simple Plans"
          accent="for Growing Teams"
          subtitle="Choose the right plan to find top IT talent and grow your team faster."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {pricingPlans.map((plan) => {
            const Icon = plan.icon;
            return (
              <Card
                key={plan.id}
                hover
                className={`relative flex h-full flex-col p-6 ${
                  plan.featured ? 'border-brand-accent shadow-card' : ''
                }`}
              >
                {plan.badge ? (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-accent px-3 py-1 text-[10px] font-bold tracking-wide text-brand-white">
                    {plan.badge}
                  </span>
                ) : null}
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-brand-accent/40 bg-brand-accent/10">
                  <Icon className="h-6 w-6 text-brand-accent" />
                </div>
                <h3 className="text-xl font-bold text-brand-white">{plan.name}</h3>
                <p className="mt-1 text-sm text-brand-muted">{plan.blurb}</p>
                <p className="mt-4 text-3xl font-extrabold text-brand-accent">
                  {plan.price}
                  {plan.period ? (
                    <span className="text-base font-medium text-brand-muted">
                      {plan.period}
                    </span>
                  ) : null}
                </p>
                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-brand-white">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  to={plan.ctaTo}
                  href={plan.ctaHref}
                  variant={plan.ctaVariant}
                  className="mt-6 w-full"
                >
                  {plan.cta}
                </Button>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
