import { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BadgeCheck, Briefcase, MapPin, Calendar, DollarSign, ArrowLeft, Heart } from 'lucide-react';
import { getPublicJob, getServiceCareCategories, normalizeJob, applyToJob, recordJobView } from '../lib/jobs.js';
import { useAuth } from '../lib/auth/AuthContext.jsx';
import { useSavedJobs } from '../lib/SavedJobsContext.jsx';
import Button from '../components/common/Button.jsx';
import Card from '../components/common/Card.jsx';

export default function JobDetailsPage() {
  const { jobId } = useParams();
  const { token, isAuthenticated } = useAuth();
  const { isSaved, toggleSaved } = useSavedJobs();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [applyState, setApplyState] = useState({
    loading: false,
    message: '',
    error: '',
  });

  // Fetch job details & categories, and record view
  useEffect(() => {
    let active = true;
    async function load() {
      try {
        setLoading(true);
        const [rawJob, categories] = await Promise.all([
          getPublicJob(jobId),
          getServiceCareCategories(),
        ]);
        if (active) {
          const normalized = normalizeJob(rawJob, categories);
          setJob(normalized);
          setError(null);
        }

        // Record job view asynchronously
        recordJobView(jobId).catch((err) =>
          console.error('Failed to record job view', err)
        );
      } catch (err) {
        if (active) {
          setError(err.message || 'Job not found');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [jobId]);

  const saved = useMemo(() => isSaved(jobId), [isSaved, jobId]);

  const handleSaveToggle = async () => {
    if (!isAuthenticated) {
      alert('Please sign in to save jobs.');
      return;
    }
    try {
      await toggleSaved(jobId);
    } catch {
      alert('Failed to save/unsave job listing.');
    }
  };

  const handleApply = async (event) => {
    event?.preventDefault();
    if (!isAuthenticated || !token) {
      alert('Please sign in to apply.');
      return;
    }
    setApplyState({ loading: true, message: '', error: '' });
    try {
      await applyToJob(jobId, token, undefined);
      setApplyState({
        loading: false,
        message: 'Application submitted successfully!',
        error: '',
      });
    } catch (err) {
      setApplyState({
        loading: false,
        message: '',
        error: err.message || 'Failed to submit application. Please try again.',
      });
    }
  };

  if (loading) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center bg-brand-bg px-4 py-24 text-brand-white">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-accent border-t-transparent mx-auto"></div>
          <p className="mt-4 text-brand-muted">Loading job details...</p>
        </div>
      </section>
    );
  }

  if (error || !job) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center bg-brand-bg px-4 py-24 text-brand-white">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold text-brand-white">Job not found</h1>
          <p className="mt-2 text-brand-muted">{error || 'The job you are looking for does not exist.'}</p>
          <Button to="/jobs" className="mt-6">
            Back to Browse Jobs
          </Button>
        </div>
      </section>
    );
  }

  return (
    <div className="bg-brand-bg py-8 min-h-[calc(100vh-72px)] text-brand-white">
      <div className="container-page max-w-4xl">
        <Link
          to="/jobs"
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-accent hover:text-brand-accentHover mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Browse Jobs
        </Link>

        <Card hover={false} className="p-6 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand-accent/10 border border-brand-accent/20">
                {job.icon ? (
                  <job.icon className="h-7 w-7 text-brand-accent" />
                ) : (
                  <Briefcase className="h-7 w-7 text-brand-accent" />
                )}
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-brand-white leading-tight">
                  {job.title}
                </h1>
                <p className="mt-2 flex items-center gap-1.5 text-base font-semibold text-brand-muted">
                  {job.company}
                  {job.verified && (
                    <BadgeCheck className="h-4.5 w-4.5 text-brand-accent" aria-label="Verified employer" />
                  )}
                </p>
                <div className="mt-4 flex flex-wrap gap-y-2 gap-x-4 text-sm text-brand-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-brand-accent" />
                    {job.location}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Briefcase className="h-4 w-4 text-brand-accent" />
                    {job.jobType} ({job.workModel})
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <DollarSign className="h-4 w-4 text-brand-accent" />
                    {job.salaryLabel}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-brand-accent" />
                    Posted {job.postedLabel}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 self-stretch md:self-start justify-end mt-4 md:mt-0">
              <button
                type="button"
                onClick={handleSaveToggle}
                className={`flex h-11 w-11 items-center justify-center rounded-lg border transition-all duration-200 ${
                  saved
                    ? 'border-red-500 bg-red-500/10 text-red-500'
                    : 'border-white/10 hover:border-white/30 text-brand-muted hover:text-brand-white'
                }`}
                aria-label={saved ? 'Unsave job' : 'Save job'}
              >
                <Heart className={`h-5 w-5 ${saved ? 'fill-current' : ''}`} />
              </button>

              {isAuthenticated ? (
                <Button
                  onClick={handleApply}
                  variant="accent"
                  className="flex-1 md:flex-initial h-11 px-6 font-bold"
                  disabled={applyState.loading || !!applyState.message}
                >
                  {applyState.loading ? 'Applying...' : applyState.message ? 'Applied' : 'Apply Now'}
                </Button>
              ) : (
                <Button to="/sign-in" variant="accent" className="flex-1 md:flex-initial h-11 px-6 font-bold">
                  Sign In to Apply
                </Button>
              )}
            </div>
          </div>

          {applyState.message && (
            <div className="mt-6 p-4 rounded-xl border border-brand-accent/40 bg-brand-accent/15 text-sm text-brand-white">
              {applyState.message}
            </div>
          )}

          {applyState.error && (
            <div className="mt-6 p-4 rounded-xl border border-red-500/40 bg-red-500/15 text-sm text-red-400">
              {applyState.error}
            </div>
          )}

          <div className="mt-8 border-t border-white/10 pt-8">
            <h2 className="text-xl font-bold text-brand-white mb-4">Job Description</h2>
            <div className="prose prose-invert max-w-none text-brand-muted leading-relaxed text-sm md:text-base whitespace-pre-line">
              {job.description || 'No description provided for this job listing.'}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
