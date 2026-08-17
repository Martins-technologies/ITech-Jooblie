import { House, Briefcase, ShieldCheck, Clock } from 'lucide-react';

export const heroStats = [
  {
    id: 'remote',
    value: '2,843+',
    label: 'Remote Roles',
    description: 'Work from anywhere across Canada',
    icon: House,
    to: '/jobs?keyword=Remote%20IT%20Jobs',
  },
  {
    id: 'full-time',
    value: '6,128+',
    label: 'Full-Time Jobs',
    description: 'Stable roles with top Canadian employers',
    icon: Briefcase,
    to: '/jobs?keyword=Software%20Engineer',
  },
  {
    id: 'verified',
    value: '1,250+',
    label: 'Verified Employers',
    description: 'All employers are verified for trust & quality',
    icon: ShieldCheck,
    to: '/employers',
  },
  {
    id: 'new-today',
    value: '312+',
    label: 'New Today',
    description: 'Fresh IT jobs posted today',
    icon: Clock,
    to: '/jobs',
  },
];
