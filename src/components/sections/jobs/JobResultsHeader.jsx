const sortOptions = [
  { value: 'recent', label: 'Most Recent' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'salary-high', label: 'Salary: High to Low' },
  { value: 'salary-low', label: 'Salary: Low to High' },
  { value: 'title', label: 'Title A–Z' },
];

export default function JobResultsHeader({ from, to, total, sortBy, onSortChange }) {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-brand-muted">
        Showing {from}–{to} of <span className="font-bold text-brand-accent">{total}</span> IT jobs
      </p>
      <label className="flex items-center gap-2 text-sm text-brand-muted">
        Sort by:
        <select
          value={sortBy}
          onChange={(event) => onSortChange(event.target.value)}
          className="rounded-lg border border-brand-border/40 bg-brand-card px-3 py-2 text-sm text-brand-white outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
