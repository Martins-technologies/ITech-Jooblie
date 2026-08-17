import { House, ShieldCheck, Zap } from 'lucide-react';
import SectionHeading from '../common/SectionHeading.jsx';
import Card from '../common/Card.jsx';
import MapleLeafIcon from '../common/MapleLeafIcon.jsx';

const features = [
  {
    title: 'Remote & Hybrid Tech Jobs',
    description:
      'Find flexible remote and hybrid IT jobs that fit your lifestyle.',
    icon: House,
  },
  {
    title: 'Verified Tech Employers',
    description:
      'All employers are vetted for legitimacy and hiring quality.',
    icon: ShieldCheck,
  },
  {
    title: 'Fast Applications',
    description:
      'Apply in minutes with a simple, streamlined application process.',
    icon: Zap,
  },
  {
    title: 'Canada-Wide Opportunities',
    description:
      'Discover IT jobs across all provinces and major cities.',
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
