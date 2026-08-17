import { hiringCategories } from '../../data/employersPage.js';
import SectionHeading from '../common/SectionHeading.jsx';
import HiringCategoryCard from './HiringCategoryCard.jsx';

export default function HiringCategoriesSection() {
  return (
    <section className="bg-brand-bg pb-8">
      <div className="container-page">
        <SectionHeading
          align="left"
          title="Popular"
          accent="Hiring Categories"
        />
        <div className="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr))]">
          {hiringCategories.map((item) => (
            <HiringCategoryCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
