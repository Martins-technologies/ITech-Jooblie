/** Data-driven footer columns. Footer maps over `footerColumns` keys in insertion order. */

export const footerBrandLine = "Canada's Tech Job Board";

export const footerTagline =
  "Connecting Canada's top tech talent with innovative employers from coast to coast. Your next great hire starts here.";

export const socialLinks = [
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com', filled: true },
  { id: 'twitter', label: 'Twitter / X', href: 'https://x.com' },
  { id: 'facebook', label: 'Facebook', href: 'https://www.facebook.com' },
  { id: 'email', label: 'Email', href: 'mailto:hello@itechjobline.ca' },
];

export const footerColumns = {
  quickLinks: {
    title: 'Quick Links',
    items: [
      { label: 'Browse Jobs', to: '/jobs' },
      { label: 'Advanced Search', to: '/jobs' },
      { label: 'Job Alerts', to: '/jobs' },
      { label: 'Career Resources', to: '/about' },
      { label: 'About Us', to: '/about' },
      { label: 'Contact Us', to: '/contact' },
    ],
  },
  forEmployers: {
    title: 'For Employers',
    items: [
      { label: 'Post a Job', to: '/post-job' },
      { label: 'Search Resumes', to: '/employers' },
      { label: 'Pricing Plans', to: '/post-job#pricing-plans' },
      { label: 'Employer Dashboard', to: '/sign-in' },
      { label: 'Success Stories', to: '/about' },
      { label: 'Recruitment Tips', to: '/employers' },
    ],
  },
  contactInfo: {
    title: 'Contact Info',
    items: [
      {
        label: 'Toronto, Ontario, Canada',
        icon: 'mapPin',
      },
      {
        label: '+1 (647) 555-0198',
        href: 'tel:+16475550198',
        icon: 'phone',
      },
      {
        label: 'hello@itechjobline.ca',
        href: 'mailto:hello@itechjobline.ca',
        icon: 'mail',
      },
      {
        label: 'www.itechjobline.ca',
        to: '/',
        icon: 'globe',
      },
    ],
  },
};

export const footerLegalLinks = [
  { label: 'Privacy Policy', to: '#' },
  { label: 'Terms of Use', to: '#' },
];
