import { Briefcase, Search } from 'lucide-react';
import { whyUseFeatures } from '../../../data/whyUseFeatures.js';
import Card from '../../common/Card.jsx';
import Button from '../../common/Button.jsx';
import SectionHeading from '../../common/SectionHeading.jsx';
import CanadaDotMap from '../../graphics/CanadaDotMap.jsx';

export default function WhyUseSection() {
  return (
    <section className="bg-brand-bg py-12">
      <div className="container-page">
        <SectionHeading
          title="Why Use"
          accent="iTech Jobline?"
          subtitle="We make it easier for IT professionals to discover great opportunities across Canada."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {whyUseFeatures.map((item) => (
            <Card key={item.id} className="flex items-start gap-4 p-6" hover>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-brand-accent/40 bg-brand-accent/10 text-brand-accent">
                <item.icon className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-brand-white">{item.title}</h3>
                <p className="mt-0.5 text-sm leading-relaxed text-brand-muted">{item.description}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="relative mt-10 overflow-hidden rounded-2xl border border-brand-accent/40 bg-brand-card px-6 py-10 shadow-card md:px-10">
          <CanadaDotMap className="pointer-events-none absolute -right-4 bottom-0 h-40 w-56 opacity-50" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-brand-white md:text-3xl">
                Ready to find your next <span className="text-brand-accent">IT role?</span>
              </h2>
              <p className="mt-2 max-w-xl text-brand-muted">
                Join thousands of IT professionals and explore top opportunities from trusted
                employers across Canada.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button to="/jobs" icon={Search}>
                Browse Jobs
              </Button>
              <Button to="/post-job" variant="outline" icon={Briefcase}>
                Post a Job
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
