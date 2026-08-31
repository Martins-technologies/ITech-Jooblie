/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { getNextPipelineStage } from '../data/pipelineStages.js';
import { mockApplicants } from '../data/mockApplicants.js';
import { mockJobPostings } from '../data/mockJobPostings.js';

const EmployerDataContext = createContext(null);

const initialCompanyProfile = {
  name: 'TechNova Solutions',
  logoFilename: '',
  industry: 'software-development',
  size: '51-200',
  website: 'https://technova.example.com',
  location: 'Toronto, ON',
  description:
    'A leading Canadian tech company building innovative solutions for employers and job seekers.',
};

function countApplicantsForJob(applicants, jobId) {
  return applicants.filter((a) => a.jobId === jobId && a.stage !== 'Rejected').length;
}

export function EmployerDataProvider({ children }) {
  const [jobPostings, setJobPostings] = useState(mockJobPostings);
  const [applicants, setApplicants] = useState(mockApplicants);
  const [companyProfile, setCompanyProfile] = useState(initialCompanyProfile);

  const createJobPosting = useCallback((data, status = 'Active') => {
    const id = `posting-${Date.now()}`;
    const posting = {
      id,
      ...data,
      status,
      postedDate: new Date().toISOString().slice(0, 10),
      applicantCount: 0,
    };
    setJobPostings((current) => [posting, ...current]);
    return posting;
  }, []);

  const updateJobPosting = useCallback((id, data) => {
    setJobPostings((current) =>
      current.map((posting) => (posting.id === id ? { ...posting, ...data } : posting)),
    );
  }, []);

  const closeJobPosting = useCallback((id) => {
    setJobPostings((current) =>
      current.map((posting) =>
        posting.id === id ? { ...posting, status: 'Closed' } : posting,
      ),
    );
  }, []);

  const deleteJobPosting = useCallback((id) => {
    setJobPostings((current) => current.filter((posting) => posting.id !== id));
    setApplicants((current) => current.filter((applicant) => applicant.jobId !== id));
  }, []);

  const advanceApplicantStage = useCallback((id) => {
    setApplicants((current) =>
      current.map((applicant) => {
        if (applicant.id !== id) return applicant;
        const next = getNextPipelineStage(applicant.stage);
        return next ? { ...applicant, stage: next } : applicant;
      }),
    );
  }, []);

  const rejectApplicant = useCallback((id) => {
    setApplicants((current) =>
      current.map((applicant) =>
        applicant.id === id ? { ...applicant, stage: 'Rejected' } : applicant,
      ),
    );
  }, []);

  const updateApplicantStage = useCallback((id, stage) => {
    setApplicants((current) =>
      current.map((applicant) => (applicant.id === id ? { ...applicant, stage } : applicant)),
    );
  }, []);

  const updateApplicantNotes = useCallback((id, notes) => {
    setApplicants((current) =>
      current.map((applicant) => (applicant.id === id ? { ...applicant, notes } : applicant)),
    );
  }, []);

  const updateCompanyProfile = useCallback((data) => {
    setCompanyProfile((current) => ({ ...current, ...data }));
  }, []);

  const getJobPosting = useCallback(
    (id) => jobPostings.find((posting) => posting.id === id),
    [jobPostings],
  );

  const getApplicantsForJob = useCallback(
    (jobId) => applicants.filter((applicant) => applicant.jobId === jobId),
    [applicants],
  );

  const stats = useMemo(() => {
    const activePostings = jobPostings.filter((p) => p.status === 'Active').length;
    const totalApplicants = applicants.filter((a) => a.stage !== 'Rejected').length;
    const interviews = applicants.filter((a) => a.stage === 'Interview').length;
    const filled = applicants.filter((a) => a.stage === 'Offer').length;
    return {
      activePostings,
      totalApplicants,
      interviews,
      filled,
    };
  }, [jobPostings, applicants]);

  const postingsWithCounts = useMemo(
    () =>
      jobPostings.map((posting) => ({
        ...posting,
        applicantCount: countApplicantsForJob(applicants, posting.id),
      })),
    [jobPostings, applicants],
  );

  const value = useMemo(
    () => ({
      jobPostings: postingsWithCounts,
      applicants,
      companyProfile,
      stats,
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
    }),
    [
      postingsWithCounts,
      applicants,
      companyProfile,
      stats,
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
