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

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {whyUseFeatures.map((item) => (
            <Card key={item.id} className="flex flex-col p-4" hover>
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brand-accent/40 bg-brand-accent/10 text-brand-accent">
                  <item.icon className="h-4 w-4" />
                </div>
                <h3 className="min-w-0 text-[15px] font-semibold leading-snug text-brand-white">
                  {item.title}
                </h3>
              </div>
              <p className="mt-2 text-[13px] leading-snug text-brand-muted">{item.description}</p>
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
