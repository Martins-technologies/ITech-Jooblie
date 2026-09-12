import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import DashboardTopBanner from '../../components/dashboard/DashboardTopBanner.jsx';
import ApplicantListItem from '../../components/employerDashboard/ApplicantListItem.jsx';
import ApplicantProfileDrawer from '../../components/employerDashboard/ApplicantProfileDrawer.jsx';
import Input from '../../components/common/Input.jsx';
import Select from '../../components/common/Select.jsx';
import { EMPLOYER_PIPELINE_STAGES } from '../../data/pipelineStages.js';
import { useEmployerData } from '../../context/EmployerDataContext.jsx';

const stageFilterOptions = [
  { value: 'All', label: 'All Stages' },
  ...EMPLOYER_PIPELINE_STAGES.map((stage) => ({ value: stage, label: stage })),
];

export default function AllApplicantsPage() {
  const {
    applicants,
    jobPostings,
    getJobPosting,
    advanceApplicantStage,
    rejectApplicant,
    updateApplicantStage,
    updateApplicantNotes,
    openApplicantResume,
  } = useEmployerData();
  const [selectedApplicantId, setSelectedApplicantId] = useState(null);
  const selectedApplicant = applicants.find((a) => a.id === selectedApplicantId) || null;
  const [search, setSearch] = useState('');
  const [jobFilter, setJobFilter] = useState('All');
  const [stageFilter, setStageFilter] = useState('All');

  const jobOptions = useMemo(
    () => [
      { value: 'All', label: 'All Postings' },
      ...jobPostings.map((p) => ({ value: p.id, label: p.title })),
    ],
    [jobPostings],
  );

  const filtered = useMemo(() => {
    return applicants.filter((applicant) => {
      const matchesSearch =
        !search.trim() || applicant.name.toLowerCase().includes(search.toLowerCase());
      const matchesJob = jobFilter === 'All' || applicant.jobId === jobFilter;
      const matchesStage = stageFilter === 'All' || applicant.stage === stageFilter;
      return matchesSearch && matchesJob && matchesStage;
    });
  }, [applicants, search, jobFilter, stageFilter]);

  return (
    <>
      <DashboardTopBanner
        eyebrow="IT Jobs Jobline Dashboard"
        title="All Applicants"
        subtitle="Review and manage candidates across all your job postings."
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Input
          id="applicants-search"
          name="search"
          label="Search by name"
          icon={Search}
          placeholder="Search candidates..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <Select
          id="applicants-job"
          name="job"
          label="Filter by posting"
          value={jobFilter}
          onChange={(event) => setJobFilter(event.target.value)}
          options={jobOptions}
        />
        <Select
          id="applicants-stage"
          name="stage"
          label="Filter by stage"
          value={stageFilter}
          onChange={(event) => setStageFilter(event.target.value)}
          options={stageFilterOptions}
        />
      </div>

      {filtered.length > 0 ? (
        <div className="space-y-4">
          {filtered.map((applicant) => (
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
        <div className="rounded-2xl border border-white/10 bg-brand-card/30 p-8 text-center">
          <h2 className="text-lg font-bold text-brand-white">
            {applicants.length === 0 ? 'No applicants yet' : 'No applicants match your filters'}
          </h2>
          <p className="mt-2 text-sm text-brand-muted">
            {applicants.length === 0
              ? 'Applicants will appear here once candidates apply to your postings.'
              : 'Try adjusting your search or filter criteria.'}
          </p>
        </div>
      )}

      {selectedApplicant ? (
        <ApplicantProfileDrawer
          applicant={selectedApplicant}
          onClose={() => setSelectedApplicantId(null)}
          onStageChange={updateApplicantStage}
          onNotesChange={updateApplicantNotes}
          onViewResume={() => openApplicantResume(selectedApplicant.id)}
        />
      ) : null}
    </>
  );
}
