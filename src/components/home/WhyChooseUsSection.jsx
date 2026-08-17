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
    <section className="relative overflow-hidden bg-brand-bg py-16 md:py-20">
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_center,rgba(47,143,255,0.07),transparent_60%)]" />
      <div className="container-page relative">
        <SectionHeading
          title="Why IT Professionals Choose"
          accent="iTech Jobline"
          subtitle="Built for IT talent. Backed by trusted Canadian employers."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item) => (
            <Card key={item.title} className="p-6" hover>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-brand-accent/40 bg-brand-accent/10">
                <item.icon className="h-6 w-6 text-brand-accent" />
              </div>
              <h3 className="mb-2 font-semibold text-brand-white">{item.title}</h3>
              <p className="text-sm leading-relaxed text-brand-muted">{item.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
