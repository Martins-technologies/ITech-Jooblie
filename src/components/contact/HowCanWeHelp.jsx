import { ArrowRight, Clock, Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { helpCategories, helpStats } from '../../data/helpCategories.js';
import SectionEyebrow from '../common/SectionEyebrow.jsx';
import Card from '../common/Card.jsx';
import IconBadge from '../common/IconBadge.jsx';
import Button from '../common/Button.jsx';
import SupportGraphic from './SupportGraphic.jsx';

const statIcons = {
  clock: Clock,
  calendar: Calendar,
  'map-pin': MapPin,
};

export default function HowCanWeHelp() {
  return (
    <section className="bg-brand-bg pb-12 pt-4">
      <div className="container-page">
        <div className="grid items-start gap-8 lg:grid-cols-2">
          <div>
            <SectionEyebrow label="Contact Us" />
            <h2 className="mt-4 text-3xl font-bold text-brand-white md:text-4xl">
              How Can We <span className="text-brand-accent">Help?</span>
            </h2>
            <p className="mt-4 max-w-xl text-brand-muted">
              Whether you are searching for your next IT role or hiring across Canada,
              our team is ready to point you in the right direction.
            </p>
          </div>
          <SupportGraphic />
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {helpCategories.map((item) => (
            <Card key={item.id} className="flex h-full flex-col p-5">
              <IconBadge icon={item.icon} />
              <h3 className="mt-4 font-semibold text-brand-white">{item.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-muted">
                {item.description}
              </p>
              {item.href ? (
                <a
                  href={item.href}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-accent"
                >
                  Learn more <ArrowRight className="h-4 w-4" />
                </a>
              ) : (
                <Link
                  to={item.to}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-accent"
                >
                  Learn more <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </Card>
          ))}
        </div>

        <Card hover={false} className="mt-8 grid gap-6 p-6 sm:grid-cols-3">
          {helpStats.map((stat, index) => {
            const Icon = statIcons[stat.icon];
            return (
              <div
                key={stat.id}
                className={`flex items-start gap-3 ${
                  index > 0 ? 'sm:border-l sm:border-brand-border/40 sm:pl-6' : ''
                }`}
              >
                <Icon className="mt-0.5 h-6 w-6 shrink-0 text-brand-accent" />
                <div>
                  <p className="text-sm text-brand-muted">{stat.label}</p>
                  <p className="font-semibold text-brand-white">{stat.value}</p>
                </div>
              </div>
            );
          })}
        </Card>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="#contact-form" variant="gradient">
            Send Inquiry
          </Button>
          <Button to="/post-job" variant="outline">
            Post a Job
          </Button>
        </div>
      </div>
    </section>
  );
}
