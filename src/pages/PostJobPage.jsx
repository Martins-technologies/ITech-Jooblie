import PostJobHero from '../components/sections/post-job/PostJobHero.jsx';
import HowPostingWorks from '../components/sections/post-job/HowPostingWorks.jsx';
import WhyEmployersChoose from '../components/sections/post-job/WhyEmployersChoose.jsx';
import PricingPlans from '../components/sections/post-job/PricingPlans.jsx';
import EmployerTestimonials from '../components/sections/post-job/EmployerTestimonials.jsx';
import ClosingCtaFaq from '../components/sections/post-job/ClosingCtaFaq.jsx';

export default function PostJobPage() {
  return (
    <div className="bg-brand-bg">
      <PostJobHero />
      <HowPostingWorks />
      <WhyEmployersChoose />
      <PricingPlans />
      <EmployerTestimonials />
      <ClosingCtaFaq />
    </div>
  );
}
