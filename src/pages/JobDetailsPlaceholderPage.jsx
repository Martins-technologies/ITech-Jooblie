import { useParams } from 'react-router-dom';
import { mockJobs } from '../data/mockJobs.js';
import Button from '../components/common/Button.jsx';

export default function JobDetailsPlaceholderPage() {
  const { jobId } = useParams();
  const job = mockJobs.find((item) => item.id === jobId);

  return (
    <section className="flex min-h-[60vh] items-center justify-center px-4 py-24">
      <div className="max-w-lg text-center">
        <p className="text-4xl" aria-hidden="true">
          🚧
        </p>
        <h1 className="mt-4 text-3xl font-bold text-brand-white md:text-4xl">
          {job ? job.title : 'Job details'}
        </h1>
        {job ? (
          <p className="mt-2 text-brand-accent">{job.company}</p>
        ) : (
          <p className="mt-2 text-brand-muted">This listing is not in the mock dataset.</p>
        )}
        <p className="mt-4 text-brand-muted">Job details page coming in a future module.</p>
        <Button to="/jobs" className="mt-8">
          Back to Browse Jobs
        </Button>
      </div>
    </section>
  );
}
