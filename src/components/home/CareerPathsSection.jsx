import { Briefcase, Building2, RefreshCw, Map } from 'lucide-react';
import { careerPathCategories } from '../../data/categories.js';
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

export default function CareerPathsSection() {
  return (
    <section className="bg-brand-bg pb-8">
      <div className="container-page">
        <SectionHeading
          compact
          title="Explore Popular"
          accent="IT Career Paths"
          subtitle="Browse roles by category and find your perfect match."
        />
        <CategoryGrid items={careerPathCategories} />
        <div className="mt-6">
          <StatsBar stats={careerStats} />
        </div>
      </div>
    </section>
  );
}
