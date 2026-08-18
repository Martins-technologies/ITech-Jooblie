import { Mail, Search } from 'lucide-react';
import { images } from '../../data/images.js';
import SectionEyebrow from '../common/SectionEyebrow.jsx';
import Button from '../common/Button.jsx';
import Card from '../common/Card.jsx';

export default function LetsConnectBanner() {
  return (
    <section className="bg-brand-bg pb-12">
      <div className="container-page">
        <Card
          hover={false}
          className="grid items-center gap-8 overflow-hidden p-6 shadow-card md:p-10 lg:grid-cols-2"
        >
          <div>
            <SectionEyebrow label="Let's Connect" />
            <h2 className="mt-4 text-3xl font-bold text-brand-white md:text-4xl">
              Let&apos;s Connect With Canada&apos;s{' '}
              <span className="text-brand-accent">Tech Hiring</span> Community
            </h2>
            <p className="mt-4 max-w-xl text-brand-muted">
              Whether you are hiring or looking for your next IT role, iTech Jobline
              connects talent and employers across Canada.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button href="#contact-form" variant="gradient" icon={Mail}>
                Contact Us
              </Button>
              <Button to="/jobs" variant="outline" icon={Search}>
                Browse Jobs
              </Button>
            </div>
          </div>
          <img
            src={images.contactConnect}
            alt="Network map connecting tech talent across Canada"
            className="h-56 w-full rounded-xl object-cover md:h-72"
          />
        </Card>
      </div>
    </section>
  );
}
