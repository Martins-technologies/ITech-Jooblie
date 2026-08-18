import { ChevronDown } from 'lucide-react';

export default function Accordion({ items = [], openId, onToggle }) {
  return (
    <div className="space-y-3">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className="overflow-hidden rounded-xl border border-brand-border/40 bg-brand-card"
          >
            <button
              type="button"
              className="flex w-full items-center justify-between gap-3 p-4 text-left focus-visible:ring-2 focus-visible:ring-brand-accent"
              aria-expanded={isOpen}
              onClick={() => onToggle(item.id)}
            >
              <span className="font-semibold text-brand-white">{item.question}</span>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-brand-accent transition-transform duration-200 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-200 ${
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-4 pb-4 text-sm leading-relaxed text-brand-muted">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
