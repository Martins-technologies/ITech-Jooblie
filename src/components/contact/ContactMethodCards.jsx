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
          <IconBadge icon={item.icon} />
          <h3 className="mt-4 font-semibold text-brand-white">{item.title}</h3>
          <p className="mt-1 text-sm text-brand-muted">{item.description}</p>
          <a
            href={item.href}
            className="mt-3 inline-block text-sm font-semibold text-brand-accent hover:text-brand-accentHover"
          >
            {item.value}
          </a>
          <span className="absolute inset-x-0 bottom-0 h-0.5 bg-brand-accent" aria-hidden="true" />
        </Card>
      ))}
    </div>
  );
}
