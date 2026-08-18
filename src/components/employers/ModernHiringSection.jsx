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
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {modernHiringFeatures.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.id} className="relative flex items-start gap-4 p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-brand-accent/40 bg-brand-accent/10">
                  <Icon className="h-5 w-5 text-brand-accent" />
                </div>
                <div className="min-w-0 pr-4">
                  <h3 className="font-semibold text-brand-white">{item.title}</h3>
                  <p className="mt-0.5 text-sm leading-relaxed text-brand-muted">
                    {item.description}
                  </p>
                </div>
                <span className="absolute bottom-4 right-4 text-brand-accent" aria-hidden="true">
                  ›
                </span>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
