import { Briefcase, Building2, DollarSign, MapPin } from 'lucide-react';
import { jobTypeOptions, salaryRangeOptions } from '../../data/jobFilterOptions.js';
import Button from '../common/Button.jsx';
import Card from '../common/Card.jsx';
import Input from '../common/Input.jsx';
import Select from '../common/Select.jsx';
import InlineNotice from '../common/InlineNotice.jsx';

export default function JobPostingForm({
  values,
  errors,
  update,
  onSubmit,
  onSaveDraft,
  heading = 'Post a New Job',
  showCard = true,
  categoryOptions = [],
  formError,
  submitting = false,
}) {
  const resolvedCategoryOptions = [
    { value: '', label: 'Select job category' },
    ...categoryOptions.map((item) => ({
      value: String(item.id),
      label: item.name || item.title || item.label,
    })),
  ];

  const formContent = (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <Input
        id="job-posting-title"
        name="title"
        label="Job Title"
        required
        placeholder="e.g. Senior Software Engineer"
        value={values.title}
        onChange={update('title')}
        error={errors.title}
      />
      <Input
        id="job-posting-company"
        name="company"
        label="Company Name"
        icon={Building2}
        placeholder="Bound from your recruiter company"
        value={values.company}
        onChange={update('company')}
        error={errors.company}
        autoComplete="organization"
        disabled
      />
      <Input
        id="job-posting-location"
        name="location"
        label="Location"
        required
        icon={MapPin}
        placeholder="City, province or remote"
        value={values.location}
        onChange={update('location')}
        error={errors.location}
      />
      <Select
        id="job-posting-category"
        name="categoryId"
        label="Job Category"
        required
        value={values.categoryId || values.category || ''}
        onChange={update('categoryId')}
        error={errors.category}
        options={resolvedCategoryOptions}
      />
      <Select
        id="job-posting-type"
        name="jobType"
        label="Employment Type"
        required
        value={values.jobType}
        onChange={update('jobType')}
        error={errors.jobType}
        options={jobTypeOptions}
      />
      <Select
        id="job-posting-salary"
        name="salaryRange"
        label="Salary Range"
        required
        icon={DollarSign}
        value={values.salaryRange}
        onChange={update('salaryRange')}
        error={errors.salaryRange}
        options={salaryRangeOptions}
      />
      <div>
        <label htmlFor="job-posting-description" className="mb-1.5 block text-sm font-medium text-brand-white">
          Job Description
        </label>
        <textarea
          id="job-posting-description"
          name="description"
          rows={5}
          required
          placeholder="Describe the role, responsibilities, and requirements..."
          value={values.description}
          onChange={update('description')}
          className={`w-full rounded-lg border bg-brand-card/50 px-4 py-2.5 text-sm text-brand-white placeholder:text-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-accent ${
            errors.description ? 'border-red-400' : 'border-white/10'
          }`}
        />
        {errors.description ? (
          <p className="mt-1 text-xs text-red-400">{errors.description}</p>
        ) : null}
      </div>
      <InlineNotice tone="error">{formError}</InlineNotice>
      <div className="flex flex-col gap-3 sm:flex-row">
        {onSaveDraft ? (
          <Button type="button" variant="outline" className="flex-1" onClick={onSaveDraft}>
            Save as Draft
          </Button>
        ) : null}
        <Button type="submit" variant="accent" className="flex-1" disabled={submitting}>
          {submitting ? 'Publishing...' : 'Publish Job'}
        </Button>
      </div>
    </form>
  );

  if (!showCard) {
    return (
      <div>
        <div className="mb-6 flex items-center gap-3">
          <Briefcase className="h-6 w-6 text-brand-accent" aria-hidden="true" />
          <h2 className="text-xl font-bold text-brand-white">{heading}</h2>
        </div>
        {formContent}
      </div>
    );
  }

  return (
    <Card hover={false} className="p-6 shadow-card md:p-8">
      <div className="mb-6 flex items-center gap-3">
        <Briefcase className="h-6 w-6 text-brand-accent" aria-hidden="true" />
        <h2 className="text-xl font-bold text-brand-white">{heading}</h2>
      </div>
      {formContent}
    </Card>
  );
}
