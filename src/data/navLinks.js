/** Shared navbar + footer Quick Links source of truth. */
export const employerMenu = [
  { label: 'Employer Dashboard', to: '#' },
  { label: 'Pricing', to: '#' },
  { label: 'Success Stories', to: '#' },
];

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Browse Jobs', to: '/jobs' },
  { label: 'Employers', to: '/employers', dropdown: employerMenu },
  { label: 'About Us', to: '/about' },
  { label: 'Contact Us', to: '/contact' },
  { label: 'Post a Job', to: '/post-job' },
];
