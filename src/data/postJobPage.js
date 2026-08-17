import {
  Users,
  ShieldCheck,
  Zap,
  Map,
  LayoutDashboard,
  UserPlus,
  FilePen,
  Eye,
  UserCheck,
  Monitor,
  IdCard,
  Building2,
  Bell,
  Briefcase,
  Contact,
  MapPin,
} from 'lucide-react';

export const heroCopy = {
  badge: 'Hire Smarter. Build Stronger Tech Teams.',
  title: 'Post IT Jobs and',
  accent: 'Reach Top Tech Talent',
  after: 'Across Canada',
  subtitle:
    'Connect with skilled software developers, cloud engineers, cybersecurity specialists, data analysts, AI talent, and IT support professionals from coast to coast.',
};

export const heroFeatures = [
  {
    id: 'verified-talent',
    title: 'Verified Tech Talent',
    description:
      'Access pre-screened and verified IT professionals across Canada.',
    icon: ShieldCheck,
  },
  {
    id: 'fast-publishing',
    title: 'Fast Job Publishing',
    description:
      'Post your job in minutes and start receiving qualified applications quickly.',
    icon: Zap,
  },
  {
    id: 'canada-reach',
    title: 'Canada-Wide Reach',
    description:
      'Reach tech talent in every province and major tech hub across Canada.',
    icon: Map,
  },
  {
    id: 'employer-dashboard',
    title: 'Employer Dashboard',
    description:
      'Manage jobs, view applicants, and track performance from one powerful dashboard.',
    icon: LayoutDashboard,
  },
];

export const heroStats = [
  {
    id: 'employers',
    value: '2,450+',
    label: 'Active Employers',
    icon: Users,
  },
  {
    id: 'jobs',
    value: '18,760+',
    label: 'Jobs Posted',
    icon: Briefcase,
  },
  {
    id: 'applications',
    value: '245,000+',
    label: 'Applications Submitted',
    icon: Contact,
  },
  {
    id: 'provinces',
    value: '13',
    label: 'Provinces & Territories',
    icon: MapPin,
  },
];

export const postingSteps = [
  {
    id: 'account',
    title: 'Create Employer Account',
    description: 'Sign up quickly and set up your company profile.',
    icon: UserPlus,
  },
  {
    id: 'details',
    title: 'Add Job Details',
    description: 'Add your job description, must-have skills, location, and more.',
    icon: FilePen,
  },
  {
    id: 'publish',
    title: 'Review & Publish',
    description: 'Preview your job and publish to reach top IT talent.',
    icon: Eye,
  },
  {
    id: 'applicants',
    title: 'Receive Qualified Applicants',
    description: 'Get matched with skilled candidates fast.',
    icon: UserCheck,
  },
];

export const employerFeatures = [
  {
    id: 'job-management',
    title: 'Job Post Management',
    description: 'Create, edit, and manage unlimited job posts with ease.',
    icon: Monitor,
    footerLink: { label: 'Stay in control', to: '#' },
  },
  {
    id: 'tracking',
    title: 'Applicant Tracking',
    description:
      'Review, filter, and organize applicants in one streamlined dashboard.',
    icon: IdCard,
    footerLink: { label: 'Hire faster', to: '#' },
  },
  {
    id: 'branding',
    title: 'Employer Branding',
    description:
      'Showcase your company culture and stand out to top tech professionals in Canada.',
    icon: Building2,
    footerLink: { label: 'Build your brand', to: '#' },
  },
  {
    id: 'alerts',
    title: 'Smart Alerts',
    description:
      'Get instant notifications for new applicants and important updates.',
    icon: Bell,
    footerLink: { label: 'Never miss a fit', to: '#' },
  },
];
