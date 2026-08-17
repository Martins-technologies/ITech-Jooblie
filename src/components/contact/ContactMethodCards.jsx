import { contactMethods } from '../../data/contactMethods.js';
import Card from '../common/Card.jsx';
import IconBadge from '../common/IconBadge.jsx';

export default function ContactMethodCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {contactMethods.map((item) => (
        <Card
          key={item.id}
          className="relative overflow-hidden p-5 shadow-[0_12px_24px_-12px_rgba(47,143,255,0.45)]"
        >
          <div className="flex items-start gap-3">
            <IconBadge icon={item.icon} className="h-10 w-10 shrink-0" />
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-brand-white">{item.title}</h3>
              <p className="mt-0.5 text-sm text-brand-muted">{item.description}</p>
              <a
                href={item.href}
                className="mt-2 inline-block text-sm font-semibold text-brand-accent hover:text-brand-accentHover"
              >
                {item.value}
              </a>
            </div>
          </div>
          <span className="absolute inset-x-0 bottom-0 h-0.5 bg-brand-accent" aria-hidden="true" />
        </Card>
      ))}
    </div>
  );
}
