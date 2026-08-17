import { ShieldCheck, Globe, Zap } from 'lucide-react';
import MapleLeafIcon from '../common/MapleLeafIcon.jsx';

const highlights = [
  {
    title: 'Verified Employers',
    description: 'All employers are verified for trust & quality.',
    icon: ShieldCheck,
  },
  {
    title: 'Remote Opportunities',
    description: 'Explore remote, hybrid & on-site IT jobs.',
    icon: Globe,
  },
  {
    title: 'Fast Applications',
    description: 'Apply in minutes & hear back faster.',
    icon: Zap,
  },
  {
    title: 'Canada-Wide Jobs',
    description: 'Opportunities from coast to coast.',
    icon: MapleLeafIcon,
  },
];

export default function FeatureHighlights() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {highlights.map((item) => (
        <div key={item.title} className="flex items-start gap-3">
          <item.icon className="mt-0.5 h-6 w-6 shrink-0 text-brand-accent" />
          <div>
            <h3 className="font-semibold text-brand-white">{item.title}</h3>
            <p className="mt-1 text-sm text-brand-muted">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
