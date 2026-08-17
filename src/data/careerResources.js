import { FileText, MessagesSquare, Laptop } from 'lucide-react';

export const careerResources = [
  {
    id: 'resume-tips',
    title: 'Resume Tips for IT Jobs',
    description:
      'Tailor your tech resume with keywords, project highlights, and skills that Canadian IT recruiters actually scan for.',
    icon: FileText,
    to: '/about',
  },
  {
    id: 'interview-prep',
    title: 'Interview Prep for Tech Roles',
    description:
      'Practice system design, coding rounds, and behavioural questions used by top Canadian tech employers.',
    icon: MessagesSquare,
    to: '/about',
  },
  {
    id: 'remote-advice',
    title: 'Remote Work Career Advice',
    description:
      'Learn how to find, negotiate, and succeed in remote and hybrid IT roles from coast to coast.',
    icon: Laptop,
    to: '/about',
  },
];
