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
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
          {hiringCategories.map((item) => (
            <HiringCategoryCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
