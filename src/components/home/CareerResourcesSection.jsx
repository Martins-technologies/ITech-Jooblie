import { careerResources } from '../../data/careerResources.js';
import SectionHeading from '../common/SectionHeading.jsx';
import ResourceCard from './ResourceCard.jsx';

export default function CareerResourcesSection() {
  return (
    <section className="bg-brand-bg pb-8">
      <div className="container-page">
        <SectionHeading
          title="Career Resources for"
          accent="Tech Job Seekers"
          subtitle="Guides and advice to help you land your next IT role in Canada."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {careerResources.map((resource) => (
            <ResourceCard key={resource.id} {...resource} />
          ))}
        </div>
      </div>
    </section>
  );
}
