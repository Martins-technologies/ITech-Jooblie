import { employerFeatures } from '../../data/postJobPage.js';
import SectionHeading from '../common/SectionHeading.jsx';
import EmployerFeatureCard from './EmployerFeatureCard.jsx';

export default function EmployerFeaturesSection() {
  return (
    <section className="bg-brand-bg pb-8">
      <div className="container-page">
        <SectionHeading
          title="Everything You Need to Hire Smarter"
          subtitle="Powerful tools to help Canadian employers attract, manage, and hire top tech talent."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {employerFeatures.map((item) => (
            <EmployerFeatureCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
