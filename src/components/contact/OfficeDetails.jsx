import { ArrowRight } from 'lucide-react';
import { officeInfo } from '../../data/officeInfo.js';
import SectionEyebrow from '../common/SectionEyebrow.jsx';
import Card from '../common/Card.jsx';
import Button from '../common/Button.jsx';
import MapPanel from './MapPanel.jsx';
import FaqAccordion from './FaqAccordion.jsx';

export default function OfficeDetails() {
  return (
    <section className="bg-brand-bg pb-12">
      <div className="container-page grid gap-10 lg:grid-cols-2">
        <div>
          <SectionEyebrow label="Contact Us" />
          <h2 className="mt-4 text-3xl font-bold text-brand-white md:text-4xl">
            Office & <span className="text-brand-accent">Contact</span> Details
          </h2>
          <p className="mt-4 max-w-xl text-brand-muted">
            Visit our Toronto office or reach us by email and phone. We support job
            seekers and employers across Canada.
          </p>

          <div className="mt-8 space-y-3">
            {officeInfo.map((item) => {
              const Icon = item.icon;
              const ValueTag = item.href ? 'a' : 'p';
              return (
                <Card key={item.id} hover={false} className="flex items-start gap-4 p-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-brand-accent/40 text-brand-accent">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-brand-muted">{item.label}</p>
                    <ValueTag
                      href={item.href}
                      className="font-semibold text-brand-white"
                    >
                      {item.value}
                    </ValueTag>
                    <p className="text-sm text-brand-muted">{item.sub}</p>
                  </div>
                </Card>
              );
            })}
          </div>

          <Button href="#contact-form" icon={ArrowRight} className="mt-6 w-full sm:w-auto">
            Talk to Our Team
          </Button>
        </div>

        <div>
          <MapPanel />
          <FaqAccordion />
        </div>
      </div>
    </section>
  );
}
