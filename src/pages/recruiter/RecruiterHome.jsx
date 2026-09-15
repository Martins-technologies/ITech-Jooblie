import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Briefcase, Eye, UserCheck, AlertCircle, Plus, ChevronDown, ChevronUp } from 'lucide-react';
import { getRecruiterDashboard, getJobApplications } from '../../lib/jobs.js';
import { useAuth } from '../../lib/auth/AuthContext.jsx';
import Card from '../../components/common/Card.jsx';
import Button from '../../components/common/Button.jsx';

export default function RecruiterHome() {
  const { token, isAuthenticated, user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState({ applications: 0, views: 0, byJob: {} });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Track which job's applicants list is expanded
  const [expandedJobId, setExpandedJobId] = useState(null);

  // Redirect to Sign In if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/sign-in');
    } else if (!authLoading && isAuthenticated && user?.role !== 'employer') {
      navigate('/dashboard/overview');
    }
  }, [isAuthenticated, authLoading, navigate, user?.role]);

  useEffect(() => {
    async function loadRecruiterData() {
      if (!isAuthenticated || !token || user?.role !== 'employer') return;
      try {
        setLoading(true);
        const dashboard = await getRecruiterDashboard(token);
        const employerJobs = dashboard.jobs || [];
        setJobs(employerJobs);

        const detailPromises = employerJobs.map(async (job) => {
          const apps = await getJobApplications(job.id, token).catch(() => []);
          return {
            jobId: job.id,
            applicationsCount: job.applications_count ?? apps.length,
            applicationsList: apps,
            viewsCount: job.views_count ?? 0,
          };
        });

        const details = await Promise.all(detailPromises);
        let totalApps = dashboard.metrics?.applications || 0;
        let totalViews = dashboard.metrics?.views || 0;
        const byJob = {};
        details.forEach((item) => {
          byJob[item.jobId] = {
            applications: item.applicationsCount,
            applicationsList: item.applicationsList,
            views: item.viewsCount,
          };
        });
        if (!totalApps) {
          totalApps = details.reduce((sum, item) => sum + item.applicationsCount, 0);
        }
        if (!totalViews) {
          totalViews = details.reduce((sum, item) => sum + item.viewsCount, 0);
        }
        setStats({ applications: totalApps, views: totalViews, byJob });
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to load recruiter data.');
      } finally {
        setLoading(false);
      }
    }
    loadRecruiterData();
  }, [token, isAuthenticated, user?.role]);

  const toggleExpand = (jobId) => {
    setExpandedJobId(expandedJobId === jobId ? null : jobId);
  };

  if (authLoading || loading) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center bg-brand-bg px-4 py-24 text-brand-white">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-accent border-t-transparent mx-auto"></div>
          <p className="mt-4 text-brand-muted">Loading recruiter dashboard...</p>
        </div>
      </section>
    );
  }

  return (
    <div className="bg-brand-bg py-8 min-h-[calc(100vh-72px)] text-brand-white">
      <div className="container-page">
        {/* Recruiter Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-brand-white tracking-tight">
              Employer Dashboard
            </h1>
            <p className="text-sm text-brand-muted mt-1.5">
              Welcome back, {user?.full_name || 'Recruiter'}. View postings and review applicant pipelines.
            </p>
          </div>
          <Button to="/post-job/create" variant="accent" icon={Plus} className="font-bold shrink-0">
            Post a New Job
          </Button>
        </div>

        {error && (
          <div className="mb-8 flex items-center gap-3 rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-400">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* Aggregate Counters */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatsCard
            icon={Briefcase}
            label="Active Positions"
            value={jobs.length}
            accent="brand-accent"
          />
          <StatsCard
            icon={UserCheck}
            label="Total Applicants"
            value={stats.applications}
            accent="status-success"
          />
          <StatsCard
            icon={Eye}
            label="Job Views"
            value={stats.views}
            accent="amber-400"
          />
        </div>

        {/* Listings Section */}
        <div>
          <h2 className="text-xl font-bold text-brand-white mb-4">Your Job Openings</h2>

          {jobs.length ? (
            <div className="space-y-4">
              {jobs.map((job) => {
                const jobDetails = stats.byJob[job.id] || { applications: 0, views: 0, applicationsList: [] };
                const isExpanded = expandedJobId === job.id;

                return (
                  <Card key={job.id} hover={false} className="p-0 overflow-hidden border border-white/5">
                    {/* Job Row Summary */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-bold text-brand-white text-lg">
                            <Link to={`/jobs/${job.id}`} className="hover:underline">
                              {job.title}
                            </Link>
                          </h3>
                          <span
                            className={`rounded-full px-2 py-0.5 text-2xs font-semibold uppercase tracking-wider ${
                              job.status === 'active'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                                : 'bg-amber-500/10 text-amber-400 border border-amber-500/30 border-dashed'
                            }`}
                          >
                            {job.status || 'pending'}
                          </span>
                        </div>
                        <p className="text-xs text-brand-muted mt-1">Job ID: {job.id}</p>
                      </div>

                      <div className="flex items-center gap-6 text-sm text-brand-muted sm:justify-end">
                        <span>
                          <strong className="text-brand-white font-bold">{jobDetails.applications}</strong> applications
                        </span>
                        <span>
                          <strong className="text-brand-white font-bold">{jobDetails.views}</strong> views
                        </span>
                        <button
                          type="button"
                          onClick={() => toggleExpand(job.id)}
                          className="flex h-9 items-center gap-1.5 rounded-lg border border-white/10 px-3 text-xs font-semibold text-brand-white hover:bg-white/5"
                        >
                          Applicants
                          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Applicant Breakdown Drawer */}
                    {isExpanded && (
                      <div className="border-t border-white/5 bg-[#0f1524] p-5">
                        <h4 className="text-sm font-bold text-brand-white mb-3">Applicants List</h4>
                        {jobDetails.applicationsList.length ? (
                          <div className="space-y-3">
                            {jobDetails.applicationsList.map((app) => (
                              <div
                                key={app.id}
                                className="rounded-lg border border-white/5 bg-brand-card p-4 text-sm"
                              >
                                <div className="flex justify-between items-center mb-2">
                                  <span className="font-semibold text-brand-white">Applicant ID: {app.id}</span>
                                  <span className="text-xs uppercase tracking-wider text-brand-accent font-semibold">
                                    {app.status || 'Pending'}
                                  </span>
                                </div>
                                <p className="text-xs text-brand-muted italic mt-1 leading-relaxed">
                                  Cover letter:{' '}
                                  {app.cover_letter || 'No cover letter provided by candidate.'}
                                </p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-brand-muted italic">
                            No applications received yet for this listing.
                          </p>
                        )}
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card hover={false} className="p-8 text-center border border-white/5 bg-brand-card">
              <p className="text-brand-muted text-sm">
                No jobs posted yet. Start hiring by adding your first opening.
              </p>
              <Button to="/post-job/create" variant="accent" className="mt-4 px-5 py-2">
                Create Posting
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function StatsCard({ icon: Icon, label, value, accent }) {
  return (
    <Card hover={false} className="p-5 flex items-center gap-4 border border-white/5 bg-brand-card">
      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-${accent}/10 border border-${accent}/20`}>
        <Icon className={`h-6 w-6 text-${accent}`} />
      </div>
      <div>
        <p className="text-3xl font-black text-brand-white tracking-tight">{value}</p>
        <p className="text-xs text-brand-muted font-medium mt-1 leading-snug">{label}</p>
      </div>
    </Card>
  );
}
