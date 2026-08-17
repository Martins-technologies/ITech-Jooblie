import { UserPlus, Pencil, SquareCheck, Users } from 'lucide-react';

export const postingSteps = [
  {
    id: 'account',
    stepNumber: 1,
    title: 'Create Employer Account',
    description:
      'Sign up as an employer and set up your company profile in just a few easy steps.',
    icon: UserPlus,
  },
  {
    id: 'details',
    stepNumber: 2,
    title: 'Add Job Details',
    description:
      'Fill in your job title, description, requirements, location, and compensation details.',
    icon: Pencil,
  },
  {
    id: 'publish',
    stepNumber: 3,
    title: 'Review & Publish',
    description:
      'Review your listing and publish to make your job visible to thousands of job seekers.',
    icon: SquareCheck,
  },
  {
    id: 'applications',
    stepNumber: 4,
    title: 'Receive Applications',
    description:
      'Qualified candidates apply and you can review, shortlist, and connect with the right talent.',
    icon: Users,
  },
];
