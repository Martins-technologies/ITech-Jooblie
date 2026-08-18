import { Quote, ChevronLeft, ChevronRight, Briefcase } from 'lucide-react';
import { employerTestimonials } from '../../data/employersPage.js';
import SectionHeading from '../common/SectionHeading.jsx';
import Card from '../common/Card.jsx';
import Button from '../common/Button.jsx';

export default function EmployerTestimonialsSection() {
  return (
    <section className="bg-brand-bg pb-8">
      <div className="container-page">
        <SectionHeading title="Trusted by Employers Across Canada" />

        <div className="relative">
          <Card hover={false} className="grid gap-8 p-6 md:grid-cols-2 md:p-10">
            {employerTestimonials.map((item, index) => (
              <div
                key={item.id}
                className={index > 0 ? 'md:border-l md:border-brand-border/40 md:pl-8' : ''}
              >
                <Quote className="mb-4 h-8 w-8 text-brand-accent" />
                <p className="text-brand-white">&ldquo;{item.quote}&rdquo;</p>
                <p className="mt-4 font-semibold text-brand-white">{item.name}</p>
                <p className="text-sm text-brand-muted">{item.role}</p>
              </div>
            ))}
          </Card>
          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-brand-border/50 text-brand-accent">
              <ChevronLeft className="h-4 w-4" />
            </span>
            <span className="h-2 w-2 rounded-full bg-brand-accent" />
            <span className="h-2 w-2 rounded-full bg-brand-border" />
            <span className="h-2 w-2 rounded-full bg-brand-border" />
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-brand-border/50 text-brand-accent">
              <ChevronRight className="h-4 w-4" />
            </span>
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
