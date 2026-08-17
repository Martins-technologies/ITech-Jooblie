import PostJobHero from '../components/post-job/PostJobHero.jsx';
import HowPostingWorksSection from '../components/post-job/HowPostingWorksSection.jsx';
import EmployerFeaturesSection from '../components/post-job/EmployerFeaturesSection.jsx';
import EmployerCTABanner from '../components/post-job/EmployerCTABanner.jsx';

export default function PostJobPage() {
  return (
    <div className="bg-brand-bg">
      <PostJobHero />
      <HowPostingWorksSection />
      <EmployerFeaturesSection />
      <EmployerCTABanner />
    </div>
  );
}
