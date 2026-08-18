import { Send, Calendar } from 'lucide-react';
import MapleLeafIcon from '../common/MapleLeafIcon.jsx';
import CTABanner from '../home/CTABanner.jsx';

function OutlineLeaf({ className }) {
  return <MapleLeafIcon variant="outline" className={className} />;
}

export default function EmployerCTABanner() {
  return (
    <CTABanner
      icon={OutlineLeaf}
      title="Ready to Find Your Next"
      accent="Great Hire?"
      subtitle="Join thousands of Canadian employers hiring tech talent every day."
      align="split"
      actions={[
        {
          label: 'Start Posting Today',
          to: '/post-job/create',
          icon: Send,
          variant: 'gradient',
        },
        {
          label: 'Book a Demo',
          href: '#',
          icon: Calendar,
          variant: 'outline',
        },
      ]}
    />
  );
}
