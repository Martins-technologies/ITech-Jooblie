import EmployersHero from '../components/employers/EmployersHero.jsx';
import WhyEmployersChooseSection from '../components/employers/WhyEmployersChooseSection.jsx';
import HiringCategoriesSection from '../components/employers/HiringCategoriesSection.jsx';
import EmployersCTABanner from '../components/employers/EmployersCTABanner.jsx';
import HowHiringWorksSection from '../components/employers/HowHiringWorksSection.jsx';
import ModernHiringSection from '../components/employers/ModernHiringSection.jsx';
import EmployerTestimonialsSection from '../components/employers/EmployerTestimonialsSection.jsx';
import EmployerPricingSection from '../components/employers/EmployerPricingSection.jsx';
import EmployerFAQSection from '../components/employers/EmployerFAQSection.jsx';

export default function EmployersPage() {
  return (
    <div className="bg-brand-bg">
      <EmployersHero />
      <WhyEmployersChooseSection />
      <HiringCategoriesSection />
      <EmployersCTABanner />
      <HowHiringWorksSection />
      <ModernHiringSection />
      <EmployerTestimonialsSection />
      <EmployerPricingSection />
      <EmployerFAQSection />
    </div>
  );
}
