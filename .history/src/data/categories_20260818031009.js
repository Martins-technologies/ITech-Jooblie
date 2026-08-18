import {
  Code2,
  Cloud,
  ShieldCheck,
  BarChart3,
  Building2,
  Headset,
  AppWindow,
} from 'lucide-react';

/** 5-card row shown beneath the hero. */
export const heroCategories = [
  {
    id: 'software-development',
    title: 'Software Development',
    description: 'Frontend, backend, full stack & mobile development jobs.',
    icon: Code2,
    to: '/jobs?category=software-development',
  },
  {
    id: 'cloud-devops',
    title: 'Cloud & DevOps',
    description: 'AWS, Azure, GCP, DevOps & infrastructure roles.',
    icon: Cloud,
    to: '/jobs?category=cloud-devops',
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    description: 'Security analyst, penetration testing, SOC & more.',
    icon: ShieldCheck,
    to: '/jobs?category=cybersecurity',
  },
  {
    id: 'data-ai',
    title: 'Data & AI',
    description: 'Data analyst, data scientist, ML engineer & AI jobs.',
    icon: BarChart3,
    to: '/jobs?category=data-ai',
  },
  {
    id: 'top-employers',
    title: 'Top Tech Employers',
    description: 'Join top IT companies hiring across Canada.',
    icon: Building2,
    to: '/employers',
  },
];

/** 6-card "Explore Popular IT Career Paths" grid. */
export const careerPathCategories = [
  {
    id: 'software-development',
    title: 'Software Development',
    description: 'Frontend, backend, full stack & mobile development jobs.',
    icon: Code2,
    to: '/jobs?category=software-development',
  },
  {
    id: 'cloud-devops',
    title: 'Cloud & DevOps',
    description: 'AWS, Azure, GCP, DevOps & infrastructure roles.',
    icon: Cloud,
    to: '/jobs?category=cloud-devops',
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    description: 'Security analyst, penetration testing, SOC & more.',
    icon: ShieldCheck,
    to: '/jobs?category=cybersecurity',
  },
  {
    id: 'data-ai',
    title: 'Data & AI',
    description: 'Data analyst, data scientist, ML engineer & AI jobs.',
    icon: BarChart3,
    to: '/jobs?category=data-ai',
  },
  {
    id: 'it-support',
    title: 'IT Support',
    description: 'Help desk, system admin, network & technical support.',
    icon: Headset,
    to: '/jobs?category=it-support',
  },
  {
    id: 'product-ux',
    title: 'Product & UX',
    description: 'Product manager, UI/UX designer & more.',
    icon: AppWindow,
    to: '/jobs?category=product-ux',
  },
];

export const popularSearches = [
  'Developer',
  'Software Engineer',
  'Cloud',
  'Data Analyst',
  'QA Engineer',
];
