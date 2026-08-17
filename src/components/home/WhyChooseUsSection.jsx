import { House, ShieldCheck, Zap } from 'lucide-react';
import SectionHeading from '../common/SectionHeading.jsx';
import Card from '../common/Card.jsx';
import MapleLeafIcon from '../common/MapleLeafIcon.jsx';

const features = [
  {
    title: 'Remote & Hybrid Tech Jobs',
    description:
      'Find flexible IT roles that let you work remotely, hybrid, or on-site across Canada.',
    icon: House,
  },
  {
    title: 'Verified Tech Employers',
    description:
      'Every company is reviewed so you apply to trusted, actively hiring Canadian employers.',
    icon: ShieldCheck,
  },
  {
    title: 'Fast Applications',
    description:
      'Submit tailored applications in minutes and move faster through the hiring process.',
    icon: Zap,
  },
  {
    title: 'Canada-Wide Opportunities',
    description:
      'Discover IT jobs from coast to coast — Toronto, Vancouver, Montreal, and beyond.',
    icon: MapleLeafIcon,
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="bg-brand-bg pb-8">
      <div className="container-page">
        <SectionHeading
          title="Why IT Professionals Choose"
          accent="iTech Jobline"
          subtitle="Built for IT talent. Backed by trusted Canadian employers."
        />
        <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr))]">
          {features.map((item) => (
            <Card key={item.title} className="flex items-start gap-4 p-6" hover>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-brand-accent/40 bg-brand-accent/10">
                <item.icon className="h-6 w-6 text-brand-accent" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-brand-white">{item.title}</h3>
                <p className="mt-0.5 text-sm leading-relaxed text-brand-muted">{item.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
