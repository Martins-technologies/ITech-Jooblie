export const EMPLOYMENT_TYPE_TO_API = {
  'Full-Time': 'full_time',
  'Part-Time': 'part_time',
  Contract: 'contract',
  Internship: 'internship',
  Temporary: 'temporary',
  Seasonal: 'seasonal',
};

export const EMPLOYMENT_TYPE_FROM_API = {
  full_time: 'Full-Time',
  part_time: 'Part-Time',
  contract: 'Contract',
  internship: 'Internship',
  temporary: 'Temporary',
  seasonal: 'Seasonal',
};

export const SEEKER_STATUS_LABEL = {
  submitted: 'Applied',
  viewed: 'In Review',
  shortlisted: 'In Review',
  interviewing: 'Interview',
  offered: 'Offer',
  hired: 'Offer',
  rejected: 'Not Selected',
  withdrawn: 'Withdrawn',
};

export const API_STATUS_TO_STAGE = {
  submitted: 'New',
  viewed: 'Reviewed',
  shortlisted: 'Shortlisted',
  interviewing: 'Interview',
  offered: 'Offer',
  hired: 'Hired',
  rejected: 'Rejected',
  withdrawn: 'Withdrawn',
};

export const STAGE_TO_API_STATUS = {
  New: 'submitted',
  Reviewed: 'viewed',
  Shortlisted: 'shortlisted',
  Interview: 'interviewing',
  Offer: 'offered',
  Hired: 'hired',
  Rejected: 'rejected',
  Withdrawn: 'withdrawn',
};

export const JOB_STATUS_LABEL = {
  active: 'Active',
  pending_review: 'Pending Review',
  closed: 'Closed',
  expired: 'Closed',
  removed: 'Closed',
};

/** Employer dashboard badge label from API job row. */
export function formatRecruiterJobStatus(job) {
  const raw = String(job?.status ?? '')
    .trim()
    .toLowerCase();
  if (raw === 'active') return 'Active';
  if (raw === 'closed' || raw === 'expired' || raw === 'removed') return 'Closed';
  if (raw === 'pending_review') {
    if (job?.published_at) return 'Active';
    return 'Pending Review';
  }
  return 'Active';
}

const PROVINCE_NAMES = {
  ON: 'Ontario',
  BC: 'British Columbia',
  QC: 'Quebec',
  AB: 'Alberta',
  MB: 'Manitoba',
  NS: 'Nova Scotia',
  NB: 'New Brunswick',
  SK: 'Saskatchewan',
  PE: 'Prince Edward Island',
  NL: 'Newfoundland and Labrador',
  YT: 'Yukon',
  NT: 'Northwest Territories',
  NU: 'Nunavut',
};

export function expandProvince(value) {
  if (!value) return '';
  const trimmed = value.trim();
  return PROVINCE_NAMES[trimmed.toUpperCase()] || trimmed;
}

export function parseLocation(location) {
  const raw = (location || '').trim();
  const remote = /remote/i.test(raw);
  const cleaned = raw.replace(/\(canada\)/i, '').replace(/remote/i, '').replace(/^[\s,]+|[\s,]+$/g, '');
  const [cityPart, provincePart] = cleaned.split(',').map((part) => part.trim());
  return {
    city: cityPart && !/^canada$/i.test(cityPart) ? cityPart : '',
    province: expandProvince(provincePart || ''),
    is_remote: remote,
    workplace_type: remote ? 'remote' : 'onsite',
  };
}

export function splitProfileLocation(location) {
  const { city, province } = parseLocation(location);
  return { location_city: city || null, location_province: province || null };
}

export function joinLocation(city, province, isRemote) {
  if (isRemote && !city && !province) return 'Remote (Canada)';
  const place = [city, province].filter(Boolean).join(', ');
  if (isRemote && place) return `${place} (Remote)`;
  return place || (isRemote ? 'Remote' : 'Canada');
}

export function parseSalaryRange(salaryRange) {
  if (!salaryRange) return { salary_min: null, salary_max: null };
  if (salaryRange === '150-999' || salaryRange.endsWith('+') || salaryRange.startsWith('150000')) {
    return { salary_min: 150000, salary_max: null };
  }
  const [min, max] = salaryRange.split('-').map(Number);
  if (!Number.isFinite(min)) return { salary_min: null, salary_max: null };
  const minValue = min >= 1000 ? min : min * 1000;
  const maxValue = Number.isFinite(max) ? (max >= 1000 ? max : max * 1000) : null;
  return { salary_min: minValue, salary_max: maxValue };
}

export function salaryRangeFromJob(job) {
  const min = Number(job.salary_min);
  if (!Number.isFinite(min) || min <= 0) return '';
  const minK = Math.round(min / 1000);
  if (minK >= 150) return '150-999';
  if (minK >= 120) return '120-150';
  if (minK >= 100) return '100-120';
  if (minK >= 80) return '80-100';
  return '0-80';
}

