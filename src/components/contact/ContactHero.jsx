import { images } from '../../data/images.js';
import MapleLeafIcon from '../common/MapleLeafIcon.jsx';
import SectionEyebrow from '../common/SectionEyebrow.jsx';
import ContactForm from './ContactForm.jsx';
import ContactMethodCards from './ContactMethodCards.jsx';

export default function ContactHero() {
  return (
    <section className="page-hero relative overflow-hidden bg-[#0b0f19] pb-10 lg:pb-12">
      <div
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[62%] lg:block"
        aria-hidden="true"
      >
        <img
          src={images.contactFormBg}
          alt=""
          className="h-full w-full object-cover object-[68%_center]"
        />
        <div className="absolute inset-y-0 left-0 w-[38%] bg-gradient-to-r from-[#0b0f19] via-[#0b0f19]/50 to-transparent" />
      </div>

      <div className="container-page relative grid items-start gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SectionEyebrow label="Contact Us" className="tracking-[0.14em]" />

          <h1 className="mt-3 max-w-2xl text-4xl font-extrabold leading-[1.12] tracking-tight text-white md:text-5xl lg:text-[52px]">
            Contact <span className="text-brand-accent">iTech Jobline</span>
          </h1>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80">
            We&apos;re here to help job seekers and employers connect with Canada&apos;s top tech
            talent.
          </p>
          <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-white/65">
            Reach our team for candidate support, hiring solutions, partnerships, or technical
            help. We are here from coast to coast.
          </p>

          <div className="mt-7">
            <ContactMethodCards />
          </div>

          <div className="mt-6 flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-accent">
              <MapleLeafIcon className="h-5 w-5 text-white" />
            </span>
            <div>
              <p className="font-semibold text-white">Proudly Canadian.</p>
              <p className="text-sm text-white/65">
                Supporting IT talent and businesses across Canada.
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-10 lg:col-span-5">
          <div className="lg:ml-auto lg:w-[400px]">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
