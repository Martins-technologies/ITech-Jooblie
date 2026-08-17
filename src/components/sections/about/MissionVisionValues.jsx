import { aboutMissionPhoto } from '../../../assets/images/about.js';
import { missionVisionValues } from '../../../data/missionVisionValues.js';
import { communityStats } from '../../../data/communityStats.js';
import SectionEyebrow from '../../common/SectionEyebrow.jsx';
import SectionHeading from '../../common/SectionHeading.jsx';
import IconTitleCard from '../../common/IconTitleCard.jsx';
import StatCard from '../jobs/StatCard.jsx';
import CanadaDotMap from '../../graphics/CanadaDotMap.jsx';

export default function MissionVisionValues() {
  return (
    <section className="bg-brand-bg py-10">
      <div className="container-page">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionEyebrow label="About Us" />
            <SectionHeading
              align="left"
              className="mt-4 mb-0"
              title="Our"
              accent="Mission, Vision & Values"
              subtitle="We exist to connect IT professionals with employers across Canada through a trusted, modern job board built for tech."
            />
          </div>
          <div className="relative">
            <img
              src={aboutMissionPhoto}
              alt="Canadian city skyline at night"
              className="h-[240px] w-full rounded-2xl object-cover object-center opacity-80 sm:h-[300px]"
            />
            <CanadaDotMap className="pointer-events-none absolute inset-0 h-full w-full opacity-80" />
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {missionVisionValues.map((item) => (
            <IconTitleCard key={item.id} {...item} layout="stacked" underline />
          ))}
        </div>

        <div className="mt-16">
          <SectionEyebrow label="Why iTech Jobline Matters" />
          <SectionHeading
            align="left"
            className="mt-4"
            title="Built for"
            accent="Canada's Tech Community"
            subtitle="The platform makes it easier for professionals to find opportunities that match their skills, location, and career goals."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {communityStats.map((stat) => (
              <StatCard key={stat.id} {...stat} showChevron={false} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
