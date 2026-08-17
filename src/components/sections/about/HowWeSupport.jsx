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

        <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr))]">
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
          <div className="grid gap-5 md:grid-cols-2">
            {aboutTestimonials.map((item) => (
              <TestimonialCard key={item.id} {...item} />
            ))}
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
