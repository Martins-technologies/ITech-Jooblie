/** Employer-facing pipeline stages mapped 1:1 to job seeker application statuses. */
export const EMPLOYER_PIPELINE_STAGES = [
  'New',
  'Reviewed',
  'Shortlisted',
  'Interview',
  'Offer',
  'Rejected',
];

export const SEEKER_TO_EMPLOYER_STAGE = {
  Applied: 'New',
  'In Review': 'Reviewed',
  Interview: 'Interview',
  Offer: 'Offer',
  'Not Selected': 'Rejected',
};

export const EMPLOYER_TO_SEEKER_STATUS = {
  New: 'Applied',
  Reviewed: 'In Review',
  Shortlisted: 'In Review',
  Interview: 'Interview',
  Offer: 'Offer',
  Rejected: 'Not Selected',
};

export function getNextPipelineStage(currentStage) {
  const index = EMPLOYER_PIPELINE_STAGES.indexOf(currentStage);
  if (index < 0 || index >= EMPLOYER_PIPELINE_STAGES.length - 2) return null;
  return EMPLOYER_PIPELINE_STAGES[index + 1];
}
