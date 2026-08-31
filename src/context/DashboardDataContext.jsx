/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { mockApplications } from '../data/mockApplications.js';

const DashboardDataContext = createContext(null);

const initialProfile = {
  fullName: 'Alex Chen',
  email: '',
  phone: '416-555-0142',
  location: 'Toronto, ON',
  skills: ['JavaScript', 'Customer Service'],
  experience: [
    {
      id: 'exp-1',
      title: 'Retail Associate',
      company: 'FreshMart',
      dates: '2022 – 2024',
      description: 'Helped customers and managed inventory.',
    },
  ],
  education: [],
};

const initialSavedJobs = [
  {
    id: 'data-analyst-datainsight',
    title: 'Data Analyst',
    company: 'DataInsight Analytics',
    location: 'Montreal, QC',
    jobType: 'Full-Time',
    workModel: 'Hybrid',
    salaryLabel: '$70K – $95K / year',
    salaryMin: 70,
    salaryMax: 95,
    postedAt: '2026-08-18T10:00:00Z',
    postedLabel: '1 week ago',
    verified: true,
    category: 'data-analytics',
    experience: 'Mid-Level',
    keywords: ['Data Analyst'],
    skills: ['SQL', 'Excel', 'Python'],
  },
];

function normalizeJob(job) {
  return {
    id: String(job.id),
    title: job.title,
    company: job.company,
    location: job.location,
    jobType: job.jobType,
    workModel: job.workModel,
    salaryLabel: job.salaryLabel,
    salaryMin: job.salaryMin,
    salaryMax: job.salaryMax,
    postedAt: job.postedAt,
    postedLabel: job.postedLabel,
    verified: job.verified,
    category: job.category,
    experience: job.experience,
    keywords: job.keywords || [],
    skills: job.skills || [],
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
  const [applications, setApplications] = useState(mockApplications);
  const [savedJobs, setSavedJobs] = useState(initialSavedJobs);
  const [profile, setProfile] = useState(initialProfile);

  const applyToJob = useCallback((job) => {
    const normalized = normalizeJob(job);
    setApplications((current) => {
      if (current.some((app) => app.jobId === normalized.id)) return current;
      return [
        {
          id: `app-${Date.now()}`,
          jobId: normalized.id,
          title: normalized.title,
          company: normalized.company,
          location: normalized.location,
          status: 'Applied',
          dateApplied: new Date().toISOString().slice(0, 10),
        },
        ...current,
      ];
    });
  }, []);

  const withdrawApplication = useCallback((applicationId) => {
    setApplications((current) => current.filter((app) => app.id !== applicationId));
  }, []);

  const toggleSaveJob = useCallback((job) => {
    const normalized = normalizeJob(job);
    setSavedJobs((current) => {
      const exists = current.some((item) => item.id === normalized.id);
      if (exists) return current.filter((item) => item.id !== normalized.id);
      return [normalized, ...current];
    });
  }, []);

  const removeSavedJob = useCallback((jobId) => {
    setSavedJobs((current) => current.filter((job) => job.id !== String(jobId)));
  }, []);

  const isJobApplied = useCallback(
    (jobId) => applications.some((app) => app.jobId === String(jobId)),
    [applications],
  );

  const isJobSaved = useCallback(
    (jobId) => savedJobs.some((job) => job.id === String(jobId)),
    [savedJobs],
  );

  const updateProfile = useCallback((data) => {
    setProfile((current) => ({ ...current, ...data }));
  }, []);

  const stats = useMemo(() => {
    const interviews = applications.filter((app) => app.status === 'Interview').length;
    const offers = applications.filter((app) => app.status === 'Offer').length;
    return {
      applications: applications.length,
      savedJobs: savedJobs.length,
      interviews,
      offers,
    };
  }, [applications, savedJobs]);

  const profileCompleteness = useMemo(() => calculateProfileCompleteness(profile), [profile]);

  const value = useMemo(
    () => ({
      applications,
      savedJobs,
      profile,
      stats,
      profileCompleteness,
      applyToJob,
      withdrawApplication,
      toggleSaveJob,
      removeSavedJob,
      isJobApplied,
      isJobSaved,
      updateProfile,
    }),
    [
      applications,
      savedJobs,
      profile,
      stats,
      profileCompleteness,
      applyToJob,
      withdrawApplication,
      toggleSaveJob,
      removeSavedJob,
      isJobApplied,
      isJobSaved,
      updateProfile,
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
