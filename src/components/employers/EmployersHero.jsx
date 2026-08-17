import { Briefcase, MessageCircle } from 'lucide-react';
import { images } from '../../data/images.js';
import { heroCopy } from '../../data/employersPage.js';
import Badge from '../common/Badge.jsx';
import Button from '../common/Button.jsx';
import MapleLeafIcon from '../common/MapleLeafIcon.jsx';
import CanadaMapDecor from './CanadaMapDecor.jsx';
import EmployerFeatureHighlights from './EmployerFeatureHighlights.jsx';

export default function EmployersHero() {
  return (
    <section className="page-hero bg-brand-bg">
      <div className="container-page grid items-center gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Badge icon={MapleLeafIcon}>
            <span className="text-brand-accent">{heroCopy.badge}</span>
          </Badge>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-brand-white md:text-5xl lg:text-[3.4rem]">
            {heroCopy.title}{' '}
            <span className="text-brand-accent">{heroCopy.accent}</span>{' '}
            {heroCopy.after}
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-brand-muted md:text-lg">
            {heroCopy.subtitle}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button to="/post-job" icon={Briefcase}>
              Post a Job
            </Button>
            <Button
              href="mailto:hello@itechjobline.ca"
              variant="outline"
              icon={MessageCircle}
            >
              Contact Sales
            </Button>
          </div>
        </div>

        <div className="relative lg:col-span-5">
          <CanadaMapDecor className="pointer-events-none absolute -right-4 -top-8 h-40 w-56 opacity-70" />
          <img
            src={images.employersHero}
            alt="IT professionals collaborating in an office"
            className="relative z-10 h-[280px] w-full rounded-xl object-cover object-center sm:h-[360px] lg:h-[400px]"
          />
        </div>
      </div>

      <div className="container-page mt-8 pb-8">
        <EmployerFeatureHighlights />
      </div>
    </section>
  );
}
