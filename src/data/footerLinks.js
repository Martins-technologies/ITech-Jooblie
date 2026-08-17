/** Data-driven footer columns. Footer maps over `footerColumns` keys in insertion order. */

export const footerTagline =
  "Canada's trusted IT job board connecting talent with verified employers and quality opportunities across the tech industry.";

export const socialLinks = [
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com' },
  { id: 'twitter', label: 'Twitter / X', href: 'https://x.com' },
  { id: 'facebook', label: 'Facebook', href: 'https://www.facebook.com' },
];

export const footerColumns = {
  quickLinks: {
    title: 'Quick Links',
    items: [
      { label: 'Home', to: '/' },
      { label: 'Browse Jobs', to: '/jobs' },
      { label: 'Employers', to: '/employers' },
      { label: 'About Us', to: '/about' },
      { label: 'Contact Us', to: '/contact' },
    ],
  },
  popularJobs: {
    title: 'Popular IT Jobs',
    items: [
      { label: 'Software Developer Jobs', to: '/jobs?keyword=Software%20Developer' },
      { label: 'Cloud Engineer Jobs', to: '/jobs?keyword=Cloud%20Engineer' },
      { label: 'Cybersecurity Jobs', to: '/jobs?keyword=Cybersecurity' },
      { label: 'Data Analyst Jobs', to: '/jobs?keyword=Data%20Analyst' },
      { label: 'DevOps Engineer Jobs', to: '/jobs?keyword=DevOps' },
    ],
  },
  contactInfo: {
    title: 'Contact Us',
    items: [
      {
        label: 'info@itechjobline.ca',
        href: 'mailto:info@itechjobline.ca',
        icon: 'mail',
      },
      {
        label: '+1 (647) 555-0198',
        href: 'tel:+16475550198',
        icon: 'phone',
      },
      {
        label: 'Toronto, Ontario, Canada',
        icon: 'mapPin',
      },
    ],
  },
  legal: {
    title: 'Legal',
    items: [
      { label: 'Privacy Policy', to: '#' },
      { label: 'Terms of Use', to: '#' },
      { label: 'Cookie Policy', to: '#' },
    ],
  },
};
