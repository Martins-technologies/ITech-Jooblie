import { Search, LayoutGrid, MapPin, ChevronDown } from 'lucide-react';
import Button from '../../common/Button.jsx';
import { jobCategories } from '../../../data/jobCategories.js';

const categoryOptions = [
  { value: '', label: 'Any category' },
  ...jobCategories.map((item) => ({ value: item.id, label: item.title })),
];

export default function JobSearchBar({ draft, onChange, onSubmit }) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full flex-col overflow-hidden rounded-2xl bg-white shadow-card lg:flex-row lg:items-stretch"
    >
      <SearchField
        icon={Search}
        label="Keyword"
        htmlFor="jobs-keyword"
      >
        <input
          id="jobs-keyword"
          type="text"
          value={draft.keyword}
          onChange={onChange('keyword')}
          placeholder="Job title, skills, or company"
          className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-brand-accent"
        />
      </SearchField>

      <Divider />

      <SearchField icon={LayoutGrid} label="Category" htmlFor="jobs-category">
        <div className="relative">
          <select
            id="jobs-category"
            value={draft.category}
            onChange={onChange('category')}
            className="w-full appearance-none bg-transparent pr-6 text-sm text-slate-800 outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
          >
            {categoryOptions.map((option) => (
              <option key={option.value || 'any'} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        </div>
      </SearchField>

      <Divider />

      <SearchField icon={MapPin} label="Location" htmlFor="jobs-location">
        <input
          id="jobs-location"
          type="text"
          value={draft.location}
          onChange={onChange('location')}
          placeholder="City, province, or remote"
          className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-brand-accent"
        />
      </SearchField>

      <Button
        type="submit"
        variant="accent"
        icon={Search}
        className="m-2 shrink-0 rounded-xl px-6 lg:min-h-[4.5rem] lg:rounded-xl"
      >
        Search Jobs
      </Button>
    </form>
  );
}

function SearchField({ icon: Icon, label, htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="flex flex-1 items-start gap-3 px-5 py-4">
      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" aria-hidden="true" />
      <span className="min-w-0 flex-1">
        <span className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
          {label}
        </span>
        <span className="mt-1 block">{children}</span>
      </span>
    </label>
  );
}

function Divider() {
  return <span className="hidden w-px self-stretch bg-slate-200 lg:block" aria-hidden="true" />;
}
