import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { aboutTestimonials } from '../../../data/testimonials.js';
import { careerCategories } from '../../../data/careerCategories.js';
import { platformStats } from '../../../data/platformStats.js';
import SectionEyebrow from '../../common/SectionEyebrow.jsx';
import SectionHeading from '../../common/SectionHeading.jsx';
import IconTitleCard from '../../common/IconTitleCard.jsx';
import TestimonialCard from '../../common/TestimonialCard.jsx';
import Card from '../../common/Card.jsx';
import CanadaDotMap from '../../graphics/CanadaDotMap.jsx';

export default function HowWeSupport() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeTestimonial = aboutTestimonials[activeIndex];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % aboutTestimonials.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  const showPrevious = () => {
    setActiveIndex((index) => (index - 1 + aboutTestimonials.length) % aboutTestimonials.length);
  };

  const showNext = () => {
    setActiveIndex((index) => (index + 1) % aboutTestimonials.length);
  };

  return (
    <section className="bg-brand-bg py-10">
      <div className="container-page">
        <SectionEyebrow label="About Us" />
        <SectionHeading
          align="left"
          className="mt-4"
          title="How We Support"
          accent="Tech Careers"
          subtitle="We connect skilled tech professionals with meaningful opportunities across Canada."
        />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {careerCategories.map((item) => (
            <IconTitleCard key={item.id} {...item} layout="inline" underline />
          ))}
        </div>

        <Card hover={false} className="mt-6 flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-brand-accent/40 bg-brand-accent/10">
            <CanadaDotMap className="h-8 w-12" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-brand-white">
              Employer Connections Across Canada
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-brand-muted">
              We work with startups, scale-ups, and enterprise teams from coast to coast to help
              you find the right fit.
            </p>
          </div>
        </Card>

        <div className="mt-16">
          <SectionEyebrow label="About Us" />
          <SectionHeading
            align="left"
            className="mt-4"
            title="Trusted by"
            accent="Tech Talent"
            after="Across Canada"
          />
          <div className="mx-auto max-w-2xl">
            <div key={activeTestimonial.id} aria-live="polite">
              <TestimonialCard {...activeTestimonial} />
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
              {aboutTestimonials.map((item, index) => (
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
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {platformStats.map((stat) => (
            <div key={stat.id} className="flex items-start gap-3">
              <stat.icon className="mt-1 h-6 w-6 shrink-0 text-brand-accent" aria-hidden="true" />
              <div>
                <p className="text-2xl font-bold text-brand-accent">{stat.value}</p>
                <p className="font-semibold text-brand-white">{stat.label}</p>
                <p className="text-sm text-brand-muted">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
