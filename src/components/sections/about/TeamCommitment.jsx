import { Briefcase, Search } from 'lucide-react';
import { aboutTeamPhoto } from '../../../assets/images/about.js';
import { teamCommitmentFeatures } from '../../../data/teamCommitmentFeatures.js';
import SectionEyebrow from '../../common/SectionEyebrow.jsx';
import SectionHeading from '../../common/SectionHeading.jsx';
import IconTitleCard from '../../common/IconTitleCard.jsx';
import Button from '../../common/Button.jsx';
import CanadaDotMap from '../../graphics/CanadaDotMap.jsx';

export default function TeamCommitment() {
  return (
    <section className="bg-brand-bg py-10 pb-16">
      <div className="container-page">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionEyebrow label="About Us" />
            <SectionHeading
              align="left"
              className="mt-4 mb-0"
              as="h1"
              title="Our Team &"
              accent="Community"
              after="Commitment"
            />
            <p className="mt-5 max-w-xl text-base leading-relaxed text-brand-muted">
              Our team is dedicated to supporting Canada&apos;s IT workforce — from early-career
              developers to senior engineers and the employers who hire them.
            </p>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-brand-muted">
              We combine local market knowledge with a Canada-wide network so talent and hiring
              teams can connect faster, with more trust, in every province.
            </p>
          </div>

          <div className="relative">
            <img
              src={aboutTeamPhoto}
              alt="iTech Jobline team looking toward a glowing map of Canada"
              className="h-[260px] w-full rounded-2xl object-cover object-center sm:h-[340px]"
            />
            <CanadaDotMap className="pointer-events-none absolute inset-0 h-full w-full opacity-70" />
          </div>
        </div>

        <div className="mt-10 grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr))]">
          {teamCommitmentFeatures.map((item) => (
            <IconTitleCard key={item.id} {...item} layout="inline" underline />
          ))}
        </div>

        <div className="relative mt-12 overflow-hidden rounded-2xl border border-brand-border/40 bg-brand-card px-6 py-10 shadow-card md:px-10">
          <div
            className="pointer-events-none absolute inset-0 bg-dot-grid opacity-30"
            style={{ backgroundSize: '20px 20px' }}
            aria-hidden="true"
          />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-brand-white md:text-3xl">
                Ready to take the next step?
              </h2>
              <p className="mt-2 max-w-xl text-brand-muted">
                Find your next opportunity or hire top tech talent today.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button to="/jobs" variant="gradient" icon={Search}>
                Browse Jobs
              </Button>
              <Button to="/post-job" variant="outline" icon={Briefcase}>
                Post a Job
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
