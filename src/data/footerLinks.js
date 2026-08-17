/** Data-driven footer columns. Internal routes use `to`; external/social use `href`. */

export const footerTagline =
  "Canada's trusted IT job board connecting talent with verified employers and quality opportunities across the tech industry.";

export const footerBottomTagline =
  'Find the best IT jobs in Canada. Browse software developer, cloud, DevOps, cybersecurity, data analyst, and remote IT jobs from verified employers.';

export const socialLinks = [
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com' },
  { id: 'twitter', label: 'Twitter / X', href: 'https://x.com' },
  { id: 'facebook', label: 'Facebook', href: 'https://www.facebook.com' },
  { id: 'mail', label: 'Email', href: 'mailto:info@itechjobline.ca' },
];

export const footerQuickLinks = [
  { label: 'Browse Jobs', to: '/jobs' },
  { label: 'Employers', to: '/employers' },
  { label: 'Post a Job', to: '/post-job' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact Us', to: '/contact' },
  { label: 'Career Resources', to: '/' },
];

export const popularJobLinks = [
  { label: 'Developer Jobs', to: '/jobs?keyword=Developer' },
  { label: 'Software Engineer Jobs', to: '/jobs?keyword=Software%20Engineer' },
  { label: 'Cloud Engineer Jobs', to: '/jobs?keyword=Cloud%20Engineer' },
  { label: 'DevOps Jobs', to: '/jobs?keyword=DevOps' },
  { label: 'Data Analyst Jobs', to: '/jobs?keyword=Data%20Analyst' },
  { label: 'Cybersecurity Jobs', to: '/jobs?keyword=Cybersecurity' },
];

export const employerLinks = [
  { label: 'Post a Job', to: '/post-job' },
  { label: 'Browse Resumes', to: '/employers' },
  { label: 'Employer Pricing', to: '/employers' },
  { label: 'Hiring Solutions', to: '/employers' },
  { label: 'Resource Center', to: '/employers' },
];

export const contactInfo = {
  address: 'Toronto, ON, Canada',
  phone: '+1 (647) 555-0198',
  email: 'info@itechjobline.ca',
  website: 'www.itechjobline.ca',
  websiteHref: 'https://www.itechjobline.ca',
};

export const legalLinks = [
  { label: 'Privacy Policy', to: '#' },
  { label: 'Terms of Service', to: '#' },
];
