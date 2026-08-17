import { images } from './images.js';
import {
  aboutTestimonialArjun,
  aboutTestimonialMelissa,
} from '../assets/images/about.js';

export const testimonials = [
  {
    id: 'arjun',
    name: 'Arjun S.',
    role: 'Software Developer, Toronto, ON',
    quote:
      'iTech Jobline helped me land my dream software developer role in Toronto. The listings were relevant, and I heard back from employers within days.',
    avatar: images.testimonialArjun,
  },
  {
    id: 'priya',
    name: 'Priya M.',
    role: 'Cloud Engineer, Vancouver, BC',
    quote:
      'I switched into a remote cloud engineering role through iTech Jobline. The platform is clearly built for IT talent across Canada.',
    avatar: images.testimonialPriya,
  },
];

export const aboutTestimonials = [
  {
    id: 'arjun-p',
    name: 'Arjun P.',
    role: 'Software Developer, Toronto, ON',
    quote:
      'iTech Jobline made it simple to find software roles that matched my stack. I applied in minutes and connected with a Toronto team within the week.',
    avatar: aboutTestimonialArjun,
  },
  {
    id: 'melissa-r',
    name: 'Melissa R.',
    role: 'Cloud Engineer, Vancouver, BC',
    quote:
      'The cloud and DevOps listings felt built for IT talent. I found a hybrid role in Vancouver and the process was clear from search to interview.',
    avatar: aboutTestimonialMelissa,
  },
];
