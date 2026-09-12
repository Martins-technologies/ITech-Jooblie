import { useState } from 'react';
import { images } from '../../data/images.js';
import { popularSearches } from '../../data/categories.js';
import SectionEyebrow from '../common/SectionEyebrow.jsx';
import SearchBar from './SearchBar.jsx';
import PopularSearches from './PopularSearches.jsx';

export default function HeroSection() {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();
    console.log({ query, location });
  };

  return (
    <div className="container-page grid items-center gap-8 lg:grid-cols-2">
      <div>
        <SectionEyebrow label="Home" />

        <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-brand-white md:text-5xl lg:text-[3.4rem]">
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

      <img
        src={images.heroTeam}
        alt="IT professionals collaborating around a laptop in a Canadian office"
        className="h-[280px] w-full rounded-2xl object-cover object-center sm:h-[360px] lg:h-[400px]"
      />
    </div>
  );
}
