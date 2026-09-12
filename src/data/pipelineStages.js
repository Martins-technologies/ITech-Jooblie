/** Employer-facing pipeline stages mapped 1:1 to job seeker application statuses. */
export const EMPLOYER_PIPELINE_STAGES = [
  'New',
  'Reviewed',
  'Shortlisted',
  'Interview',
  'Offer',
  'Hired',
  'Rejected',
];

export const SEEKER_TO_EMPLOYER_STAGE = {
  Applied: 'New',
  'In Review': 'Reviewed',
  Interview: 'Interview',
  Offer: 'Offer',
  'Not Selected': 'Rejected',
  Withdrawn: 'Withdrawn',
};

export const EMPLOYER_TO_SEEKER_STATUS = {
  New: 'Applied',
  Reviewed: 'In Review',
  Shortlisted: 'In Review',
  Interview: 'Interview',
  Offer: 'Offer',
  Hired: 'Offer',
  Rejected: 'Not Selected',
  Withdrawn: 'Withdrawn',
};

export function getNextPipelineStage(currentStage) {
  const linear = ['New', 'Reviewed', 'Shortlisted', 'Interview', 'Offer', 'Hired'];
  const index = linear.indexOf(currentStage);
  if (index < 0 || index >= linear.length - 1) return null;
  return linear[index + 1];
}
