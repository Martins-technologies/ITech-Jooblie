import { Briefcase, Building2, DollarSign, Lock, MapPin, Send } from 'lucide-react';
import { jobTypeOptions, salaryRangeOptions } from '../../../data/mockJobs.js';
import usePostJobForm from '../../../hooks/usePostJobForm.js';
import Button from '../../common/Button.jsx';
import Card from '../../common/Card.jsx';
import IconBadge from '../../common/IconBadge.jsx';
import Input from '../../common/Input.jsx';
import Select from '../../common/Select.jsx';

export default function PostJobForm() {
  const { values, errors, submitted, update, handleSubmit, resetSubmitted } = usePostJobForm();

  return (
    <Card hover={false} className="scroll-mt-24 p-6 shadow-card md:p-8" id="post-job-form">
      <div className="mb-6 flex items-center gap-3">
        <IconBadge icon={Briefcase} className="h-11 w-11 rounded-full" />
        <h2 className="text-xl font-bold text-brand-white">Start Posting Your Job</h2>
      </div>

      {submitted ? (
        <div className="space-y-4">
          <p className="rounded-lg border border-brand-accent/40 bg-brand-accent/10 p-4 text-sm text-brand-white">
            Your job details were captured. A live posting API will be connected in a future
            module — for now this confirmation is local only.
          </p>
          <Button type="button" variant="outline" className="w-full" onClick={resetSubmitted}>
            Post another job
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <Input
            id="post-job-title"
            name="title"
            label="Job Title"
            required
            placeholder="e.g. Senior Software Engineer"
            value={values.title}
            onChange={update('title')}
            error={errors.title}
          />
          <Input
            id="post-job-location"
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
            id="post-job-type"
            name="jobType"
            label="Job Type"
            required
            value={values.jobType}
            onChange={update('jobType')}
            error={errors.jobType}
            options={jobTypeOptions}
          />
          <Select
            id="post-job-salary"
            name="salaryRange"
            label="Salary Range"
            required
            icon={DollarSign}
            value={values.salaryRange}
            onChange={update('salaryRange')}
            error={errors.salaryRange}
            options={salaryRangeOptions}
          />
          <Input
            id="post-job-company"
            name="company"
            label="Company Name"
            required
            icon={Building2}
            placeholder="Your company name"
            value={values.company}
            onChange={update('company')}
            error={errors.company}
            autoComplete="organization"
          />
          <p className="flex items-center gap-2 text-xs text-brand-muted">
            <Lock className="h-3.5 w-3.5 shrink-0 text-brand-accent" aria-hidden="true" />
            Your information is secure and will not be shared.
          </p>
          <Button type="submit" variant="gradient" icon={Send} className="w-full">
            Post Job
          </Button>
        </form>
      )}
    </Card>
  );
}
