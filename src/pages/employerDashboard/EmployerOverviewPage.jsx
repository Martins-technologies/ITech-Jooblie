import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardTopBanner from '../../components/dashboard/DashboardTopBanner.jsx';
import EmployerStatCardRow from '../../components/employerDashboard/EmployerStatCardRow.jsx';
import ApplicantListItem from '../../components/employerDashboard/ApplicantListItem.jsx';
import ApplicantProfileDrawer from '../../components/employerDashboard/ApplicantProfileDrawer.jsx';
import JobPostingCard from '../../components/employerDashboard/JobPostingCard.jsx';
import Button from '../../components/common/Button.jsx';
import { useEmployerData } from '../../context/EmployerDataContext.jsx';

export default function EmployerOverviewPage() {
  const {
    jobPostings,
    applicants,
    stats,
    advanceApplicantStage,
    rejectApplicant,
    updateApplicantStage,
    updateApplicantNotes,
    getJobPosting,
  } = useEmployerData();
  const [selectedApplicantId, setSelectedApplicantId] = useState(null);
  const selectedApplicant = applicants.find((a) => a.id === selectedApplicantId) || null;

  const recentApplicants = useMemo(
    () =>
      [...applicants]
        .sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate))
        .slice(0, 6),
    [applicants],
  );

  const activePostings = useMemo(
    () =>
      jobPostings
        .filter((p) => p.status === 'Active')
        .sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate))
        .slice(0, 4),
    [jobPostings],
  );

  const hasPostings = jobPostings.length > 0;

  return (
    <>
      <DashboardTopBanner
        eyebrow="Newcomer Jobline Dashboard"
        title="Overview"
        subtitle="Your hiring activity at a glance."
      />

      {hasPostings ? (
        <>
          <EmployerStatCardRow stats={stats} />

          <section className="mb-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-brand-white">Recent Applicants</h2>
              <Link
                to="/employer-dashboard/applicants"
                className="text-sm font-semibold text-brand-accent hover:text-brand-accentHover"
              >
                View All Applicants →
              </Link>
            </div>
            {recentApplicants.length > 0 ? (
              <div className="space-y-4">
                {recentApplicants.map((applicant) => (
                  <ApplicantListItem
                    key={applicant.id}
                    applicant={applicant}
                    jobTitle={getJobPosting(applicant.jobId)?.title}
                    onAdvance={advanceApplicantStage}
                    onReject={rejectApplicant}
                    onViewProfile={(applicant) => setSelectedApplicantId(applicant.id)}
                  />
                ))}
              </div>
            ) : (
              <p className="text-sm text-brand-muted">No applicants yet.</p>
            )}
          </section>

          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-brand-white">Your Active Job Postings</h2>
              <Link
                to="/employer-dashboard/job-postings"
                className="text-sm font-semibold text-brand-accent hover:text-brand-accentHover"
              >
                View All Postings →
              </Link>
            </div>
            {activePostings.length > 0 ? (
              <div className="space-y-4">
                {activePostings.map((posting) => (
                  <JobPostingCard key={posting.id} posting={posting} showActions={false} />
                ))}
              </div>
            ) : (
              <p className="text-sm text-brand-muted">No active postings.</p>
            )}
          </section>
        </>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-brand-card/30 p-8 text-center">
          <h2 className="text-xl font-bold text-brand-white">Welcome to your employer dashboard</h2>
          <p className="mt-2 text-sm text-brand-muted">
            You haven&apos;t posted any jobs yet. Create your first posting to start receiving
            applicants.
          </p>
          <Button to="/employer-dashboard/post-a-job" variant="accent" className="mt-6">
            Post Your First Job →
          </Button>
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
