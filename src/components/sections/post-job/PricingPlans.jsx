import { useState } from 'react';
import { ArrowRight, Building2 } from 'lucide-react';
import { pricingPlans } from '../../../data/pricingPlans.js';
import Button from '../../common/Button.jsx';
import Card from '../../common/Card.jsx';
import PricingCard from '../../common/PricingCard.jsx';
import SectionHeading from '../../common/SectionHeading.jsx';

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function PricingPlans() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  return (
    <section id="pricing-plans" className="scroll-mt-24 bg-brand-bg py-12 md:py-16">
      <div className="container-page">
        <Card
          hover={false}
          className="mb-12 flex flex-col gap-6 p-6 shadow-card md:flex-row md:items-center md:justify-between md:px-8"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-accent/15">
              <Building2 className="h-7 w-7 text-brand-accent" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-brand-white md:text-2xl">
                Ready to Hire Top Tech Talent?
              </h2>
              <p className="mt-2 max-w-xl text-sm text-brand-muted">
                Join thousands of Canadian employers who trust iTech Jobline to find the right
                people, faster.
              </p>
            </div>
          </div>
          <Button
            type="button"
            variant="gradient"
            icon={ArrowRight}
            className="shrink-0"
            onClick={() => scrollToId('post-job-form')}
          >
            Post Your Job Today
          </Button>
        </Card>

        <SectionHeading
          title="Choose a Posting Plan"
          subtitle="Select the plan that best fits your hiring needs. All plans include easy job posting, applicant management, and access to top tech talent across Canada."
        />

        <div className="grid gap-5 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={plan.highlighted ? 'order-first lg:order-none' : ''}
            >
              <PricingCard
                name={plan.name}
                description={plan.description}
                price={plan.price}
                features={plan.features}
                highlighted={plan.highlighted}
                ctaLabel="Get Started"
                onCta={() => {
                  console.log({ planId: plan.id, planName: plan.name, price: plan.price });
                  setSelectedPlan(plan);
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {selectedPlan ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="plan-confirm-title"
            className="w-full max-w-md rounded-2xl border border-brand-border/50 bg-brand-card p-6"
          >
            <h3 id="plan-confirm-title" className="text-lg font-bold text-brand-white">
              {selectedPlan.name} plan selected
            </h3>
            <p className="mt-2 text-sm text-brand-muted">
              Checkout for the ${selectedPlan.price}/month {selectedPlan.name} plan will be
              connected in a future module. Your selection is stored locally for now.
            </p>
            <div className="mt-5 flex justify-end">
              <Button type="button" onClick={() => setSelectedPlan(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
