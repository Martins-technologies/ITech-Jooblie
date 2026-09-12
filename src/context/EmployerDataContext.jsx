/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getNextPipelineStage } from '../data/pipelineStages.js';
import { useAuth } from '../lib/auth/AuthContext.jsx';
import {
  createRecruiterCompany,
  createRecruiterJob,
  getApplicationResumeUrl,
  getJobApplications,
  getPublicCategories,
  getRecruiterApplications,
  getRecruiterCompanies,
  getRecruiterDashboard,
  normalizeApplicant,
  normalizeRecruiterJob,
  toApiEmploymentType,
  updateApplicationStatus,
  updateRecruiterJob,
} from '../lib/jobs.js';
import { parseLocation, parseSalaryRange, STAGE_TO_API_STATUS } from '../lib/mappers.js';
import { formatApiError } from '../lib/formValidation.js';

const EmployerDataContext = createContext(null);

function emptyCompany() {
  return {
    id: '',
    name: '',
    logoFilename: '',
    industry: '',
    size: '',
    website: '',
    location: '',
    description: '',
    registrationNumber: '',
  };
}

function mapCompany(company) {
  if (!company) return emptyCompany();
  return {
    id: company.id || '',
    name: company.name || '',
    logoFilename: company.logo_path || '',
    industry: '',
    size: '',
    website: company.website || '',
    location: '',
    description: company.description || '',
    registrationNumber: company.registration_number || '',
    verificationStatus: company.verification_status || '',
  };
}

function postingToPayload(data, companyId) {
  const location = parseLocation(data.location);
  const salary = parseSalaryRange(data.salaryRange);
  return {
    title: data.title,
    ...(companyId ? { company_id: companyId } : {}),
    category_id: Number(data.categoryId || data.category),
    employment_type: toApiEmploymentType(data.jobType),
    description: data.description,
    province: location.province || undefined,
    city: location.city || undefined,
    is_remote: location.is_remote,
    workplace_type: location.workplace_type,
    salary_min: salary.salary_min,
    salary_max: salary.salary_max,
    salary_currency: 'CAD',
    salary_period: 'yearly',
  };
}

