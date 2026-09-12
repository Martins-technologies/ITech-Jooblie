import { Briefcase, Building2, RefreshCw, Map } from 'lucide-react';
import { careerPathCategories } from '../../data/categories.js';
import useServiceCareCategories from '../../hooks/useServiceCareCategories.js';
import SectionHeading from '../common/SectionHeading.jsx';
import CategoryGrid from './CategoryGrid.jsx';
import StatsBar from './StatsBar.jsx';

const careerStats = [
  {
    id: 'jobs',
    value: '12,000+',
    label: 'Tech Jobs',
    subtext: 'Updated daily from top employers.',
    icon: Briefcase,
  },
  {
    id: 'companies',
    value: '2,500+',
    label: 'Hiring Companies',
    subtext: 'Verified and actively hiring.',
    icon: Building2,
  },
  {
    id: 'remote',
    value: 'Remote Roles',
    label: 'Updated Daily',
    subtext: 'New opportunities every day.',
    icon: RefreshCw,
  },
  {
    id: 'canada',
    value: 'Opportunities',
    label: 'Across Canada',
    subtext: 'Coast to coast job opportunities.',
    icon: Map,
  },
];

const slugify = (text) =>
  (text || '')
    .toLowerCase()
    .replace(/ & /g, '-')
    .replace(/[^a-z0-9]+/g, '-');

export default function CareerPathsSection() {
  const { categories, loading, error } = useServiceCareCategories();

  const availableSlugs = new Set(categories.map((c) => slugify(c.name)));
  const filteredCategories = careerPathCategories.filter((card) =>
    availableSlugs.has(card.id)
  );

  return (
    <section className="bg-brand-bg pb-8">
      <div className="container-page">
        <SectionHeading
          compact
          title="Explore Popular"
          accent="IT Career Paths"
          subtitle="Browse roles by category and find your perfect match."
        />
        {loading && (
          <div className="py-8 text-center text-sm text-brand-muted">Loading categories...</div>
        )}
        {error && (
          <div className="py-8 text-center text-sm text-red-400">{error}</div>
        )}
        {!loading && !error && (
          <CategoryGrid items={filteredCategories} columns={6} />
        )}
        <div className="mt-6">
          <StatsBar stats={careerStats} />
        </div>
      </div>
    </section>
  );
}

