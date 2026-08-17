import { whyEmployersChoose } from '../../../data/whyEmployersChoose.js';
import MapleLeafIcon from '../../common/MapleLeafIcon.jsx';
import IconTitleCard from '../../common/IconTitleCard.jsx';
import SectionHeading from '../../common/SectionHeading.jsx';

export default function WhyEmployersChoose() {
  return (
    <section className="relative overflow-hidden section-alt py-12 md:py-16">
      <MapleLeafIcon
        variant="outline"
        className="pointer-events-none absolute -right-8 -top-6 h-48 w-48 text-brand-accent/10"
      />

      <div className="container-page relative">
        <SectionHeading
          title="Why Employers Choose"
          accent="iTech Jobline"
          subtitle="The trusted platform for hiring IT and tech professionals across Canada."
        />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {whyEmployersChoose.map((item) => (
            <IconTitleCard
              key={item.id}
              icon={item.icon}
              title={item.title}
              description={item.description}
              underline
            />
          ))}
        </div>
      </div>
    </section>
  );
}
