import { contactMethods } from '../../data/contactMethods.js';

export default function ContactMethodCards() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {contactMethods.map((item) => {
        const Icon = item.icon;
        return (
          <article
            key={item.id}
            className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0b1224]/75 p-4"
          >
            <Icon className="h-5 w-5 text-brand-accent" strokeWidth={1.75} aria-hidden="true" />
            <h3 className="mt-3 text-[15px] font-semibold text-white">{item.title}</h3>
            <p className="mt-1 text-[13px] leading-snug text-white/65">{item.description}</p>
            <a
              href={item.href}
              className="mt-2 inline-block text-[13px] font-semibold text-brand-accent hover:text-brand-accentHover"
            >
              {item.value}
            </a>
            <span
              className="absolute inset-x-0 bottom-0 h-[2px] bg-brand-accent shadow-[0_0_10px_rgba(47,143,255,0.9)]"
              aria-hidden="true"
            />
          </article>
        );
      })}
    </div>
  );
}
