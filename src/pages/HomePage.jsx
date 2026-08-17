import HeroSection from '../components/home/HeroSection.jsx';
import CategoryGrid from '../components/home/CategoryGrid.jsx';
import FeatureHighlights from '../components/home/FeatureHighlights.jsx';
import WhyChooseUsSection from '../components/home/WhyChooseUsSection.jsx';
import CareerPathsSection from '../components/home/CareerPathsSection.jsx';
import HowItWorksSection from '../components/home/HowItWorksSection.jsx';
import FeaturedJobsSection from '../components/home/FeaturedJobsSection.jsx';
import TestimonialsSection from '../components/home/TestimonialsSection.jsx';
import CareerResourcesSection from '../components/home/CareerResourcesSection.jsx';
import CTABanner from '../components/home/CTABanner.jsx';
import Card from '../components/common/Card.jsx';
import { heroCategories } from '../data/categories.js';

export default function HomePage() {
  return (
    <div className="bg-brand-bg">
      <section className="page-hero bg-brand-bg">
        <HeroSection />
        <div className="container-page mt-8 space-y-8 pb-8">
          <CategoryGrid items={heroCategories} columns={5} />
          <FeatureHighlights />
        </div>
      </section>

      <WhyChooseUsSection />
      <CareerPathsSection />

      <section className="bg-brand-bg">
        <div className="container-page grid grid-cols-1 gap-6 pb-8 lg:grid-cols-2">
          <Card hover={false} className="p-6 md:p-8">
            <HowItWorksSection />
          </Card>
          <Card hover={false} className="p-6 md:p-8">
            <FeaturedJobsSection />
          </Card>
        </div>
      </section>

      <TestimonialsSection />
      <CareerResourcesSection />
      <CTABanner align="split" />
    </div>
  );
}
