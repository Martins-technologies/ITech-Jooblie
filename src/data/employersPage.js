import {
  ShieldCheck,
  Zap,
  LayoutDashboard,
  Users,
  User,
  Globe,
  BarChart3,
  Code2,
  Cloud,
  Headset,
  Box,
  Briefcase,
  Contact,
  UserPlus,
  FilePen,
  ClipboardList,
  Monitor,
  Building2,
  LineChart,
  Rocket,
  HelpCircle,
} from 'lucide-react';
import MapleLeafIcon from '../components/common/MapleLeafIcon.jsx';

export const heroCopy = {
  badge: 'Hire Top Tech Talent in Canada',
  title: 'Find',
  accent: 'Skilled IT',
  after: 'Professionals Faster',
  subtitle:
    'Hire expert software developers, cloud engineers, cybersecurity specialists, data analysts, AI talent, and IT support professionals across Canada. Post your job and connect with pre-vetted tech talent that drives results.',
};

export const heroFeatureCards = [
  {
    id: 'verified',
    title: 'Verified Tech Talent',
    description:
      'Access a curated pool of pre-screened IT professionals with verified skills and experience.',
    icon: ShieldCheck,
  },
  {
    id: 'canada',
    title: 'Canada-Wide Reach',
    description:
      'Hire top tech talent from every province and major tech hub across Canada.',
    icon: MapleLeafIcon,
  },
  {
    id: 'faster',
    title: 'Faster Hiring',
    description:
      'Smart matching and streamlined processes help you hire the right talent up to 50% faster.',
    icon: Zap,
  },
  {
    id: 'dashboard',
    title: 'Employer Dashboard',
    description:
      'Manage jobs, track applications, collaborate with your team, and hire with ease.',
    icon: LayoutDashboard,
  },
];

export const heroStats = [
  {
    id: 'companies',
    value: '2,500+',
    label: 'Hiring Companies',
    subtext: 'trust iTech Jobline',
    icon: Users,
  },
  {
    id: 'jobs',
    value: '12,000+',
    label: 'Tech Jobs',
    subtext: 'posted and growing',
    icon: Briefcase,
  },
  {
    id: 'applications',
    value: '10,000+',
    label: 'Applications',
    subtext: 'monthly from top talent',
    icon: Contact,
  },
  {
    id: 'coverage',
    value: 'Canada-Wide',
    label: 'Coverage across all provinces',
    subtext: 'and major tech hubs',
    icon: MapleLeafIcon,
  },
];

export const whyEmployerFeatures = [
  {
    id: 'specialized',
    title: 'Access Specialized Talent',
    description:
      'Hire skilled professionals in software, cloud, cybersecurity, data, and IT support roles.',
    icon: Users,
  },
  {
    id: 'active',
    title: 'Reach Active Job Seekers',
    description:
      'Connect with thousands of IT professionals actively looking for their next opportunity.',
    icon: User,
  },
  {
    id: 'remote',
    title: 'Remote & Hybrid Hiring',
    description:
      'Find top talent across Canada and build flexible remote or hybrid teams.',
    icon: Globe,
  },
  {
    id: 'tools',
    title: 'Verified Employer Tools',
    description:
      'Post jobs, manage applications, and track performance with verified employer tools.',
    icon: ShieldCheck,
  },
  {
    id: 'matching',
    title: 'Faster Candidate Matching',
    description:
      'Smart matching helps you find qualified candidates faster and reduce time-to-hire.',
    icon: Zap,
  },
  {
    id: 'brand',
    title: 'Brand Visibility',
    description:
      'Increase your company\'s visibility and attract top IT talent across Canada.',
    icon: BarChart3,
  },
];

export const hiringCategories = [
  {
    id: 'software',
    title: 'Software Development',
    count: '2,843+ jobs',
    icon: Code2,
    to: '/jobs?category=software-development',
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    count: '1,628+ jobs',
    icon: Cloud,
    to: '/jobs?category=cloud-devops',
  },
  {
    id: 'cyber',
    title: 'Cybersecurity',
    count: '1,125+ jobs',
    icon: ShieldCheck,
    to: '/jobs?category=cybersecurity',
  },
  {
    id: 'data',
    title: 'Data & AI',
    count: '1,048+ jobs',
    icon: BarChart3,
    to: '/jobs?category=data-ai',
  },
  {
    id: 'support',
    title: 'IT Support',
    count: '968+ jobs',
    icon: Headset,
    to: '/jobs?category=it-support',
  },
  {
    id: 'product',
    title: 'Product & UX',
    count: '742+ jobs',
    icon: Box,
    to: '/jobs?category=product-ux',
  },
];

