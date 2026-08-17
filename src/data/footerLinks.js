import { navLinks } from './navLinks.js';

export const popularJobLinks = [
  { label: 'Software Developer Jobs', to: '/jobs?category=software-developer' },
  { label: 'Cloud Jobs', to: '/jobs?category=cloud' },
  { label: 'Cybersecurity Jobs', to: '/jobs?category=cybersecurity' },
  { label: 'Data Analyst Jobs', to: '/jobs?category=data-analyst' },
];

export const socialLinks = [
  { id: 'linkedin', label: 'LinkedIn', href: '#' },
  { id: 'twitter', label: 'Twitter', href: '#' },
  { id: 'facebook', label: 'Facebook', href: '#' },
  { id: 'instagram', label: 'Instagram', href: '#' },
  { id: 'youtube', label: 'YouTube', href: '#' },
];

export const contactInfo = {
  address: '100 King St W, Suite 5700, Toronto, ON M5X 1C7',
  email: 'hello@itechjobline.ca',
  phone: '+1 (647) 555-0198',
  hours: 'Mon – Fri: 9:00 AM – 6:00 PM ET',
};

export const legalLinks = [
  { label: 'Privacy Policy', to: '#' },
  { label: 'Terms of Use', to: '#' },
  { label: 'Accessibility', to: '#' },
];

/** Footer reuses the same nav links so routes never drift out of sync. */
export const footerQuickLinks = navLinks;
