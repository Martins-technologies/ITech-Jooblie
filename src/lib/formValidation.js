import { ApiError } from './api.js';

const API_CODE_MESSAGES = {
  RESUME_REQUIRED: 'Add a PDF resume on My Profile before you apply.',
  RESUME_FORBIDDEN: 'That resume is not linked to your account. Upload it again on My Profile.',
  RESUME_NOT_PDF: 'Only PDF resumes are accepted (maximum 5 MB).',
  RESUME_TOO_LARGE: 'Resume must be 5 MB or smaller.',
  RESUME_VERIFY_FAILED: 'We could not verify your resume file. Upload it again on My Profile.',
  RESUME_ALREADY_REGISTERED: 'This resume file is already registered. Choose another file or use your existing resume.',
  VALIDATION_ERROR: 'Some fields are invalid. Check the form and try again.',
  JOB_NOT_FOUND: 'This job is no longer available.',
  APPLICATION_DUPLICATE: 'You have already applied to this job.',
  ALREADY_APPLIED: 'You have already applied to this job.',
  APPLICATION_FAILED: 'Your application could not be submitted. Check your profile and try again.',
  PROFILE_LOAD_FAILED: 'Your profile could not be loaded. Try signing in again.',
  ACCOUNT_INACTIVE: 'Your account is inactive. Contact support if you need help.',
  RECRUITER_COMPANY_NOT_BOUND: 'Your recruiter account is not linked to a company yet.',
  SITE_CATEGORY_MISMATCH: 'Choose a job category that belongs to this portal.',
  JOB_CREATE_FAILED: 'The job could not be saved. Check all required fields.',
};

export function formatApiError(err, fallback = 'Something went wrong. Please try again.') {
  if (!err) return fallback;

  const code = err.code || (err instanceof ApiError ? err.code : undefined);
  if (code && API_CODE_MESSAGES[code]) {
    return API_CODE_MESSAGES[code];
  }

  const details = err.details || (err instanceof ApiError ? err.details : undefined);
  if (details && typeof details === 'object') {
    const fieldErrors = details.fieldErrors || details.formErrors;
    if (fieldErrors && typeof fieldErrors === 'object') {
      const lines = Object.entries(fieldErrors).flatMap(([field, messages]) => {
        const list = Array.isArray(messages) ? messages : [messages];
        return list.filter(Boolean).map((message) => `${humanizeField(field)}: ${message}`);
      });
      if (lines.length) return lines.join(' ');
    }
  }

  if (err.message) return err.message;
  return fallback;
}

function humanizeField(field) {
  return String(field)
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function isValidEmail(value) {
  const email = String(value || '').trim();
  if (!email) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateSeekerProfileForm(form) {
  const errors = {};
  if (!form.fullName?.trim() || form.fullName.trim().length < 2) {
    errors.fullName = 'Enter your full name (at least 2 characters).';
  }
  if (!form.email?.trim()) {
    errors.email = 'Email is required.';
  } else if (!isValidEmail(form.email)) {
    errors.email = 'Enter a valid email address.';
  }
  if (form.phone?.trim() && form.phone.trim().length < 7) {
    errors.phone = 'Enter a valid phone number or leave this blank.';
  }
  if (!form.location?.trim()) {
    errors.location = 'Enter your city and province so employers know where you are based.';
  }
  return errors;
}

export function validateCompanyProfileForm(form) {
  const errors = {};
  if (!form.name?.trim() || form.name.trim().length < 2) {
    errors.name = 'Enter your company name.';
  }
  if (!form.registrationNumber?.trim()) {
    errors.registrationNumber = 'Enter your company registration number.';
  }
  if (form.website?.trim()) {
    try {
      const url = form.website.trim().startsWith('http')
        ? form.website.trim()
        : `https://${form.website.trim()}`;
      // eslint-disable-next-line no-new
      new URL(url);
    } catch {
      errors.website = 'Enter a valid website URL (for example https://example.com).';
    }
  }
  return errors;
}

/**
 * Job applications require a registered resume in resume_documents (and a default path).
 */
export function validateJobApplicationReadiness({ profile, resumes }) {
  const list = Array.isArray(resumes) ? resumes : [];
  const defaultPath = (profile?.defaultResumePath || '').trim();

  if (list.length === 0) {
    return {
      ok: false,
      message: 'You need a resume before you can apply.',
      hints: [
        'Go to My Profile and upload a PDF resume (max 5 MB).',
        'Wait for the upload to finish — applications use your registered resume.',
      ],
      profileHref: '/dashboard/profile',
    };
  }

  const resumePath =
    (defaultPath && list.some((item) => item.storage_path === defaultPath)
      ? defaultPath
      : list[0]?.storage_path) || '';

  if (!resumePath) {
    return {
      ok: false,
      message: 'We could not find a resume on your account.',
      hints: ['Upload a PDF resume on My Profile, then try applying again.'],
      profileHref: '/dashboard/profile',
    };
  }

  if (defaultPath && !list.some((item) => item.storage_path === defaultPath)) {
    return {
      ok: false,
      message: 'Your default resume is not registered anymore.',
      hints: ['Upload your resume again on My Profile to re-register it.'],
      profileHref: '/dashboard/profile',
    };
  }

  return { ok: true, resumePath };
}

export function validateResumeFile(file) {
  if (!file) return 'Choose a PDF resume to upload.';
  if (file.size > 5 * 1024 * 1024) return 'Resume must be 5 MB or smaller.';
  const isPdf =
    file.type === 'application/pdf' || String(file.name || '').toLowerCase().endsWith('.pdf');
  if (!isPdf) return 'Only PDF resumes are accepted.';
  return null;
}
