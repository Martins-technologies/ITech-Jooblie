import { Quote } from 'lucide-react';
import Card from './Card.jsx';

export default function TestimonialCard({ name, role, quote, avatar }) {
  return (
    <Card hover className="flex h-full flex-col p-6">
      <Quote className="h-8 w-8 text-brand-accent" aria-hidden="true" />
      <p className="mt-4 flex-1 text-sm leading-relaxed text-brand-muted italic md:text-base">
        {quote}
      </p>
      <div className="mt-6 flex items-center gap-3">
        <img
          src={avatar}
          alt=""
          className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-brand-accent/40"
        />
        <div>
          <p className="font-semibold text-brand-white">{name}</p>
          <p className="text-sm text-brand-muted">{role}</p>
        </div>
      </div>
    </Card>
  );
}
