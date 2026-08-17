import { images } from '../../data/images.js';
import MapleLeafIcon from '../common/MapleLeafIcon.jsx';
import SectionEyebrow from '../common/SectionEyebrow.jsx';
import ContactForm from './ContactForm.jsx';
import ContactMethodCards from './ContactMethodCards.jsx';

export default function ContactHero() {
  return (
    <section className="overflow-hidden bg-[#0b0f19]">
      <div className="grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <div className="px-4 py-6 md:px-8 lg:py-8 lg:pl-[max(2rem,calc((100vw-80rem)/2+3rem))] lg:pr-8">
          <SectionEyebrow label="Contact Us" />

          <h1 className="mt-2 max-w-xl text-3xl font-extrabold leading-tight tracking-tight text-white md:text-4xl lg:text-[42px]">
            Contact <span className="text-brand-accent">iTech Jobline</span>
          </h1>

          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/90">
            We&apos;re here to help job seekers and employers connect with Canada&apos;s top tech
            talent.
          </p>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/70">
            Reach our team for candidate support, hiring solutions, partnerships, or technical
            help. We are here from coast to coast.
          </p>

          <div className="mt-5">
            <ContactMethodCards />
          </div>

          <div className="mt-5 flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-accent">
              <MapleLeafIcon className="h-4 w-4 text-white" />
            </span>
            <div>
              <p className="text-sm font-semibold text-white">Proudly Canadian.</p>
              <p className="text-xs text-white/70">
                Supporting IT talent and businesses across Canada.
              </p>
            </div>
          </div>
        </div>

        <div className="relative">
          <img
            src={images.contactFormBg}
            alt="Night office overlooking a Canadian city skyline"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="relative z-10 flex h-full items-center justify-center px-5 py-6 lg:px-8 lg:py-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
