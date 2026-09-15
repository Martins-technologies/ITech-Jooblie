import { Code2, Cloud, ShieldCheck, BarChart3, HelpCircle } from 'lucide-react';
import { api } from './api.js';
import {
  EMPLOYMENT_TYPE_FROM_API,
  formatRecruiterJobStatus,
  SEEKER_STATUS_LABEL,
  API_STATUS_TO_STAGE,
  formatSalaryLabel,
  formatWorkModel,
  getPostedLabel,
  joinLocation,
  salaryRangeFromJob,
  toApiEmploymentType,
} from './mappers.js';

let categoriesPromise = null;

export function getPublicCategories() {
  if (!categoriesPromise) {
    categoriesPromise = api('public/categories')
      .then((res) => res?.items || [])
      .catch((err) => {
        categoriesPromise = null;
        throw err;
      });
  }
  return categoriesPromise;
}

export const getServiceCareCategories = getPublicCategories;

function buildQuery(params = {}) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    query.set(key, String(value));
  });
  const qs = query.toString();
  return qs ? `?${qs}` : '';
}

export async function getPublicJobs(params = {}) {
  return api(`public/jobs${buildQuery(params)}`);
}

export async function getPublicJob(id) {
  const res = await api(`public/jobs/${id}`);
  return res?.job ?? res;
}

export async function getPublicCompanies() {
  const res = await api('public/companies');
  return res?.items || [];
}

export async function applyToJob(id, token, coverLetter, resumePath) {
  const body = {};
  if (coverLetter) body.cover_letter = coverLetter;
  if (resumePath) body.resume_path = resumePath;
  return api(`job-seeker/jobs/${id}/apply`, { method: 'POST', body }, token);
}

export async function saveJob(id, token) {
  return api(`job-seeker/jobs/${id}/save`, { method: 'POST', body: {} }, token);
}

export async function unsaveJob(id, token) {
  return api(`job-seeker/jobs/${id}/save`, { method: 'DELETE' }, token);
}

export async function getSeekerDashboard(token) {
  return api('job-seeker/dashboard', {}, token);
}

export async function getRecommendedJobs(token, limit = 6) {
  return api(`job-seeker/recommended-jobs${buildQuery({ limit })}`, {}, token);
}

export async function getSeekerResumes(token) {
  const res = await api('job-seeker/resumes', {}, token);
  return res?.items || [];
}

export async function registerResume(token, payload) {
  return api('job-seeker/resumes', { method: 'POST', body: payload }, token);
}

export async function getSeekerResumeUrl(token, id) {
  return api(`job-seeker/resume-url${buildQuery({ id })}`, {}, token);
}

export async function getAuthMe(token) {
  return api('auth/me', {}, token);
}

export async function updateAuthProfile(token, payload) {
  return api('auth/profile', { method: 'PATCH', body: payload }, token);
}

export async function getRecruiterDashboard(token) {
  return api('recruiter/dashboard', {}, token);
}

export async function getRecruiterCompanies(token) {
  const res = await api('recruiter/companies', {}, token);
  return res?.items || [];
}

export async function createRecruiterCompany(token, payload) {
  return api('recruiter/companies', { method: 'POST', body: payload }, token);
}

export async function updateRecruiterCompany(companyId, payload, token) {
  return api(`recruiter/companies/${companyId}`, { method: 'PATCH', body: payload }, token);
}

export async function createRecruiterJob(payload, token) {
  return api('recruiter/jobs', { method: 'POST', body: payload }, token);
}

export const createEmployerJob = createRecruiterJob;

export async function updateRecruiterJob(jobId, payload, token) {
  return api(`recruiter/jobs/${jobId}`, { method: 'PATCH', body: payload }, token);
}

export async function getJobApplications(jobId, token) {
  const res = await api(`recruiter/jobs/${jobId}/applications`, {}, token);
  return res?.items || [];
}

export async function getRecruiterApplications(token, params = {}) {
  return api(`recruiter/applications${buildQuery(params)}`, {}, token);
}

export async function getApplicationResumeUrl(applicationId, token) {
  return api(`recruiter/applications/${applicationId}/resume-url`, {}, token);
}

export async function updateApplicationStatus(applicationId, status, token) {
  return api(
    `recruiter/applications/${applicationId}`,
    { method: 'PATCH', body: { status } },
    token,
  );
}

export async function getMyCompanies(token) {
  return getRecruiterCompanies(token);
}

export async function getEmployerJobs(token) {
  const dashboard = await getRecruiterDashboard(token);
  return dashboard?.jobs || [];
}

const CATEGORY_ICONS = {
  'software-development': Code2,
  'cloud-devops': Cloud,
  cybersecurity: ShieldCheck,
  'data-ai': BarChart3,
};

