/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useAuth } from '../lib/auth/AuthContext.jsx';
import { useSavedJobs } from '../lib/SavedJobsContext.jsx';
import {
  applyToJob as applyToJobRequest,
  getPublicCategories,
  getRecommendedJobs,
  getSeekerDashboard,
  getSeekerResumes,
  normalizeApplication,
  normalizeJob,
  normalizeSavedJob,
  updateAuthProfile,
} from '../lib/jobs.js';
import {
  educationFromApi,
  educationToApi,
  experienceFromApi,
  experienceToApi,
  splitProfileLocation,
} from '../lib/mappers.js';
import { formatApiError, validateJobApplicationReadiness, validateSeekerProfileForm } from '../lib/formValidation.js';

const DashboardDataContext = createContext(null);

function emptyProfile(user, apiProfile) {
  const city = apiProfile?.location_city;
  const province = apiProfile?.location_province;
  return {
    fullName: apiProfile?.full_name || user?.full_name || '',
    email: user?.email || apiProfile?.email || '',
    phone: apiProfile?.phone || '',
    location: [city, province].filter(Boolean).join(', '),
    headline: apiProfile?.headline || '',
    skills: apiProfile?.skills || [],
    experience: experienceFromApi(apiProfile?.experience),
    education: educationFromApi(apiProfile?.education),
    defaultResumePath: apiProfile?.default_resume_path || '',
  };
}

export function calculateProfileCompleteness(profile) {
  const fields = [
    profile.fullName?.trim(),
    profile.email?.trim(),
    profile.phone?.trim(),
    profile.location?.trim(),
    profile.skills?.length > 0,
  ];
  const filled = fields.filter(Boolean).length;
  return Math.round((filled / fields.length) * 100);
}