export const hiringSteps = [
  {
    id: 'account',
    title: 'Create Employer Account',
    description: 'Sign up quickly and set up your company profile to start hiring.',
    icon: UserPlus,
  },
  {
    id: 'post',
    title: 'Post Your IT Job',
    description: 'Add the role, skills, location, and requirements in minutes.',
    icon: FilePen,
  },
  {
    id: 'review',
    title: 'Review Qualified Applicants',
    description: 'Shortlist verified candidates matched to your job.',
    icon: Users,
  },
  {
    id: 'hire',
    title: 'Hire with Confidence',
    description: 'Connect, interview, and hire top IT talent across Canada.',
    icon: ShieldCheck,
  },
];

export const modernHiringFeatures = [
  {
    id: 'tracking',
    title: 'Applicant Tracking',
    description: 'Review, filter, and organize candidates in one dashboard.',
    icon: ClipboardList,
  },
  {
    id: 'management',
    title: 'Job Post Management',
    description: 'Create, edit, and manage job posts from a single place.',
    icon: Monitor,
  },
  {
    id: 'branding',
    title: 'Employer Branding',
    description: 'Showcase your culture and stand out to Canadian tech talent.',
    icon: Building2,
  },
  {
    id: 'analytics',
    title: 'Analytics & Insights',
    description: 'Track applications, performance, and hiring progress.',
    icon: LineChart,
  },
];

export const employerTestimonials = [
  {
    id: 'natalie',
    quote:
      'iTech Jobline helped us fill specialized cloud roles in weeks, not months. The candidate quality was consistently strong.',
    name: 'Natalie S.',
    role: 'Talent Acquisition Manager, NorthBeam Technologies',
  },
  {
    id: 'david',
    quote:
      'We hired two senior engineers through iTech Jobline. The process was simple and the talent pool is clearly built for IT.',
    name: 'David R.',
    role: 'CTO, CloudPath Solutions',
  },
];

export const pricingPlans = [
  {
    id: 'starter',
    name: 'Starter',
    blurb: 'Perfect for small teams',
    price: '$199',
    period: '/month',
    icon: Rocket,
    featured: false,
    cta: 'Get Started',
    ctaTo: '/post-job/create',
    ctaVariant: 'outline',
    features: [
      '5 Job Posts Included',
      'Employer Dashboard Access',
      'Candidate Access',
      'Email Support',
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    blurb: 'Ideal for growing companies',
    price: '$399',
    period: '/month',
    icon: BarChart3,
    featured: true,
    badge: 'MOST POPULAR',
    cta: 'Get Started',
    ctaTo: '/post-job/create',
    ctaVariant: 'primary',
    features: [
      '15 Job Posts Included',
      'Advanced Employer Dashboard',
      'Candidate Access & Shortlisting',
      'Priority Email Support',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    blurb: 'For large teams & scale',
    price: 'Custom',
    period: '',
    icon: Building2,
    featured: false,
    cta: 'Contact Sales',
    ctaHref: 'mailto:hello@itechjobline.ca',
    ctaVariant: 'outline',
    features: [
      'Unlimited Job Posts',
      'Advanced Analytics & Insights',
      'Dedicated Account Manager',
      'Priority Support',
    ],
  },
];

export const employerFaqs = [
  {
    id: 'post',
    question: 'How do I post a job?',
    answer:
      'Create an employer account, add your job details, and publish. Most listings go live within minutes.',
    icon: HelpCircle,
  },
  {
    id: 'remote',
    question: 'Do you support remote hiring?',
    answer:
      'Yes. You can post remote, hybrid, and on-site IT roles and reach talent across Canada.',
    icon: Globe,
  },
  {
    id: 'multiple',
    question: 'Can I manage multiple job listings?',
    answer:
      'Yes. The employer dashboard lets you create, edit, and track multiple job posts in one place.',
    icon: Users,
  },
  {
    id: 'live',
    question: 'How quickly will my job go live?',
    answer:
      'Verified employer posts typically go live within minutes after you review and publish.',
    icon: Zap,
  },
];
