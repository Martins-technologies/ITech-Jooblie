/** Clickable search pills that fill the hero keyword field. */
export default function PopularSearches({ items, onSelect }) {
  return (
    <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
      <span className="text-brand-muted">Popular searches:</span>
      {items.map((tag) => (
        <button
          key={tag}
          type="button"
          onClick={() => onSelect(tag)}
          className="font-medium text-brand-accent transition-colors hover:text-brand-accentHover"
        >
          # {tag}
        </button>
      ))}
    </div>
  );
}
