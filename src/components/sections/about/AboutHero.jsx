import { Cloud, Code2, Search, Briefcase } from 'lucide-react';
import { aboutHeroPhoto } from '../../../assets/images/about.js';
import { aboutHeroStats } from '../../../data/aboutHeroStats.js';
import Button from '../../common/Button.jsx';
import SectionEyebrow from '../../common/SectionEyebrow.jsx';
import StatCard from '../jobs/StatCard.jsx';

export default function AboutHero() {
  return (
    <section className="bg-brand-bg pt-6 pb-10">
      <div className="container-page">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionEyebrow label="About Us" />
            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-brand-white md:text-5xl lg:text-[3.4rem]">
              About <span className="text-brand-accent">iTech</span> Jobline
            </h1>
            <p className="mt-5 max-w-xl text-base font-semibold leading-relaxed text-brand-white/90 md:text-lg">
              Canada&apos;s trusted IT job board connecting top tech talent with leading employers.
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-brand-muted">
              We help software developers, cloud engineers, cybersecurity specialists, data
              professionals, and IT support talent find meaningful work with verified Canadian
              employers.
            </p>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-brand-muted">
              From startups to enterprise teams, iTech Jobline makes it easier to discover remote,
              hybrid, and on-site roles in every province — and apply with confidence.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button to="/jobs" variant="gradient" icon={Search}>
                Browse Jobs
              </Button>
              <Button to="/post-job" variant="outline" icon={Briefcase}>
                Post a Job
              </Button>
            </div>
          </div>

          <div className="relative">
            <img
              src={aboutHeroPhoto}
              alt="Tech professionals collaborating around a laptop in a Canadian office"
              className="h-[280px] w-full rounded-2xl object-cover object-center sm:h-[360px] lg:h-[420px]"
            />
            <span className="absolute left-4 top-6 flex h-11 w-11 items-center justify-center rounded-xl border border-brand-accent/50 bg-brand-bg/80 text-brand-accent shadow-card">
              <Cloud className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="absolute bottom-8 right-5 flex h-11 w-11 items-center justify-center rounded-xl border border-brand-accent/50 bg-brand-bg/80 text-brand-accent shadow-card">
              <Code2 className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="absolute right-10 top-10 h-2.5 w-2.5 rounded-full bg-brand-accent shadow-card" aria-hidden="true" />
            <span className="absolute bottom-16 left-8 h-2 w-2 rounded-full bg-red-500/80" aria-hidden="true" />
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {aboutHeroStats.map((stat) => (
            <StatCard key={stat.id} {...stat} showChevron={false} />
          ))}
        </div>
      </div>
    </section>
  );
}
