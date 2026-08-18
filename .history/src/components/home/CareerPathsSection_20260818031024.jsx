import { Briefcase, Building2, RefreshCw, Map } from 'lucide-react';
import { careerPathCategories } from '../../data/categories.js';
import SectionHeading from '../common/SectionHeading.jsx';
import CategoryGrid from './CategoryGrid.jsx';
import StatsBar from './StatsBar.jsx';

const careerStats = [
  {
    id: 'jobs',
    value: '12,000+ Tech Jobs',
    label: '',
    subtext: 'Updated daily from top employers',
    icon: Briefcase,
  },
  {
    id: 'companies',
    value: '2,500+ Hiring Companies',
    label: '',
    subtext: 'Verified and actively hiring',
    icon: Building2,
  },
  {
    id: 'remote',
    value: 'Remote Roles Updated Daily',
    label: '',
    subtext: 'New opportunities every day',
    icon: RefreshCw,
  },
  {
    id: 'canada',
    value: 'Opportunities Across Canada',
    label: '',
    subtext: 'Coast to coast job opportunities',
    icon: Map,
  },
];

export default function CareerPathsSection() {
  return (
    <section className="bg-brand-bg pb-8">
      <div className="container-page">
        <SectionHeading
          title="Explore Popular"
          accent="IT Career Paths"
          subtitle="Browse roles by category and find your perfect match."
        />
        <CategoryGrid items={careerPathCategories} columns={6} />
        <div className="mt-6">
          <StatsBar stats={careerStats} />
        </div>
      </div>
    </section>
  );
}