export function salaryQueryFromRange(salaryRange) {
  if (!salaryRange) return undefined;
  if (salaryRange === '150-999') return '150000+';
  const { salary_min, salary_max } = parseSalaryRange(salaryRange);
  if (salary_min && salary_max) return `${salary_min}-${salary_max}`;
  if (salary_min) return `${salary_min}+`;
  return undefined;
}

export function formatEmploymentType(value) {
  if (!value) return 'Full-Time';
  return EMPLOYMENT_TYPE_FROM_API[value] || EMPLOYMENT_TYPE_TO_API[value] ? value : EMPLOYMENT_TYPE_FROM_API[value] || 'Full-Time';
}

export function toApiEmploymentType(label) {
  if (!label) return 'full_time';
  if (EMPLOYMENT_TYPE_TO_API[label]) return EMPLOYMENT_TYPE_TO_API[label];
  return String(label).toLowerCase().replace(/[-\s]+/g, '_');
}

export function formatWorkModel(job) {
  if (job.workplace_type === 'hybrid') return 'Hybrid';
  if (job.workplace_type === 'remote' || job.is_remote) return 'Remote';
  return 'On-site';
}

export function formatSalaryLabel(job) {
  const min = Number(job.salary_min) || 0;
  const max = Number(job.salary_max) || 0;
  if (!min && !max) return 'Salary not listed';
  if (job.salary_period === 'hourly') {
    return max ? `$${min} – $${max} / hour` : `$${min}+ / hour`;
  }
  const minK = min >= 1000 ? Math.round(min / 1000) : min;
  const maxK = max >= 1000 ? Math.round(max / 1000) : max;
  if (min && max) return `$${minK}K – $${maxK}K / year`;
  if (min) return `$${minK}K+ / year`;
  return `Up to $${maxK}K / year`;
}

export function getPostedLabel(dateString) {
  if (!dateString) return 'Recently';
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return 'Recently';
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
  if (diffWeeks < 8) return `${diffWeeks} weeks ago`;
  return date.toLocaleDateString();
}

function parseYearRange(dates) {
  const text = (dates || '').trim();
  const current = /present|current|now/i.test(text);
  const years = [...text.matchAll(/\b(19|20)\d{2}\b/g)].map((match) => match[0]);
  const startDate = years[0] ? `${years[0]}-01-01` : '';
  const endDate = current ? null : years[1] ? `${years[1]}-01-01` : startDate || null;
  return { startDate, endDate, current };
}

export function experienceToApi(entries = []) {
  return entries
    .filter((item) => item.title?.trim() || item.company?.trim())
    .slice(0, 20)
    .map((item) => {
      const range = parseYearRange(item.dates);
      return {
        title: item.title || 'Role',
        company: item.company || 'Company',
        startDate: range.startDate || '2020-01-01',
        endDate: range.current ? undefined : range.endDate || undefined,
        current: range.current,
        description: item.description || '',
      };
    });
}

export function educationToApi(entries = []) {
  return entries
    .filter((item) => item.school?.trim() || item.institution?.trim() || item.field?.trim())
    .slice(0, 20)
    .map((item) => {
      const range = parseYearRange(item.dates);
      return {
        degree: item.degree || item.field || 'Certificate',
        institution: item.institution || item.school || 'Institution',
        startDate: range.startDate || '2020-01-01',
        endDate: range.current ? undefined : range.endDate || undefined,
        current: range.current,
        field: item.field || '',
      };
    });
}

export function experienceFromApi(entries = []) {
  return (entries || []).map((item, index) => ({
    id: item.id || `exp-${index}`,
    title: item.title || '',
    company: item.company || '',
    dates: item.current
      ? `${(item.startDate || '').slice(0, 4) || ''} – Present`.replace(/^ – /, '')
      : [item.startDate, item.endDate]
          .filter(Boolean)
          .map((value) => String(value).slice(0, 4))
          .join(' – '),
    description: item.description || '',
  }));
}

export function educationFromApi(entries = []) {
  return (entries || []).map((item, index) => ({
    id: item.id || `edu-${index}`,
    school: item.institution || item.school || '',
    field: item.field || item.degree || '',
    dates: item.current
      ? `${(item.startDate || '').slice(0, 4) || ''} – Present`.replace(/^ – /, '')
      : [item.startDate, item.endDate]
          .filter(Boolean)
          .map((value) => String(value).slice(0, 4))
          .join(' – '),
  }));
}

export function uiRoleFromProfile(role) {
  if (role === 'recruiter' || role === 'admin') return 'employer';
  return 'seeker';
}

export function apiRoleFromUi(role) {
  return role === 'employer' || role === 'recruiter' ? 'recruiter' : 'job_seeker';
}