export function normalizeJob(job, categories = []) {
  const nestedCompany = job.companies || job.company || {};
  const nestedCategory = job.categories || {};
  const cat =
    nestedCategory.slug
      ? nestedCategory
      : categories.find((item) => item.id === job.category_id) || {};
  const categorySlug = cat.slug || 'software-development';
  const IconComponent = CATEGORY_ICONS[categorySlug] || HelpCircle;
  const postedAt = job.published_at || job.created_at || new Date().toISOString();
  const min = Number(job.salary_min) || 0;
  const max = Number(job.salary_max) || 0;

  return {
    id: job.id,
    title: job.title || '',
    company: nestedCompany.name || 'Unknown Company',
    verified: nestedCompany.verification_status === 'verified',
    location: joinLocation(job.city, job.province, job.is_remote || job.workplace_type === 'remote'),
    jobType: EMPLOYMENT_TYPE_FROM_API[job.employment_type] || 'Full-Time',
    workModel: formatWorkModel(job),
    salaryLabel: formatSalaryLabel(job),
    salaryMin: min >= 1000 ? Math.round(min / 1000) : min,
    salaryMax: max >= 1000 ? Math.round(max / 1000) : max,
    postedAt,
    postedLabel: getPostedLabel(postedAt),
    category: categorySlug,
    experience: job.experience_level || '',
    description: job.description || '',
    skills: job.skills || [],
    keywords: job.skills || [],
    icon: IconComponent,
    to: `/jobs/${job.id}`,
    raw: job,
  };
}

export function normalizeApplication(item) {
  const job = item.jobs || {};
  const company = job.companies || {};
  return {
    id: item.id,
    jobId: String(item.job_id || job.id || ''),
    title: job.title || 'Job',
    company: company.name || 'Company',
    location: joinLocation(job.city, job.province, job.is_remote),
    status: SEEKER_STATUS_LABEL[item.status] || 'Applied',
    dateApplied: item.created_at,
    rawStatus: item.status,
  };
}

export function normalizeSavedJob(item, categories = []) {
  const job = item.jobs || item;
  return normalizeJob(job, categories);
}

export function normalizeRecruiterJob(job) {
  const company = job.companies || {};
  const postedDate = (job.published_at || job.created_at || '').slice(0, 10);
  return {
    id: job.id,
    title: job.title || '',
    company: company.name || '',
    location: joinLocation(job.city, job.province, job.is_remote || job.workplace_type === 'remote'),
    category: job.categories?.slug || String(job.category_id || ''),
    categoryId: job.category_id,
    jobType: EMPLOYMENT_TYPE_FROM_API[job.employment_type] || 'Full-Time',
    salaryRange: salaryRangeFromJob(job),
    description: job.description || '',
    status: formatRecruiterJobStatus(job),
    postedDate: postedDate || new Date().toISOString().slice(0, 10),
    applicantCount: job.applications_count || 0,
    viewsCount: job.views_count || 0,
    workplaceType: job.workplace_type,
    city: job.city || '',
    province: job.province || '',
    isRemote: Boolean(job.is_remote),
    employmentType: job.employment_type,
    raw: job,
  };
}

export function normalizeApplicant(item) {
  const profile = item.profiles || {};
  const location = joinLocation(profile.location_city, profile.location_province, false);
  return {
    id: item.id,
    jobId: String(item.job_id || item.jobs?.id || ''),
    jobTitle: item.jobs?.title || '',
    name: profile.full_name || 'Applicant',
    email: profile.email || 'Not provided',
    phone: profile.phone || 'Not provided',
    location: location || 'Not provided',
    resumeFilename: item.resume_path ? item.resume_path.split('/').pop() : '',
    resumePath: item.resume_path || '',
    skills: profile.skills || [],
    experience: (profile.experience || []).map((exp, index) => ({
      id: `exp-${index}`,
      title: exp.title || '',
      company: exp.company || '',
      dates: [exp.startDate, exp.current ? 'Present' : exp.endDate].filter(Boolean).join(' – '),
      description: exp.description || '',
    })),
    education: (profile.education || []).map((edu, index) => ({
      id: `edu-${index}`,
      school: edu.institution || '',
      field: edu.field || edu.degree || '',
      dates: [edu.startDate, edu.current ? 'Present' : edu.endDate].filter(Boolean).join(' – '),
    })),
    stage: API_STATUS_TO_STAGE[item.status] || 'New',
    notes: '',
    appliedDate: item.created_at,
    coverLetter: item.cover_letter || '',
    rawStatus: item.status,
  };
}

export { toApiEmploymentType };
