import { Quote, ShieldCheck, Building2, Star } from 'lucide-react';
import { testimonials } from '../../data/testimonials.js';
import SectionHeading from '../common/SectionHeading.jsx';
import TestimonialCard from './TestimonialCard.jsx';

const trustStats = [
  { icon: ShieldCheck, title: 'Trusted by 10,000+', subtitle: 'Tech Professionals' },
  { icon: Building2, title: 'Partnered with 2,500+', subtitle: 'Top Tech Employers' },
  { icon: Star, title: '4.8/5 Average Rating', subtitle: 'From Our Community' },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-brand-bg pb-8">
      <div className="container-page">
        <SectionHeading title="Trusted by" accent="Tech Talent" after="Across Canada" />

        <div className="relative grid gap-5 md:grid-cols-2">
          <Quote
            className="absolute left-1/2 top-1/2 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 text-brand-accent md:block"
            aria-hidden="true"
          />
          {testimonials.map((item) => (
            <TestimonialCard key={item.id} {...item} />
          ))}
        </div>

        <div className="mt-8 grid gap-6 py-2 sm:grid-cols-3 sm:gap-0">
          {trustStats.map((stat, index) => (
            <div
              key={stat.title}
              className={`flex items-center justify-center gap-3 sm:px-6 ${
                index > 0 ? 'sm:border-l sm:border-brand-border/50' : ''
              }`}
            >
              <stat.icon
                className="h-6 w-6 shrink-0 text-brand-accent"
                strokeWidth={1.75}
                aria-hidden="true"
              />
              <div>
                <p className="text-base font-medium text-brand-white">{stat.title}</p>
                <p className="text-sm text-brand-muted">{stat.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
