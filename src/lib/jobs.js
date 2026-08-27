import { api } from './api.js';
import { Code2, Cloud, ShieldCheck, BarChart3, HelpCircle } from 'lucide-react';

// Promise cache for categories to prevent Gap #4 (duplicate taxonomic queries)
let categoriesPromise = null;

export function getServiceCareCategories() {
  if (!categoriesPromise) {
    categoriesPromise = api('/v1/taxonomy/categories?sector_id=3').catch((err) => {
      categoriesPromise = null;
      throw err;
    });
  }
  return categoriesPromise;
}

export async function getPublicJobs(params = {}) {
  const query = new URLSearchParams();
  if (params.q) query.set('q', params.q);
  if (params.category_id) query.set('category_id', params.category_id);
  if (params.city) query.set('city', params.city);
  if (params.province) query.set('province', params.province);
  if (params.employment_type) query.set('employment_type', params.employment_type);
  if (params.is_remote !== undefined) query.set('is_remote', params.is_remote);
  if (params.limit) query.set('limit', params.limit);

  const queryString = query.toString();
  const path = `/v1/jobs${queryString ? '?' + queryString : ''}`;
  return api(path);
}

export async function getPublicJob(id) {
  return api(`/v1/jobs/${id}`);
}

export async function recordJobView(id) {
  return api(`/v1/jobs/${id}/view`, { method: 'POST', body: {} });
}

export async function applyToJob(id, token, coverLetter) {
  return api(`/v1/jobs/${id}/applications`, {
    method: 'POST',
    body: { cover_letter: coverLetter },
  }, token);
}

export async function getMyApplications(token) {
  return api('/v1/me/applications', {}, token);
}

export async function getMyCompanies(token) {
  return api('/v1/companies', {}, token);
}

export async function getEmployerJobs(token) {
  return api('/v1/employer/jobs', {}, token);
}

export async function getJobApplications(jobId, token) {
  return api(`/v1/employer/jobs/${jobId}/applications`, {}, token);
}

export async function getJobViews(jobId, token) {
  return api(`/v1/employer/jobs/${jobId}/views`, {}, token);
}

export async function createEmployerJob(payload, token) {
  return api('/v1/employer/jobs', {
    method: 'POST',
    body: payload,
  }, token);
}

// Helpers for normalization
const slugify = (text) =>
  (text || '')
    .toLowerCase()
    .replace(/ & /g, '-')
    .replace(/[^a-z0-9]+/g, '-');

const CATEGORY_ICONS = {
  'software-development': Code2,
  'cloud-devops': Cloud,
  'cybersecurity': ShieldCheck,
  'data-ai': BarChart3,
};

function getPostedLabel(dateString) {
  if (!dateString) return 'Recently';
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) {
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours <= 0) return 'Just now';
    return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  }
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  const diffWeeks = Math.floor(diffDays / 7);
  if (diffWeeks === 1) return '1 week ago';
  return `${diffWeeks} weeks ago`;
}

export function normalizeJob(job, categories = []) {
  const cat = categories.find((c) => c.id === job.category_id);
  const categorySlug = cat ? slugify(cat.name) : 'software-development';
  const IconComponent = CATEGORY_ICONS[categorySlug] || Code2;

  // Format type
  let formattedType = 'Full-Time';
  if (job.employment_type) {
    const rawType = job.employment_type.toLowerCase();
    if (rawType.includes('part')) formattedType = 'Part-Time';
    else if (rawType.includes('contract')) formattedType = 'Contract';
    else if (rawType.includes('intern')) formattedType = 'Internship';
  }

  // Format salary
  const min = job.salary_min || 0;
  const max = job.salary_max || 0;
  let salaryLabel = '';
  if (job.salary_period === 'hourly') {
    salaryLabel = `$${min} – $${max} / hour`;
  } else {
    const minK = min > 1000 ? Math.round(min / 1000) : min;
    const maxK = max > 1000 ? Math.round(max / 1000) : max;
    salaryLabel = `$${minK}K – $${maxK}K / year`;
  }

  return {
    id: job.id,
    title: job.title || '',
    company: job.company?.name || 'Unknown Company',
    verified: job.company?.verification_status === 'verified',
    location: job.city && job.province ? `${job.city}, ${job.province}` : job.city || job.province || 'Canada',
    jobType: formattedType,
    workModel: job.is_remote ? 'Remote' : 'On-site',
    salaryLabel,
    salaryMin: min > 1000 ? Math.round(min / 1000) : min,
    salaryMax: max > 1000 ? Math.round(max / 1000) : max,
    postedAt: job.published_at || job.created_at || new Date().toISOString(),
    postedLabel: getPostedLabel(job.published_at || job.created_at),
    category: categorySlug,
    description: job.description || '',
    icon: IconComponent,
    to: `/jobs/${job.id}`,
  };
}
