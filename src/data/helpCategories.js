import { Headset, Briefcase, Wrench, Handshake } from 'lucide-react';

export const helpCategories = [
  {
    id: 'job-seeker',
    title: 'Job Seeker Support',
    description:
      'Help with applications, profiles, and finding the right IT role across Canada.',
    to: '/jobs',
    icon: Headset,
  },
  {
    id: 'employer',
    title: 'Employer Support',
    description:
      'Get help posting jobs, reviewing applicants, and hiring tech talent faster.',
    to: '/employers',
    icon: Briefcase,
  },
  {
    id: 'technical',
    title: 'Technical Help',
    description:
      'Account access, listing issues, and platform troubleshooting for your team.',
    to: '/contact',
    icon: Wrench,
  },
  {
    id: 'partnership',
    title: 'Partnership Inquiries',
    description:
      'Explore partnerships, campus programs, and enterprise hiring solutions.',
    href: 'mailto:sales@itechjobline.ca',
    icon: Handshake,
  },
];

export const helpStats = [
  {
    id: 'response',
    label: 'Average Response Time',
    value: 'Within 1 business day',
    icon: 'clock',
  },
  {
    id: 'hours',
    label: 'Support Hours',
    value: 'Mon – Fri, 9:00 AM – 5:00 PM ET',
    icon: 'calendar',
  },
  {
    id: 'canada',
    label: 'Canada-Wide Assistance',
    value: 'Support from coast to coast',
    icon: 'map-pin',
  },
];
