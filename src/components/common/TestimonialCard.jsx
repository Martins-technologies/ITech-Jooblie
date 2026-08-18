import { Quote } from 'lucide-react';
import Card from './Card.jsx';

export default function TestimonialCard({ name, role, quote, avatar, initials }) {
  return (
    <Card hover className="flex h-full flex-col p-6">
      <Quote className="h-8 w-8 text-brand-accent" aria-hidden="true" />
      <p className="mt-4 flex-1 text-sm leading-relaxed text-brand-muted italic md:text-base">
        {quote}
      </p>
      <div className="mt-6 flex items-center gap-3 border-t border-brand-border/30 pt-5">
        {initials ? (
          <span
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-accent text-sm font-bold text-brand-white"
            aria-hidden="true"
          >
            {initials}
          </span>
        ) : (
          <img
            src={avatar}
            alt=""
            className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-brand-accent/40"
          />
        )}
        <div>
          <p className="font-semibold text-brand-white">{name}</p>
          <p className="text-sm text-brand-muted">{role}</p>
        </div>
      </div>
    </Card>
  );
}
