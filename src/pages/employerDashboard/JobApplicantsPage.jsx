import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import DashboardTopBanner from '../../components/dashboard/DashboardTopBanner.jsx';
import ApplicantListItem from '../../components/employerDashboard/ApplicantListItem.jsx';
import ApplicantProfileDrawer from '../../components/employerDashboard/ApplicantProfileDrawer.jsx';
import { useEmployerData } from '../../context/EmployerDataContext.jsx';

export default function JobApplicantsPage() {
  const { jobId } = useParams();
  const {
    applicants,
    getJobPosting,
    getApplicantsForJob,
    advanceApplicantStage,
    rejectApplicant,
    updateApplicantStage,
    updateApplicantNotes,
  } = useEmployerData();
  const [selectedApplicantId, setSelectedApplicantId] = useState(null);
  const selectedApplicant = applicants.find((a) => a.id === selectedApplicantId) || null;

  const posting = getJobPosting(jobId);
  const jobApplicants = getApplicantsForJob(jobId);

  if (!posting) {
    return (
      <div className="text-center">
        <p className="text-brand-muted">Job posting not found.</p>
        <Link to="/employer-dashboard/job-postings" className="mt-4 text-brand-accent">
          ← Back to Job Postings
        </Link>
      </div>
    );
  }

  return (
    <>
      <DashboardTopBanner
        eyebrow="Newcomer Jobline Dashboard"
        title={`${posting.title} — Applicants`}
        subtitle={`${jobApplicants.length} candidate${jobApplicants.length !== 1 ? 's' : ''} applied for this role.`}
      />

      <Link
        to="/employer-dashboard/job-postings"
        className="mb-6 inline-block text-sm font-semibold text-brand-accent hover:text-brand-accentHover"
      >
        ← Back to Job Postings
      </Link>

      {jobApplicants.length > 0 ? (
        <div className="space-y-4">
          {jobApplicants.map((applicant) => (
            <ApplicantListItem
              key={applicant.id}
              applicant={applicant}
              onAdvance={advanceApplicantStage}
              onReject={rejectApplicant}
              onViewProfile={(applicant) => setSelectedApplicantId(applicant.id)}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-brand-card/30 p-8 text-center">
          <h2 className="text-lg font-bold text-brand-white">No applicants yet</h2>
          <p className="mt-2 text-sm text-brand-muted">
            Candidates who apply to this posting will appear here.
          </p>
        </div>
      )}

      {selectedApplicant ? (
        <ApplicantProfileDrawer
          applicant={selectedApplicant}
          onClose={() => setSelectedApplicantId(null)}
          onStageChange={updateApplicantStage}
          onNotesChange={updateApplicantNotes}
        />
      ) : null}
    </>
  );
}
