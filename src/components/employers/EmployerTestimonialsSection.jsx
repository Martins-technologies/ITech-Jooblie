import { useEffect, useState } from 'react';
import { Quote, ChevronLeft, ChevronRight, Briefcase } from 'lucide-react';
import { employerTestimonials } from '../../data/employersPage.js';
import SectionHeading from '../common/SectionHeading.jsx';
import Card from '../common/Card.jsx';
import Button from '../common/Button.jsx';

export default function EmployerTestimonialsSection() {
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
    <section className="bg-brand-bg pb-8">
      <div className="container-page">
        <SectionHeading title="Trusted by Employers Across Canada" />

        <div className="relative">
          <Card hover={false} className="p-6 md:p-10">
            <div key={activeTestimonial.id} aria-live="polite">
              <Quote className="mb-4 h-8 w-8 text-brand-accent" />
              <p className="text-brand-white">&ldquo;{activeTestimonial.quote}&rdquo;</p>
              <p className="mt-4 font-semibold text-brand-white">{activeTestimonial.name}</p>
              <p className="text-sm text-brand-muted">{activeTestimonial.role}</p>
            </div>
          </Card>
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

        <div className="mt-8 text-center">
          <Button to="/post-job" icon={Briefcase}>
            Start Hiring Today
          </Button>
          <p className="mt-3 text-sm text-brand-muted">
            Join thousands of Canadian employers hiring top IT talent.
          </p>
        </div>
      </div>
    </section>
  );
}
