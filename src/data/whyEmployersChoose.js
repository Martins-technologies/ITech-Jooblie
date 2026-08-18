import { UserCheck, Zap, LayoutGrid } from 'lucide-react';
import MapleLeafIcon from '../components/common/MapleLeafIcon.jsx';

export const whyEmployersChoose = [
  {
    id: 'talent',
    title: 'Qualified Tech Talent',
    description:
      'Access a pool of pre-screened candidates with software development, cloud, and cybersecurity experience.',
    icon: UserCheck,
  },
  {
    id: 'reach',
    title: 'Canada-Wide Reach',
    description:
      'Reach job seekers from Toronto to Vancouver and everywhere in between. Post nationwide with ease.',
    icon: MapleLeafIcon,
  },
  {
    id: 'fast',
    title: 'Fast Posting',
    description: 'Get your IT job live in minutes and start receiving applications right away.',
    icon: Zap,
  },
  {
    id: 'dashboard',
    title: 'Simple Employer Dashboard',
    description:
      'Manage your job postings, review applications, and communicate with candidates all in one place.',
    icon: LayoutGrid,
  },
];
