import { Code2, Cloud, ShieldCheck, BarChart3 } from 'lucide-react';

export const featuredJobs = [
  {
    id: 'frontend-developer',
    title: 'Frontend Developer',
    company: 'MapleSoft Solutions',
    location: 'Toronto, ON',
    type: 'Full-time',
    icon: Code2,
    to: '/jobs',
  },
  {
    id: 'cloud-engineer',
    title: 'Cloud Engineer',
    company: 'NorthSky Cloud',
    location: 'Vancouver, BC',
    type: 'Full-time',
    icon: Cloud,
    to: '/jobs',
  },
  {
    id: 'cybersecurity-analyst',
    title: 'Cybersecurity Analyst',
    company: 'SecureCore Technologies',
    location: 'Ottawa, ON',
    type: 'Full-time',
    icon: ShieldCheck,
    to: '/jobs',
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    company: 'InsightIQ Analytics',
    location: 'Montreal, QC',
    type: 'Full-time',
    icon: BarChart3,
    to: '/jobs',
  },
];
