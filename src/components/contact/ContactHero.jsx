import { Mail } from 'lucide-react';
import { images } from '../../data/images.js';
import MapleLeafIcon from '../common/MapleLeafIcon.jsx';
import SectionEyebrow from '../common/SectionEyebrow.jsx';
import ContactForm from './ContactForm.jsx';
import ContactMethodCards from './ContactMethodCards.jsx';

export default function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-brand-bg pt-6 pb-10">
      <img
        src={images.contactHero}
        alt="Night office overlooking a Canadian city skyline"
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 object-cover opacity-40 lg:block"
      />
      <div className="pointer-events-none absolute right-[18%] top-16 hidden lg:block">
        <Mail className="h-40 w-40 text-brand-accent/30" strokeWidth={1} />
      </div>

      <div className="container-page relative grid items-start gap-10 lg:grid-cols-2">
        <div>
          <SectionEyebrow label="Contact Us" />
          <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-brand-white md:text-5xl lg:text-[3.4rem]">
            Contact <span className="text-brand-accent">iTech Jobline</span>
          </h1>
          <p className="mt-5 max-w-xl text-base font-medium leading-relaxed text-brand-white/90 md:text-lg">
            We help Canadian job seekers and employers connect across software, cloud,
            cybersecurity, data, AI, and IT support.
          </p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-brand-muted">
            Reach our team for candidate support, hiring solutions, partnerships, or
            technical help. We are here from coast to coast.
          </p>

          <div className="mt-10">
            <ContactMethodCards />
          </div>

          <div className="mt-8 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-accent/40 bg-brand-accent/10">
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

        <div className="relative z-10 lg:pt-4">
          <img
            src={images.contactHero}
            alt=""
            className="mb-4 h-40 w-full rounded-xl object-cover lg:hidden"
          />
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
