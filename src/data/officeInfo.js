import { MapPin, Mail, Phone, Clock } from 'lucide-react';

export const officeInfo = [
  {
    id: 'location',
    label: 'Office Location',
    value: '100 King St W, Suite 5700',
    sub: 'Toronto, ON M5X 1C7',
    icon: MapPin,
  },
  {
    id: 'email',
    label: 'Email',
    value: 'hello@itechjobline.ca',
    sub: 'General inquiries and support',
    href: 'mailto:hello@itechjobline.ca',
    icon: Mail,
  },
  {
    id: 'phone',
    label: 'Phone',
    value: '+1 (647) 555-0198',
    sub: 'Mon – Fri during business hours',
    href: 'tel:+16475550198',
    icon: Phone,
  },
  {
    id: 'hours',
    label: 'Business Hours',
    value: 'Mon – Fri: 9:00 AM – 6:00 PM ET',
    sub: 'Closed weekends and statutory holidays',
    icon: Clock,
  },
];

export const officeAddress = {
  name: 'iTech Jobline',
  line: '100 King St W, Suite 5700, Toronto, ON M5X 1C7',
};

export const subjectOptions = [
  { value: '', label: 'What is this regarding?' },
  { value: 'job-seeker', label: 'Job Seeker Support' },
  { value: 'employer', label: 'Employer Support' },
  { value: 'technical', label: 'Technical Help' },
  { value: 'partnership', label: 'Partnership Inquiries' },
  { value: 'other', label: 'Other' },
];
