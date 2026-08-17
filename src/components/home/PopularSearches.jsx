/** Clickable search pills that fill the hero keyword field. */
export default function PopularSearches({ items, onSelect }) {
  return (
    <div className="mt-5 flex flex-nowrap items-center gap-x-4 overflow-x-auto text-sm whitespace-nowrap">
      <span className="shrink-0 text-brand-muted">Popular searches:</span>
      {items.map((tag) => (
        <button
          key={tag}
          type="button"
          onClick={() => onSelect(tag)}
          className="shrink-0 font-medium text-brand-accent transition-colors hover:text-brand-accentHover"
        >
          # {tag}
        </button>
      ))}
    </div>
  );
}
