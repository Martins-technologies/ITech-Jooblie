import { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, Calendar, CheckCircle, Clock, Eye, AlertCircle, Bookmark } from 'lucide-react';
import { getMyApplications, getPublicJobs } from '../../lib/jobs.js';
import { useAuth } from '../../lib/auth/AuthContext.jsx';
import Card from '../../components/common/Card.jsx';
import Button from '../../components/common/Button.jsx';

export default function DashboardHome() {
  const { token, isAuthenticated, user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Redirect to Sign In if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/sign-in');
    }
  }, [isAuthenticated, authLoading, navigate]);

  // Fetch applications and public jobs lists
  useEffect(() => {
    async function loadDashboard() {
      if (!isAuthenticated || !token) return;
      try {
        setLoading(true);
        const [rawApps, rawJobs] = await Promise.all([
          getMyApplications(token),
          getPublicJobs({ limit: 100 }).catch(() => []), // fallback if jobs api fails
        ]);
        setApplications(rawApps || []);
        setJobs(rawJobs || []);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to load dashboard data.');
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, [token, isAuthenticated]);

  // Map application jobId to job title & company details
  const resolvedApplications = useMemo(() => {
    const jobMap = new Map(jobs.map((j) => [String(j.id), j]));
    return applications.map((app) => {
      const job = jobMap.get(String(app.job_id));
      return {
        ...app,
        jobTitle: job ? job.title : 'IT Professional Position',
        jobCompany: job ? job.company?.name : 'Technology Corp',
        jobLocation: job ? `${job.city}, ${job.province}` : 'Canada',
        jobPeriod: job ? job.salary_period : 'yearly',
      };
    });
  }, [applications, jobs]);

  // Group count metrics
  const statusCounts = useMemo(() => {
    const counts = { total: applications.length, reviewing: 0, interviewing: 0, offered: 0, rejected: 0 };
    applications.forEach((app) => {
      const status = (app.status || '').toLowerCase();
      if (status.includes('interview')) counts.interviewing++;
      else if (status.includes('offer')) counts.offered++;
      else if (status.includes('reject')) counts.rejected++;
      else counts.reviewing++;
    });
    return counts;
  }, [applications]);

  if (authLoading || loading) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center bg-brand-bg px-4 py-24 text-brand-white">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-accent border-t-transparent mx-auto"></div>
          <p className="mt-4 text-brand-muted">Loading your dashboard...</p>
        </div>
      </section>
    );
  }

  return (
    <div className="bg-brand-bg py-8 min-h-[calc(100vh-72px)] text-brand-white">
      <div className="container-page">
        {/* Welcome Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-brand-white tracking-tight">
              Welcome back, {user?.full_name || 'Job Seeker'}
            </h1>
            <p className="text-sm text-brand-muted mt-1.5">
              Manage your job applications, profile status, and saved job searches here.
            </p>
          </div>
          <Button to="/jobs" variant="accent" className="font-bold shrink-0">
            Browse Tech Jobs
          </Button>
        </div>

        {error && (
          <div className="mb-8 flex items-center gap-3 rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-400">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* Status Counts Breakdown (omitted if no applications exist) */}
        {applications.length > 0 && (
          <div className="mb-8 grid gap-4 grid-cols-2 lg:grid-cols-4">
            <StatsCard
              icon={Briefcase}
              label="Total Applications"
              value={statusCounts.total}
              accent="brand-accent"
            />
            <StatsCard
              icon={Clock}
              label="Under Review"
              value={statusCounts.reviewing}
              accent="brand-accent"
            />
            <StatsCard
              icon={Eye}
              label="Interviews"
              value={statusCounts.interviewing}
              accent="amber-400"
            />
            <StatsCard
              icon={CheckCircle}
              label="Offers Received"
              value={statusCounts.offered}
              accent="status-success"
            />
          </div>
        )}

        {/* Dashboard Grid */}
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Applications list */}
          <div className="lg:col-span-8">
            <h2 className="text-xl font-bold text-brand-white mb-4">Your Applications</h2>
            {resolvedApplications.length ? (
              <div className="space-y-4">
                {resolvedApplications.map((app) => (
                  <Card key={app.id} hover={false} className="p-5 flex items-center gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-accent/15 border border-brand-accent/20">
                      <Briefcase className="h-5 w-5 text-brand-accent" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-brand-white truncate">
                        <Link to={`/jobs/${app.job_id}`} className="hover:underline">
                          {app.jobTitle}
                        </Link>
                      </h3>
                      <p className="text-sm text-brand-muted mt-0.5">{app.jobCompany} &bull; {app.jobLocation}</p>
                      <div className="mt-2 flex items-center gap-3 text-xs text-brand-muted">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          Applied {new Date(app.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wider ${
                        app.status?.toLowerCase().includes('offer')
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : app.status?.toLowerCase().includes('reject')
                          ? 'bg-red-500/10 text-red-400 border border-red-500/30'
                          : app.status?.toLowerCase().includes('interview')
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                          : 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                      }`}
                    >
                      {app.status || 'Applied'}
                    </span>
                  </Card>
                ))}
              </div>
            ) : (
              <Card hover={false} className="p-8 text-center border border-white/5 bg-brand-card">
                <p className="text-brand-muted text-sm">
                  You haven&apos;t submitted any job applications yet.
                </p>
                <Button to="/jobs" variant="outline" className="mt-4 px-5 py-2">
                  Find a Job
                </Button>
              </Card>
            )}
          </div>

          {/* Quick Actions Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <Card hover={false} className="p-6">
              <h3 className="text-lg font-bold text-brand-white mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm text-brand-muted">
                <li>
                  <Link to="/jobs" className="hover:text-brand-accent flex items-center gap-2 py-1.5 transition-colors">
                    <Bookmark className="h-4 w-4 text-brand-accent" />
                    Browse Saved Jobs
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-brand-accent flex items-center gap-2 py-1.5 transition-colors">
                    <Briefcase className="h-4 w-4 text-brand-accent" />
                    Career Resource Guide
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-brand-accent flex items-center gap-2 py-1.5 transition-colors">
                    <Clock className="h-4 w-4 text-brand-accent" />
                    Need help? Contact support
                  </Link>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatsCard({ icon: Icon, label, value, accent }) {
  return (
    <Card hover={false} className="p-4 flex items-center gap-4 border border-white/5">
      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-${accent}/10`}>
        <Icon className={`h-5 w-5 text-${accent}`} />
      </div>
      <div>
        <p className="text-2xl font-black text-brand-white">{value}</p>
        <p className="text-xs text-brand-muted font-medium mt-0.5 leading-snug">{label}</p>
      </div>
    </Card>
  );
}
