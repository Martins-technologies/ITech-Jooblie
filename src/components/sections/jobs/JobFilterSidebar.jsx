import { Search, Briefcase, BarChart3, Monitor, DollarSign, MapPin, Filter } from 'lucide-react';
import Button from '../../common/Button.jsx';
import Checkbox from '../../common/Checkbox.jsx';
import {
  jobTypeOptions,
  jobTypeChecks,
  experienceOptions,
  workModelOptions,
  workModelChecks,
  salaryRangeOptions,
} from '../../../data/jobFilterOptions.js';

const fieldClass =
  'w-full rounded-lg border border-brand-border/40 bg-brand-bg px-3 py-2.5 text-sm text-brand-white outline-none placeholder:text-brand-muted focus-visible:ring-2 focus-visible:ring-brand-accent';

export default function JobFilterSidebar({ filters }) {
  const { draft, update, toggleList, applyFilters, clearAll } = filters;

  return (
    <form
      onSubmit={applyFilters}
      className="rounded-2xl border border-brand-border/40 bg-brand-card p-5"
    >
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-bold text-brand-white">Filter Jobs</h2>
        <button
          type="button"
          onClick={clearAll}
          className="text-sm font-medium text-brand-accent hover:underline focus-visible:ring-2 focus-visible:ring-brand-accent"
        >
          Clear All
        </button>
      </div>

      <FilterGroup icon={Search} label="Keyword" htmlFor="filter-keyword">
        <input
          id="filter-keyword"
          type="text"
          value={draft.keyword}
          onChange={update('keyword')}
          placeholder="Job title, skills, or company"
          className={fieldClass}
        />
      </FilterGroup>

      <FilterGroup icon={Briefcase} label="Job Type" htmlFor="filter-job-type">
        <select
          id="filter-job-type"
          value={draft.jobType}
          onChange={update('jobType')}
          className={fieldClass}
        >
          {jobTypeOptions.map((option) => (
            <option key={option.label} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="mt-3 space-y-2">
          {jobTypeChecks.map((item) => (
            <Checkbox
              key={item}
              id={`job-type-${item}`}
              label={item}
              checked={draft.jobTypes.includes(item)}
              onChange={() => toggleList('jobTypes', item)}
            />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup icon={BarChart3} label="Experience Level" htmlFor="filter-experience">
        <select
          id="filter-experience"
          value={draft.experience}
          onChange={update('experience')}
          className={fieldClass}
        >
          {experienceOptions.map((option) => (
            <option key={option.label} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </FilterGroup>

      <FilterGroup icon={Monitor} label="Work Model" htmlFor="filter-work-model">
        <select
          id="filter-work-model"
          value={draft.workModel}
          onChange={update('workModel')}
          className={fieldClass}
        >
          {workModelOptions.map((option) => (
            <option key={option.label} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="mt-3 space-y-2">
          {workModelChecks.map((item) => (
            <Checkbox
              key={item}
              id={`work-model-${item}`}
              label={item}
              checked={draft.workModels.includes(item)}
              onChange={() => toggleList('workModels', item)}
            />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup icon={DollarSign} label="Salary Range" htmlFor="filter-salary">
        <select
          id="filter-salary"
          value={draft.salaryRange}
          onChange={update('salaryRange')}
          className={fieldClass}
        >
          {salaryRangeOptions.map((option) => (
            <option key={option.label} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </FilterGroup>

      <FilterGroup icon={MapPin} label="Location" htmlFor="filter-location">
        <input
          id="filter-location"
          type="text"
          value={draft.location}
          onChange={update('location')}
          placeholder="City, province, or remote"
          className={fieldClass}
        />
      </FilterGroup>

      <Button type="submit" variant="accent" icon={Filter} className="mt-2 w-full">
        Apply Filters
      </Button>
    </form>
  );
}

function FilterGroup({ icon: Icon, label, htmlFor, children }) {
  return (
    <div className="mb-5">
      <label htmlFor={htmlFor} className="mb-2 flex items-center gap-2 text-sm font-semibold text-brand-white">
        <Icon className="h-4 w-4 text-brand-accent" aria-hidden="true" />
        {label}
      </label>
      {children}
    </div>
  );
}
