import { MapPin, Briefcase } from 'lucide-react';
import Card from '../common/Card.jsx';
import Button from '../common/Button.jsx';

export default function JobCard({ title, company, location, type, icon: Icon, to }) {
  return (
    <Card hover className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-accent/10">
        <Icon className="h-6 w-6 text-brand-accent" aria-hidden="true" />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="font-semibold text-brand-white">{title}</h3>
        <p className="text-sm text-brand-muted">{company}</p>
      </div>

      <div className="flex flex-1 flex-col gap-1 text-sm text-brand-muted sm:max-w-[160px]">
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 text-brand-accent" />
          {location}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Briefcase className="h-3.5 w-3.5 text-brand-accent" />
          {type}
        </span>
      </div>

      <Button to={to} className="w-full shrink-0 sm:w-auto">
        Apply Now
      </Button>
    </Card>
  );
}
