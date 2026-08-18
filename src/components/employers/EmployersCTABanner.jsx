import { Briefcase, Phone } from 'lucide-react';
import CTABanner from '../home/CTABanner.jsx';

export default function EmployersCTABanner() {
  return (
    <CTABanner
      icon={Briefcase}
      title="Ready to hire"
      accent="top IT talent?"
      subtitle="Post your job today and connect with Canada's best IT professionals."
      align="split"
      actions={[
        {
          label: 'Post a Job',
          to: '/post-job',
          icon: Briefcase,
          variant: 'primary',
        },
        {
          label: 'Talk to Our Team',
          href: 'mailto:hello@itechjobline.ca',
          icon: Phone,
          variant: 'outline',
        },
      ]}
    />
  );
}
