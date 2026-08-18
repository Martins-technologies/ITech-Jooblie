import { whyEmployerFeatures } from '../../data/employersPage.js';
import SectionHeading from '../common/SectionHeading.jsx';
import WhyEmployerCard from './WhyEmployerCard.jsx';
import CanadaMapDecor from './CanadaMapDecor.jsx';

export default function WhyEmployersChooseSection() {
  return (
    <section className="bg-brand-bg pb-8">
      <div className="container-page">
        <div className="relative mb-2">
          <CanadaMapDecor className="pointer-events-none absolute right-0 top-0 hidden h-28 w-44 md:block" />
          <SectionHeading
            align="left"
            title="Why Employers Choose"
            accent="iTech Jobline"
            subtitle="Connect with qualified IT professionals across Canada in software development, cloud, cybersecurity, data, AI, and IT support roles. Post jobs, review candidates, and hire with confidence."
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyEmployerFeatures.map((item) => (
            <WhyEmployerCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
