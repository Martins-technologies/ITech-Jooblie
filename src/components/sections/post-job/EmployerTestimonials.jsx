import { ArrowRight, Headset } from 'lucide-react';
import { employerTestimonials } from '../../../data/employerTestimonials.js';
import Button from '../../common/Button.jsx';
import Card from '../../common/Card.jsx';
import SectionHeading from '../../common/SectionHeading.jsx';
import TestimonialCard from '../../common/TestimonialCard.jsx';

export default function EmployerTestimonials() {
  return (
    <section className="section-alt py-12 md:py-16">
      <div className="container-page">
        <SectionHeading title="Trusted by Employers Across Canada" />

        <div className="grid gap-5 md:grid-cols-2">
          {employerTestimonials.map((item) => (
            <TestimonialCard
              key={item.id}
              name={item.name}
              role={item.role}
              quote={item.quote}
              initials={item.initials}
            />
          ))}
        </div>

        <Card
          hover={false}
          className="mt-10 flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between md:px-8"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-brand-accent/40 bg-brand-accent/15">
              <Headset className="h-7 w-7 text-brand-accent" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-brand-white md:text-xl">
                Need help choosing the right plan?
              </h3>
              <p className="mt-1 text-sm text-brand-muted">
                Contact our team and we&apos;ll help you find the best solution for your hiring
                goals.
              </p>
            </div>
          </div>
          <Button to="/contact" variant="outline" icon={ArrowRight} className="shrink-0">
            Contact Sales
          </Button>
        </Card>
      </div>
    </section>
  );
}
