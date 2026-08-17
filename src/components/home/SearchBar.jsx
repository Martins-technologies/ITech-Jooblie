import { Search, MapPin } from 'lucide-react';
import Button from '../common/Button.jsx';

/** Controlled hero search. `onSearch` currently logs the query; later it will navigate to /jobs. */
export default function SearchBar({
  query,
  location,
  onQueryChange,
  onLocationChange,
  onSearch,
}) {
  return (
    <form
      onSubmit={onSearch}
      className="flex w-full flex-col gap-2 rounded-2xl bg-brand-white p-2 shadow-card sm:flex-row sm:items-center sm:rounded-full sm:p-1.5"
    >
      <label className="flex flex-1 items-center gap-3 px-4 py-2">
        <Search className="h-5 w-5 shrink-0 text-slate-400" aria-hidden="true" />
        <input
          type="text"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Job title, keyword, or company"
          className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
          aria-label="Job title, keyword, or company"
        />
      </label>

      <span className="hidden h-8 w-px bg-slate-200 sm:block" aria-hidden="true" />

      <label className="flex flex-1 items-center gap-3 px-4 py-2">
        <MapPin className="h-5 w-5 shrink-0 text-slate-400" aria-hidden="true" />
        <input
          type="text"
          value={location}
          onChange={(event) => onLocationChange(event.target.value)}
          placeholder="Location"
          className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
          aria-label="Location"
        />
      </label>

      <Button type="submit" className="w-full rounded-xl sm:w-auto sm:rounded-full sm:px-7">
        Search Jobs
      </Button>
    </form>
  );
}
