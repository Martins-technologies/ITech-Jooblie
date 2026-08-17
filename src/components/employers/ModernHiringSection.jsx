import { ChevronRight } from 'lucide-react';
import { modernHiringFeatures } from '../../data/employersPage.js';
import SectionHeading from '../common/SectionHeading.jsx';
import Card from '../common/Card.jsx';

export default function ModernHiringSection() {
  return (
    <section className="bg-brand-bg pb-8">
      <div className="container-page">
        <SectionHeading
          title="Built for Modern Tech Hiring"
          subtitle="Powerful tools and solutions to help you attract, engage, and hire top IT talent."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {modernHiringFeatures.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.id} className="relative flex gap-4 p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-brand-accent/40 bg-brand-accent/10">
                  <Icon className="h-5 w-5 text-brand-accent" />
                </div>
                <div className="pr-4">
                  <h3 className="mb-1 font-semibold text-brand-white">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-brand-muted">
                    {item.description}
                  </p>
                </div>
                <ChevronRight className="absolute bottom-4 right-4 h-4 w-4 text-brand-accent" />
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
