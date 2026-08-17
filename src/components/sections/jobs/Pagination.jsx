import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  perPage,
  onPerPageChange,
}) {
  const pages = getPageItems(currentPage, totalPages);

  return (
    <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <nav aria-label="Job results pages" className="flex flex-wrap items-center gap-1.5">
        <PageButton
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          label="Previous"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </PageButton>

        {pages.map((item, index) =>
          item === '...' ? (
            <span key={`ellipsis-${index}`} className="px-2 text-brand-muted">
              …
            </span>
          ) : (
            <button
              key={item}
              type="button"
              aria-current={item === currentPage ? 'page' : undefined}
              onClick={() => onPageChange(item)}
              className={`h-9 min-w-9 rounded-full px-3 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-brand-accent ${
                item === currentPage
                  ? 'bg-brand-accent text-brand-white'
                  : 'text-brand-muted hover:bg-brand-accent/10 hover:text-brand-white'
              }`}
            >
              {item}
            </button>
          ),
        )}

        <PageButton
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          label="Next"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </PageButton>
      </nav>

      <label className="flex items-center gap-2 text-sm text-brand-muted">
        Show:
        <select
          value={perPage}
          onChange={(event) => onPerPageChange(Number(event.target.value))}
          className="rounded-lg border border-brand-border/40 bg-brand-card px-3 py-2 text-sm text-brand-white outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
        >
          <option value={6}>6 per page</option>
          <option value={12}>12 per page</option>
          <option value={24}>24 per page</option>
        </select>
      </label>
    </div>
  );
}

function PageButton({ disabled, onClick, label, children }) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-brand-muted hover:text-brand-white focus-visible:ring-2 focus-visible:ring-brand-accent disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  );
}

function getPageItems(current, total) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }
  if (current <= 4) return [1, 2, 3, 4, 5, '...', total];
  if (current >= total - 3) {
    return [1, '...', total - 4, total - 3, total - 2, total - 1, total];
  }
  return [1, '...', current - 1, current, current + 1, '...', total];
}
