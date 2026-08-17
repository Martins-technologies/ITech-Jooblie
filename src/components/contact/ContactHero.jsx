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
        src={images.contactHero}
        alt="Night office overlooking a Canadian city skyline"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-brand-bg via-brand-bg/92 to-brand-bg/45"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-6 top-10 hidden lg:block"
        aria-hidden="true"
      >
        <Mail
          className="h-56 w-56 text-brand-accent/35 drop-shadow-[0_0_28px_rgba(47,143,255,0.45)]"
          strokeWidth={0.9}
        />
      </div>

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
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
