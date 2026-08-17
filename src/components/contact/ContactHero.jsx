import { Mail } from 'lucide-react';
import { images } from '../../data/images.js';
import MapleLeafIcon from '../common/MapleLeafIcon.jsx';
import SectionEyebrow from '../common/SectionEyebrow.jsx';
import ContactForm from './ContactForm.jsx';
import ContactMethodCards from './ContactMethodCards.jsx';

export default function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-brand-bg pt-8 pb-12">
      <img
        src={images.contactFormBg}
        alt="Night office overlooking a Canadian city skyline"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-brand-bg via-brand-bg/80 to-brand-bg/35"
        aria-hidden="true"
      />

      <div className="container-page relative grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <SectionEyebrow label="Contact Us" />
          <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-brand-white md:text-5xl lg:text-[3.25rem]">
            Contact <span className="text-brand-accent">iTech Jobline</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-brand-white md:text-lg">
            We help Canadian job seekers and employers connect across software, cloud,
            cybersecurity, data, AI, and IT support.
          </p>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-brand-white/80">
            Reach our team for candidate support, hiring solutions, partnerships, or
            technical help. We are here from coast to coast.
          </p>

          <div className="mt-8">
            <ContactMethodCards />
          </div>

          <div className="mt-8 flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-brand-accent/50 bg-brand-accent/15">
              <MapleLeafIcon className="h-5 w-5 text-brand-white" />
            </span>
            <div>
              <p className="font-semibold text-brand-white">Proudly Canadian.</p>
              <p className="text-sm text-brand-muted">
                Supporting IT talent and businesses across Canada.
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <Mail
            className="pointer-events-none absolute -right-10 top-8 hidden h-44 w-44 text-brand-accent/30 lg:block"
            strokeWidth={0.85}
            aria-hidden="true"
          />
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
