import { useState } from 'react';
import { images } from '../../data/images.js';
import { popularSearches } from '../../data/categories.js';
import Badge from '../common/Badge.jsx';
import MapleLeafIcon from '../common/MapleLeafIcon.jsx';
import SearchBar from './SearchBar.jsx';
import PopularSearches from './PopularSearches.jsx';

export default function HeroSection() {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();
    // Placeholder: later this will navigate to /jobs?query=...&location=...
    console.log({ query, location });
  };

  return (
    <section className="relative overflow-hidden bg-brand-bg pb-6 pt-12 md:pt-16 lg:pt-20">
      <div
        className="pointer-events-none absolute inset-0 bg-dot-grid opacity-40"
        style={{ backgroundSize: '22px 22px' }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute -right-24 top-10 h-[420px] w-[420px] rounded-full bg-brand-accent/10 blur-3xl" />

      <div className="container-page relative grid items-center gap-10 lg:grid-cols-2">
        <div>
          <Badge icon={MapleLeafIcon}>Canada&apos;s IT Job Destination</Badge>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-brand-white md:text-5xl lg:text-[3.4rem]">
            Find <span className="text-brand-accent">Top IT Jobs</span> Across Canada
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-brand-muted md:text-lg">
            Explore software development, cloud, cybersecurity, data, AI, and IT
            support roles with trusted employers across Canada.
          </p>

          <div className="mt-8 max-w-2xl">
            <SearchBar
              query={query}
              location={location}
              onQueryChange={setQuery}
              onLocationChange={setLocation}
              onSearch={handleSearch}
            />
            <PopularSearches items={popularSearches} onSelect={setQuery} />
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 rounded-full border border-dashed border-brand-accent/20" aria-hidden="true" />
          <div className="absolute -right-6 top-8 h-40 w-40 rounded-full bg-brand-accent/20 blur-2xl" aria-hidden="true" />
          <img
            src={images.heroTeam}
            alt="IT professionals collaborating around a laptop in a Canadian office"
            className="relative z-10 h-[280px] w-full rounded-2xl object-cover object-center shadow-card sm:h-[360px] lg:h-[440px]"
          />
        </div>
      </div>
    </section>
  );
}
