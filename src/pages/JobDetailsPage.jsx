import { useEffect, useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { BadgeCheck, Briefcase, MapPin, Calendar, DollarSign, ArrowLeft, Heart } from 'lucide-react';
import { getPublicJob, getPublicCategories, getSeekerResumes, normalizeJob, applyToJob } from '../lib/jobs.js';
import { formatApiError, validateJobApplicationReadiness } from '../lib/formValidation.js';
import { useAuth } from '../lib/auth/AuthContext.jsx';
import { useSavedJobs } from '../lib/SavedJobsContext.jsx';
import Button from '../components/common/Button.jsx';
import Card from '../components/common/Card.jsx';
import LoadingSpinner from '../components/common/LoadingSpinner.jsx';
import InlineNotice from '../components/common/InlineNotice.jsx';
import ValidationAlert from '../components/common/ValidationAlert.jsx';

export default function JobDetailsPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { token, isAuthenticated, user, profile: authProfile } = useAuth();
  const { isSaved, toggleSaved } = useSavedJobs();
  const isSeeker = isAuthenticated && user?.role === 'seeker';

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [saveMessage, setSaveMessage] = useState('');
  const [applyState, setApplyState] = useState({
    loading: false,
    message: '',
    error: '',
    hints: [],
    profileHref: '',
  });
  const [seekerResumes, setSeekerResumes] = useState([]);
  const [applyReadiness, setApplyReadiness] = useState(null);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        setLoading(true);
        const [rawJob, categories] = await Promise.all([
          getPublicJob(jobId),
          getPublicCategories(),
        ]);
        if (active) {
          setJob(normalizeJob(rawJob, categories));
          setError(null);
        }
      } catch (err) {
        if (active) setError(err.message || 'Job not found');
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [jobId]);

  useEffect(() => {
    if (!isSeeker || !token) {
      setSeekerResumes([]);
      setApplyReadiness(null);
      return;
    }
    let active = true;
    async function loadResumes() {
      try {
        const list = await getSeekerResumes(token);
        if (!active) return;
        setSeekerResumes(list || []);
        setApplyReadiness(
          validateJobApplicationReadiness({
            profile: { defaultResumePath: authProfile?.default_resume_path || '' },
            resumes: list || [],
          }),
        );
      } catch {
        if (active) {
          setSeekerResumes([]);
          setApplyReadiness({
            ok: false,
            message: 'We could not load your resume status.',
            hints: ['Open My Profile to upload a PDF resume before applying.'],
            profileHref: '/dashboard/profile',
          });
        }
      }
    }
    loadResumes();
    return () => {
      active = false;
    };
  }, [isSeeker, token, authProfile?.default_resume_path]);

  const saved = useMemo(() => isSaved(jobId), [isSaved, jobId]);

  const handleSaveToggle = async () => {
    setSaveMessage('');
    if (!isAuthenticated) {
      navigate('/sign-in');
      return;
    }
    if (!isSeeker) {
      setSaveMessage('Only job seekers can save jobs.');
      return;
    }
    try {
      await toggleSaved(jobId);
    } catch (err) {
      setSaveMessage(err.message || 'Failed to update saved job.');
    }
  };

  const handleApply = async (event) => {
    event?.preventDefault();
    if (!isAuthenticated || !token) {
      navigate('/sign-in');
      return;
    }
    if (!isSeeker) {
      setApplyState({
        loading: false,
        message: '',
        error: 'Only job seekers can apply to jobs.',
        hints: [],
        profileHref: '',
      });
      return;
    }

    const readiness =
      applyReadiness ||
      validateJobApplicationReadiness({
        profile: { defaultResumePath: authProfile?.default_resume_path || '' },
        resumes: seekerResumes,
      });

    if (!readiness.ok) {
      setApplyState({
        loading: false,
        message: '',
        error: readiness.message,
        hints: readiness.hints || [],
        profileHref: readiness.profileHref || '',
      });
      return;
    }

    setApplyState({ loading: true, message: '', error: '', hints: [], profileHref: '' });
    try {
      await applyToJob(
        jobId,
        token,
        coverLetter.trim() || undefined,
        readiness.resumePath,
      );
      setApplyState({
        loading: false,
        message: 'Application submitted successfully.',
        error: '',
        hints: [],
        profileHref: '',
      });
    } catch (err) {
      setApplyState({
        loading: false,
        message: '',
        error: formatApiError(err, 'Failed to submit application.'),
        hints:
          err?.code === 'RESUME_REQUIRED'
            ? ['Upload a PDF resume on My Profile, then apply again.']
            : [],
        profileHref: err?.code === 'RESUME_REQUIRED' ? '/dashboard/profile' : '',
      });
    }
  };

  if (loading) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center bg-brand-bg px-4 py-24 text-brand-white">
        <LoadingSpinner label="Loading job details..." />
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

          {saveMessage ? <InlineNotice tone="error" className="mt-6">{saveMessage}</InlineNotice> : null}

          {isSeeker && applyReadiness && !applyReadiness.ok && !applyState.message ? (
            <ValidationAlert
              className="mt-6"
              title="Before you apply"
              message={applyReadiness.message}
              hints={applyReadiness.hints}
              actionHref={applyReadiness.profileHref}
              actionLabel="Upload resume on My Profile"
            />
          ) : null}

          {isSeeker && !applyState.message ? (
            <label className="mt-6 block">
              <span className="mb-1.5 block text-sm font-medium text-white/90">Cover letter (optional)</span>
              <textarea
                rows={4}
                value={coverLetter}
                onChange={(event) => setCoverLetter(event.target.value)}
                placeholder="Add a short note for the employer..."
                className="w-full rounded-lg border border-white/10 bg-[#0c1220] px-3.5 py-2.5 text-sm text-white outline-none placeholder:text-brand-muted focus:border-brand-accent"
              />
            </label>
          ) : null}

          {applyState.message ? (
            <InlineNotice tone="success" className="mt-6">
              {applyState.message}
            </InlineNotice>
          ) : null}

          {applyState.error ? (
            <ValidationAlert
              className="mt-6"
              message={applyState.error}
              hints={applyState.hints}
              actionHref={applyState.profileHref}
              actionLabel={applyState.profileHref ? 'Go to My Profile' : undefined}
            />
          ) : null}

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