export function EmployerDataProvider({ children }) {
  const { token } = useAuth();
  const [jobPostings, setJobPostings] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [companyProfile, setCompanyProfile] = useState(emptyCompany);
  const [categories, setCategories] = useState([]);
  const [metrics, setMetrics] = useState({
    companies: 0,
    jobs: 0,
    activeJobs: 0,
    applications: 0,
    views: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const refreshDashboard = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError('');
    try {
      const [dashboard, companies, allApps, cats] = await Promise.all([
        getRecruiterDashboard(token),
        getRecruiterCompanies(token),
        getRecruiterApplications(token, { page: 1, pageSize: 100 }).catch(() => ({ items: [] })),
        getPublicCategories().catch(() => []),
      ]);
      setJobPostings((dashboard.jobs || []).map(normalizeRecruiterJob));
      setApplicants((allApps.items || dashboard.recentApplications || []).map(normalizeApplicant));
      setCompanyProfile(mapCompany(companies[0] || dashboard.companies?.[0]));
      setCategories(cats);
      setMetrics(
        dashboard.metrics || {
          companies: 0,
          jobs: 0,
          activeJobs: 0,
          applications: 0,
          views: 0,
        },
      );
    } catch (err) {
      setError(err.message || 'Failed to load employer dashboard.');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    refreshDashboard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const createJobPosting = useCallback(
    async (data) => {
      setError('');
      setNotice('');
      const payload = postingToPayload(data, companyProfile.id);
      if (!payload.category_id) {
        throw new Error('Please select a job category.');
      }
      try {
        const res = await createRecruiterJob(payload, token);
        let job = res?.job;
        if (job?.id && String(job.status || '').toLowerCase() === 'pending_review') {
          try {
            const activated = await updateRecruiterJob(job.id, { status: 'active' }, token);
            job = activated?.job || job;
          } catch {
            // Backend may still be on a schema that blocks recruiter activate; dashboard will show Pending Review.
          }
        }
        await refreshDashboard();
        const liveStatus = String(job?.status || 'active').toLowerCase();
        setNotice(
          liveStatus === 'active'
            ? 'Job posting published and is now active.'
            : 'Job saved but is awaiting review before it goes live.',
        );
        return job;
      } catch (err) {
        const message = formatApiError(err, 'Unable to publish this job.');
        setError(message);
        throw new Error(message);
      }
    },
    [token, refreshDashboard, companyProfile.id],
  );

  const updateJobPosting = useCallback(
    async (id, data) => {
      setError('');
      const payload = postingToPayload(data, companyProfile.id);
      if (data.status === 'Closed') payload.status = 'closed';
      const res = await updateRecruiterJob(id, payload, token);
      await refreshDashboard();
      setNotice('Job posting updated successfully.');
      return res.job;
    },
    [token, refreshDashboard, companyProfile.id],
  );

  const closeJobPosting = useCallback(
    async (id) => {
      setError('');
      await updateRecruiterJob(id, { status: 'closed' }, token);
      await refreshDashboard();
      setNotice('Job posting closed.');
    },
    [token, refreshDashboard],
  );

  const deleteJobPosting = useCallback(async () => {
    const message = 'Recruiters cannot delete postings on this API. Close the job instead, or ask an admin.';
    setError(message);
    throw new Error(message);
  }, []);

  const advanceApplicantStage = useCallback(
    async (id) => {
      const applicant = applicants.find((item) => item.id === id);
      if (!applicant) return;
      const nextStage = getNextPipelineStage(applicant.stage);
      if (!nextStage) return;
      const status = STAGE_TO_API_STATUS[nextStage];
      await updateApplicationStatus(id, status, token);
      await refreshDashboard();
    },
    [applicants, token, refreshDashboard],
  );

  const rejectApplicant = useCallback(
    async (id) => {
      await updateApplicationStatus(id, 'rejected', token);
      await refreshDashboard();
    },
    [token, refreshDashboard],
  );

  const updateApplicantStage = useCallback(
    async (id, stage) => {
      const status = STAGE_TO_API_STATUS[stage];
      if (!status) return;
      await updateApplicationStatus(id, status, token);
      await refreshDashboard();
    },
    [token, refreshDashboard],
  );

  const updateApplicantNotes = useCallback(async () => {
    const message = 'Recruiter notes are not stored by the shared API yet.';
    setError(message);
    throw new Error(message);
  }, []);

  const updateCompanyProfile = useCallback(
    async (data) => {
      setError('');
      setNotice('');
      if (!companyProfile.id) {
        const res = await createRecruiterCompany(token, {
          name: data.name,
          website: data.website,
          registration_number: data.registrationNumber || data.registration_number,
          description: data.description || undefined,
        });
        setCompanyProfile(mapCompany(res.company));
        setNotice('Company created.');
        await refreshDashboard();
        return;
      }
      const message = 'Updating an existing company profile is not available on the shared API yet.';
      setError(message);
      throw new Error(message);
    },
    [companyProfile.id, token, refreshDashboard],
  );

  const getJobPosting = useCallback(
    (id) => jobPostings.find((posting) => String(posting.id) === String(id)),
    [jobPostings],
  );

  const getApplicantsForJob = useCallback(
    (jobId) => applicants.filter((applicant) => String(applicant.jobId) === String(jobId)),
    [applicants],
  );

  const loadApplicantsForJob = useCallback(
    async (jobId) => {
      const items = await getJobApplications(jobId, token);
      const mapped = items.map((item) => normalizeApplicant({ ...item, job_id: jobId }));
      setApplicants((current) => {
        const others = current.filter((item) => String(item.jobId) !== String(jobId));
        return [...mapped, ...others];
      });
      return mapped;
    },
    [token],
  );

  const openApplicantResume = useCallback(
    async (applicationId) => {
      const res = await getApplicationResumeUrl(applicationId, token);
      if (res?.url) window.open(res.url, '_blank', 'noopener,noreferrer');
      return res;
    },
    [token],
  );

  const stats = useMemo(
    () => ({
      activePostings: metrics.activeJobs ?? jobPostings.filter((p) => p.status === 'Active').length,
      totalApplicants: metrics.applications ?? applicants.length,
      interviews: applicants.filter((a) => a.stage === 'Interview').length,
      filled: applicants.filter((a) => a.stage === 'Offer' || a.stage === 'Hired').length,
    }),
    [metrics, jobPostings, applicants],
  );

  const value = useMemo(
    () => ({
      jobPostings,
      applicants,
      companyProfile,
      categories,
      stats,
      loading,
      error,
      notice,
      setError,
      setNotice,
      createJobPosting,
      updateJobPosting,
      closeJobPosting,
      deleteJobPosting,
      advanceApplicantStage,
      rejectApplicant,
      updateApplicantStage,
      updateApplicantNotes,
      updateCompanyProfile,
      getJobPosting,
      getApplicantsForJob,
      loadApplicantsForJob,
      openApplicantResume,
      refreshDashboard,
    }),
    [
      jobPostings,
      applicants,
      companyProfile,
      categories,
      stats,
      loading,
      error,
      notice,
      createJobPosting,
      updateJobPosting,
      closeJobPosting,
      deleteJobPosting,
      advanceApplicantStage,
      rejectApplicant,
      updateApplicantStage,
      updateApplicantNotes,
      updateCompanyProfile,
      getJobPosting,
      getApplicantsForJob,
      loadApplicantsForJob,
      openApplicantResume,
      refreshDashboard,
    ],
  );

  return <EmployerDataContext.Provider value={value}>{children}</EmployerDataContext.Provider>;
}

export function useEmployerData() {
  const context = useContext(EmployerDataContext);
  if (!context) {
    throw new Error('useEmployerData must be used within an EmployerDataProvider');
  }
  return context;
}
