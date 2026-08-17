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
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item) => (
            <Card key={item.title} className="flex flex-col p-4" hover>
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brand-accent/40 bg-brand-accent/10">
                  <item.icon className="h-4 w-4 text-brand-accent" />
                </div>
                <h3 className="min-w-0 text-[15px] font-semibold leading-snug text-brand-white">
                  {item.title}
                </h3>
              </div>
              <p className="mt-2 text-[13px] leading-snug text-brand-muted">{item.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