export function DashboardDataProvider({ children }) {
  const { token, user, profile: authProfile } = useAuth();
  const { toggleSaved, isSaved, reloadSavedJobs } = useSavedJobs();
  const [applications, setApplications] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [profile, setProfile] = useState(() => emptyProfile(user, authProfile));
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [metrics, setMetrics] = useState({
    applications: 0,
    savedJobs: 0,
    interviews: 0,
    shortlisted: 0,
    offers: 0,
  });

  const refreshDashboard = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError('');
    try {
      const [dashboard, categories, recommended, resumeList] = await Promise.all([
        getSeekerDashboard(token),
        getPublicCategories().catch(() => []),
        getRecommendedJobs(token, 6).catch(() => ({ items: [] })),
        getSeekerResumes(token).catch(() => []),
      ]);
      setApplications((dashboard.applications || []).map(normalizeApplication));
      setSavedJobs((dashboard.savedJobs || []).map((item) => normalizeSavedJob(item, categories)));
      setRecommendedJobs((recommended.items || []).map((job) => normalizeJob(job, categories)));
      setProfile(emptyProfile(user, dashboard.profile || authProfile));
      setResumes(resumeList);
      setMetrics(
        dashboard.metrics || {
          applications: 0,
          savedJobs: 0,
          interviews: 0,
          shortlisted: 0,
          offers: 0,
        },
      );
      await reloadSavedJobs();
    } catch (err) {
      setError(err.message || 'Failed to load your dashboard.');
    } finally {
      setLoading(false);
    }
  }, [token, user, authProfile, reloadSavedJobs]);

  useEffect(() => {
    refreshDashboard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const applyToJob = useCallback(
    async (job) => {
      setNotice('');
      setError('');

      if (!token) {
        const message = 'Sign in as a job seeker to apply.';
        setError(message);
        return { success: false, error: message };
      }

      const readiness = validateJobApplicationReadiness({ profile, resumes });
      if (!readiness.ok) {
        setError(readiness.message);
        return {
          success: false,
          error: readiness.message,
          hints: readiness.hints,
          profileHref: readiness.profileHref,
        };
      }

      try {
        await applyToJobRequest(job.id, token, undefined, readiness.resumePath);
        await refreshDashboard();
        setNotice('Application submitted successfully.');
        return { success: true };
      } catch (err) {
        const message = formatApiError(err, 'Unable to submit your application.');
        setError(message);
        return {
          success: false,
          error: message,
          profileHref: err?.code === 'RESUME_REQUIRED' ? '/dashboard/profile' : undefined,
        };
      }
    },
    [token, profile, resumes, refreshDashboard],
  );

  const withdrawApplication = useCallback(async () => {
    const message = 'Withdrawing an application is not available on the shared API yet.';
    setError(message);
    throw new Error(message);
  }, []);

  const toggleSaveJob = useCallback(
    async (job) => {
      setError('');
      await toggleSaved(job.id);
      await refreshDashboard();
    },
    [toggleSaved, refreshDashboard],
  );

  const removeSavedJob = useCallback(
    async (jobId) => {
      setError('');
      if (isSaved(jobId)) {
        await toggleSaved(jobId);
        await refreshDashboard();
      }
    },
    [isSaved, toggleSaved, refreshDashboard],
  );

  const isJobApplied = useCallback(
    (jobId) => applications.some((app) => app.jobId === String(jobId)),
    [applications],
  );

  const isJobSaved = useCallback((jobId) => isSaved(jobId), [isSaved]);

  const updateProfile = useCallback(
    async (data) => {
      setError('');
      setNotice('');
      const fieldErrors = validateSeekerProfileForm(data);
      if (Object.keys(fieldErrors).length) {
        const message = Object.values(fieldErrors)[0];
        setError(message);
        throw new Error(message);
      }
      const location = splitProfileLocation(data.location);
      const payload = {
        full_name: data.fullName,
        phone: data.phone || null,
        headline: data.headline || null,
        location_province: location.location_province,
        location_city: location.location_city,
        skills: data.skills || [],
        experience: experienceToApi(data.experience),
        education: educationToApi(data.education),
      };
      if (data.defaultResumePath) {
        payload.default_resume_path = data.defaultResumePath;
      }
      try {
        const res = await updateAuthProfile(token, payload);
        setProfile(emptyProfile(user, res.profile));
        setNotice('Your profile has been saved.');
        return res.profile;
      } catch (err) {
        const message = formatApiError(err, 'Unable to save profile.');
        setError(message);
        throw new Error(message);
      }
    },
    [token, user],
  );

  const stats = useMemo(
    () => ({
      applications: metrics.applications ?? applications.length,
      savedJobs: metrics.savedJobs ?? savedJobs.length,
      interviews: metrics.interviews ?? applications.filter((app) => app.status === 'Interview').length,
      offers: metrics.offers ?? applications.filter((app) => app.status === 'Offer').length,
    }),
    [metrics, applications, savedJobs],
  );

  const profileCompleteness = useMemo(() => calculateProfileCompleteness(profile), [profile]);

  const value = useMemo(
    () => ({
      applications,
      savedJobs,
      recommendedJobs,
      profile,
      resumes,
      stats,
      profileCompleteness,
      loading,
      error,
      notice,
      setError,
      setNotice,
      applyToJob,
      withdrawApplication,
      toggleSaveJob,
      removeSavedJob,
      isJobApplied,
      isJobSaved,
      updateProfile,
      refreshDashboard,
    }),
    [
      applications,
      savedJobs,
      recommendedJobs,
      profile,
      resumes,
      stats,
      profileCompleteness,
      loading,
      error,
      notice,
      applyToJob,
      withdrawApplication,
      toggleSaveJob,
      removeSavedJob,
      isJobApplied,
      isJobSaved,
      updateProfile,
      refreshDashboard,
    ],
  );

  return <DashboardDataContext.Provider value={value}>{children}</DashboardDataContext.Provider>;
}

export function useDashboardData() {
  const context = useContext(DashboardDataContext);
  if (!context) {
    throw new Error('useDashboardData must be used within a DashboardDataProvider');
  }
  return context;
}
