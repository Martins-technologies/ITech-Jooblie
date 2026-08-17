import { Users, Send, MessageCircle } from 'lucide-react';
import { images } from '../../data/images.js';
import { heroCopy, heroFeatures } from '../../data/postJobPage.js';
import Badge from '../common/Badge.jsx';
import Button from '../common/Button.jsx';
import MapleLeafIcon from '../common/MapleLeafIcon.jsx';
import EmployerFeatureCard from './EmployerFeatureCard.jsx';
import EmployerStatsBar from './EmployerStatsBar.jsx';

export default function PostJobHero() {
  return (
    <section className="bg-brand-bg pt-4">
      <div className="container-page grid items-center gap-8 lg:grid-cols-2">
        <div>
          <Badge icon={Users}>{heroCopy.badge}</Badge>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-brand-white md:text-5xl">
            {heroCopy.title}{' '}
            <span className="text-brand-accent">{heroCopy.accent}</span>{' '}
            {heroCopy.after}
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-brand-muted md:text-lg">
            {heroCopy.subtitle}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button to="/post-job/create" variant="gradient" icon={Send}>
              Create Job Post
            </Button>
            <Button
              href="mailto:hello@itechjobline.ca"
              variant="outline"
              icon={MessageCircle}
            >
              Talk to Sales
            </Button>
          </div>
        </div>

        <div className="relative">
          <div
            className="pointer-events-none absolute -inset-6 bg-dot-grid opacity-50"
            style={{ backgroundSize: '18px 18px' }}
            aria-hidden="true"
          />
          <MapleLeafIcon
            variant="outline"
            className="pointer-events-none absolute -left-4 bottom-6 h-28 w-28 text-brand-accent/20"
          />
          <div className="pointer-events-none absolute -right-8 top-4 h-40 w-40 rounded-full bg-brand-accent/20 blur-3xl" />
          <img
            src={images.postJobHero}
            alt="Employers and tech professionals collaborating around a laptop"
            className="relative z-10 h-[280px] w-full rounded-2xl object-cover object-center sm:h-[360px] lg:h-[400px]"
          />
        </div>
      </div>

      <div className="container-page mt-8 space-y-8 pb-8">
        <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr))]">
          {heroFeatures.map((item) => (
            <EmployerFeatureCard key={item.id} {...item} />
          ))}
        </div>
        <EmployerStatsBar />
      </div>
    </section>
  );
}
