import { images } from '../../../data/images.js';
import { heroStats } from '../../../data/heroStats.js';
import SectionEyebrow from '../../common/SectionEyebrow.jsx';
import CanadaDotMap from '../../graphics/CanadaDotMap.jsx';
import JobSearchBar from './JobSearchBar.jsx';
import QuickSearches from './QuickSearches.jsx';
import StatCard from './StatCard.jsx';

export default function JobsHero({ search }) {
  return (
    <section className="page-hero relative overflow-hidden bg-brand-bg pb-10">
      <CanadaDotMap className="pointer-events-none absolute inset-0 h-full w-full opacity-20" />

      <div className="container-page relative">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <SectionEyebrow label="Browse Jobs" />
            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-brand-white md:text-5xl lg:text-[3.4rem]">
              Browse{' '}
              <span className="bg-gradient-to-r from-brand-accent to-cyan-300 bg-clip-text text-transparent">
                IT Jobs
              </span>{' '}
              Across Canada
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-brand-muted md:text-lg">
              Discover thousands of software, cloud, cybersecurity, data, and IT support roles
              from verified employers across Canada. Filter by skill, location, and work model
              to find your next opportunity.
            </p>
          </div>

          <div className="relative">
            <CanadaDotMap className="pointer-events-none absolute -right-6 -top-8 h-44 w-64 opacity-70" />
            <img
              src={images.jobsHero}
              alt="IT professionals collaborating at a laptop"
              className="relative z-10 h-[260px] w-full rounded-2xl object-cover object-center sm:h-[340px] lg:h-[380px]"
            />
          </div>
        </div>

        <div className="relative z-10 mt-8">
          <JobSearchBar
            draft={search.draft}
            onChange={search.update}
            onSubmit={search.submitSearch}
          />
          <QuickSearches onSelect={search.searchFromKeyword} />
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {heroStats.map((stat) => (
            <StatCard key={stat.id} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
