import { Mail } from 'lucide-react';
import { images } from '../../data/images.js';
import MapleLeafIcon from '../common/MapleLeafIcon.jsx';
import SectionEyebrow from '../common/SectionEyebrow.jsx';
import ContactForm from './ContactForm.jsx';
import ContactMethodCards from './ContactMethodCards.jsx';

export default function ContactHero() {
  return (
    <section className="overflow-hidden bg-[#0b0f19]">
      <div className="grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <div className="px-4 py-10 md:px-8 lg:py-14 lg:pl-[max(2rem,calc((100vw-80rem)/2+3rem))] lg:pr-10">
          <SectionEyebrow label="Contact Us" />

          <div className="relative mt-3 max-w-xl">
            <h1 className="text-4xl font-extrabold leading-[1.15] tracking-tight text-white md:text-5xl lg:text-[52px]">
              Contact <span className="text-brand-accent">iTech Jobline</span>
            </h1>
            <Mail
              className="pointer-events-none absolute -right-4 top-1 hidden h-20 w-20 text-brand-accent drop-shadow-[0_0_16px_rgba(47,143,255,0.8)] md:block"
              strokeWidth={1.15}
              aria-hidden="true"
            />
          </div>

          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-white/90">
            We&apos;re here to help job seekers and employers connect with Canada&apos;s top tech
            talent.
          </p>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/70">
            Reach our team for candidate support, hiring solutions, partnerships, or technical
            help. We are here from coast to coast.
          </p>

          <div className="mt-8">
            <ContactMethodCards />
          </div>

          <div className="mt-8 flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-accent">
              <MapleLeafIcon className="h-5 w-5 text-white" />
            </span>
            <div>
              <p className="font-semibold text-white">Proudly Canadian.</p>
              <p className="text-sm text-white/70">
                Supporting IT talent and businesses across Canada.
              </p>
            </div>
          </div>
        </div>

        <div className="relative min-h-[640px]">
          <img
            src={images.contactFormBg}
            alt="Night office overlooking a Canadian city skyline"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="relative z-10 flex h-full items-center justify-center px-6 py-12">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
