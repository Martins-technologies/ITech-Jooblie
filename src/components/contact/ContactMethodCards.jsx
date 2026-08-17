import { contactMethods } from '../../data/contactMethods.js';
import Card from '../common/Card.jsx';

export default function ContactMethodCards() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {contactMethods.map((item) => {
        const Icon = item.icon;
        return (
          <Card
            key={item.id}
            hover={false}
            className="relative overflow-hidden border-brand-accent/20 bg-brand-card/80 p-4 shadow-[0_12px_24px_-12px_rgba(47,143,255,0.45)] backdrop-blur-sm"
          >
            <Icon className="h-6 w-6 text-brand-accent" strokeWidth={1.75} aria-hidden="true" />
            <h3 className="mt-3 font-semibold text-brand-white">{item.title}</h3>
            <p className="mt-1 text-sm leading-snug text-brand-white/80">{item.description}</p>
            <a
              href={item.href}
              className="mt-2 inline-block text-sm font-semibold text-brand-accent hover:text-brand-accentHover"
            >
              {item.value}
            </a>
            <span
              className="absolute inset-x-0 bottom-0 h-0.5 bg-brand-accent shadow-[0_0_12px_rgba(47,143,255,0.8)]"
              aria-hidden="true"
            />
          </Card>
        );
      })}
    </div>
  );
}
