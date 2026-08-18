import { quickSearches } from '../../../data/quickSearches.js';

export default function QuickSearches({ onSelect }) {
  return (
    <div className="mt-5 flex flex-wrap items-center gap-2.5">
      <span className="mr-1 text-sm text-brand-muted">Quick searches:</span>
      {quickSearches.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onSelect(item.keyword)}
          className="inline-flex items-center gap-2 rounded-full border border-brand-accent/50 bg-brand-card/60 px-3.5 py-1.5 text-sm text-brand-white transition-colors hover:bg-brand-accent hover:text-brand-white focus-visible:ring-2 focus-visible:ring-brand-accent"
        >
          <item.icon className="h-3.5 w-3.5 text-brand-accent" aria-hidden="true" />
          {item.label}
        </button>
      ))}
    </div>
  );
}
