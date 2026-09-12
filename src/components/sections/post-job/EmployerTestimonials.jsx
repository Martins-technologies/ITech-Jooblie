import { useEffect, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Headset } from 'lucide-react';
import { employerTestimonials } from '../../../data/employerTestimonials.js';
import Button from '../../common/Button.jsx';
import Card from '../../common/Card.jsx';
import SectionHeading from '../../common/SectionHeading.jsx';
import TestimonialCard from '../../common/TestimonialCard.jsx';

export default function EmployerTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeTestimonial = employerTestimonials[activeIndex];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % employerTestimonials.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  const showPrevious = () => {
    setActiveIndex((index) => (index - 1 + employerTestimonials.length) % employerTestimonials.length);
  };

  const showNext = () => {
    setActiveIndex((index) => (index + 1) % employerTestimonials.length);
  };

  return (
    <section className="section-alt py-12 md:py-16">
      <div className="container-page">
        <SectionHeading title="Trusted by Employers Across Canada" />

        <div className="mx-auto max-w-2xl">
          <div key={activeTestimonial.id} aria-live="polite">
            <TestimonialCard
              name={activeTestimonial.name}
              role={activeTestimonial.role}
              quote={activeTestimonial.quote}
              initials={activeTestimonial.initials}
            />
          </div>
          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={showPrevious}
              aria-label="Previous testimonial"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-brand-border/50 text-brand-accent transition-colors hover:border-brand-accent focus-visible:ring-2 focus-visible:ring-brand-accent"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {employerTestimonials.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Show testimonial from ${item.name}`}
                aria-current={index === activeIndex ? 'true' : undefined}
                className={`h-2 w-2 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-brand-accent ${
                  index === activeIndex ? 'bg-brand-accent' : 'bg-brand-border'
                }`}
              />
            ))}
            <button
              type="button"
              onClick={showNext}
              aria-label="Next testimonial"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-brand-border/50 text-brand-accent transition-colors hover:border-brand-accent focus-visible:ring-2 focus-visible:ring-brand-accent"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
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
