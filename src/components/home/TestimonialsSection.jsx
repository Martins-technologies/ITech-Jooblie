import { Quote, ShieldCheck, Building2, Star } from 'lucide-react';
import { testimonials } from '../../data/testimonials.js';
import SectionHeading from '../common/SectionHeading.jsx';
import TestimonialCard from './TestimonialCard.jsx';

const trustStats = [
  { icon: ShieldCheck, label: 'Trusted by 10,000+ Tech Professionals' },
  { icon: Building2, label: 'Partnered with 2,500+ Top Tech Employers' },
  { icon: Star, label: '4.8/5 Average Rating From Our Community' },
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

        <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:justify-between">
          {trustStats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <stat.icon className="h-6 w-6 shrink-0 text-brand-accent" />
              <p className="text-sm font-medium text-brand-white">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
