import AboutHero from '../components/sections/about/AboutHero.jsx';
import MissionVisionValues from '../components/sections/about/MissionVisionValues.jsx';
import HowWeSupport from '../components/sections/about/HowWeSupport.jsx';
import TeamCommitment from '../components/sections/about/TeamCommitment.jsx';

export default function AboutPage() {
  return (
    <div className="bg-brand-bg">
      <AboutHero />
      <MissionVisionValues />
      <HowWeSupport />
      <TeamCommitment />
    </div>
  );
}
