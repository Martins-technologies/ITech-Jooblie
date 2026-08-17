import { Mail, Phone, Users } from 'lucide-react';

export const contactMethods = [
  {
    id: 'email',
    title: 'Email Support',
    description: 'We usually respond within 1 business day',
    value: 'support@itechjobline.ca',
    href: 'mailto:support@itechjobline.ca',
    icon: Mail,
  },
  {
    id: 'phone',
    title: 'Call Us',
    description: 'Mon – Fri, 9:00 AM – 5:00 PM ET',
    value: '+1 (647) 555-0198',
    href: 'tel:+16475550198',
    icon: Phone,
  },
  {
    id: 'sales',
    title: 'Employer Sales',
    description: 'Solutions for hiring and enterprise needs',
    value: 'sales@itechjobline.ca',
    href: 'mailto:sales@itechjobline.ca',
    icon: Users,
  },
];
